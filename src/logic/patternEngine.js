export function detectSystemicPattern(dimensionScores) {
    // Patterns must be based on explicit dimension thresholds
    const dep = dimensionScores['commercial_dependency']?.normalizedScore || 0;
    const pro = dimensionScores['commercial_process']?.normalizedScore || 0;
    const inf = dimensionScores['operational_infrastructure']?.normalizedScore || 0;
    const int = dimensionScores['commercial_intelligence']?.normalizedScore || 0;
    const gov = dimensionScores['governance_evolution']?.normalizedScore || 0;

    if (dep < 50) {
        return {
            pattern: 'hero_dependency',
            description: 'The organization relies on individual heroics rather than structural capability. Growth is bottlenecked by the bandwidth of key individuals.'
        };
    }

    if (pro < 50) {
        return {
            pattern: 'process_variability',
            description: 'Commercial execution varies significantly between individuals, creating inconsistent results and unpredictable forecasts.'
        };
    }

    if (inf < 50) {
        return {
            pattern: 'operational_friction',
            description: 'The underlying infrastructure introduces friction rather than leverage, requiring manual intervention to sustain commercial activity.'
        };
    }

    if (int < 50) {
        return {
            pattern: 'limited_intelligence',
            description: 'Leadership lacks the structured visibility required to proactively identify risks and optimize systemic performance.'
        };
    }

    if (gov < 50) {
        return {
            pattern: 'weak_evolution_loop',
            description: 'The organization lacks the mechanisms to systematically capture learning and evolve its commercial capability over time.'
        };
    }

    return null;
}
