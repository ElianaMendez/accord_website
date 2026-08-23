export const DIAGNOSTIC_VERSION = "ACCORD-DIAG-1.0";

export const DIMENSIONS = {
    commercial_dependency: { id: "commercial_dependency", name: "Commercial Dependency", weight: 0.20 },
    commercial_process: { id: "commercial_process", name: "Commercial Process", weight: 0.20 },
    operational_infrastructure: { id: "operational_infrastructure", name: "Operational Infrastructure", weight: 0.20 },
    commercial_intelligence: { id: "commercial_intelligence", name: "Commercial Intelligence", weight: 0.15 },
    ai_automation: { id: "ai_automation", name: "AI & Automation", weight: 0.10 },
    governance_evolution: { id: "governance_evolution", name: "Governance & Evolution", weight: 0.15 }
};

export const QUESTIONS = [
    // DIMENSION 1 — COMMERCIAL DEPENDENCY
    {
        id: "DEP-01",
        version: "1.0",
        dimension: "commercial_dependency",
        question: "If one of your top salespeople left tomorrow, how much of their critical commercial knowledge would remain accessible to the organization?",
        answers: [
            { id: "DEP-01-0", score: 0, text: "Very little. Most of their knowledge exists in their experience, relationships and personal methods." },
            { id: "DEP-01-1", score: 1, text: "Some information exists, but significant knowledge would leave with them." },
            { id: "DEP-01-2", score: 2, text: "Core information is documented, but important context still depends on the individual." },
            { id: "DEP-01-3", score: 3, text: "Most critical knowledge is documented and accessible through shared systems and processes." },
            { id: "DEP-01-4", score: 4, text: "Commercial knowledge is systematically captured, shared and continuously incorporated into the operating system." }
        ]
    },
    {
        id: "DEP-02",
        version: "1.0",
        dimension: "commercial_dependency",
        question: "How dependent is revenue generation on the CEO, founder or a small number of senior leaders?",
        answers: [
            { id: "DEP-02-0", score: 0, text: "They are directly involved in many important opportunities and relationships." },
            { id: "DEP-02-1", score: 1, text: "They are regularly required for strategic deals or key decisions." },
            { id: "DEP-02-2", score: 2, text: "They are involved selectively, but several important deals still depend on them." },
            { id: "DEP-02-3", score: 3, text: "Their involvement is mostly strategic rather than operational." },
            { id: "DEP-02-4", score: 4, text: "Revenue generation operates independently of individual executive intervention." }
        ]
    },
    {
        id: "DEP-03",
        version: "1.0",
        dimension: "commercial_dependency",
        question: "How consistent is the way your sales team executes the commercial process?",
        answers: [
            { id: "DEP-03-0", score: 0, text: "Each salesperson largely operates according to their own approach." },
            { id: "DEP-03-1", score: 1, text: "There is a general process, but execution varies significantly between people." },
            { id: "DEP-03-2", score: 2, text: "Most representatives follow the process, with noticeable differences in execution." },
            { id: "DEP-03-3", score: 3, text: "The process is consistently executed across the team." },
            { id: "DEP-03-4", score: 4, text: "Execution is standardized, measurable and continuously improved based on evidence." }
        ]
    },
    {
        id: "DEP-04",
        version: "1.0",
        dimension: "commercial_dependency",
        question: "When a new salesperson joins, how much of your organization's commercial capability can be transferred through the existing system rather than personal coaching?",
        answers: [
            { id: "DEP-04-0", score: 0, text: "Most capability must be learned directly from experienced people." },
            { id: "DEP-04-1", score: 1, text: "Some documentation exists, but significant learning remains informal." },
            { id: "DEP-04-2", score: 2, text: "There is a defined onboarding process, but important knowledge is still person-dependent." },
            { id: "DEP-04-3", score: 3, text: "Most commercial capability can be transferred through documented processes, tools and training." },
            { id: "DEP-04-4", score: 4, text: "The system itself enables repeatable capability transfer and continuous learning." }
        ]
    },

    // DIMENSION 2 — COMMERCIAL PROCESS
    {
        id: "PRO-05",
        version: "1.0",
        dimension: "commercial_process",
        question: "How clearly defined is your end-to-end commercial process?",
        answers: [
            { id: "PRO-05-0", score: 0, text: "There is no consistent process. Execution depends largely on individual experience." },
            { id: "PRO-05-1", score: 1, text: "Some stages are defined, but the process is incomplete or inconsistently followed." },
            { id: "PRO-05-2", score: 2, text: "The main stages are defined, but execution and ownership vary." },
            { id: "PRO-05-3", score: 3, text: "The end-to-end process is clearly defined and consistently followed." },
            { id: "PRO-05-4", score: 4, text: "The process is clearly defined, measured and continuously optimized." }
        ]
    },
    {
        id: "PRO-06",
        version: "1.0",
        dimension: "commercial_process",
        question: "How clearly does your organization define what must be true before an opportunity moves from one sales stage to the next?",
        answers: [
            { id: "PRO-06-0", score: 0, text: "Stage progression is largely based on salesperson judgment." },
            { id: "PRO-06-1", score: 1, text: "Some criteria exist, but they are loosely applied." },
            { id: "PRO-06-2", score: 2, text: "Most stages have criteria, but enforcement is inconsistent." },
            { id: "PRO-06-3", score: 3, text: "Each stage has clear entry and exit criteria that are consistently applied." },
            { id: "PRO-06-4", score: 4, text: "Stage criteria are data-driven and continuously refined based on conversion and performance evidence." }
        ]
    },
    {
        id: "PRO-07",
        version: "1.0",
        dimension: "commercial_process",
        question: "How reliable is your sales forecast?",
        answers: [
            { id: "PRO-07-0", score: 0, text: "Forecasts frequently differ from actual results and rely heavily on subjective judgment." },
            { id: "PRO-07-1", score: 1, text: "Forecasting exists, but accuracy varies significantly." },
            { id: "PRO-07-2", score: 2, text: "Forecasts are reasonably useful but still depend on manual interpretation." },
            { id: "PRO-07-3", score: 3, text: "Forecasting is consistently structured and reasonably accurate." },
            { id: "PRO-07-4", score: 4, text: "Forecasting is system-driven, evidence-based and continuously calibrated." }
        ]
    },
    {
        id: "PRO-08",
        version: "1.0",
        dimension: "commercial_process",
        question: "How consistently are commercial handoffs managed between sales and the other functions involved in revenue execution?",
        answers: [
            { id: "PRO-08-0", score: 0, text: "Handoffs are mostly informal and depend on individuals." },
            { id: "PRO-08-1", score: 1, text: "Some handoffs are defined, but execution is inconsistent." },
            { id: "PRO-08-2", score: 2, text: "Most handoffs follow a process, with occasional gaps or duplication." },
            { id: "PRO-08-3", score: 3, text: "Handoffs are clearly defined, owned and measurable." },
            { id: "PRO-08-4", score: 4, text: "Cross-functional handoffs are integrated into the operating system and continuously optimized." }
        ]
    },

    // DIMENSION 3 — CRM & OPERATIONAL INFRASTRUCTURE
    {
        id: "INF-09",
        version: "1.0",
        dimension: "operational_infrastructure",
        question: "How accurately does your CRM reflect what is actually happening across your pipeline?",
        answers: [
            { id: "INF-09-0", score: 0, text: "The CRM is frequently incomplete, outdated or unreliable." },
            { id: "INF-09-1", score: 1, text: "Some information is accurate, but significant gaps remain." },
            { id: "INF-09-2", score: 2, text: "The CRM is generally useful, but data quality and consistency vary." },
            { id: "INF-09-3", score: 3, text: "The CRM reliably reflects the commercial operation." },
            { id: "INF-09-4", score: 4, text: "The CRM is an active operating layer that continuously supports execution, measurement and decision-making." }
        ]
    },
    {
        id: "INF-10",
        version: "1.0",
        dimension: "operational_infrastructure",
        question: "How easily can leadership obtain a reliable view of the current commercial operation?",
        answers: [
            { id: "INF-10-0", score: 0, text: "Information is scattered across spreadsheets, email, messaging tools and individual knowledge." },
            { id: "INF-10-1", score: 1, text: "Some centralized information exists, but significant manual consolidation is required." },
            { id: "INF-10-2", score: 2, text: "Most information is accessible, but several sources still need to be reconciled." },
            { id: "INF-10-3", score: 3, text: "Leadership has a reliable centralized view of the commercial operation." },
            { id: "INF-10-4", score: 4, text: "The organization operates from an integrated source of truth that supports real-time decisions." }
        ]
    },
    {
        id: "INF-11",
        version: "1.0",
        dimension: "operational_infrastructure",
        question: "How much repetitive manual work is required to keep your commercial operation running?",
        answers: [
            { id: "INF-11-0", score: 0, text: "A significant amount of operational work is manual and repetitive." },
            { id: "INF-11-1", score: 1, text: "Many recurring activities still require manual intervention." },
            { id: "INF-11-2", score: 2, text: "Some important workflows are automated, but several operational bottlenecks remain." },
            { id: "INF-11-3", score: 3, text: "Most repetitive workflows are standardized and partially automated." },
            { id: "INF-11-4", score: 4, text: "Operational workflows are highly integrated and continuously optimized to minimize unnecessary effort." }
        ]
    },
    {
        id: "INF-12",
        version: "1.0",
        dimension: "operational_infrastructure",
        question: "How well do your CRM, commercial processes, data and operational workflows work together?",
        answers: [
            { id: "INF-12-0", score: 0, text: "They operate largely as separate tools and processes." },
            { id: "INF-12-1", score: 1, text: "Some integrations exist, but significant manual coordination remains." },
            { id: "INF-12-2", score: 2, text: "Core systems are connected, although several important gaps remain." },
            { id: "INF-12-3", score: 3, text: "The main commercial workflows operate through an integrated infrastructure." },
            { id: "INF-12-4", score: 4, text: "The infrastructure behaves as a connected operating system rather than a collection of tools." }
        ]
    },

    // DIMENSION 4 — COMMERCIAL INTELLIGENCE
    {
        id: "INT-13",
        version: "1.0",
        dimension: "commercial_intelligence",
        question: "How quickly can leadership identify where commercial performance is improving or deteriorating?",
        answers: [
            { id: "INT-13-0", score: 0, text: "It is difficult to identify problems until results are already affected." },
            { id: "INT-13-1", score: 1, text: "Basic reporting exists, but significant manual analysis is required." },
            { id: "INT-13-2", score: 2, text: "Leadership has regular visibility, but important signals can still be missed." },
            { id: "INT-13-3", score: 3, text: "Key performance changes are visible quickly enough to support timely intervention." },
            { id: "INT-13-4", score: 4, text: "The system proactively surfaces meaningful changes, risks and opportunities." }
        ]
    },
    {
        id: "INT-14",
        version: "1.0",
        dimension: "commercial_intelligence",
        question: "How much do commercial decisions rely on data and evidence versus individual intuition?",
        answers: [
            { id: "INT-14-0", score: 0, text: "Decisions rely primarily on individual experience and intuition." },
            { id: "INT-14-1", score: 1, text: "Data is available, but intuition remains the dominant factor." },
            { id: "INT-14-2", score: 2, text: "Data and experience are used together, with inconsistent analytical depth." },
            { id: "INT-14-3", score: 3, text: "Most important decisions are supported by reliable evidence." },
            { id: "INT-14-4", score: 4, text: "Decision-making is systematically informed by integrated data, patterns and intelligence." }
        ]
    },
    {
        id: "INT-15",
        version: "1.0",
        dimension: "commercial_intelligence",
        question: "How effectively can your organization identify where revenue opportunities are being lost?",
        answers: [
            { id: "INT-15-0", score: 0, text: "Revenue leakage is usually recognized only after the fact." },
            { id: "INT-15-1", score: 1, text: "Some losses can be identified, but the analysis is largely reactive." },
            { id: "INT-15-2", score: 2, text: "Several leakage points are monitored, but visibility is incomplete." },
            { id: "INT-15-3", score: 3, text: "The organization can consistently identify major sources of commercial leakage." },
            { id: "INT-15-4", score: 4, text: "The system proactively detects emerging leakage and helps identify its underlying causes." }
        ]
    },
    {
        id: "INT-16",
        version: "1.0",
        dimension: "commercial_intelligence",
        question: "How well does commercial information connect sales performance with operational and organizational factors?",
        answers: [
            { id: "INT-16-0", score: 0, text: "Sales information is mostly analyzed in isolation." },
            { id: "INT-16-1", score: 1, text: "Some cross-functional information is available, but connections are mostly manual." },
            { id: "INT-16-2", score: 2, text: "Several relationships are understood, but the picture remains fragmented." },
            { id: "INT-16-3", score: 3, text: "Commercial and operational data are regularly analyzed together." },
            { id: "INT-16-4", score: 4, text: "The organization has an integrated view of how commercial, operational and organizational factors affect growth." }
        ]
    },

    // DIMENSION 5 — AI & AUTOMATION CAPABILITY
    {
        id: "AIA-17",
        version: "1.0",
        dimension: "ai_automation",
        question: "How is AI currently being used across your commercial operation?",
        answers: [
            { id: "AIA-17-0", score: 0, text: "There is little or no meaningful use of AI." },
            { id: "AIA-17-1", score: 1, text: "Individuals use AI primarily as a personal productivity tool." },
            { id: "AIA-17-2", score: 2, text: "Several teams use AI, but adoption is mostly decentralized." },
            { id: "AIA-17-3", score: 3, text: "AI is integrated into defined commercial workflows and use cases." },
            { id: "AIA-17-4", score: 4, text: "AI is embedded across the operating system with defined ownership, governance and measurable impact." }
        ]
    },
    {
        id: "AIA-18",
        version: "1.0",
        dimension: "ai_automation",
        question: "How extensively are repetitive commercial and operational workflows automated?",
        answers: [
            { id: "AIA-18-0", score: 0, text: "Most workflows are manual." },
            { id: "AIA-18-1", score: 1, text: "A few isolated automations exist." },
            { id: "AIA-18-2", score: 2, text: "Several recurring workflows are automated, but automation remains fragmented." },
            { id: "AIA-18-3", score: 3, text: "Automation is systematically applied to important repetitive workflows." },
            { id: "AIA-18-4", score: 4, text: "Automation is strategically designed across interconnected workflows and continuously optimized." }
        ]
    },
    {
        id: "AIA-19",
        version: "1.0",
        dimension: "ai_automation",
        question: "When your organization discovers a useful AI capability, how effectively is it incorporated into the operating system?",
        answers: [
            { id: "AIA-19-0", score: 0, text: "Useful AI practices usually remain individual experiments." },
            { id: "AIA-19-1", score: 1, text: "Some practices are shared, but adoption depends on individuals." },
            { id: "AIA-19-2", score: 2, text: "Promising use cases are documented, but integration is inconsistent." },
            { id: "AIA-19-3", score: 3, text: "Successful AI use cases are systematically incorporated into relevant workflows." },
            { id: "AIA-19-4", score: 4, text: "AI capabilities are continuously evaluated, governed and integrated as part of the organization's evolving infrastructure." }
        ]
    },

    // DIMENSION 6 — GOVERNANCE & EVOLUTION
    {
        id: "GOV-20",
        version: "1.0",
        dimension: "governance_evolution",
        question: "Who is responsible for maintaining and improving the commercial operating system?",
        answers: [
            { id: "GOV-20-0", score: 0, text: "No clear ownership exists." },
            { id: "GOV-20-1", score: 1, text: "Responsibility exists informally and depends on one or two individuals." },
            { id: "GOV-20-2", score: 2, text: "Ownership exists, but responsibilities and accountability are not fully defined." },
            { id: "GOV-20-3", score: 3, text: "Clear ownership and accountability exist for the commercial system." },
            { id: "GOV-20-4", score: 4, text: "Ownership is institutionalized with clear governance, accountability and continuous improvement responsibilities." }
        ]
    },
    {
        id: "GOV-21",
        version: "1.0",
        dimension: "governance_evolution",
        question: "How systematically does your organization improve its commercial processes?",
        answers: [
            { id: "GOV-21-0", score: 0, text: "Changes are mostly reactive." },
            { id: "GOV-21-1", score: 1, text: "Improvements happen occasionally when problems become visible." },
            { id: "GOV-21-2", score: 2, text: "There is some regular improvement activity, but it is inconsistent." },
            { id: "GOV-21-3", score: 3, text: "Processes are regularly reviewed and improved based on evidence." },
            { id: "GOV-21-4", score: 4, text: "Continuous improvement is embedded into the operating system and driven by measurable learning." }
        ]
    },
    {
        id: "GOV-22",
        version: "1.0",
        dimension: "governance_evolution",
        question: "How effectively are lessons from wins, losses and operational failures incorporated into the commercial system?",
        answers: [
            { id: "GOV-22-0", score: 0, text: "Lessons usually remain with the people directly involved." },
            { id: "GOV-22-1", score: 1, text: "Lessons are occasionally shared, but rarely institutionalized." },
            { id: "GOV-22-2", score: 2, text: "Some learning is documented, but application is inconsistent." },
            { id: "GOV-22-3", score: 3, text: "Important lessons are systematically incorporated into processes and training." },
            { id: "GOV-22-4", score: 4, text: "The system continuously captures, distributes and operationalizes learning." }
        ]
    },
    {
        id: "GOV-23",
        version: "1.0",
        dimension: "governance_evolution",
        question: "When market conditions, customer behavior or strategic priorities change, how quickly can your commercial system adapt?",
        answers: [
            { id: "GOV-23-0", score: 0, text: "Changes require significant disruption and depend heavily on key individuals." },
            { id: "GOV-23-1", score: 1, text: "The organization can adapt, but changes are slow and largely reactive." },
            { id: "GOV-23-2", score: 2, text: "The organization adapts reasonably well, although significant manual coordination is required." },
            { id: "GOV-23-3", score: 3, text: "The commercial system can adapt without major disruption." },
            { id: "GOV-23-4", score: 4, text: "The organization is designed to continuously sense, learn and adapt as conditions change." }
        ]
    }
];
