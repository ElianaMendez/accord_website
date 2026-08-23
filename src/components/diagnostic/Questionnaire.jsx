import React, { useState, useEffect } from 'react';
import { QUESTIONS, DIMENSIONS } from '../../logic/diagnosticQuestions';
import './ContextStyles.css'; // Reusing layout styles where applicable
import './Questionnaire.css';

export default function Questionnaire({ onComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [responses, setResponses] = useState([]);
    const [selectedScore, setSelectedScore] = useState(null);

    const currentQuestion = QUESTIONS[currentIndex];
    const dimensionInfo = DIMENSIONS[currentQuestion.dimension];

    const handleSelect = (score) => {
        setSelectedScore(score);
    };

    const handleNext = () => {
        if (selectedScore === null) return;

        // Save response
        const newResponse = {
            questionId: currentQuestion.id,
            score: selectedScore
        };

        const updatedResponses = [...responses.filter(r => r.questionId !== currentQuestion.id), newResponse];
        setResponses(updatedResponses);

        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedScore(null);
        } else {
            // Completed, pass to parent
            onComplete(updatedResponses);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            // Pre-select if already answered
            const prevRes = responses.find(r => r.questionId === QUESTIONS[currentIndex - 1].id);
            setSelectedScore(prevRes ? prevRes.score : null);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            // 1-5 maps to score 0-4
            if (['1', '2', '3', '4', '5'].includes(e.key)) {
                const score = parseInt(e.key) - 1;
                handleSelect(score);
            }
            if (e.key === 'Enter' && selectedScore !== null) {
                handleNext();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedScore, currentIndex]);

    const progressPct = ((currentIndex + 1) / QUESTIONS.length) * 100;

    return (
        <div className="questionnaire-step">
            <div className="q-progress-bar">
                <div className="q-progress-fill" style={{ width: `${progressPct}%` }}></div>
            </div>

            <div className="step-header">
                <div className="q-meta">
                    <span className="step-tag">02 // CAPABILITY ANALYSIS</span>
                    <span className="q-counter">Q{currentIndex + 1} / {QUESTIONS.length}</span>
                </div>

                <div className="dimension-badge">
                    <span className="dim-tag">{currentQuestion.id.split('-')[0]}</span>
                    <span className="dim-name">{dimensionInfo.name}</span>
                </div>
            </div>

            <div className="q-body">
                <h2 className="q-text">{currentQuestion.question}</h2>

                <div className="answers-grid">
                    {currentQuestion.answers.map((ans, idx) => (
                        <div
                            key={ans.id}
                            className={`answer-card ${selectedScore === ans.score ? 'selected' : ''}`}
                            onClick={() => handleSelect(ans.score)}
                        >
                            <div className="answer-key">{idx + 1}</div>
                            <div className="answer-text">{ans.text}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="step-footer q-footer">
                <button className="btn-secondary" onClick={handlePrev} disabled={currentIndex === 0}>
                    [ Previous ]
                </button>
                <button
                    className={`btn-next ${selectedScore === null ? 'disabled' : ''}`}
                    onClick={handleNext}
                    disabled={selectedScore === null}
                >
                    {currentIndex === QUESTIONS.length - 1 ? 'Execute Analysis' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}
