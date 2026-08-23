import React, { useState } from 'react';
import './ContextStyles.css';

const INDUSTRIES = [
    'Technology / Software', 'Financial Services', 'Professional Services',
    'Manufacturing', 'Healthcare', 'Energy', 'Logistics / Transportation',
    'Construction / Real Estate', 'Telecommunications', 'Business Services', 'Other'
];
const MODELS = ['B2B', 'B2B2C', 'Enterprise', 'Professional Services', 'Other'];
const SIZES = ['1–10', '11–50', '51–200', '201–500', '501–1,000', '1,001–5,000', '5,000+'];

export default function CompanyContext({ onComplete, defaultValues = {} }) {
    const [data, setData] = useState({
        company_name: defaultValues.company_name || '',
        website: defaultValues.website || '',
        industry: defaultValues.industry || '',
        industry_other: defaultValues.industry_other || '',
        business_model: defaultValues.business_model || '',
        company_size: defaultValues.company_size || '',
    });

    const isComplete = data.company_name && data.industry && data.business_model && data.company_size;

    return (
        <div className="context-step">
            <div className="step-header">
                <span className="step-tag">01 // CONTEXT</span>
                <h2 className="step-title">Company Profile</h2>
            </div>

            <div className="form-group">
                <label className="form-label">Company Name</label>
                <input
                    className="form-input"
                    value={data.company_name}
                    onChange={e => setData({ ...data, company_name: e.target.value })}
                    placeholder="Acme Corp"
                />
            </div>

            <div className="form-group">
                <label className="form-label">Website (Optional)</label>
                <input
                    className="form-input"
                    value={data.website}
                    onChange={e => setData({ ...data, website: e.target.value })}
                    placeholder="acme.com"
                />
            </div>

            <div className="form-group">
                <label className="form-label">Industry</label>
                <select className="form-select" value={data.industry} onChange={e => setData({ ...data, industry: e.target.value })}>
                    <option value="">Select Industry...</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
            </div>

            {data.industry === 'Other' && (
                <div className="form-group">
                    <label className="form-label">Specify Industry</label>
                    <input className="form-input" value={data.industry_other} onChange={e => setData({ ...data, industry_other: e.target.value })} />
                </div>
            )}

            <div className="form-group">
                <label className="form-label">Primary Business Model</label>
                <select className="form-select" value={data.business_model} onChange={e => setData({ ...data, business_model: e.target.value })}>
                    <option value="">Select Model...</option>
                    {MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Company Size</label>
                <select className="form-select" value={data.company_size} onChange={e => setData({ ...data, company_size: e.target.value })}>
                    <option value="">Select Size...</option>
                    {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            <div className="step-footer">
                <button
                    className={`btn-next ${!isComplete ? 'disabled' : ''}`}
                    onClick={() => isComplete && onComplete(data)}
                    disabled={!isComplete}
                >
                    Confirm Context
                </button>
            </div>
        </div>
    );
}
