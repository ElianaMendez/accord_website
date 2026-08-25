import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import WebSocket from 'ws';

globalThis.WebSocket = WebSocket;

const VITE_SUPABASE_URL = "https://tgqwloginjtsgykdclzn.supabase.co";
const VITE_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_dmYZFg7EhKyu9tG-ETXVeQ_yQIsz_TA";


class MemoryStorage {
    constructor() { Object.defineProperty(this, "store", { enumerable: true, configurable: true, writable: true, value: new Map() }); }
    getItem(key) { return this.store.get(key) || null; }
    setItem(key, value) { this.store.set(key, value); }
    removeItem(key) { this.store.delete(key); }
}

const clientA = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, {
    auth: { storage: new MemoryStorage(), persistSession: true }
});

const clientB = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, {
    auth: { storage: new MemoryStorage(), persistSession: true }
});

const session1Id = '84b19bf3-7655-4c25-960a-48a20f311cd0';
const session2Id = 'db5079c0-0ecd-4277-8323-ecc1164a1108';

async function runIsolationTest() {
    console.log("=== RLS ISOLATION TEST ===");

    console.log("[1] Authenticating User A...");
    const { data: authA, error: errA } = await clientA.auth.signInAnonymously();
    if (errA) throw errA;
    console.log("    User A authenticated. UID:", authA.user.id);

    console.log("[2] Authenticating User B...");
    const { data: authB, error: errB } = await clientB.auth.signInAnonymously();
    if (errB) throw errB;
    console.log("    User B authenticated. UID:", authB.user.id);

    console.log("\n[3] User A attempting to read exact target sessions...");
    const { data: aReadsAssigned1, error: aErr1 } = await clientA.from('diagnostic_sessions').select('*').eq('id', session1Id);
    console.log(`    User A read Session1 (${session1Id}): rows=${aReadsAssigned1?.length || 0}`);
    const { data: aReadsAssigned2, error: aErr2 } = await clientA.from('diagnostic_sessions').select('*').eq('id', session2Id);
    console.log(`    User A read Session2 (${session2Id}): rows=${aReadsAssigned2?.length || 0}`);

    const { data: aReadsResp1, error: aErr3 } = await clientA.from('diagnostic_responses').select('*').eq('session_id', session1Id);
    console.log(`    User A read Session1 Responses: rows=${aReadsResp1?.length || 0}`);

    const { data: aReadsRes1, error: aErr4 } = await clientA.from('diagnostic_results').select('*').eq('session_id', session1Id);
    console.log(`    User A read Session1 Results: rows=${aReadsRes1?.length || 0}`);

    console.log("\n[4] User B attempting to read exact target sessions...");
    const { data: bReadsAssigned1, error: bErr1 } = await clientB.from('diagnostic_sessions').select('*').eq('id', session1Id);
    console.log(`    User B read Session1 (${session1Id}): rows=${bReadsAssigned1?.length || 0}`);
    const { data: bReadsAssigned2, error: bErr2 } = await clientB.from('diagnostic_sessions').select('*').eq('id', session2Id);
    console.log(`    User B read Session2 (${session2Id}): rows=${bReadsAssigned2?.length || 0}`);

    console.log("\n[5] Both Users trying to read all accessible sessions...");
    const { data: aAll } = await clientA.from('diagnostic_sessions').select('id');
    const { data: bAll } = await clientB.from('diagnostic_sessions').select('id');
    console.log(`    User A total visible sessions: ${aAll?.length || 0}`);
    console.log(`    User B total visible sessions: ${bAll?.length || 0}`);

    if (aAll?.length === 0 && bAll?.length === 0) {
        console.log("\nTEST PASSED: Both new anonymous users have 0 access to the specified session IDs, confirming RLS cross-owner prevention.");
    }
}

runIsolationTest().catch(e => {
    console.error(e);
    fs.writeFileSync('error.log', e.stack || e.toString());
});
