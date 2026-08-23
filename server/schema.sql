-- Database Schema for ACCORD Diagnostic

CREATE TABLE IF NOT EXISTS companies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    website TEXT,
    industry TEXT,
    business_model TEXT,
    company_size TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS diagnostic_sessions (
    id TEXT PRIMARY KEY,
    company_id TEXT NOT NULL,
    version TEXT NOT NULL,
    status TEXT NOT NULL,
    executive_first_name TEXT,
    executive_last_name TEXT,
    executive_email TEXT,
    executive_job_title TEXT,
    strategic_primary_barrier TEXT,
    strategic_priority TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE IF NOT EXISTS diagnostic_responses (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    question_id TEXT NOT NULL,
    dimension TEXT NOT NULL,
    score INTEGER NOT NULL,
    FOREIGN KEY (session_id) REFERENCES diagnostic_sessions(id)
);

CREATE TABLE IF NOT EXISTS diagnostic_results (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL UNIQUE,
    overall_score INTEGER NOT NULL,
    capability_level TEXT NOT NULL,
    primary_vulnerability TEXT NOT NULL,
    secondary_signal TEXT,
    systemic_pattern TEXT,
    recommended_focus TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES diagnostic_sessions(id)
);

CREATE TABLE IF NOT EXISTS consultation_requests (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    job_title TEXT,
    phone TEXT,
    additional_context TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES diagnostic_sessions(id)
);
