export const DIAGNOSTIC_VERSION = "ACCORD-DIAG-1.1";

export const DIMENSIONS = {
    commercial_dependency: { id: "commercial_dependency", name: "Commercial Dependency", weight: 0.20, statement: "El crecimiento sostenible no debería depender de unas pocas personas clave." },
    commercial_process: { id: "commercial_process", name: "Commercial Process", weight: 0.20, statement: "Un sistema comercial sólido convierte la ejecución en un proceso predecible y repetible." },
    operational_infrastructure: { id: "operational_infrastructure", name: "Operational Infrastructure", weight: 0.20, statement: "Los sistemas, datos y procesos deben funcionar como una infraestructura comercial integrada." },
    commercial_intelligence: { id: "commercial_intelligence", name: "Commercial Intelligence", weight: 0.15, statement: "La información comercial debe convertirse rápidamente en decisiones que protejan y expandan el crecimiento." },
    ai_automation: { id: "ai_automation", name: "AI & Automation", weight: 0.10, statement: "La tecnología y la inteligencia artificial deben ampliar la capacidad de la organización, no añadir complejidad." },
    governance_evolution: { id: "governance_evolution", name: "Governance & Evolution", weight: 0.15, statement: "Un sistema comercial debe ser capaz de aprender, mejorar y adaptarse continuamente." }
};

