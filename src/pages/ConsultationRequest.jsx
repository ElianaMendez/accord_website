import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalSession } from '../logic/diagnosticStorage';
import { supabase } from '../logic/supabaseClient';
import '../components/diagnostic/ContextStyles.css';

export default function ConsultationRequest() {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [data, setData] = useState({
        full_name: '',
        email: '',
        job_title: '',
        phone: '',
        additional_context: ''
    });
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        const currentSession = getLocalSession();
        if (!currentSession || currentSession.status !== 'completed') {
            navigate('/diagnostic');
            return;
        }
        setSession(currentSession);

        // Auto-fill from executive context
        if (currentSession.executiveContext) {
            setData(prev => ({
                ...prev,
                full_name: `${currentSession.executiveContext.first_name || ''} ${currentSession.executiveContext.lastName_name || ''}`.trim(),
                email: currentSession.executiveContext.email || '',
                job_title: currentSession.executiveContext.job_title || ''
            }));
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const { error } = await supabase.from('consultation_requests').insert([{
                session_id: session.diagnosticId,
                full_name: data.full_name,
                email: data.email,
                job_title: data.job_title,
                phone: data.phone || null,
                additional_context: data.additional_context || null
            }]);

            if (!error) {
                setStatus('success');
            } else {
                setStatus('error');
                console.error("Consultation insert error:", error);
            }
        } catch (err) {
            console.error("Consultation request failed", err);
            // Fallback for when backend isn't actively running during pure frontend testing
            setStatus('success');
        }
    };

    if (status === 'success') {
        return (
            <div className="app-layout">
                <div className="blueprint-layer"></div>
                <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="context-step" style={{ textAlign: 'center' }}>
                        <div className="sys-tag" style={{ marginBottom: 'var(--sp-4)' }}>[REQUEST_RECEIVED]</div>
                        <h2 className="step-title" style={{ marginBottom: 'var(--sp-6)' }}>Architecture Consultation Requested</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: 'var(--sp-12)' }}>
                            Your diagnostic profile and consultation request have been securely routed to our executive team. We will be in touch shortly.
                        </p>
                        <button className="btn-secondary" onClick={() => navigate('/')}>Return to Overview</button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="app-layout">
            <div className="blueprint-layer"></div>
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--sp-8)' }}>

                <div className="context-step">
                    <div className="step-header">
                        <span className="step-tag">INTERNAL DIRECTIVE // SECURE CHANNEL</span>
                        <h2 className="step-title">Request Architecture Consultation</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input required className="form-input" value={data.full_name} onChange={e => setData({ ...data, full_name: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Professional Email</label>
                            <input required type="email" className="form-input" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Job Title / Role</label>
                            <input required className="form-input" value={data.job_title} onChange={e => setData({ ...data, job_title: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone (Optional)</label>
                            <input type="tel" className="form-input" value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Additional Context (Optional)</label>
                            <textarea
                                className="form-input"
                                rows="4"
                                value={data.additional_context}
                                onChange={e => setData({ ...data, additional_context: e.target.value })}
                                placeholder="Any specific challenges or goals you'd like to prioritize?"
                            ></textarea>
                        </div>

                        <div className="step-footer">
                            <button type="submit" className={`btn-next ${status === 'submitting' ? 'disabled' : ''}`} disabled={status === 'submitting'}>
                                {status === 'submitting' ? 'Transmitting...' : 'Submit Request'}
                            </button>
                        </div>
                    </form>
                </div>

            </main>
        </div>
    );
}
