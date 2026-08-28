import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ContextStyles.css';

export default function StrategicContext({ onComplete, defaultValues = {} }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState({
        primary_barrier: defaultValues.primary_barrier || '',
        strategic_priority: defaultValues.strategic_priority || '',
    });

    const barriers = [
        'Generating enough qualified pipeline',
        'Converting pipeline into revenue consistently',
        'Dependence on founders/key individuals to close deals',
        'Inconsistent execution across the sales team',
        'Retaining and expanding existing accounts',
        'Lack of reliable data to make decisions',
        'Other'
    ];

    const priorities = [
        'Accelerate revenue growth',
        'Improve team consistency and win rates',
        'Systematize operations for scale/exit',
        'Reduce cost of acquisition / improve efficiency',
        'Successfully launch new products/markets',
        'Other'
    ];

    const isComplete = data.primary_barrier && data.strategic_priority;

    return (
        <div className="context-step">
            <div className="step-header">
                <span className="step-tag">01 // CONTEXT</span>
                <h2 className="step-title">Strategic Context</h2>
            </div>

            <div className="form-group">
                <label className="form-label">What is the primary barrier to expanding commercial growth?</label>
                <div className="radio-group">
                    {barriers.map(b => (
                        <label key={b} className={`radio-label ${data.primary_barrier === b ? 'selected' : ''}`}>
                            <input type="radio" className="radio-input" name="barrier" value={b} checked={data.primary_barrier === b} onChange={e => setData({ ...data, primary_barrier: e.target.value })} />
                            <span className="radio-text">{b}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">What is the primary commercial priority for the next 12 months?</label>
                <div className="radio-group">
                    {priorities.map(p => (
                        <label key={p} className={`radio-label ${data.strategic_priority === p ? 'selected' : ''}`}>
                            <input type="radio" className="radio-input" name="priority" value={p} checked={data.strategic_priority === p} onChange={e => setData({ ...data, strategic_priority: e.target.value })} />
                            <span className="radio-text">{p}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="step-footer">
                <button className="btn-secondary" onClick={() => setSearchParams({ step: 'executive_context' })}>
                    [ Previous ]
                </button>
                <button
                    className={`btn-next ${!isComplete ? 'disabled' : ''}`}
                    onClick={() => isComplete && onComplete(data)}
                    disabled={!isComplete}
                >
                    Initialize Analysis
                </button>
            </div>
        </div>
    );
}
