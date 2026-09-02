import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QUESTIONS, DIMENSIONS } from '../../logic/diagnosticQuestions';
import { getLocalSession, updateDiagnosticState } from '../../logic/diagnosticStorage';
import './ContextStyles.css'; // Reusing layout styles where applicable
import './Questionnaire.css';

export default function Questionnaire({ onComplete, sessionId }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currN = parseInt(searchParams.get('n')) || 1;
    const currentIndex = currN - 1;

    const [responses, setResponses] = useState(() => {
        const session = getLocalSession();
        return (session && session.localResponses) ? session.localResponses : [];
    });
    const [selectedScore, setSelectedScore] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentQuestion = QUESTIONS[currentIndex];
    const dimensionInfo = DIMENSIONS[currentQuestion.dimension];
    const capIndex = Object.keys(DIMENSIONS).indexOf(currentQuestion.dimension) + 1;

    const handleSelect = (score) => {
        setSelectedScore(score);
    };

    useEffect(() => {
        const alreadyAnswered = responses.find(r => r.questionId === currentQuestion.id);
        setSelectedScore(alreadyAnswered ? alreadyAnswered.score : null);
    }, [currN, currentQuestion.id, responses]);

    const handleNext = async () => {
        if (selectedScore === null || isSubmitting) return;
        setIsSubmitting(true);

        try {
            const newResponse = {
                questionId: currentQuestion.id,
                score: selectedScore
            };

            // STRICT NETWORK-FIRST SEQUENCING
            await updateDiagnosticState(sessionId, 'singleResponse', newResponse);
            await updateDiagnosticState(sessionId, 'frontendProgress', 'q' + currN);

            const updatedResponses = [...responses.filter(r => r.questionId !== currentQuestion.id), newResponse];
            setResponses(updatedResponses);
            await updateDiagnosticState(sessionId, 'localResponses', updatedResponses);

            if (currentIndex < QUESTIONS.length - 1) {
                setSearchParams({ step: 'questionnaire', n: (currN + 1).toString() });
            } else {
                onComplete(updatedResponses);
            }
        } catch (error) {
            console.error("Failed to commit response securely. Aborting navigation.", error);
            // UI remains on current question
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setSearchParams({ step: 'questionnaire', n: (currN - 1).toString() });
        } else {
            setSearchParams({ step: 'strategic_context' });
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

            <div className="diagnostic-grid-container">
                {/* LEFT ZONE: METHODOLOGY */}
                <div className="methodology-zone">
                    <div className="capability-section">
                        <div className="capability-anchor">
                            0{capIndex}
                        </div>
                        <div className="capability-content">
                            <div className="q-meta">
                                <span className="step-tag">CAPABILITY 0{capIndex} / 06</span>
                            </div>
                            <h2 className="capability-name">
                                {dimensionInfo.name}
                            </h2>
                        </div>
                    </div>

                    <div className="capability-statement">
                        {dimensionInfo.statement}
                    </div>
                </div>

                {/* RIGHT ZONE: EVALUATION */}
                <div className="evaluation-zone">
                    <div className="q-meta diagnostic-signal">
                        <span className="step-tag" style={{ color: 'var(--text-tertiary)' }}>DIAGNOSTIC SIGNAL</span>
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
                        <button className="q-btn-prev" onClick={handlePrev} disabled={isSubmitting}>
                            [ ANTERIOR ]
                        </button>
                        <button
                            className={`q-btn-next ${selectedScore === null || isSubmitting ? 'disabled' : ''}`}
                            onClick={handleNext}
                            disabled={selectedScore === null || isSubmitting}
                        >
                            {currentIndex === QUESTIONS.length - 1 ? 'EJECUTAR ANÁLISIS →' : 'SIGUIENTE →'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
