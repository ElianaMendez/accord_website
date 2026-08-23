/**
 * Determines the systemic capability level based on overall score and strict system integrity guards.
 * @param {number} overallScore 0-100
 * @param {Object} dimensionScores Object containing normalizedScores for each dimension
 */
export function determineCapabilityLevel(overallScore, dimensionScores) {
    // Critical weakness threshold (e.g. 0-25)
    // Structured threshold (e.g. 50+)
    // Integrated boundary (e.g. 75+)

    const depScore = dimensionScores['commercial_dependency']?.normalizedScore || 0;
    const scores = Object.values(dimensionScores).map(d => d.normalizedScore);

    const numBelowStructured = scores.filter(s => s < 50).length;
    const numCriticallyLow = scores.filter(s => s <= 25).length;
    const numIntegratedOrAbove = scores.filter(s => s >= 75).length;

    // HERO-DEPENDENT: Overall score 0–25 AND/OR Commercial Dependency is critically low (<=25).
    if (overallScore <= 25 || depScore <= 25 || numCriticallyLow >= 3) {
        return 'HERO-DEPENDENT';
    }

    // FRAGMENTED: Overall score 26–45 OR multiple dimensions remain materially below structured capability (e.g. <50).
    if (overallScore <= 45 || numBelowStructured >= 3) {
        return 'FRAGMENTED';
    }

    // ADAPTIVE: Overall score 81–100 AND no dimension is critically low (<=25).
    if (overallScore >= 81 && numCriticallyLow === 0 && numBelowStructured === 0) {
        return 'ADAPTIVE';
    }

    // INTEGRATED: Overall score 66–80 with the majority of dimensions at or above 75 (3 out of 4).
    // AND no critical weaknesses allowed.
    if (overallScore >= 66 && numIntegratedOrAbove >= 4 && numCriticallyLow === 0) {
        return 'INTEGRATED';
    }

    // STRUCTURED: Fallback for 46–65 with majority of dimensions at or above the developing border.
    return 'STRUCTURED';
}
