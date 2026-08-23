import { DIAGNOSTIC_VERSION } from './diagnosticQuestions';
import { supabase } from './supabaseClient';

/**
 * Persistence layer for Diagnostic state and remote storage.
 */
const STORAGE_KEY = 'accord_diagnostic_session';

export function getLocalSession() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error("Local storage error", e);
        return null;
    }
}

export function saveLocalSession(sessionData) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
    } catch (e) {
        console.error("Local storage error", e);
    }
}

export function clearLocalSession() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error("Local storage error", e);
    }
}

export async function recoverRemoteSession(session) {
    // Rely on Supabase Auth maintaining state silently in standard scenarios
    const { data: authData } = await supabase.auth.getSession();
    const userId = authData?.session?.user?.id;
    if (!userId) return null;

    // Test if we have remote truth bridging our local ID
    if (session && session.diagnosticId) {
        const { data, error } = await supabase
            .from('diagnostic_sessions')
            .select('*')
            .eq('id', session.diagnosticId)
            .eq('owner_id', userId)
            .single();

        if (!error && data) {
            return session;
        }
    }
    return session;
}

export async function initializeDiagnostic() {
    console.log("[E2E TRACE] initializeDiagnostic() STARTED");
    // 1. Authenticate Anonymously - strict creation of `auth.users(id)` and JWT.
    const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
    if (authError) {
        console.error("[E2E TRACE] Anonymous Auth FAILURE:", JSON.stringify(authError, null, 2));
    } else {
        console.log("[E2E TRACE] Anonymous Auth SUCCESS:", authData);
    }
    const userId = authData?.user?.id;

    const urlParams = new URLSearchParams(window.location.search);
    const acquisitionData = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_content: urlParams.get('utm_content'),
        utm_term: urlParams.get('utm_term'),
        referrer: document.referrer,
        landing_page: window.location.pathname
    };

    const newSession = {
        diagnosticId: crypto.randomUUID(),
        ownerId: userId,
        diagnosticVersion: DIAGNOSTIC_VERSION,
        status: 'started',
        startedAt: new Date().toISOString(),
        completedAt: null,
        companyContext: {},
        commercialContext: {},
        executiveContext: {},
        strategicContext: {},
        responses: [],
        acquisitionData,
        events: [
            { event_type: 'diagnostic_started', timestamp: new Date().toISOString() }
        ]
    };

    saveLocalSession(newSession);

    try {
        if (userId) {
            console.log(`[E2E TRACE] Attempting insert into diagnostic_sessions... [id: ${newSession.diagnosticId}]`);
            const payload = {
                id: newSession.diagnosticId,
                owner_id: userId,
                version: newSession.diagnosticVersion,
                status: newSession.status,
                started_at: newSession.startedAt,
                utm_source: acquisitionData.utm_source,
                utm_medium: acquisitionData.utm_medium,
                utm_campaign: acquisitionData.utm_campaign
            };
            const { data, error } = await supabase.from('diagnostic_sessions').insert([payload]).select();
            if (error) {
                console.error("[E2E TRACE] diagnostic_sessions INSERT FAILURE:", JSON.stringify(error, null, 2));
                console.error("Payload was:", payload);
            } else {
                console.log("[E2E TRACE] diagnostic_sessions INSERT SUCCESS:", data);
            }
        }
    } catch (e) {
        console.warn("[E2E TRACE] Backend uncontactable. Utilizing local state.", e);
    }

    return newSession;
}

