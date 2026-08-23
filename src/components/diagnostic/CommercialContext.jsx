import React, { useState } from 'react';
import './ContextStyles.css';

export default function CommercialContext({ onComplete, defaultValues = {} }) {
    const [data, setData] = useState({
        annual_revenue_range: defaultValues.annual_revenue_range || '',
        revenue_growth_pattern: defaultValues.revenue_growth_pattern || '',
        sales_team_size: defaultValues.sales_team_size || '',
        average_deal_size: defaultValues.average_deal_size || '',
        average_sales_cycle: defaultValues.average_sales_cycle || '',
    });

    const revRanges = ['<$1M', '$1M–$5M', '$5M–$25M', '$25M–$100M', '$100M–$500M', '$500M+', 'Prefer not to say'];
    const growthPatterns = ['Declining', 'Flat', 'Growing slowly', 'Growing consistently', 'Growing rapidly', 'Highly variable'];
    const teamSizes = ['1–5', '6–15', '16–50', '51–100', '101–500', '500+'];
    const dealSizes = ['<$10K', '$10K–$50K', '$50K–$250K', '$250K–$1M', '$1M+', 'Prefer not to say'];
    const cycles = ['<30 days', '1–3 months', '3–6 months', '6–12 months', '12+ months'];

    return (
        <div className="context-step">
            <div className="step-header">
                <span className="step-tag">01 // CONTEXT</span>
                <h2 className="step-title">Commercial Profile</h2>
            </div>

            <div className="form-group">
                <label className="form-label">Annual Revenue Range (Optional)</label>
                <select className="form-select" value={data.annual_revenue_range} onChange={e => setData({ ...data, annual_revenue_range: e.target.value })}>
                    <option value="">Select Revenue...</option>
                    {revRanges.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Revenue Growth Pattern (Optional)</label>
                <select className="form-select" value={data.revenue_growth_pattern} onChange={e => setData({ ...data, revenue_growth_pattern: e.target.value })}>
                    <option value="">Select Pattern...</option>
                    {growthPatterns.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Sales Team Size (Optional)</label>
                <select className="form-select" value={data.sales_team_size} onChange={e => setData({ ...data, sales_team_size: e.target.value })}>
                    <option value="">Select Size...</option>
                    {teamSizes.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Average Deal Size (Optional)</label>
                <select className="form-select" value={data.average_deal_size} onChange={e => setData({ ...data, average_deal_size: e.target.value })}>
                    <option value="">Select Size...</option>
                    {dealSizes.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Average Sales Cycle (Optional)</label>
                <select className="form-select" value={data.average_sales_cycle} onChange={e => setData({ ...data, average_sales_cycle: e.target.value })}>
                    <option value="">Select Cycle...</option>
                    {cycles.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
            </div>

            <div className="step-footer">
                <button
                    className={`btn-next`}
                    onClick={() => onComplete(data)}
                >
                    Confirm Profile
                </button>
            </div>
        </div>
    );
}
