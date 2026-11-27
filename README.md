# GoalFlow AI — AI Goal Planning Assistant & Backend (UI/UX Pro Max Edition)

> **"Turn your ambition into an achievable plan. Turn your plan into progress."**

GoalFlow AI is an interactive, full-stack college project web application designed to transform vague student ambitions into measurable SMART goals, dated milestones, realistic 45-minute micro-tasks, risk controls, weekly reviews, and verifiable progress using Generative AI with a secure Node.js backend.

---

## 🌟 Key Capabilities & Viva Highlights

1. **Production Node.js Backend & API Security**:
   - Zero-dependency Node.js HTTP/REST server (`server/server.js`) on port `3000`.
   - **Critical API Security**: Completely hides the Google Gemini Auth Key (`AQ.Ab8RN6Jm...`) from the browser bundle by proxying calls through `POST /api/plan`, `POST /api/coach`, and `POST /api/review`.
   - **Persistent Server Store**: RESTful goal management (`GET`, `POST`, `PUT`, `DELETE` at `/api/goals`) stored in `server/data/goals.json`.
   - Serves static assets and provides an automated health-check at `GET /api/health`.

2. **Multi-Language (i18n) Support**:
   - Dynamic real-time language switcher in the header:
     - 🇬🇧 **English**
     - 🇮🇳 **हिन्दी (Hindi)**
     - 🇪🇸 **Español (Spanish)**
     - 🇫🇷 **Français (French)**
   - Translates navigation items, headings, wizard questions, buttons, metrics, and coach chips without requiring a page reload. Persists in `localStorage`.

3. **Spotlight Command Palette (`Cmd+K` / `Ctrl+K`)**:
   - Modern productivity tool UI (inspired by Linear and Raycast).
   - Press `⌘K` or click the search pill to filter and jump directly to any view, trigger quick exports, toggle themes, switch languages, or load demo goals.

4. **Web Audio API Sound Synthesizer**:
   - Built-in, zero-dependency audio synthesizer using browser `AudioContext`.
   - Produces subtle feedback clicks on navigation, bright harmonious chimes upon task completion, and celebratory fanfares when achieving 100% of a goal. Mute toggle included in header.

5. **5-Stage AI Planning Pipeline**:
   - `01 Clarify`: Converts fuzzy intentions into a formal SMART goal with measurement and completion evidence.
   - `02 Objectives`: Produces 2–3 measurable objectives with quantifiable Key Results.
   - `03 Milestones`: Chronological timeline with concrete acceptance criteria.
   - `04 Actions`: Breaks milestones into actionable tasks with durations, dependencies, and dates.
   - `05 Risks`: Identifies obstacles and engineers deterministic IF–THEN backup actions.
   - `✓ Validate`: Mathematical validation engine inspects the plan before user approval.

6. **Deterministic JavaScript Validation Engine**:
   - **No circular dependencies**: Graph cycle detection via Kahn's / DFS algorithm.
   - **Capacity overload protection**: Compares weekly workload against confirmed available minutes. Offers one-click repairs: *Reduce Scope*, *Extend Deadline*, or *Increase Hours*.
   - **Exam / Blackout date protection**: Strictly blocks scheduling tasks on exam days.
   - **Timeline bounds**: Verifies start date is before deadline and all tasks fall inside the window.

7. **Prompt Engineering Lab (College Viva Requirement)**:
   - Live interactive demonstration of 6 prompting techniques:
     1. Zero-Shot
     2. One-Shot
     3. Few-Shot
     4. Role-Based
     5. Contextual Constraints
     6. Iterative Repair (Feeding validator errors back to the model)
   - Baseline AI vs GoalFlow Pipeline side-by-side comparison.

---

## 📂 Project Structure

```text
Goal_Planning_AI/
├── server/
│   ├── server.js          # Production Node.js HTTP/REST backend & Gemini proxy
│   └── data/
│       └── goals.json     # Persistent server-side database
├── package.json           # Start and dev scripts
├── AI.html                # Enhanced UI (i18n, Command Palette, Sound Toggle)
├── AI.css                 # Dark navy glassmorphic design & responsive styles
├── AI.js                  # Frontend engine (API client, i18n, command palette, audio)
├── config.js              # Client fallback configuration
├── .env                   # GEMINI_API_KEY=AQ.Ab8RN6Jm...
├── .env.example           # Safe template for git
├── .gitignore             # Keeps private keys out of version control
├── GoalFlow_AI_Features_and_Architecture_Report.pdf  # 6-page comprehensive report
└── README.md              # Documentation & Viva Script
```

---

## 🚀 Quick Setup & How to Run

### Method 1: Start Full-Stack Node.js Backend (Recommended)
In the terminal, run:
```bash
cd "Goal_Planning_AI"
npm start
```
Or directly:
```bash
node server/server.js
```
The server will start at **`http://localhost:3000`**:
- Serves the frontend at `http://localhost:3000`
- Provides secure REST API at `http://localhost:3000/api/*`
- Connects securely to Google Gemini 1.5 Flash using the key from `.env`

### Method 2: Standalone Browser Mode (Zero Server)
Double-click `AI.html` or `index.html` in your file explorer.
GoalFlow AI automatically detects that the backend is offline, activates **Standalone Client Mode**, and uses the built-in intelligent local generator and LocalStorage.

---

## 🌐 REST API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Server health check, Gemini status, and goal count |
| `GET` | `/api/goals` | Retrieve all persistent goals |
| `POST` | `/api/goals` | Create or update a goal in `server/data/goals.json` |
| `GET` | `/api/goals/:id` | Retrieve a single goal by ID |
| `PUT` | `/api/goals/:id` | Update an existing goal |
| `DELETE` | `/api/goals/:id` | Delete a goal from server storage |
| `POST` | `/api/plan` | Secure Google Gemini 1.5 Flash planning proxy |
| `POST` | `/api/coach` | Interactive AI Coach answering contextual goal questions |
| `POST` | `/api/review` | Analyze weekly reflection and recommend schedule adjustments |

---

## ⌨️ Keyboard Shortcuts & UX Controls

- **`⌘K` or `Ctrl+K`**: Open the Spotlight Command Palette.
- **`↑` / `↓`**: Navigate items in the Command Palette.
- **`Enter`**: Execute selected command.
- **`Esc`**: Dismiss modals or close the Command Palette.
- **Header Language Selector**: Instant switch between English, Hindi (हिन्दी), Spanish, and French.
- **🔊 Button**: Toggle Web Audio sound effects on/off.
- **🌙 / ☀️ Button**: Toggle Dark / Light theme.
- **📽️ Presentation Mode**: Enter distraction-free viva walkthrough view.
# GoalFlow_AI