export async function updateDiagnosticState(sessionId, key, value) {
    console.log(`[E2E TRACE] updateDiagnosticState() KEY: ${key}`);
    const session = getLocalSession();
    if (session && session.diagnosticId === sessionId) {
        session[key] = value;
        session.status = 'in_progress';
        saveLocalSession(session);

        const updates = {};
        if (key === 'companyContext') {
            const cId = crypto.randomUUID();
            if (session.ownerId) {
                const payload = {
                    id: cId,
                    owner_id: session.ownerId,
                    name: value.company_name,
                    // removed website, business_model, company_size to avoid column errors
                    industry: value.industry
                };
                console.log("[E2E TRACE] Attempting companies INSERT:", payload);
                const { data, error } = await supabase.from('companies').insert([payload]);
                if (error) {
                    console.error("[E2E TRACE] companies INSERT FAILURE:", JSON.stringify(error, null, 2));
                } else {
                    console.log("[E2E TRACE] companies INSERT SUCCESS:", data);
                    updates.company_id = cId;
                }
            }
        }
        if (key === 'executiveContext') {
            updates.executive_first_name = value.first_name;
            updates.executive_last_name = value.last_name;
            updates.executive_email = value.email;
            updates.executive_job_title = value.job_title;
        }
        if (key === 'commercialContext') {
            updates.annual_revenue_range = value.annual_revenue_range;
            updates.revenue_growth_pattern = value.revenue_growth_pattern;
            updates.sales_team_size = value.sales_team_size;
            updates.average_deal_size = value.average_deal_size;
            updates.average_sales_cycle = value.average_sales_cycle;
        }
        if (key === 'strategicContext') {
            updates.strategic_primary_barrier = value.primary_barrier;
            updates.strategic_priority = value.strategic_priority;
        }
        if (key === 'responses') {
            const mappedResponses = value.map(r => {
                let trueDim = "commercial_dependency";
                if (r.questionId.startsWith("PRO")) trueDim = "commercial_process";
                else if (r.questionId.startsWith("INF")) trueDim = "operational_infrastructure";
                else if (r.questionId.startsWith("INT")) trueDim = "commercial_intelligence";
                else if (r.questionId.startsWith("AIA")) trueDim = "ai_automation";
                else if (r.questionId.startsWith("GOV")) trueDim = "governance_evolution";

                return {
                    session_id: sessionId,
                    question_id: r.questionId,
                    dimension: trueDim,
                    score: r.score
                };
            });
            if (session.ownerId) {
                console.log("[E2E TRACE] Attempting diagnostic_responses INSERT:", mappedResponses);
                const { data, error } = await supabase.from('diagnostic_responses').insert(mappedResponses);
                if (error) {
                    console.error("[E2E TRACE] diagnostic_responses INSERT FAILURE:", JSON.stringify(error, null, 2));
                } else {
                    console.log("[E2E TRACE] diagnostic_responses INSERT SUCCESS");
                }
            }
        }

        try {
            if (Object.keys(updates).length > 0 && session.ownerId) {
                console.log("[E2E TRACE] Attempting diagnostic_sessions UPDATE:", updates);
                const { data, error } = await supabase.from('diagnostic_sessions').update(updates).eq('id', sessionId);
                if (error) {
                    console.error("[E2E TRACE] diagnostic_sessions UPDATE FAILURE:", JSON.stringify(error, null, 2));
                } else {
                    console.log("[E2E TRACE] diagnostic_sessions UPDATE SUCCESS");
                }
            }
        } catch (e) {
            console.warn("[E2E TRACE] Backend sync failed.", e);
        }
    }
}

export async function logEvent(sessionId, eventType, metadata = {}) {
    const session = getLocalSession();
    if (session && session.diagnosticId === sessionId) {
        session.events.push({ event_type: eventType, timestamp: new Date().toISOString(), metadata });
        saveLocalSession(session);
    }
}

export async function completeDiagnostic(sessionId) {
    console.log(`[E2E TRACE] completeDiagnostic() STARTED for sessionId: ${sessionId}`);
    const session = getLocalSession();
    if (session && session.diagnosticId === sessionId) {
        if (!session.ownerId) {
            console.warn("[E2E TRACE] Cannot complete session without ownership.");
            throw new Error("Diagnostic owner missing.");
        }

        try {
            console.log("[E2E TRACE] Invoking RPC complete_diagnostic...");
            // Invoking the Authoritative Source of Truth in Postgres
            const { data, error } = await supabase.rpc('complete_diagnostic', { p_session_id: sessionId });

            if (error) {
                console.error("[E2E TRACE] RPC FAILURE:", JSON.stringify(error, null, 2));
                throw error;
            }

            console.log("[E2E TRACE] RPC SUCCESS. Data returned:", data);

            session.status = 'completed';
            session.completedAt = new Date().toISOString();
            session.result = data; // Persist the true server-dictated object
            saveLocalSession(session);

            return data;
        } catch (e) {
            console.error("[E2E TRACE] Backend completion failed entirely.", e);
            throw e;
        }
    }
}

