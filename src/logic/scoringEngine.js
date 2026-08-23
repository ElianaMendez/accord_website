/**
 * ACCORD SCORING ENGINE (Presentation Layer - Presentation/Preview Only)
 * 
 * ==============================================================================
 * ARCHITECTURAL NOTICE (v2.2):
 * This JavaScript engine is retained strictly for local preview, structural 
 * reference, or client-side interpolation. IT IS NOT THE SOURCE OF TRUTH.
 * 
 * The authoritative production calculations are executed securely within the 
 * PostgreSQL environment via the `complete_diagnostic` RPC, ensuring that
 * capability boundaries and overall scores are cryptographically bound to the 
 * UUID owner without tampered payloads. 
 * ==============================================================================
 */
import { DIMENSIONS, QUESTIONS } from './diagnosticQuestions';

/**
 * Calculates raw and normalized dimension scores and the overall systemic capability score.
 * @param {Array<{questionId: string, score: number}>} responses
 */
export function calculateScores(responses) {
    // Group responses by dimension
    const dimensionTotals = {};
    const dimensionCounts = {};

    // Initialize
    Object.keys(DIMENSIONS).forEach(key => {
        dimensionTotals[key] = 0;
        dimensionCounts[key] = 0;
    });

    // Sum raw scores
    responses.forEach(response => {
        const question = QUESTIONS.find(q => q.id === response.questionId);
        if (!question) return;
        const dim = question.dimension;
        dimensionTotals[dim] += response.score;
        dimensionCounts[dim] += 1;
    });

    const dimensionScores = {};
    let overallScoreRaw = 0;

    Object.keys(DIMENSIONS).forEach(key => {
        const dimDef = DIMENSIONS[key];
        const avg = dimensionCounts[key] > 0 ? dimensionTotals[key] / dimensionCounts[key] : 0;
        // Normalize to 0-100 (since max score per question is 4)
        const normalizedScore = (avg / 4) * 100;
        dimensionScores[key] = {
            normalizedScore: Math.round(normalizedScore),
            rawAverage: avg
        };

        overallScoreRaw += (normalizedScore * dimDef.weight);
    });

    return {
        dimensionScores,
        overallScore: Math.round(overallScoreRaw)
    };
}
