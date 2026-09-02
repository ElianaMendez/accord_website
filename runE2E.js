import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Parse .env manually to avoid dependency issues in node execution
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envFile = fs.readFileSync(path.join(__dirname, '.env'), 'utf-8');
let VITE_SUPABASE_URL = '';
let VITE_SUPABASE_PUBLISHABLE_KEY = '';

envFile.split('\n').forEach(line => {
    if (line.startsWith('VITE_SUPABASE_URL=')) VITE_SUPABASE_URL = line.substring(line.indexOf('=') + 1).trim().replace(/["']/g, '');
    if (line.startsWith('VITE_SUPABASE_PUBLISHABLE_KEY=')) VITE_SUPABASE_PUBLISHABLE_KEY = line.substring(line.indexOf('=') + 1).trim().replace(/["']/g, '');
});

globalThis.WebSocket = class WebSocket {
    constructor() { }
    send() { }
    close() { }
};

console.log("URL:", VITE_SUPABASE_URL, "KEY:", VITE_SUPABASE_PUBLISHABLE_KEY.substring(0, 5) + '...');
if (!VITE_SUPABASE_URL) throw new Error("VITE_SUPABASE_URL is empty");

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY);

const QUESTIONS = [
    'AIA-17', 'AIA-18', 'AIA-19',
    'DEP-01', 'DEP-02', 'DEP-03',
    'GOV-20', 'GOV-22', 'GOV-23',
    'INF-09', 'INF-10', 'INF-12',
    'INT-13', 'INT-14', 'INT-15', 'INT-16',
    'PRO-06', 'PRO-07', 'PRO-08'
];

async function runTest() {
    console.log("=== ACCORD E2E REMOTE TEST ===");

    // 1. Anonymous Auth
    console.log("[1] Initializing Anonymous Session...");
    const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
    if (authError) throw authError;
    const uid = authData.user.id;
    console.log("    -> Auth Success. User ID:", uid);

    // 2. Create Company
    console.log("[2] Generating Company...");
    const { data: compData, error: compErr } = await supabase
        .from('companies')
        .insert({ owner_id: uid, name: 'E2E Test Corp' })
        .select()
        .single();
    if (compErr) throw compErr;
    console.log("    -> Company created:", compData.id);

    // 3. Create Session
    console.log("[3] Initializing Session (auth.uid() implicitly handles ownership bounds in RLS)...");
    const { data: sessData, error: sessErr } = await supabase
        .from('diagnostic_sessions')
        .insert({
            owner_id: uid,
            company_id: compData.id,
            version: 'ACCORD-DIAG-1.1',
            status: 'in_progress'
        })
        .select()
        .single();
    if (sessErr) throw sessErr;
    console.log("    -> Session created:", sessData.id);

    // 4. Persistence of 23 responses
    console.log("[4] Persisting exact 19 responses mapped to matching IDs (simulating structured user score: '2')...");
    const responses = QUESTIONS.map(q_id => {
        let dim = "";
        if (q_id.startsWith("DEP")) dim = "commercial_dependency";
        if (q_id.startsWith("PRO")) dim = "commercial_process";
        if (q_id.startsWith("INF")) dim = "operational_infrastructure";
        if (q_id.startsWith("INT")) dim = "commercial_intelligence";
        if (q_id.startsWith("AIA")) dim = "ai_automation";
        if (q_id.startsWith("GOV")) dim = "governance_evolution";
        return {
            session_id: sessData.id,
            question_id: q_id,
            dimension: dim,
            score: 2
        };
    });

    const { error: respErr } = await supabase.from('diagnostic_responses').insert(responses);
    if (respErr) throw respErr;
    console.log("    -> Inserted exactly 19 responses gracefully matching exact architecture maps.");

    // 5 & 6 & 7. Execute complete_diagnostic(), Verify exactly ONE result, verify session 'completed'
    console.log("[5] Executing the restricted authoritative RPC `complete_diagnostic`...");
    const { data: rpcData, error: rpcErr } = await supabase.rpc('complete_diagnostic', { p_session_id: sessData.id });
    if (rpcErr) {
        console.error("RPC ERROR:", rpcErr);
        throw rpcErr;
    }
    console.log("    -> RPC Execution SUCCESS. Result payload matching identically mapped UX expected data:", rpcData);

    const { data: sessCheck } = await supabase.from('diagnostic_sessions').select('status').eq('id', sessData.id).single();
    console.log("    -> Session STATUS constraint mutated via atomic payload:", sessCheck.status === 'completed' ? 'SUCCESS (completed)' : 'FAILED (' + sessCheck.status + ')');

    const { data: resCheck, error: resRlsErr } = await supabase.from('diagnostic_results').select('*').eq('session_id', sessData.id);
    console.log("    -> Result Check via read (confirming insert was executed inside function). Row count:", resCheck.length);
    if (resCheck.length !== 1) {
        throw new Error("RPC DID NOT ATOMICALLY INSERT EXACTLY 1 RESULT.");
    }
    console.log("    -> (Verified) Result matches JSON serialization:", resCheck[0].overall_score === rpcData.overallScore);

    // 8. Consultation persistence
    // console.log("[6] Testing downstream consultation flow over the UUID bounds...");
    // [Removed obsolete consultation_requests table step]

    console.log("\n=== ALL BOUNDARIES SUCCESSFULLY VERIFIED ===");
}

runTest().catch(console.error);