export const QUESTIONS = [
    // DIMENSION 1 — COMMERCIAL DEPENDENCY
    {
        id: "DEP-01",
        version: "1.1",
        dimension: "commercial_dependency",
        question: "Si uno de sus mejores vendedores se fuera mañana, ¿cuánto de su conocimiento comercial crítico seguiría siendo accesible para la organización?",
        answers: [
            { id: "DEP-01-0", score: 0, text: "Muy poco. La mayoría del conocimiento existe en su experiencia, relaciones y métodos personales." },
            { id: "DEP-01-1", score: 1, text: "Existe algo de información, pero un conocimiento significativo se iría con él." },
            { id: "DEP-01-2", score: 2, text: "La información clave está documentada, pero el contexto importante aún depende del individuo." },
            { id: "DEP-01-3", score: 3, text: "La mayor parte del conocimiento crítico está documentado y accesible a través de sistemas y procesos compartidos." },
            { id: "DEP-01-4", score: 4, text: "El conocimiento comercial se captura, comparte e incorpora sistemáticamente y de manera continua en el sistema operativo." }
        ]
    },
    {
        id: "DEP-02",
        version: "1.1",
        dimension: "commercial_dependency",
        question: "¿Qué tan dependiente es la generación de ingresos del CEO, fundador o un número pequeño de líderes sénior?",
        answers: [
            { id: "DEP-02-0", score: 0, text: "Están directamente involucrados en muchas oportunidades y relaciones importantes." },
            { id: "DEP-02-1", score: 1, text: "Son requeridos regularmente para acuerdos estratégicos o decisiones clave." },
            { id: "DEP-02-2", score: 2, text: "Se involucran selectivamente, pero varios acuerdos importantes aún dependen de ellos." },
            { id: "DEP-02-3", score: 3, text: "Su participación es mayormente estratégica en lugar de operativa." },
            { id: "DEP-02-4", score: 4, text: "La generación de ingresos funciona de manera independiente de la intervención ejecutiva individual." }
        ]
    },
    {
        id: "DEP-03",
        version: "1.1",
        dimension: "commercial_dependency",
        question: "¿Qué tan consistente es la forma en que su equipo de ventas ejecuta el proceso comercial?",
        answers: [
            { id: "DEP-03-0", score: 0, text: "Cada vendedor opera en gran medida según su propio enfoque." },
            { id: "DEP-03-1", score: 1, text: "Existe un proceso general, pero la ejecución varía significativamente entre las personas." },
            { id: "DEP-03-2", score: 2, text: "La mayoría de los representantes sigue el proceso, con diferencias notables en la ejecución." },
            { id: "DEP-03-3", score: 3, text: "El proceso se ejecuta de manera consistente en todo el equipo." },
            { id: "DEP-03-4", score: 4, text: "La ejecución está estandarizada, es medible y se mejora continuamente con base en evidencia." }
        ]
    },

    // DIMENSION 2 — COMMERCIAL PROCESS
    {
        id: "PRO-06",
        version: "1.1",
        dimension: "commercial_process",
        question: "¿Con qué claridad define su organización lo que debe cumplirse antes de que una oportunidad pase de una etapa de ventas a la siguiente?",
        answers: [
            { id: "PRO-06-0", score: 0, text: "La progresión de la etapa se basa en gran medida en el juicio del vendedor." },
            { id: "PRO-06-1", score: 1, text: "Existen algunos criterios, pero se aplican de manera flexible." },
            { id: "PRO-06-2", score: 2, text: "La mayoría de las etapas tienen criterios, pero su cumplimiento es inconsistente." },
            { id: "PRO-06-3", score: 3, text: "Cada etapa tiene criterios claros de entrada y salida que se aplican consistentemente." },
            { id: "PRO-06-4", score: 4, text: "Los criterios de las etapas se basan en datos y se refinan continuamente según la evidencia de conversión y rendimiento." }
        ]
    },
    {
        id: "PRO-07",
        version: "1.1",
        dimension: "commercial_process",
        question: "¿Qué tan confiable es su pronóstico de ventas (forecast)?",
        answers: [
            { id: "PRO-07-0", score: 0, text: "Los pronósticos frecuentemente difieren de los resultados reales y dependen en gran medida del juicio subjetivo." },
            { id: "PRO-07-1", score: 1, text: "Existe la proyección de ventas, pero la precisión varía significativamente." },
            { id: "PRO-07-2", score: 2, text: "Los pronósticos son razonablemente útiles pero aún dependen de la interpretación manual." },
            { id: "PRO-07-3", score: 3, text: "El pronóstico está consistentemente estructurado y es razonablemente preciso." },
            { id: "PRO-07-4", score: 4, text: "El pronóstico es impulsado por el sistema, basado en evidencia y calibrado continuamente." }
        ]
    },
    {
        id: "PRO-08",
        version: "1.1",
        dimension: "commercial_process",
        question: "¿Qué tan consistentemente se manejan las transiciones comerciales (handoffs) entre ventas y las otras funciones involucradas en la ejecución de ingresos?",
        answers: [
            { id: "PRO-08-0", score: 0, text: "Las transiciones son en su mayoría informales y dependen de los individuos." },
            { id: "PRO-08-1", score: 1, text: "Algunas transiciones están definidas, pero la ejecución es inconsistente." },
            { id: "PRO-08-2", score: 2, text: "La mayoría de las transiciones sigue un proceso, con vacíos ocasionales o duplicidad." },
            { id: "PRO-08-3", score: 3, text: "Las transiciones están claramente definidas, tienen un responsable y son medibles." },
            { id: "PRO-08-4", score: 4, text: "Las transiciones multifuncionales están integradas en el sistema operativo y se optimizan continuamente." }
        ]
    },

    // DIMENSION 3 — CRM & OPERATIONAL INFRASTRUCTURE
    {
        id: "INF-09",
        version: "1.1",
        dimension: "operational_infrastructure",
        question: "¿Con qué precisión refleja su CRM lo que realmente está sucediendo en su pipeline?",
        answers: [
            { id: "INF-09-0", score: 0, text: "El CRM está frecuentemente incompleto, desactualizado o no es confiable." },
            { id: "INF-09-1", score: 1, text: "Alguna información es precisa, pero persisten brechas significativas." },
            { id: "INF-09-2", score: 2, text: "El CRM es generalmente útil, pero la calidad y consistencia de los datos varían." },
            { id: "INF-09-3", score: 3, text: "El CRM refleja confiablemente la operación comercial." },
            { id: "INF-09-4", score: 4, text: "El CRM es una capa operativa activa que apoya continuamente la ejecución, la medición y la toma de decisiones." }
        ]
    },
    {
        id: "INF-10",
        version: "1.1",
        dimension: "operational_infrastructure",
        question: "¿Con qué facilidad puede el liderazgo obtener una visión confiable de la operación comercial actual?",
        answers: [
            { id: "INF-10-0", score: 0, text: "La información está dispersa en hojas de cálculo, correos electrónicos, herramientas de mensajería y conocimiento individual." },
            { id: "INF-10-1", score: 1, text: "Existe alguna información centralizada, pero se requiere una importante consolidación manual." },
            { id: "INF-10-2", score: 2, text: "La mayoría de la información es accesible, pero todavía hay que conciliar varias fuentes." },
            { id: "INF-10-3", score: 3, text: "El liderazgo tiene una visión centralizada y confiable de la operación comercial." },
            { id: "INF-10-4", score: 4, text: "La organización opera a partir de una única fuente de verdad integrada que apoya las decisiones en tiempo real." }
        ]
    },
    {
        id: "INF-12",
        version: "1.1",
        dimension: "operational_infrastructure",
        question: "¿Qué tan bien funcionan juntos su CRM, procesos comerciales, datos y flujos de trabajo operativos?",
        answers: [
            { id: "INF-12-0", score: 0, text: "Operan en gran medida como herramientas y procesos separados." },
            { id: "INF-12-1", score: 1, text: "Existen algunas integraciones, pero sigue existiendo una importante coordinación manual." },
            { id: "INF-12-2", score: 2, text: "Los sistemas principales están conectados, aunque aún subsisten vacíos importantes." },
            { id: "INF-12-3", score: 3, text: "Los flujos de trabajo comerciales principales operan a través de una infraestructura integrada." },
            { id: "INF-12-4", score: 4, text: "La infraestructura se comporta como un sistema operativo conectado en lugar de una colección de herramientas." }
        ]
    },

    // DIMENSION 4 — COMMERCIAL INTELLIGENCE
    {
        id: "INT-13",
        version: "1.1",
        dimension: "commercial_intelligence",
        question: "¿Con qué rapidez puede el liderazgo identificar dónde está mejorando o deteriorándose el rendimiento comercial?",
        answers: [
            { id: "INT-13-0", score: 0, text: "Es difícil identificar problemas hasta que los resultados ya están afectados." },
            { id: "INT-13-1", score: 1, text: "Existen reportes básicos, pero se requiere un análisis manual significativo." },
            { id: "INT-13-2", score: 2, text: "El liderazgo tiene visibilidad regular, pero aún se pueden omitir señales importantes." },
            { id: "INT-13-3", score: 3, text: "Los cambios clave en el rendimiento son visibles lo suficientemente rápido como para permitir una intervención oportuna." },
            { id: "INT-13-4", score: 4, text: "El sistema saca a flote proactivamente cambios, riesgos y oportunidades significativos." }
        ]
    },
    {
        id: "INT-14",
        version: "1.1",
        dimension: "commercial_intelligence",
        question: "¿De qué manera las decisiones comerciales dependen de datos y evidencia frente a la intuición individual?",
        answers: [
            { id: "INT-14-0", score: 0, text: "Las decisiones dependen principalmente de la experiencia y la intuición individuales." },
            { id: "INT-14-1", score: 1, text: "Hay datos disponibles, pero la intuición sigue siendo el factor dominante." },
            { id: "INT-14-2", score: 2, text: "Los datos y la experiencia se usan juntos, con una profundidad analítica inconsistente." },
            { id: "INT-14-3", score: 3, text: "Las decisiones más importantes están respaldadas por evidencia confiable." },
            { id: "INT-14-4", score: 4, text: "La toma de decisiones está informada sistemáticamente por datos integrados, patrones e inteligencia." }
        ]
    },
    {
        id: "INT-15",
        version: "1.1",
        dimension: "commercial_intelligence",
        question: "¿Qué tan efectivamente puede su organización identificar dónde se están perdiendo oportunidades de ingresos?",
        answers: [
            { id: "INT-15-0", score: 0, text: "La fuga de ingresos generalmente se reconoce solo después del hecho." },
            { id: "INT-15-1", score: 1, text: "Algunas pérdidas pueden identificarse, pero el análisis es en gran medida reactivo." },
            { id: "INT-15-2", score: 2, text: "Se monitorean varios puntos de fuga, pero la visibilidad es incompleta." },
            { id: "INT-15-3", score: 3, text: "La organización puede identificar consistentemente las principales fuentes de fuga comercial." },
            { id: "INT-15-4", score: 4, text: "El sistema detecta proactivamente fugas emergentes y ayuda a identificar sus causas subyacentes." }
        ]
    },
    {
        id: "INT-16",
        version: "1.1",
        dimension: "commercial_intelligence",
        question: "¿Qué tan bien conecta la información comercial el rendimiento de ventas con los factores operativos y organizacionales?",
        answers: [
            { id: "INT-16-0", score: 0, text: "La información de ventas se analiza mayormente de forma aislada." },
            { id: "INT-16-1", score: 1, text: "Hay disponible alguna información multifuncional, pero las conexiones son mayormente manuales." },
            { id: "INT-16-2", score: 2, text: "Se entienden varias relaciones, pero el panorama sigue estando fragmentado." },
            { id: "INT-16-3", score: 3, text: "Los datos comerciales y operativos se analizan regularmente en conjunto." },
            { id: "INT-16-4", score: 4, text: "La organización tiene un panorama integrado de cómo los factores comerciales, operativos y organizacionales afectan el crecimiento." }
        ]
    },

    // DIMENSION 5 — AI & AUTOMATION CAPABILITY
    {
        id: "AIA-17",
        version: "1.1",
        dimension: "ai_automation",
        question: "¿Cómo se está utilizando actualmente la IA en toda su operación comercial?",
        answers: [
            { id: "AIA-17-0", score: 0, text: "Hay poco o ningún uso significativo de la IA." },
            { id: "AIA-17-1", score: 1, text: "Los individuos usan la IA principalmente como una herramienta de productividad personal." },
            { id: "AIA-17-2", score: 2, text: "Varios equipos usan la IA, pero la adopción es en su mayor parte descentralizada." },
            { id: "AIA-17-3", score: 3, text: "La IA está integrada en flujos de trabajo comerciales y casos de uso definidos." },
            { id: "AIA-17-4", score: 4, text: "La IA está incrustada en todo el sistema operativo con responsabilidades definidas, gobernanza e impacto medible." }
        ]
    },
    {
        id: "AIA-18",
        version: "1.1",
        dimension: "ai_automation",
        question: "¿Qué tan extensamente están automatizados los flujos de trabajo comerciales y operativos repetitivos?",
        answers: [
            { id: "AIA-18-0", score: 0, text: "La mayoría de los flujos de trabajo son manuales." },
            { id: "AIA-18-1", score: 1, text: "Existen unas pocas automatizaciones aisladas." },
            { id: "AIA-18-2", score: 2, text: "Varios flujos de trabajo recurrentes están automatizados, pero la automatización sigue fragmentada." },
            { id: "AIA-18-3", score: 3, text: "La automatización se aplica sistemáticamente a flujos de trabajo repetitivos importantes." },
            { id: "AIA-18-4", score: 4, text: "La automatización está diseñada estratégicamente a través de flujos de trabajo interconectados y se optimiza continuamente." }
        ]
    },
    {
        id: "AIA-19",
        version: "1.1",
        dimension: "ai_automation",
        question: "Cuando su organización descubre una capacidad de IA útil, ¿qué tan efectivamente se incorpora al sistema operativo?",
        answers: [
            { id: "AIA-19-0", score: 0, text: "Las prácticas útiles de IA generalmente siguen siendo experimentos individuales." },
            { id: "AIA-19-1", score: 1, text: "Se comparten algunas prácticas, pero la adopción depende de los individuos." },
            { id: "AIA-19-2", score: 2, text: "Los casos de uso prometedores se documentan, pero la integración es inconsistente." },
            { id: "AIA-19-3", score: 3, text: "Los casos de uso exitosos de IA se incorporan sistemáticamente en los flujos de trabajo relevantes." },
            { id: "AIA-19-4", score: 4, text: "Las capacidades de IA se evalúan continuamente, se gobiernan y se integran como parte de la infraestructura en evolución de la organización." }
        ]
    },

    // DIMENSION 6 — GOVERNANCE & EVOLUTION
    {
        id: "GOV-20",
        version: "1.1",
        dimension: "governance_evolution",
        question: "¿Quién es el responsable de mantener y mejorar el sistema operativo comercial?",
        answers: [
            { id: "GOV-20-0", score: 0, text: "No existe un responsable claro." },
            { id: "GOV-20-1", score: 1, text: "La responsabilidad existe informalmente y depende de una o dos personas." },
            { id: "GOV-20-2", score: 2, text: "La responsabilidad existe, pero las funciones y la rendición de cuentas no están completamente definidas." },
            { id: "GOV-20-3", score: 3, text: "Hay responsabilidades y rendición de cuentas claras para el sistema comercial." },
            { id: "GOV-20-4", score: 4, text: "La responsabilidad está institucionalizada con una clara gobernanza, rendición de cuentas y obligaciones de mejora continua." }
        ]
    },
    {
        id: "GOV-22",
        version: "1.1",
        dimension: "governance_evolution",
        question: "¿Qué tan efectivamente se incorporan las lecciones de las victorias, pérdidas y fallas operativas en el sistema comercial?",
        answers: [
            { id: "GOV-22-0", score: 0, text: "Las lecciones generalmente se quedan con las personas directamente involucradas." },
            { id: "GOV-22-1", score: 1, text: "Las lecciones se comparten ocasionalmente, pero rara vez se institucionalizan." },
            { id: "GOV-22-2", score: 2, text: "Algo de aprendizaje se documenta, pero la aplicación es inconsistente." },
            { id: "GOV-22-3", score: 3, text: "Las lecciones importantes se incorporan sistemáticamente en los procesos y la capacitación." },
            { id: "GOV-22-4", score: 4, text: "El sistema captura, distribuye y operativiza continuamente el aprendizaje." }
        ]
    },
    {
        id: "GOV-23",
        version: "1.1",
        dimension: "governance_evolution",
        question: "Cuando cambian las condiciones del mercado, el comportamiento del cliente o las prioridades estratégicas, ¿qué tan rápido puede adaptarse su sistema comercial?",
        answers: [
            { id: "GOV-23-0", score: 0, text: "Los cambios requieren una disrupción significativa y dependen en gran medida de personas clave." },
            { id: "GOV-23-1", score: 1, text: "La organización puede adaptarse, pero los cambios son lentos y en gran medida reactivos." },
            { id: "GOV-23-2", score: 2, text: "La organización se adapta razonablemente bien, aunque requiere de una importante coordinación manual." },
            { id: "GOV-23-3", score: 3, text: "El sistema comercial puede adaptarse sin mayores disrupciones." },
            { id: "GOV-23-4", score: 4, text: "La organización está diseñada para sentir, aprender y adaptarse continuamente a medida que cambian las condiciones." }
        ]
    }
];
