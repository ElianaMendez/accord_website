import assert from 'assert';

let isStarting = false;
let initializeDiagnosticInvocations = 0;

// Mock the backend initialization which takes time
async function mockInitializeDiagnostic() {
    initializeDiagnosticInvocations++;
    return new Promise(resolve => setTimeout(() => resolve({ diagnosticId: 'mock-uuid' }), 200));
}

// Replica of Diagnostic.jsx handleStart with the new isStarting lock
async function handleStart() {
    if (isStarting) {
        console.log("[UI Guard] Click intercepted: Already initializing...");
        return;
    }
    isStarting = true;
    try {
        await mockInitializeDiagnostic();
    } finally {
        isStarting = false;
    }
}

async function runTest() {
    console.log("=== DOUBLE INITIALIZATION RACE CONDITION TEST ===");
    console.log("Simulating rapid double-click on 'Begin Diagnostic' button...\n");

    // Firing two clicks concurrently (representing a user double-clicking before the first finishes)
    const click1 = handleStart();
    const click2 = handleStart();
    const click3 = handleStart(); // Why not triple click?

    await Promise.all([click1, click2, click3]);

    console.log(`\nFinal Invocations of initializeDiagnostic(): ${initializeDiagnosticInvocations}`);

    if (initializeDiagnosticInvocations === 1) {
        console.log("TEST PASSED: Race condition successfully blocked by isStarting lock.");
    } else {
        console.log("TEST FAILED: Multiple invocations occurred.");
        process.exit(1);
    }
}

runTest().catch(console.error);
