import express from 'express';
import cors from 'cors';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let db;

async function setupDatabase() {
    db = await open({
        filename: path.join(__dirname, 'diagnostic.db'),
        driver: sqlite3.Database
    });

    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await db.exec(schema);
    console.log("Database initialized with ACCORD schema.");
}

// 1. Init Session (Creating the company and session)
app.post('/api/diagnostic', async (req, res) => {
    const data = req.body;
    try {
        await db.run(
            `INSERT INTO diagnostic_sessions (id, version, status, started_at, utm_source, utm_medium, utm_campaign) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [data.diagnosticId, data.diagnosticVersion, data.status, data.startedAt, data.acquisitionData?.utm_source, data.acquisitionData?.utm_medium, data.acquisitionData?.utm_campaign]
        );
        res.json({ success: true, sessionId: data.diagnosticId });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to initialize session' });
    }
});

// 2. Update Session (Context Data)
app.put('/api/diagnostic/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    try {
        if (body.companyContext) {
            const cId = crypto.randomUUID();
            await db.run(
                `INSERT INTO companies (id, name, website, industry, business_model, company_size) VALUES (?, ?, ?, ?, ?, ?)`,
                [cId, body.companyContext.company_name, body.companyContext.website, body.companyContext.industry, body.companyContext.business_model, body.companyContext.company_size]
            );
            await db.run(`UPDATE diagnostic_sessions SET company_id = ? WHERE id = ?`, [cId, id]);
        }

        if (body.executiveContext) {
            await db.run(
                `UPDATE diagnostic_sessions SET executive_first_name = ?, executive_last_name = ?, executive_email = ?, executive_job_title = ? WHERE id = ?`,
                [body.executiveContext.first_name, body.executiveContext.lastName_name, body.executiveContext.email, body.executiveContext.job_title, id]
            );
        }

        if (body.strategicContext) {
            await db.run(
                `UPDATE diagnostic_sessions SET strategic_primary_barrier = ?, strategic_priority = ? WHERE id = ?`,
                [body.strategicContext.primary_barrier, body.strategicContext.strategic_priority, id]
            );
        }

        if (body.responses) {
            for (const resp of body.responses) {
                const rId = crypto.randomUUID();
                const qId = resp.questionId;
                const dimension = qId.split('-')[0]; // Simple dimension map for storage
                await db.run(
                    `INSERT INTO diagnostic_responses (id, session_id, question_id, dimension, score) VALUES (?, ?, ?, ?, ?)`,
                    [rId, id, qId, dimension, resp.score]
                );
            }
        }

        res.json({ success: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to update session' });
    }
});

// 3. Complete Diagnostic
app.post('/api/diagnostic/:id/complete', async (req, res) => {
    const { id } = req.params;
    const result = req.body;
    const resultId = crypto.randomUUID();

    try {
        await db.run(`UPDATE diagnostic_sessions SET status = 'completed', completed_at = CURRENT_TIMESTAMP WHERE id = ?`, [id]);

        await db.run(
            `INSERT INTO diagnostic_results (id, session_id, overall_score, capability_level, primary_vulnerability, secondary_signal, systemic_pattern, recommended_focus) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [resultId, id, result.overallScore, result.capabilityLevel, result.primaryVulnerability, result.secondarySignal || null, result.systemicPattern?.pattern || null, result.recommendations?.focusArea || null]
        );

        res.json({ success: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to complete session' });
    }
});

// 4. Consultation Request
app.post('/api/diagnostic/:id/consultation', async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const reqId = crypto.randomUUID();

    try {
        await db.run(
            `INSERT INTO consultation_requests (id, session_id, full_name, email, job_title, phone, additional_context) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [reqId, id, data.full_name, data.email, data.job_title, data.phone, data.additional_context]
        );
        res.json({ success: true, consultationId: reqId });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to submit consultation' });
    }
});

setupDatabase().then(() => {
    app.listen(PORT, () => console.log(`ACCORD Backend running on http://localhost:${PORT}`));
});
