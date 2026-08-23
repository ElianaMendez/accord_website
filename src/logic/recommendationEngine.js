export function getRecommendations(primaryVulnerability) {
    const recommendations = {
        'commercial_dependency': {
            focusArea: 'Institutionalize commercial capability.',
            interpretation: 'Critical commercial knowledge and execution remain too dependent on individual contributors and leadership intervention.',
            implication: 'The priority is to convert individual commercial knowledge into repeatable organizational capability.'
        },
        'commercial_process': {
            focusArea: 'Design the commercial operating process.',
            interpretation: 'The organization has commercial activity and experience, but execution varies across people, stages or functions.',
            implication: 'The priority is to establish an operating process that can be consistently executed, measured and improved.'
        },
        'operational_infrastructure': {
            focusArea: 'Build the commercial operating infrastructure.',
            interpretation: 'Critical information, workflows and systems are not sufficiently connected to support reliable execution.',
            implication: 'The priority is to establish infrastructure that makes commercial capability operationally repeatable.'
        },
        'commercial_intelligence': {
            focusArea: 'Build decision intelligence.',
            interpretation: 'Leadership has access to commercial information, but important signals and causes remain difficult to identify quickly.',
            implication: 'The priority is to connect commercial information to the decisions that determine growth.'
        },
        'ai_automation': {
            focusArea: 'Integrate intelligence into the operating system.',
            interpretation: 'AI and automation may already be creating value, but their impact remains dependent on isolated use cases or individual adoption.',
            implication: 'The priority is not simply greater AI adoption, but integration of intelligence into the organization\'s operating architecture.'
        },
        'governance_evolution': {
            focusArea: 'Establish the evolution loop.',
            interpretation: 'Commercial capability exists, but the mechanisms required to continuously maintain, learn from and improve it remain underdeveloped.',
            implication: 'The priority is to make continuous improvement part of the operating system rather than dependent on individual initiative.'
        },
        'none': {
            focusArea: 'Continuous systemic optimization.',
            interpretation: 'The organization demonstrates strong structural capability across all dimensions.',
            implication: 'The priority is continuous refinement and scaling of the existing architecture.'
        }
    };

    return recommendations[primaryVulnerability] || recommendations['none'];
}
