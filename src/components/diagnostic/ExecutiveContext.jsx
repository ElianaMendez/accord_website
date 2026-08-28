import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ContextStyles.css';

export default function ExecutiveContext({ onComplete, defaultValues = {} }) {
    const [, setSearchParams] = useSearchParams();
    const [data, setData] = useState({
        first_name: defaultValues.first_name || '',
        last_name: defaultValues.last_name || '',
        email: defaultValues.email || '',
        job_title: defaultValues.job_title || '',
    });

    const isComplete = data.first_name && data.last_name && data.email && data.job_title;

    return (
        <div className="context-step">
            <div className="step-header">
                <span className="step-tag">01 // CONTEXT</span>
                <h2 className="step-title">Executive Profile</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
                <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input className="form-input" value={data.first_name} onChange={e => setData({ ...data, first_name: e.target.value })} />
                </div>
                <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input className="form-input" value={data.last_name} onChange={e => setData({ ...data, last_name: e.target.value })} />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Professional Email</label>
                <input type="email" className="form-input" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
            </div>

            <div className="form-group">
                <label className="form-label">Job Title</label>
                <input className="form-input" value={data.job_title} onChange={e => setData({ ...data, job_title: e.target.value })} placeholder="e.g. CEO, VP of Sales, CRO" />
            </div>

            <div className="step-footer">
                <button className="btn-secondary" onClick={() => setSearchParams({ step: 'commercial_context' })}>
                    [ Previous ]
                </button>
                <button
                    className={`btn-next ${!isComplete ? 'disabled' : ''}`}
                    onClick={() => isComplete && onComplete(data)}
                    disabled={!isComplete}
                >
                    Confirm Details
                </button>
            </div>
        </div>
    );
}
