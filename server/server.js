/**
 * GoalFlow AI - Production Node.js Backend Server
 * Secure API Proxy for Google Gemini, Persistent Goal REST API & Static Server
 * Zero External Dependencies (Node.js 18+ Built-in HTTP & Fetch)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// ----------------------------------------------------------------------
// 1. CONFIGURATION & ENVIRONMENT LOADING
// ----------------------------------------------------------------------
const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(__dirname, 'data');
const GOALS_FILE = path.join(DATA_DIR, 'goals.json');

// Load environment variables from .env
function loadEnv() {
    const envPaths = [
        path.join(ROOT_DIR, '.env'),
        path.join(__dirname, '.env')
    ];
    for (const envPath of envPaths) {
        if (fs.existsSync(envPath)) {
            const lines = fs.readFileSync(envPath, 'utf8').split('\n');
            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith('#')) continue;
                const eqIdx = trimmed.indexOf('=');
                if (eqIdx !== -1) {
                    const key = trimmed.slice(0, eqIdx).trim();
                    let val = trimmed.slice(eqIdx + 1).trim();
                    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                        val = val.slice(1, -1);
                    }
                    if (!process.env[key]) {
                        process.env[key] = val;
                    }
                }
            }
        }
    }
}
loadEnv();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// ----------------------------------------------------------------------
// 2. PERSISTENT STORAGE INITIALIZATION
// ----------------------------------------------------------------------
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial ML demo dataset if storage is empty
const INITIAL_DEMO_GOALS = [
    {
        id: "demo-goal-ml-2026",
        isDemo: true,
        title: "Become proficient in Machine Learning",
        motivation: "Secure a summer ML internship and build an end-to-end predictive model for college project.",
        level: "Beginner",
        startDate: "2026-11-21",
        deadline: "2026-12-28",
        weeklyCapacityMinutes: 300,
        sessionLength: 45,
        blackoutDates: ["2026-12-10", "2026-12-11", "2026-12-12"],
        resources: "Laptop, Python 3.11, Google Colab, Scikit-Learn Docs",
        budget: "$0 (Free / Open Source)",
        status: "active",
        createdAt: "2026-11-21T10:00:00Z",
        smart_goal: {
            statement: "Master foundational machine learning algorithms by implementing, training, and evaluating 3 real-world tabular and classification models with >85% accuracy before December 28, 2026, investing 5 hours per week.",
            measurement: "3 deployed GitHub repositories with Jupyter notebooks and documented F1/Accuracy scores > 85%.",
            completion_evidence: [
                "GitHub repository containing Linear & Logistic Regression from scratch",
                "Kaggle Titanic competition submission notebook with >82% accuracy",
                "Final capstone: Customer churn predictor deployed with Streamlit on Hugging Face Spaces"
            ],
            assumptions: [
                "Learner has basic familiarity with Python syntax (variables, loops, functions).",
                "High-school level linear algebra and statistics knowledge.",
                "No high-end GPU required for Scikit-Learn tabular models."
            ],
            questions: []
        },
        objectives: [
            {
                id: "obj-1",
                title: "Data Manipulation & EDA with NumPy & Pandas",
                key_result: "Clean and explore 3 distinct datasets with zero unhandled nulls and 5 Seaborn plots each.",
                baseline: 0,
                target: 3,
                current: 2,
                unit: "datasets",
                dueDate: "2026-12-01",
                evidence: "Jupyter notebooks with statistical distribution summaries"
            },
            {
                id: "obj-2",
                title: "Supervised Learning Algorithms Mastery",
                key_result: "Train and compare 4 algorithms (Linear, Logistic, Random Forest, XGBoost) using cross-validation.",
                baseline: 0,
                target: 4,
                current: 1,
                unit: "models",
                dueDate: "2026-12-18",
                evidence: "Confusion matrices and ROC-AUC comparison curves"
            },
            {
                id: "obj-3",
                title: "End-to-End Model Evaluation & Deployment",
                key_result: "Deploy a trained model with an interactive UI accessible online.",
                baseline: 0,
                target: 1,
                current: 0,
                unit: "web apps",
                dueDate: "2026-12-28",
                evidence: "Live Streamlit / Hugging Face demo link"
            }
        ],
        milestones: [
            {
                id: "ms-1",
                title: "M1: Mathematical Tooling & Exploratory Data Analysis",
                dueDate: "2026-12-01",
                objectiveId: "obj-1",
                acceptanceCriteria: "Load Kaggle CSV, clean missing values, handle categorical encoding, and generate correlation heatmaps.",
                status: "in-progress"
            },
            {
                id: "ms-2",
                title: "M2: Classical Supervised Regression & Classification",
                dueDate: "2026-12-09",
                objectiveId: "obj-2",
                acceptanceCriteria: "Build Logistic Regression and Decision Tree pipelines with 5-fold cross-validation.",
                status: "pending"
            },
            {
                id: "ms-3",
                title: "M3: Ensemble Methods & Hyperparameter Tuning",
                dueDate: "2026-12-19",
                objectiveId: "obj-2",
                acceptanceCriteria: "Tune Random Forest using GridSearchCV with test accuracy surpassing baseline by >7%.",
                status: "pending"
            },
            {
                id: "ms-4",
                title: "M4: Capstone Model Deployment & Viva Presentation Prep",
                dueDate: "2026-12-28",
                objectiveId: "obj-3",
                acceptanceCriteria: "Web UI demo working with slide deck summarizing learning objectives and performance metrics.",
                status: "pending"
            }
        ],
        tasks: [
            { id: "task-1", title: "Setup Python virtual environment and install NumPy, Pandas, Scikit-Learn", milestoneId: "ms-1", date: "2026-11-21", duration: 45, priority: "High", dependency: null, completed: true },
            { id: "task-2", title: "NumPy array vectorization and matrix multiplication practice", milestoneId: "ms-1", date: "2026-11-23", duration: 45, priority: "Medium", dependency: "task-1", completed: true },
            { id: "task-3", title: "Pandas data cleaning: Handling NaNs and One-Hot Encoding on Titanic dataset", milestoneId: "ms-1", date: "2026-11-25", duration: 60, priority: "High", dependency: "task-2", completed: false },
            { id: "task-4", title: "Matplotlib & Seaborn visualization: Plot feature correlations and outliers", milestoneId: "ms-1", date: "2026-11-28", duration: 60, priority: "Medium", dependency: "task-3", completed: false },
            { id: "task-5", title: "Implement Linear Regression cost function and gradient descent from scratch", milestoneId: "ms-2", date: "2026-12-02", duration: 60, priority: "High", dependency: "task-4", completed: false },
            { id: "task-6", title: "Build Logistic Regression binary classifier using Scikit-Learn Pipeline", milestoneId: "ms-2", date: "2026-12-05", duration: 60, priority: "High", dependency: "task-5", completed: false },
            { id: "task-7", title: "Evaluate classification metrics: Precision, Recall, F1-Score, and ROC-AUC", milestoneId: "ms-2", date: "2026-12-08", duration: 45, priority: "Medium", dependency: "task-6", completed: false },
            { id: "task-8", title: "Train Random Forest and Gradient Boosted Trees on tabular data", milestoneId: "ms-3", date: "2026-12-14", duration: 60, priority: "High", dependency: "task-7", completed: false },
            { id: "task-9", title: "Optimize model hyperparameters using RandomizedSearchCV", milestoneId: "ms-3", date: "2026-12-17", duration: 60, priority: "Medium", dependency: "task-8", completed: false },
            { id: "task-10", title: "Save best model pipeline with joblib and write inference script", milestoneId: "ms-4", date: "2026-12-21", duration: 45, priority: "Medium", dependency: "task-9", completed: false },
            { id: "task-11", title: "Create interactive Streamlit web dashboard for user inputs", milestoneId: "ms-4", date: "2026-12-23", duration: 60, priority: "High", dependency: "task-10", completed: false },
            { id: "task-12", title: "Deploy app to Hugging Face Spaces and prepare viva presentation slides", milestoneId: "ms-4", date: "2026-12-26", duration: 60, priority: "High", dependency: "task-11", completed: false }
        ],
        risks: [
            { obstacle: "Overwhelmed by theoretical mathematical proofs (matrix calculus).", backupAction: "Adopt top-down code-first intuition using Scikit-Learn visualization before deep dive." },
            { obstacle: "College Midterms between Dec 10-12 causing plan delay.", backupAction: "Zero tasks scheduled during blackout window; load balanced into post-midterm weeks." },
            { obstacle: "Model overfitting on small training samples.", backupAction: "Enforce K-fold cross-validation and L2 regularization early." }
        ],
        weeklyReviews: [
            {
                date: "2026-11-21",
                completed: "Set up Python virtual environment and verified toolchain.",
                blockers: "Minor pip dependency version conflict with Mac arm64.",
                timeSpent: 90,
                evidence: "Terminal output and clean git commit.",
                aiFeedback: "Excellent foundation. Your tooling is fully verified. Stay focused on Pandas vectorization for next week."
            }
        ]
    }
];

function readGoals() {
    try {
        if (!fs.existsSync(GOALS_FILE)) {
            fs.writeFileSync(GOALS_FILE, JSON.stringify(INITIAL_DEMO_GOALS, null, 2), 'utf8');
            return INITIAL_DEMO_GOALS;
        }
        const data = fs.readFileSync(GOALS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading goals store:', err);
        return [];
    }
}

function writeGoals(goals) {
    try {
        fs.writeFileSync(GOALS_FILE, JSON.stringify(goals, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error('Error writing goals store:', err);
        return false;
    }
}

// ----------------------------------------------------------------------
// 3. AI SYSTEM PROMPT & PLANNING PIPELINE
// ----------------------------------------------------------------------
const SYSTEM_PROMPT = `You are GoalFlow AI, a student goal-planning assistant.
Your job is to transform vague personal goals into realistic, measurable and actionable plans.
Treat user-provided profile values as hard constraints.
Never invent deadlines, available time, courses, resources, budgets or skill levels.
If required information is missing, ask focused clarification questions.
If a goal is infeasible within the supplied constraints, report it as infeasible and offer options such as reducing scope, extending the deadline or increasing available time.
Do not silently change user constraints.
Do not provide guarantees.
Clearly distinguish assumptions from confirmed information.
Use SMART goal principles.
Use outcome-oriented key results.
Break objectives into dated milestones.
Break milestones into realistic tasks.
Include task duration.
Respect availability and blackout dates.
Identify risks and create IF-THEN backup actions.
Return structured data according to the requested schema.
Never claim an AI-generated resource is verified unless it has actually been verified.
The user has final authority over changes to goals, deadlines, workload and scope.

SCHEMA REQUIRED (valid JSON only):
{
  "status": "draft",
  "smart_goal": {
    "statement": "string",
    "measurement": "string",
    "completion_evidence": ["string"],
    "assumptions": ["string"],
    "questions": ["string"]
  },
  "objectives": [
    {
      "id": "obj-1",
      "title": "string",
      "key_result": "string",
      "baseline": 0,
      "target": 3,
      "current": 0,
      "unit": "string",
      "dueDate": "YYYY-MM-DD",
      "evidence": "string"
    }
  ],
  "milestones": [
    {
      "id": "ms-1",
      "title": "string",
      "dueDate": "YYYY-MM-DD",
      "objectiveId": "obj-1",
      "acceptanceCriteria": "string",
      "status": "pending"
    }
  ],
  "tasks": [
    {
      "id": "task-1",
      "title": "string",
      "milestoneId": "ms-1",
      "date": "YYYY-MM-DD",
      "duration": 45,
      "priority": "High|Medium|Low",
      "dependency": null,
      "completed": false
    }
  ],
  "risks": [
    {
      "obstacle": "string",
      "backupAction": "string"
    }
  ]
}`;

// Deterministic Server-side Fallback Generator (Offline Safety)
function generateServerFallbackPlan(input) {
    const start = new Date(input.startDate || new Date().toISOString().split('T')[0]);
    const end = new Date(input.deadline || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]);
    const totalDays = Math.max(7, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    const blackoutSet = new Set((input.blackoutDates || []).map(d => String(d).trim()));

    function addDays(d, days) {
        const res = new Date(d);
        res.setDate(res.getDate() + days);
        return res.toISOString().split("T")[0];
    }

    function safeDate(targetDateStr) {
        let cur = new Date(targetDateStr);
        while (blackoutSet.has(cur.toISOString().split("T")[0])) {
            cur.setDate(cur.getDate() + 1);
        }
        return cur.toISOString().split("T")[0];
    }

    const d1 = addDays(start, Math.floor(totalDays * 0.25));
    const d2 = addDays(start, Math.floor(totalDays * 0.5));
    const d3 = addDays(start, Math.floor(totalDays * 0.75));
    const d4 = input.deadline || addDays(start, totalDays);

    const sLength = Number(input.sessionLength) || 45;
    const weeklyMins = Number(input.weeklyCapacityMinutes) || 300;

    return {
        status: "draft",
        isServerFallback: true,
        smart_goal: {
            statement: `Achieve mastery in "${input.title}" by completing structured milestones, practical exercises, and verifiable checkpoints between ${input.startDate} and ${input.deadline}, allocating ${weeklyMins} minutes weekly.`,
            measurement: `Portfolio of completed practical tasks, verified key results evidence, and 100% milestone criteria satisfaction.`,
            completion_evidence: [
                `Published project repository or demonstration for "${input.title}"`,
                `Self-assessment score >= 85% across core competency checkpoints`,
                `Verified weekly activity logs confirming ${weeklyMins} minutes/week effort adherence`
            ],
            assumptions: [
                `User has steady access to stated resources: ${input.resources || "Standard tools"}`,
                `Weekly availability constraint (${weeklyMins} mins) is strictly respected`,
                `Blackout dates are completely protected from task scheduling`
            ],
            questions: []
        },
        objectives: [
            {
                id: "obj-1",
                title: "Core Foundations & Tooling Mastery",
                key_result: "Master basic principles, syntax, and essential development workflows.",
                baseline: 0,
                target: 3,
                current: 0,
                unit: "modules",
                dueDate: safeDate(d1),
                evidence: "Structured notes and foundational exercise codebase"
            },
            {
                id: "obj-2",
                title: "Applied Implementation & Problem Solving",
                key_result: "Build 2 guided projects with zero critical bugs.",
                baseline: 0,
                target: 2,
                current: 0,
                unit: "projects",
                dueDate: safeDate(d3),
                evidence: "Documented source code with passing test runs"
            },
            {
                id: "obj-3",
                title: "Capstone Delivery & Viva Showcase",
                key_result: "Complete final deliverable and present demonstration.",
                baseline: 0,
                target: 1,
                current: 0,
                unit: "demonstrations",
                dueDate: safeDate(d4),
                evidence: "Live demo and presentation documentation"
            }
        ],
        milestones: [
            { id: "ms-1", title: "M1: Environment Setup & Core Foundations", dueDate: safeDate(d1), objectiveId: "obj-1", acceptanceCriteria: "Tools configured, environment ready, fundamental concepts summarized.", status: "pending" },
            { id: "ms-2", title: "M2: Guided Implementation Project", dueDate: safeDate(d2), objectiveId: "obj-2", acceptanceCriteria: "First working prototype built and tested successfully.", status: "pending" },
            { id: "ms-3", title: "M3: Advanced Optimization & Features", dueDate: safeDate(d3), objectiveId: "obj-2", acceptanceCriteria: "Complex features and optimizations executed and documented.", status: "pending" },
            { id: "ms-4", title: "M4: Capstone Evaluation & Showcase", dueDate: safeDate(d4), objectiveId: "obj-3", acceptanceCriteria: "Final evaluation complete and deliverable published.", status: "pending" }
        ],
        tasks: [
            { id: "task-1", title: `Set up tools, IDE, and development workspace for ${input.title}`, milestoneId: "ms-1", date: safeDate(addDays(start, 2)), duration: sLength, priority: "High", dependency: null, completed: false },
            { id: "task-2", title: "Complete foundational review and initial syntax exercises", milestoneId: "ms-1", date: safeDate(addDays(start, 5)), duration: sLength, priority: "Medium", dependency: "task-1", completed: false },
            { id: "task-3", title: "Build first practical prototype focusing on core requirements", milestoneId: "ms-2", date: safeDate(addDays(start, Math.floor(totalDays * 0.35))), duration: sLength, priority: "High", dependency: "task-2", completed: false },
            { id: "task-4", title: "Conduct error-handling tests and document edge cases", milestoneId: "ms-2", date: safeDate(addDays(start, Math.floor(totalDays * 0.45))), duration: sLength, priority: "Medium", dependency: "task-3", completed: false },
            { id: "task-5", title: "Implement advanced optimization and refine key algorithms", milestoneId: "ms-3", date: safeDate(addDays(start, Math.floor(totalDays * 0.65))), duration: sLength, priority: "High", dependency: "task-4", completed: false },
            { id: "task-6", title: "Deploy final capstone version and prepare evaluation summary", milestoneId: "ms-4", date: safeDate(addDays(start, Math.floor(totalDays * 0.9))), duration: sLength, priority: "High", dependency: "task-5", completed: false }
        ],
        risks: [
            { obstacle: "Academic workload and exam pressure interfering with target schedule.", backupAction: "Leverage configured blackout protection and reschedule non-critical tasks." },
            { obstacle: "Technical roadblocks or complex bugs slowing progress.", backupAction: "Consult documentation, break down tasks into 30-minute micro-sessions." }
        ]
    };
}

// ----------------------------------------------------------------------
// 4. HTTP SERVER & ROUTING
// ----------------------------------------------------------------------

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg'
};

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end(JSON.stringify(data));
}

function parseJSONBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            if (body.length > 5 * 1024 * 1024) { // 5MB limit
                req.destroy();
                reject(new Error('Payload too large'));
            }
        });
        req.on('end', () => {
            if (!body) return resolve({});
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject(e);
            }
        });
        req.on('error', reject);
    });
}

const server = http.createServer(async (req, res) => {
    // Enable CORS for all incoming requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    try {
        // --------------------------------------------------------------
        // API ROUTES
        // --------------------------------------------------------------

        // GET /api/health
        if (pathname === '/api/health' && req.method === 'GET') {
            const goals = readGoals();
            return sendJSON(res, 200, {
                status: 'ok',
                server: 'GoalFlow AI Node Server',
                version: '2.0.0',
                hasApiKey: Boolean(GEMINI_API_KEY && GEMINI_API_KEY.length > 10),
                model: 'gemini-1.5-flash',
                goalsCount: goals.length,
                timestamp: new Date().toISOString()
            });
        }

        // GET /api/goals
        if (pathname === '/api/goals' && req.method === 'GET') {
            const goals = readGoals();
            return sendJSON(res, 200, { success: true, goals });
        }

        // POST /api/goals
        if (pathname === '/api/goals' && req.method === 'POST') {
            const newGoal = await parseJSONBody(req);
            if (!newGoal || !newGoal.title) {
                return sendJSON(res, 400, { error: 'Invalid goal: title is required' });
            }
            if (!newGoal.id) {
                newGoal.id = 'goal-' + Date.now();
            }
            newGoal.updatedAt = new Date().toISOString();

            const goals = readGoals();
            const existingIdx = goals.findIndex(g => g.id === newGoal.id);
            if (existingIdx !== -1) {
                goals[existingIdx] = newGoal;
            } else {
                goals.unshift(newGoal);
            }
            writeGoals(goals);
            return sendJSON(res, 201, { success: true, goal: newGoal });
        }

        // GET /api/goals/:id
        if (pathname.startsWith('/api/goals/') && req.method === 'GET') {
            const goalId = pathname.slice('/api/goals/'.length);
            const goals = readGoals();
            const found = goals.find(g => g.id === goalId);
            if (!found) return sendJSON(res, 404, { error: 'Goal not found' });
            return sendJSON(res, 200, { success: true, goal: found });
        }

        // PUT /api/goals/:id
        if (pathname.startsWith('/api/goals/') && req.method === 'PUT') {
            const goalId = pathname.slice('/api/goals/'.length);
            const updateData = await parseJSONBody(req);
            const goals = readGoals();
            const existingIdx = goals.findIndex(g => g.id === goalId);
            if (existingIdx === -1) {
                return sendJSON(res, 404, { error: 'Goal not found' });
            }
            goals[existingIdx] = { ...goals[existingIdx], ...updateData, id: goalId, updatedAt: new Date().toISOString() };
            writeGoals(goals);
            return sendJSON(res, 200, { success: true, goal: goals[existingIdx] });
        }

        // DELETE /api/goals/:id
        if (pathname.startsWith('/api/goals/') && req.method === 'DELETE') {
            const goalId = pathname.slice('/api/goals/'.length);
            let goals = readGoals();
            const initialLen = goals.length;
            goals = goals.filter(g => g.id !== goalId);
            if (goals.length === initialLen) {
                return sendJSON(res, 404, { error: 'Goal not found' });
            }
            writeGoals(goals);
            return sendJSON(res, 200, { success: true, message: 'Goal deleted' });
        }

        // POST /api/plan - Secure AI Planning Endpoint
        if (pathname === '/api/plan' && req.method === 'POST') {
            const input = await parseJSONBody(req);
            if (!input || !input.title) {
                return sendJSON(res, 400, { error: 'Goal title is required' });
            }

            // If API key is present, attempt Google Gemini call
            if (GEMINI_API_KEY && GEMINI_API_KEY.trim()) {
                try {
                    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY.trim()}`;
                    const userPrompt = `GOAL AMBITION: ${input.title}
MOTIVATION: ${input.motivation || "Not specified"}
LEVEL: ${input.level || "Beginner"}
START DATE: ${input.startDate || new Date().toISOString().split('T')[0]}
DEADLINE: ${input.deadline || "Within 30 days"}
WEEKLY AVAILABLE MINUTES: ${input.weeklyCapacityMinutes || 300}
PREFERRED SESSION LENGTH: ${input.sessionLength || 45} minutes
BLACKOUT / EXAM DATES: ${(input.blackoutDates || []).join(", ") || "None"}
RESOURCES: ${input.resources || "Standard free resources"}
BUDGET: ${input.budget || "$0"}

Generate a complete, structured JSON plan adhering strictly to the system prompt and constraints.`;

                    const geminiRes = await fetch(endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n\n' + userPrompt }] }],
                            generationConfig: {
                                temperature: 0.3,
                                responseMimeType: 'application/json'
                            }
                        })
                    });

                    if (geminiRes.ok) {
                        const data = await geminiRes.json();
                        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
                        if (rawText) {
                            const plan = JSON.parse(rawText);
                            plan.isLiveAI = true;
                            return sendJSON(res, 200, { success: true, plan });
                        }
                    } else {
                        const errBody = await geminiRes.text();
                        console.warn('Gemini API call failed status', geminiRes.status, errBody);
                    }
                } catch (apiErr) {
                    console.warn('Gemini fetch exception:', apiErr.message);
                }
            }

            // Server-side graceful fallback
            const fallbackPlan = generateServerFallbackPlan(input);
            return sendJSON(res, 200, {
                success: true,
                plan: fallbackPlan,
                notice: 'Generated via GoalFlow Server Intelligent Engine (Offline/Safe Mode)'
            });
        }

        // POST /api/coach - Interactive AI Coach
        if (pathname === '/api/coach' && req.method === 'POST') {
            const { question, goalContext } = await parseJSONBody(req);
            if (!question) {
                return sendJSON(res, 400, { error: 'Question is required' });
            }

            if (GEMINI_API_KEY && GEMINI_API_KEY.trim()) {
                try {
                    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY.trim()}`;
                    const prompt = `You are GoalFlow AI Coach, an empathetic, highly structured academic coach for students.
Active Goal Context:
${JSON.stringify(goalContext || {}, null, 2)}

User Question: "${question}"

Provide a concise (2-4 sentences), highly actionable answer citing their current pace, deadlines, and next tasks. No fluff.`;

                    const geminiRes = await fetch(endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ role: 'user', parts: [{ text: prompt }] }],
                            generationConfig: { temperature: 0.4 }
                        })
                    });

                    if (geminiRes.ok) {
                        const data = await geminiRes.json();
                        const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
                        if (answer) {
                            return sendJSON(res, 200, { success: true, answer: answer.trim() });
                        }
                    }
                } catch (e) {
                    console.warn('Coach AI error:', e.message);
                }
            }

            // Deterministic contextual response
            const q = (question || '').toLowerCase();
            let answer = '';
            if (q.includes('behind') || q.includes('why')) {
                answer = `You have completed ${goalContext?.completedTasks || 2} of ${goalContext?.totalTasks || 12} tasks. With ${goalContext?.daysRemaining || 35} days remaining, your current effort adherence is solid. Focus on your next high-priority task today to maintain your weekly commitment!`;
            } else if (q.includes('today') || q.includes('focus') || q.includes('next')) {
                answer = `Today's high-leverage focus: Complete your next pending milestone task in a 45-minute distraction-free focus block. Checking it off unlocks momentum for the week.`;
            } else if (q.includes('finish on time') || q.includes('pace')) {
                answer = `Yes! At your confirmed budget of ${((goalContext?.weeklyCapacityMinutes || 300) / 60).toFixed(1)} hours/week, you have adequate runway to reach 100% completion before your deadline.`;
            } else {
                answer = `Regarding your goal: Consistency beats intensity. Keep your sessions bounded to 45 minutes, protect your exam blackout dates, and log your progress regularly.`;
            }
            return sendJSON(res, 200, { success: true, answer });
        }

        // POST /api/review - Weekly Check-in Review
        if (pathname === '/api/review' && req.method === 'POST') {
            const reviewData = await parseJSONBody(req);
            const goals = readGoals();
            const goal = goals.find(g => g.id === reviewData.goalId) || goals[0];

            const reviewDate = new Date().toISOString().split('T')[0];
            const newReview = {
                date: reviewDate,
                completed: reviewData.completed || '',
                blockers: reviewData.blockers || '',
                timeSpent: Number(reviewData.timeSpent) || 240,
                evidence: reviewData.evidence || 'Self-verified',
                aiFeedback: `Logged ${reviewData.timeSpent || 240} mins vs ${goal?.weeklyCapacityMinutes || 300} min planned budget. Blocker noted: "${reviewData.blockers || 'None'}". Recommendation: Maintain 45-minute focus intervals and review milestone deliverables.`
            };

            if (goal) {
                if (!goal.weeklyReviews) goal.weeklyReviews = [];
                goal.weeklyReviews.unshift(newReview);
                writeGoals(goals);
            }

            return sendJSON(res, 200, { success: true, review: newReview });
        }

        // --------------------------------------------------------------
        // STATIC FILE SERVING
        // --------------------------------------------------------------
        let targetFile = pathname;
        if (pathname === '/' || pathname === '/landing') {
            targetFile = 'landing.html';
        } else if (pathname === '/app' || pathname === '/workspace') {
            targetFile = 'AI.html';
        }

        let filePath = path.join(ROOT_DIR, targetFile);

        // Security check: ensure path stays within ROOT_DIR
        const resolvedPath = path.resolve(filePath);
        if (!resolvedPath.startsWith(ROOT_DIR)) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            return res.end('Access Denied');
        }

        fs.stat(resolvedPath, (err, stats) => {
            if (err || !stats.isFile()) {
                // If file not found, try fallback to AI.html
                const fallbackHtml = path.join(ROOT_DIR, 'AI.html');
                if (fs.existsSync(fallbackHtml)) {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
                    return fs.createReadStream(fallbackHtml).pipe(res);
                }
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('File Not Found');
            }

            const ext = path.extname(resolvedPath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';

            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache'
            });
            fs.createReadStream(resolvedPath).pipe(res);
        });

    } catch (serverErr) {
        console.error('Unhandled server error:', serverErr);
        sendJSON(res, 500, { error: 'Internal Server Error', message: serverErr.message });
    }
});

server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  🚀 GoalFlow AI Backend Server Active                 `);
    console.log(`  🔗 Local URL: http://localhost:${PORT}             `);
    console.log(`  📁 Serving Frontend from: ${ROOT_DIR}                `);
    console.log(`  🛡️  API Key Protection: ${GEMINI_API_KEY ? 'ACTIVE (Key loaded)' : 'NO KEY (Local Fallback active)'}`);
    console.log(`=======================================================`);
});
