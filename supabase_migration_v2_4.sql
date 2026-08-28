-- ACCORD SUPABASE SCHEMA & RLS POLICIES v2.4 (Diagnostic Responses UPSERT Fix)
-- Target: PostgreSQL / Supabase
-- Description: Adds an UPDATE RLS policy to diagnostic_responses
--              to allow legitimate .upsert() operations for the same authenticated session.

-- 1. Create the missing RLS Update policy explicitly tying to session ownership
CREATE POLICY "Auth owner can update own responses" ON diagnostic_responses FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM diagnostic_sessions s
    WHERE s.id = diagnostic_responses.session_id
      AND s.owner_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM diagnostic_sessions s
    WHERE s.id = session_id
      AND s.owner_id = auth.uid()
  )
);
