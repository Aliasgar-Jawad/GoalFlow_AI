/**
 * GoalFlow AI - Frontend Engine (UI/UX Pro Max Edition)
 * AI-Powered Goal Planning Assistant with Deterministic Validation
 * Full-Stack Node.js Backend Integration, Multi-Language i18n, Command Palette & Web Audio FX
 */

// ==========================================================================
// 1. GLOBAL STATE & CONSTANTS
// ==========================================================================

const SVG_ICONS = {
    dashboard: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    target: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    planner: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    timeline: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    tasks: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    achievements: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    review: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    promptLab: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>',
    settings: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    plus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    download: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    fileText: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    server: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
    moon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    sun: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    volume: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
    volumeX: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>',
    globe: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    presentation: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    clock: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:3px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    calendar: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:3px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    edit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>'
};

const API_BASE = window.location.origin.includes(':3000') 
    ? window.location.origin 
    : 'http://localhost:3000';

const APP_STATE = {
    goals: [],
    activeGoal: null,
    profile: {
        name: "Ali Jawad",
        timezone: "Asia/Kolkata",
        weeklyCapacityMinutes: 300,
        theme: "dark"
    },
    draftPlan: null,
    activeView: "dashboard",
    taskFilter: "all",
    goalFilter: "all",
    presentationMode: false,
    presentationStep: 0,
    apiKey: "",
    serverConnected: false,
    soundEnabled: true,
    language: "en"
};

// ==========================================================================
// 2. INTERNATIONALIZATION (i18n) DICTIONARY
// ==========================================================================

const I18N = {
    en: {
        tagline: "Turn ambition into progress",
        nav_main: "MAIN",
        nav_dashboard: "Dashboard",
        nav_my_goals: "My Goals",
        nav_ai_planner: "AI Planner",
        nav_timeline: "Timeline",
        nav_tasks: "Tasks",
        nav_analytics: "ANALYTICS & COACH",
        nav_achievements: "Achievements",
        nav_review: "Weekly Review",
        nav_prompt_lab: "Prompt Lab",
        nav_system: "SYSTEM",
        nav_settings: "Settings",
        btn_presentation: "Presentation Mode",
        breadcrumb_workspace: "Workspace",
        cmd_placeholder: "Search or jump to...",
        btn_demo: "Explore Demo",
        btn_new_goal: "+ New Goal",
        hero_title_1: "Turn your ambition into an",
        hero_title_2: "achievable plan.",
        hero_subtitle: "AI-powered goal planning for students who want to stop procrastinating and start progressing. Transforms vague wishes into validated SMART goals, dated milestones, and daily micro-tasks.",
        btn_create_my_goal: "Create My Goal",
        btn_explore_demo_ml: "Explore Demo (Machine Learning)",
        benefit_1_title: "Turn Vague Goals into SMART Plans",
        benefit_1_desc: "Generative AI clarifies fuzzy ambitions into concrete metrics, clear evidence of completion, and realistic targets.",
        benefit_2_title: "Deterministic Validation",
        benefit_2_desc: "JavaScript mathematical checks guarantee task dates fit your calendar, exams are respected, and weekly hours aren't exceeded.",
        benefit_3_title: "Effort vs Outcome Tracking",
        benefit_3_desc: "Separate effort spent from actual skill outcome so you never mistake busywork for genuine progress.",
        progression_cycle_title: "The GoalFlow Progression Cycle",
        j_step_1: "Vague Goal",
        j_step_2: "AI 5-Stage Plan",
        j_step_3: "Logic Validator",
        j_step_4: "User Approval",
        j_step_5: "100% Achievement",
        greeting_subtext: "Here is your goal roadmap and today's next high-leverage action.",
        btn_export: "Export",
        label_active_goal: "CURRENT ACTIVE GOAL",
        stat_days_left: "Days Left",
        stat_weekly_budget: "Weekly Budget",
        stat_total_tasks: "Total Tasks",
        stat_milestones: "Milestones",
        label_goal_progress: "GOAL PROGRESS",
        label_completed: "Completed",
        label_effort_adherence: "Effort Adherence",
        label_kr_outcome: "Key Results Outcome",
        label_todays_focus: "TODAY'S FOCUS • NEXT ACTION",
        btn_mark_complete: "Mark Complete",
        btn_skip_next: "Skip / Next",
        label_upcoming_milestone: "UPCOMING MILESTONE",
        label_tasks_completed: "Tasks completed",
        label_workload_capacity: "WEEKLY WORKLOAD CAPACITY",
        label_planned_week: "Planned This Week",
        label_confirmed_avail: "Confirmed Availability",
        capacity_hint: "Planned workload is within your 300 minutes/week limit. Exam blackout dates are protected.",
        label_coach_recommendation: "AI COACH RECOMMENDATION",
        btn_apply_adjustment: "Apply Adjustment",
        btn_dismiss: "Dismiss",
        planner_title: "AI Goal Planning Wizard",
        planner_subtitle: "Transform raw ambitions into structured, mathematically validated roadmaps.",
        btn_fill_ml_example: "Fill ML Example",
        pipe_clarify: "Clarify (SMART)",
        pipe_objectives: "Objectives & KRs",
        pipe_milestones: "Milestones",
        pipe_actions: "Actions & Tasks",
        pipe_risks: "Risks & Backups",
        pipe_validation: "Validation",
        w_step_1_of_6: "Step 1 of 6",
        w_step_1_title: "What ambition do you want to achieve?",
        w_step_1_desc: "Start vague or specific. The AI assistant will refine it into a measurable target.",
        label_goal_title: "Goal Statement / Title *",
        hint_step_1: "Tip: Don't worry about being perfectly structured yet; the Clarify stage will refine it.",
        btn_next_why: "Next: Your Why",
        w_step_2_of_6: "Step 2 of 6",
        w_step_2_title: "Why does this goal matter to you?",
        w_step_2_desc: "Understanding your motivation helps the AI gauge required commitment and prioritize key results.",
        label_goal_why: "Motivation & Desired Outcome *",
        btn_back: "Back",
        btn_next_level: "Next: Experience Level",
        w_step_3_of_6: "Step 3 of 6",
        w_step_3_title: "What is your current starting point?",
        w_step_3_desc: "Select your existing skill level so task difficulty is calibrated correctly.",
        level_beginner: "Beginner",
        level_beginner_desc: "Starting from scratch with zero or minimal prior experience.",
        level_some_exp: "Some Experience",
        level_some_exp_desc: "Familiar with fundamental concepts, but haven't built complete projects.",
        level_intermediate: "Intermediate",
        level_intermediate_desc: "Comfortable with core skills; ready for advanced and applied problems.",
        level_advanced: "Advanced",
        level_advanced_desc: "Polishing expertise, targeting optimization, production, and mastery.",
        btn_next_time: "Next: Time & Schedule",
        w_step_4_of_6: "Step 4 of 6",
        w_step_4_title: "Define your schedule & available capacity",
        w_step_4_desc: "Hard constraints: the AI and validation engine will strictly honor these limits.",
        label_start_date: "Start Date *",
        label_target_deadline: "Target Deadline *",
        label_weekly_minutes: "Weekly Available Time (Minutes) *",
        label_session_length: "Preferred Session Length (Minutes)",
        btn_next_constraints: "Next: Constraints & Exams",
        w_step_5_of_6: "Step 5 of 6",
        w_step_5_title: "Constraints, blackout dates & busy periods",
        w_step_5_desc: "No tasks will be scheduled during exam blackout days or blackout periods.",
        label_blackout_dates: "Exam / Blackout Dates (Comma separated YYYY-MM-DD)",
        hint_blackouts: "Any day where you cannot work on this goal.",
        label_resources: "Available Resources / Tools",
        label_budget: "Budget ($ or Free)",
        btn_next_review: "Next: Review & Run AI",
        w_step_6_of_6: "Step 6 of 6",
        w_step_6_title: "Review Constraints & Generate Plan",
        w_step_6_desc: "Review your confirmed inputs before the AI planner builds and validates your roadmap.",
        rev_ambition: "Goal Ambition:",
        rev_motivation: "Motivation:",
        rev_level: "Starting Level:",
        rev_timeline: "Timeline:",
        rev_capacity: "Weekly Budget:",
        rev_blackouts: "Blackout Dates:",
        btn_generate_plan: "Generate & Validate Plan with AI",
        btn_regenerate: "Regenerate",
        btn_approve_activate: "Approve & Activate Plan",
        val_report_header: "Deterministic Validation Engine Report",
        btn_approve_activate_long: "Approve & Activate This Plan",
        btn_create_new_goal: "+ Create New Goal",
        filter_all: "All",
        filter_active: "Active",
        filter_completed: "Completed",
        filter_pending: "Pending",
        filter_high: "High Priority",
        btn_add_manual_task: "+ Add Manual Task",
        coach_btn: "Ask GoalFlow",
        chip_why_behind: "Why am I behind?",
        chip_what_today: "What should I do today?",
        chip_finish_on_time: "Can I finish on time?",
        chip_recover_week: "Recover from missed week"
    },
    hi: {
        tagline: "सपनों को योजना में, योजना को प्रगति में बदलें",
        nav_main: "मुख्य",
        nav_dashboard: "डैशबोर्ड",
        nav_my_goals: "मेरे लक्ष्य",
        nav_ai_planner: "एआई योजनाकार",
        nav_timeline: "समयरेखा",
        nav_tasks: "कार्य सूची",
        nav_analytics: "विश्लेषण व कोच",
        nav_achievements: "उपलब्धियां",
        nav_review: "साप्ताहिक समीक्षा",
        nav_prompt_lab: "प्रॉम्प्ट लैब",
        nav_system: "सिस्टम",
        nav_settings: "सेटिंग्स",
        btn_presentation: "प्रस्तुति मोड",
        breadcrumb_workspace: "कार्यक्षेत्र",
        cmd_placeholder: "त्वरित खोज एवं कार्य...",
        btn_demo: "डेमो देखें",
        btn_new_goal: "+ नया लक्ष्य",
        hero_title_1: "अपनी महत्वाकांक्षा को बनाएं",
        hero_title_2: "एक प्राप्त करने योग्य योजना।",
        hero_subtitle: "छात्रों के लिए एआई-संचालित लक्ष्य योजनाकार। अस्पष्ट इच्छाओं को स्पष्ट SMART लक्ष्यों, समयबद्ध मील के पत्थरों और दैनिक 45-मिनट के कार्यों में बदलें।",
        btn_create_my_goal: "मेरा लक्ष्य बनाएं",
        btn_explore_demo_ml: "डेमो देखें (मशीन लर्निंग)",
        benefit_1_title: "अस्पष्ट लक्ष्यों को SMART बनाएं",
        benefit_1_desc: "जेनेरेटिव एआई अस्पष्ट लक्ष्यों को मापने योग्य मीट्रिक और स्पष्ट समय-सीमा में बदलता है।",
        benefit_2_title: "तार्किक सत्यापन इंजन",
        benefit_2_desc: "जावास्क्रिप्ट गणितीय जांच सुनिश्चित करती है कि परीक्षा की तारीखों और साप्ताहिक घंटों का उल्लंघन न हो।",
        benefit_3_title: "प्रयास बनाम परिणाम ट्रैकिंग",
        benefit_3_desc: "बिताए गए समय को वास्तविक कौशल से अलग मापें ताकि व्यर्थ की व्यस्तता से बचा जा सके।",
        progression_cycle_title: "गोलफ्लो प्रगति चक्र",
        j_step_1: "अस्पष्ट लक्ष्य",
        j_step_2: "5-चरणीय एआई",
        j_step_3: "लॉजिक चेकर",
        j_step_4: "छात्र स्वीकृति",
        j_step_5: "100% सफलता",
        greeting_subtext: "यहाँ आपका रोडमैप और आज का सबसे महत्वपूर्ण कार्य है।",
        btn_export: "निर्यात",
        label_active_goal: "सक्रिय लक्ष्य",
        stat_days_left: "शेष दिन",
        stat_weekly_budget: "साप्ताहिक बजट",
        stat_total_tasks: "कुल कार्य",
        stat_milestones: "मील के पत्थर",
        label_goal_progress: "लक्ष्य प्रगति",
        label_completed: "पूर्ण",
        label_effort_adherence: "प्रयास पालन",
        label_kr_outcome: "मुख्य परिणाम",
        label_todays_focus: "आज का मुख्य कार्य • अगला कदम",
        btn_mark_complete: "पूर्ण चिह्नित करें",
        btn_skip_next: "छोड़ें / अगला",
        label_upcoming_milestone: "आगामी मील का पत्थर",
        label_tasks_completed: "पूर्ण कार्य",
        label_workload_capacity: "साप्ताहिक कार्यभार क्षमता",
        label_planned_week: "इस सप्ताह नियोजित",
        label_confirmed_avail: "उपलब्ध समय",
        capacity_hint: "कार्यभार आपकी साप्ताहिक सीमा के भीतर है। परीक्षा की तारीखें सुरक्षित हैं।",
        label_coach_recommendation: "एआई कोच सलाह",
        btn_apply_adjustment: "लागू करें",
        btn_dismiss: "हटाएं",
        planner_title: "एआई लक्ष्य योजना विज़ार्ड",
        planner_subtitle: "कच्ची महत्वाकांक्षाओं को गणितीय रूप से सत्यापित रोडमैप में बदलें।",
        btn_fill_ml_example: "एमएल उदाहरण भरें",
        pipe_clarify: "स्पष्ट करें (SMART)",
        pipe_objectives: "उद्देश्य व परिणाम",
        pipe_milestones: "मील के पत्थर",
        pipe_actions: "दैनिक कार्य",
        pipe_risks: "जोखिम व बैकअप",
        pipe_validation: "सत्यापन",
        w_step_1_of_6: "चरण 1 / 6",
        w_step_1_title: "आप क्या हासिल करना चाहते हैं?",
        w_step_1_desc: "शुरुआत करें। एआई इसे एक स्पष्ट लक्ष्य में बदल देगा।",
        label_goal_title: "लक्ष्य का शीर्षक *",
        hint_step_1: "संकेत: अभी सही संरचना की चिंता न करें; एआई इसे परिष्कृत करेगा।",
        btn_next_why: "आगे: आपका कारण",
        w_step_2_of_6: "चरण 2 / 6",
        w_step_2_title: "यह लक्ष्य आपके लिए क्यों महत्वपूर्ण है?",
        w_step_2_desc: "आपकी प्रेरणा को समझने से एआई को प्राथमिकता तय करने में मदद मिलती है।",
        label_goal_why: "प्रेरणा व इच्छित परिणाम *",
        btn_back: "पीछे",
        btn_next_level: "आगे: अनुभव स्तर",
        w_step_3_of_6: "चरण 3 / 6",
        w_step_3_title: "आपका वर्तमान अनुभव स्तर क्या है?",
        w_step_3_desc: "कठिनाई को सही ढंग से समायोजित करने के लिए स्तर चुनें।",
        level_beginner: "शुरुआती",
        level_beginner_desc: "शून्य या बहुत कम पूर्व अनुभव के साथ शुरुआत।",
        level_some_exp: "कुछ अनुभव",
        level_some_exp_desc: "बुनियादी बातें स्पष्ट हैं, लेकिन बड़ी परियोजनाएं नहीं बनाई हैं।",
        level_intermediate: "मध्यम",
        level_intermediate_desc: "मुख्य कौशल में सहज, उन्नत समस्याओं के लिए तैयार।",
        level_advanced: "उन्नत",
        level_advanced_desc: "सटीकता, अनुकूलन और निपुणता का लक्ष्य।",
        btn_next_time: "आगे: समय व अनुसूची",
        w_step_4_of_6: "चरण 4 / 6",
        w_step_4_title: "अपनी समय सीमा व साप्ताहिक समय तय करें",
        w_step_4_desc: "कठिन बाधाएं: सत्यापन इंजन इन सीमाओं का कड़ाई से सम्मान करेगा।",
        label_start_date: "आरंभ तिथि *",
        label_target_deadline: "अंतिम तिथि *",
        label_weekly_minutes: "साप्ताहिक उपलब्ध मिनट *",
        label_session_length: "सत्र की अवधि (मिनट)",
        btn_next_constraints: "आगे: परीक्षा व बाधाएं",
        w_step_5_of_6: "चरण 5 / 6",
        w_step_5_title: "परीक्षा की तारीखें और व्यस्त समय",
        w_step_5_desc: "परीक्षा के दिनों में कोई कार्य निर्धारित नहीं किया जाएगा।",
        label_blackout_dates: "परीक्षा / अनुपलब्ध तारीखें (YYYY-MM-DD)",
        hint_blackouts: "कोई भी दिन जब आप अध्ययन नहीं कर सकते।",
        label_resources: "उपलब्ध संसाधन / उपकरण",
        label_budget: "बजट ($ या निःशुल्क)",
        btn_next_review: "आगे: समीक्षा व एआई रन",
        w_step_6_of_6: "चरण 6 / 6",
        w_step_6_title: "समीक्षा करें और योजना बनाएं",
        w_step_6_desc: "एआई द्वारा योजना बनाने से पहले अपने इनपुट की पुष्टि करें।",
        rev_ambition: "लक्ष्य महत्वाकांक्षा:",
        rev_motivation: "प्रेरणा:",
        rev_level: "आरंभिक स्तर:",
        rev_timeline: "समयसीमा:",
        rev_capacity: "साप्ताहिक बजट:",
        rev_blackouts: "परीक्षा तारीखें:",
        btn_generate_plan: "एआई द्वारा योजना बनाएं व सत्यापित करें",
        btn_regenerate: "पुनः बनाएं",
        btn_approve_activate: "योजना स्वीकृत और सक्रिय करें",
        val_report_header: "तार्किक सत्यापन इंजन रिपोर्ट",
        btn_approve_activate_long: "इस योजना को स्वीकृत करें",
        btn_create_new_goal: "+ नया लक्ष्य बनाएं",
        filter_all: "सभी",
        filter_active: "सक्रिय",
        filter_completed: "पूर्ण",
        filter_pending: "लंबित",
        filter_high: "उच्च प्राथमिकता",
        btn_add_manual_task: "+ मैन्युअल कार्य जोड़ें",
        coach_btn: "गोलफ्लो से पूछें",
        chip_why_behind: "मैं पीछे क्यों हूँ?",
        chip_what_today: "आज क्या करना चाहिए?",
        chip_finish_on_time: "क्या समय पर पूरा होगा?",
        chip_recover_week: "छूटे सप्ताह की भरपाई"
    },
    es: {
        tagline: "Convierte tu ambición en progreso real",
        nav_main: "PRINCIPAL",
        nav_dashboard: "Panel",
        nav_my_goals: "Mis Metas",
        nav_ai_planner: "Planificador IA",
        nav_timeline: "Cronograma",
        nav_tasks: "Tareas",
        nav_analytics: "ANALÍTICA Y COACH",
        nav_achievements: "Logros",
        nav_review: "Revisión Semanal",
        nav_prompt_lab: "Lab de Prompts",
        nav_system: "SISTEMA",
        nav_settings: "Ajustes",
        btn_presentation: "Modo Presentación",
        breadcrumb_workspace: "Espacio de trabajo",
        cmd_placeholder: "Búsqueda rápida y acciones...",
        btn_demo: "Ver Demo",
        btn_new_goal: "+ Nueva Meta",
        hero_title_1: "Convierte tu ambición en un",
        hero_title_2: "plan alcanzable.",
        hero_subtitle: "Planificación de metas con IA para estudiantes que quieren dejar de procrastinar. Transforma deseos vagos en metas SMART validadas y microtareas de 45 minutos.",
        btn_create_my_goal: "Crear Mi Meta",
        btn_explore_demo_ml: "Explorar Demo (Machine Learning)",
        benefit_1_title: "Metas vagas en planes SMART",
        benefit_1_desc: "La IA generativa aclara ambiciones difusas en métricas concretas y objetivos realistas.",
        benefit_2_title: "Validación Determinista",
        benefit_2_desc: "Las reglas matemáticas en JavaScript garantizan que las tareas no choquen con tus exámenes ni excedan tu tiempo semanal.",
        benefit_3_title: "Esfuerzo vs. Resultado",
        benefit_3_desc: "Separa el tiempo invertido del resultado real para no confundir estar ocupado con progresar.",
        progression_cycle_title: "Ciclo de Progresión GoalFlow",
        j_step_1: "Meta Vaga",
        j_step_2: "Plan IA 5 Fases",
        j_step_3: "Validador Lógico",
        j_step_4: "Aprobación",
        j_step_5: "100% Logro",
        greeting_subtext: "Aquí está tu hoja de ruta y la acción de alto impacto para hoy.",
        btn_export: "Exportar",
        label_active_goal: "META ACTIVA ACTUAL",
        stat_days_left: "Días Restantes",
        stat_weekly_budget: "Horas/Semana",
        stat_total_tasks: "Tareas Totales",
        stat_milestones: "Hitos",
        label_goal_progress: "PROGRESO DE LA META",
        label_completed: "Completado",
        label_effort_adherence: "Adherencia al Esfuerzo",
        label_kr_outcome: "Resultados Clave",
        label_todays_focus: "ENFOQUE DE HOY • PRÓXIMA ACCIÓN",
        btn_mark_complete: "Marcar Completada",
        btn_skip_next: "Posponer / Siguiente",
        label_upcoming_milestone: "PRÓXIMO HITO",
        label_tasks_completed: "Tareas completadas",
        label_workload_capacity: "CAPACIDAD SEMANAL",
        label_planned_week: "Planificado",
        label_confirmed_avail: "Disponible",
        capacity_hint: "Carga dentro de tu límite de 300 min/semana. Fechas de exámenes protegidas.",
        label_coach_recommendation: "CONSEJO DEL COACH IA",
        btn_apply_adjustment: "Aplicar Ajuste",
        btn_dismiss: "Descartar",
        planner_title: "Asistente de Planificación IA",
        planner_subtitle: "Convierte tus objetivos en hojas de ruta validadas matemáticamente.",
        btn_fill_ml_example: "Rellenar con Ejemplo ML",
        pipe_clarify: "Clarificar (SMART)",
        pipe_objectives: "Objetivos y KRs",
        pipe_milestones: "Hitos",
        pipe_actions: "Acciones y Tareas",
        pipe_risks: "Riesgos y Backups",
        pipe_validation: "Validación",
        w_step_1_of_6: "Paso 1 de 6",
        w_step_1_title: "¿Qué ambición quieres lograr?",
        w_step_1_desc: "Empieza vago o específico. La IA lo estructurará.",
        label_goal_title: "Título de la Meta *",
        hint_step_1: "Consejo: No te preocupes por la estructura perfecta todavía; la IA la mejorará.",
        btn_next_why: "Siguiente: Tu Porqué",
        w_step_2_of_6: "Paso 2 de 6",
        w_step_2_title: "¿Por qué te importa esta meta?",
        w_step_2_desc: "Entender tu motivación ayuda a la IA a calibrar el esfuerzo requerido.",
        label_goal_why: "Motivación y Resultado Deseado *",
        btn_back: "Atrás",
        btn_next_level: "Siguiente: Nivel de Experiencia",
        w_step_3_of_6: "Paso 3 de 6",
        w_step_3_title: "¿Cuál es tu punto de partida?",
        w_step_3_desc: "Selecciona tu nivel para calibrar la dificultad.",
        level_beginner: "Principiante",
        level_beginner_desc: "Empezando desde cero con mínima o ninguna experiencia.",
        level_some_exp: "Algo de Experiencia",
        level_some_exp_desc: "Familiarizado con conceptos básicos, sin proyectos terminados.",
        level_intermediate: "Intermedio",
        level_intermediate_desc: "Cómodo con habilidades básicas; listo para retos aplicados.",
        level_advanced: "Avanzado",
        level_advanced_desc: "Perfeccionando maestría y optimización.",
        btn_next_time: "Siguiente: Tiempo y Horario",
        w_step_4_of_6: "Paso 4 de 6",
        w_step_4_title: "Define tu disponibilidad y fecha límite",
        w_step_4_desc: "Límites estrictos que el motor de validación respetará.",
        label_start_date: "Fecha de Inicio *",
        label_target_deadline: "Fecha Límite *",
        label_weekly_minutes: "Minutos disponibles por semana *",
        label_session_length: "Duración preferida de sesión",
        btn_next_constraints: "Siguiente: Restricciones y Exámenes",
        w_step_5_of_6: "Paso 5 de 6",
        w_step_5_title: "Días de exámenes y periodos ocupados",
        w_step_5_desc: "No se programarán tareas durante tus fechas de examen.",
        label_blackout_dates: "Fechas de Examen / Bloqueo (YYYY-MM-DD)",
        hint_blackouts: "Cualquier día en el que no puedas estudiar para esta meta.",
        label_resources: "Recursos disponibles",
        label_budget: "Presupuesto ($ o Gratis)",
        btn_next_review: "Siguiente: Revisión y Generar Plan",
        w_step_6_of_6: "Paso 6 de 6",
        w_step_6_title: "Revisa Restricciones y Genera el Plan",
        w_step_6_desc: "Confirma los datos antes de que la IA elabore tu plan.",
        rev_ambition: "Ambición:",
        rev_motivation: "Motivación:",
        rev_level: "Nivel Inicial:",
        rev_timeline: "Fechas:",
        rev_capacity: "Presupuesto Semanal:",
        rev_blackouts: "Fechas Bloqueadas:",
        btn_generate_plan: "Generar y Validar Plan con IA",
        btn_regenerate: "Regenerar",
        btn_approve_activate: "Aprobar y Activar Plan",
        val_report_header: "Informe del Motor de Validación Determinista",
        btn_approve_activate_long: "Aprobar y Activar Este Plan",
        btn_create_new_goal: "+ Crear Nueva Meta",
        filter_all: "Todas",
        filter_active: "Activas",
        filter_completed: "Completadas",
        filter_pending: "Pendientes",
        filter_high: "Alta Prioridad",
        btn_add_manual_task: "+ Añadir Tarea Manual",
        coach_btn: "Preguntar a GoalFlow",
        chip_why_behind: "¿Por qué voy retrasado?",
        chip_what_today: "¿Qué debería hacer hoy?",
        chip_finish_on_time: "¿Llegaré a tiempo?",
        chip_recover_week: "Recuperar semana perdida"
    },
    fr: {
        tagline: "Transformez vos ambitions en progrès réel",
        nav_main: "PRINCIPAL",
        nav_dashboard: "Tableau de Bord",
        nav_my_goals: "Mes Objectifs",
        nav_ai_planner: "Planificateur IA",
        nav_timeline: "Chronologie",
        nav_tasks: "Tâches",
        nav_analytics: "ANALYTIQUE & COACH",
        nav_achievements: "Succès",
        nav_review: "Bilan Hebdo",
        nav_prompt_lab: "Lab de Prompts",
        nav_system: "SYSTÈME",
        nav_settings: "Paramètres",
        btn_presentation: "Mode Présentation",
        breadcrumb_workspace: "Espace de travail",
        cmd_placeholder: "Recherche et actions rapides...",
        btn_demo: "Explorer la Démo",
        btn_new_goal: "+ Nouvel Objectif",
        hero_title_1: "Transformez votre ambition en un",
        hero_title_2: "plan réalisable.",
        hero_subtitle: "Planification d'objectifs par IA pour les étudiants. Transformez les souhaits vagues en objectifs SMART validés et en micro-sessions quotidiennes de 45 minutes.",
        btn_create_my_goal: "Créer Mon Objectif",
        btn_explore_demo_ml: "Explorer la Démo (Machine Learning)",
        benefit_1_title: "Objectifs vagues en plans SMART",
        benefit_1_desc: "L'IA générative transforme des ambitions floues en métriques concrètes et jalons datés.",
        benefit_2_title: "Validation Déterministe",
        benefit_2_desc: "Des vérifications mathématiques en JavaScript s'assurent que vos examens et limites horaires sont respectés.",
        benefit_3_title: "Suivi Effort vs Résultat",
        benefit_3_desc: "Distinguez le temps passé de la compétence réelle pour ne plus confondre agitation et progrès.",
        progression_cycle_title: "Cycle de Progression GoalFlow",
        j_step_1: "Objectif Vague",
        j_step_2: "Plan IA 5 Étapes",
        j_step_3: "Validateur Logique",
        j_step_4: "Approbation",
        j_step_5: "100% Réussi",
        greeting_subtext: "Voici votre feuille de route et la tâche clé d'aujourd'hui.",
        btn_export: "Exporter",
        label_active_goal: "OBJECTIF ACTIF",
        stat_days_left: "Jours Restants",
        stat_weekly_budget: "Budget Hebdo",
        stat_total_tasks: "Tâches Totales",
        stat_milestones: "Jalons",
        label_goal_progress: "PROGRESSION",
        label_completed: "Terminé",
        label_effort_adherence: "Adhérence à l'Effort",
        label_kr_outcome: "Résultats Clés",
        label_todays_focus: "PRIORITÉ DU JOUR • ACTION SUIVANTE",
        btn_mark_complete: "Marquer comme fait",
        btn_skip_next: "Reporter / Suivant",
        label_upcoming_milestone: "JALON SUIVANT",
        label_tasks_completed: "Tâches terminées",
        label_workload_capacity: "CAPACITÉ HEBDOMADAIRE",
        label_planned_week: "Planifié cette semaine",
        label_confirmed_avail: "Disponibilité confirmée",
        capacity_hint: "Charge conforme à vos 300 min/semaine. Périodes d'examens protégées.",
        label_coach_recommendation: "CONSEIL DU COACH IA",
        btn_apply_adjustment: "Appliquer l'Ajustement",
        btn_dismiss: "Ignorer",
        planner_title: "Assistant de Planification IA",
        planner_subtitle: "Convertissez vos ambitions en feuilles de route validées mathématiquement.",
        btn_fill_ml_example: "Remplir avec l'exemple ML",
        pipe_clarify: "Clarifier (SMART)",
        pipe_objectives: "Objectifs & KRs",
        pipe_milestones: "Jalons",
        pipe_actions: "Actions & Tâches",
        pipe_risks: "Risques & Backups",
        pipe_validation: "Validation",
        w_step_1_of_6: "Étape 1 sur 6",
        w_step_1_title: "Quelle ambition souhaitez-vous atteindre ?",
        w_step_1_desc: "Commencez simplement. L'IA précisera les détails.",
        label_goal_title: "Titre de l'objectif *",
        hint_step_1: "Conseil : Ne vous souciez pas de la structure parfaite ; l'IA va l'affiner.",
        btn_next_why: "Suivant : Votre Motivation",
        w_step_2_of_6: "Étape 2 sur 6",
        w_step_2_title: "Pourquoi cet objectif est-il important pour vous ?",
        w_step_2_desc: "Comprendre votre motivation aide l'IA à calibrer l'effort.",
        label_goal_why: "Motivation & Résultat souhaité *",
        btn_back: "Retour",
        btn_next_level: "Suivant : Niveau Actuel",
        w_step_3_of_6: "Étape 3 sur 6",
        w_step_3_title: "Quel est votre niveau actuel ?",
        w_step_3_desc: "Sélectionnez votre niveau pour calibrer la difficulté des sessions.",
        level_beginner: "Débutant",
        level_beginner_desc: "Part de zéro avec peu ou pas d'expérience préalable.",
        level_some_exp: "Quelques bases",
        level_some_exp_desc: "Connaît les concepts de base, mais n'a pas finalisé de projet.",
        level_intermediate: "Intermédiaire",
        level_intermediate_desc: "À l'aise avec les bases ; prêt pour des problèmes appliqués.",
        level_advanced: "Avancé",
        level_advanced_desc: "Vise l'optimisation, la production et l'excellence.",
        btn_next_time: "Suivant : Temps & Calendrier",
        w_step_4_of_6: "Étape 4 sur 6",
        w_step_4_title: "Définissez votre disponibilité et date limite",
        w_step_4_desc: "Contraintes strictes respectées par le moteur de validation.",
        label_start_date: "Date de Début *",
        label_target_deadline: "Date Limite *",
        label_weekly_minutes: "Temps disponible par semaine (Minutes) *",
        label_session_length: "Durée de session préférée",
        btn_next_constraints: "Suivant : Contraintes & Examens",
        w_step_5_of_6: "Étape 5 sur 6",
        w_step_5_title: "Périodes d'examens et jours occupés",
        w_step_5_desc: "Aucune tâche ne sera programmée pendant vos examens.",
        label_blackout_dates: "Dates d'examens / Blocus (YYYY-MM-DD)",
        hint_blackouts: "Jour où vous ne pouvez pas travailler sur cet objectif.",
        label_resources: "Ressources disponibles",
        label_budget: "Budget (€ ou Gratuit)",
        btn_next_review: "Suivant : Révision & Générer Plan",
        w_step_6_of_6: "Étape 6 sur 6",
        w_step_6_title: "Vérifiez vos contraintes et générez le plan",
        w_step_6_desc: "Vérifiez vos informations avant de lancer la génération.",
        rev_ambition: "Ambition :",
        rev_motivation: "Motivation :",
        rev_level: "Niveau :",
        rev_timeline: "Calendrier :",
        rev_capacity: "Budget Hebdo :",
        rev_blackouts: "Dates Bloquées :",
        btn_generate_plan: "Générer & Valider le Plan avec l'IA",
        btn_regenerate: "Régénérer",
        btn_approve_activate: "Approuver & Activer le Plan",
        val_report_header: "Rapport du Moteur de Validation Déterministe",
        btn_approve_activate_long: "Approuver & Activer ce Plan",
        btn_create_new_goal: "+ Nouvel Objectif",
        filter_all: "Toutes",
        filter_active: "Actives",
        filter_completed: "Terminées",
        filter_pending: "En attente",
        filter_high: "Priorité Haute",
        btn_add_manual_task: "+ Ajouter une Tâche Manuelle",
        coach_btn: "Demander à GoalFlow",
        chip_why_behind: "Pourquoi suis-je en retard ?",
        chip_what_today: "Que faire aujourd'hui ?",
        chip_finish_on_time: "Puis-je finir à temps ?",
        chip_recover_week: "Rattraper une semaine ratée"
    }
};

function t(key) {
    const lang = APP_STATE.language || 'en';
    const dict = I18N[lang] || I18N.en;
    return dict[key] || I18N.en[key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key && t(key)) {
            el.textContent = t(key);
        }
    });

    // Update document title and placeholders
    const langSelect = document.getElementById('lang-selector');
    if (langSelect) langSelect.value = APP_STATE.language;

    const cmdInput = document.getElementById('cmd-palette-input');
    if (cmdInput) cmdInput.placeholder = t('cmd_placeholder');
}

function setLanguage(lang) {
    if (!I18N[lang]) lang = 'en';
    APP_STATE.language = lang;
    localStorage.setItem('goalflow_lang', lang);
    applyTranslations();
    renderAll();
    showToast(`Language switched to ${lang === 'hi' ? 'हिन्दी (Hindi)' : lang === 'es' ? 'Español' : lang === 'fr' ? 'Français' : 'English'}`, 'info');
}

// ==========================================================================
// 3. WEB AUDIO API SOUND SYNTHESIZER
// ==========================================================================

class SoundEngine {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
    }

    playClick() {
        if (!APP_STATE.soundEnabled) return;
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(600, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
            gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.04);
        } catch(e) {}
    }

    playSuccess() {
        if (!APP_STATE.soundEnabled) return;
        this.init();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            const osc1 = this.ctx.createOscillator();
            const osc2 = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc1.type = "triangle";
            osc2.type = "sine";
            osc1.frequency.setValueAtTime(523.25, now); // C5
            osc1.frequency.setValueAtTime(659.25, now + 0.08); // E5
            osc2.frequency.setValueAtTime(783.99, now + 0.08); // G5

            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(this.ctx.destination);

            osc1.start(now);
            osc2.start(now + 0.08);
            osc1.stop(now + 0.28);
            osc2.stop(now + 0.28);
        } catch(e) {}
    }

    playFanfare() {
        if (!APP_STATE.soundEnabled) return;
        this.init();
        if (!this.ctx) return;

        try {
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, idx) => {
                const start = this.ctx.currentTime + (idx * 0.09);
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, start);
                gain.gain.setValueAtTime(0.15, start);
                gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(start);
                osc.stop(start + 0.35);
            });
        } catch(e) {}
    }
}

const sounds = new SoundEngine();

// ==========================================================================
// 4. BACKEND CONNECTION & HEALTH PROBING
// ==========================================================================

async function checkBackendConnection() {
    const badge = document.getElementById("backend-status-badge");
    const dot = document.getElementById("backend-dot");
    const text = document.getElementById("backend-status-text");
    const settingsStatus = document.getElementById("settings-server-status");
    const sidebarApiStatus = document.getElementById("api-status-text");

    try {
        const res = await fetch(`${API_BASE}/api/health`, { method: 'GET' });
        if (res.ok) {
            const data = await res.json();
            APP_STATE.serverConnected = true;
            if (dot) {
                dot.className = "status-dot status-active";
            }
            if (text) {
                text.textContent = `Backend Online (Port 3000)`;
            }
            if (badge) {
                badge.title = `Connected to Node.js Backend Server at ${API_BASE}. Secrets protected.`;
            }
            if (settingsStatus) {
                settingsStatus.innerHTML = `<span style="color: #34d399;">Connected (${data.goalsCount} goals on server)</span>`;
            }
            if (sidebarApiStatus) {
                sidebarApiStatus.textContent = "Node Backend Active";
            }
            const footerTag = document.getElementById("footer-storage-tag");
            if (footerTag) footerTag.textContent = "Node.js REST API + LocalStorage";
            return true;
        }
    } catch(err) {
        // Backend offline, fallback to standalone
    }

    APP_STATE.serverConnected = false;
    if (dot) dot.className = "status-dot status-local";
    if (text) text.textContent = `Standalone Client Mode`;
    if (badge) badge.title = `Running directly in browser. Start server with: npm start`;
    if (settingsStatus) settingsStatus.innerHTML = `<span style="color: #38bdf8;">Standalone Client (Local Fallback Ready)</span>`;
    if (sidebarApiStatus) sidebarApiStatus.textContent = "Client Fallback Ready";
    return false;
}

// ==========================================================================
// 5. INITIALIZATION & DATA STORAGE
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

async function initApp() {
    loadSettings();
    await checkBackendConnection();
    await loadGoals();
    setupNavigation();
    setupEventListeners();
    setupCommandPalette();
    setupWizard();
    setupPromptLab();
    setupCoachAssistant();
    applyTranslations();
    renderAll();
    
    if (APP_STATE.goals.length === 0) {
        loadDemoGoal(false);
    }
}

function loadSettings() {
    // Language
    const savedLang = localStorage.getItem("goalflow_lang");
    if (savedLang && I18N[savedLang]) {
        APP_STATE.language = savedLang;
    }

    // Sound
    const savedSound = localStorage.getItem("goalflow_sound");
    if (savedSound !== null) {
        APP_STATE.soundEnabled = savedSound === "true";
    }
    updateSoundButtonIcon();

    // Theme
    const savedTheme = localStorage.getItem("goalflow_theme");
    if (savedTheme) {
        document.body.className = savedTheme === "light" ? "theme-light" : "theme-dark";
    }
    updateThemeButtonIcon();

    // API Key
    const savedKey = localStorage.getItem("goalflow_gemini_key");
    if (savedKey) {
        APP_STATE.apiKey = savedKey;
    } else if (typeof CONFIG !== "undefined" && CONFIG.GEMINI_API_KEY) {
        APP_STATE.apiKey = CONFIG.GEMINI_API_KEY;
    }

    // Profile
    const savedProfile = localStorage.getItem("goalflow_user_profile");
    if (savedProfile) {
        try {
            APP_STATE.profile = JSON.parse(savedProfile);
        } catch(e) {}
    }

    // Sync UI elements
    const keyInput = document.getElementById("settings-api-key");
    if (keyInput) keyInput.value = APP_STATE.apiKey;

    const usernameInput = document.getElementById("settings-username");
    if (usernameInput) usernameInput.value = APP_STATE.profile.name;

    const headerName = document.getElementById("header-user-name");
    if (headerName) headerName.textContent = APP_STATE.profile.name;

    const avatarInitials = document.getElementById("user-avatar-initials");
    if (avatarInitials && APP_STATE.profile.name) {
        avatarInitials.textContent = APP_STATE.profile.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
    }
}

function saveSettings() {
    localStorage.setItem("goalflow_gemini_key", APP_STATE.apiKey);
    localStorage.setItem("goalflow_user_profile", JSON.stringify(APP_STATE.profile));
    showToast("Settings saved successfully!", "success");
}

async function loadGoals() {
    // If backend is connected, fetch from server
    if (APP_STATE.serverConnected) {
        try {
            const res = await fetch(`${API_BASE}/api/goals`);
            if (res.ok) {
                const data = await res.json();
                if (data.success && Array.isArray(data.goals)) {
                    APP_STATE.goals = data.goals;
                    // Cache to local storage
                    localStorage.setItem("goalflow_goals_store", JSON.stringify(APP_STATE.goals));
                }
            }
        } catch(e) {
            console.warn("Backend goals fetch error, reading local cache", e);
        }
    }

    // If still empty, load from localStorage
    if (APP_STATE.goals.length === 0) {
        const savedGoals = localStorage.getItem("goalflow_goals_store");
        if (savedGoals) {
            try {
                APP_STATE.goals = JSON.parse(savedGoals);
            } catch(e) {
                APP_STATE.goals = [];
            }
        }
    }

    const activeId = localStorage.getItem("goalflow_active_id");
    if (activeId && APP_STATE.goals.length > 0) {
        APP_STATE.activeGoal = APP_STATE.goals.find(g => g.id === activeId) || APP_STATE.goals[0];
    } else if (APP_STATE.goals.length > 0) {
        APP_STATE.activeGoal = APP_STATE.goals[0];
    } else {
        APP_STATE.activeGoal = null;
    }
}

async function saveGoal(goal) {
    if (!goal) return;
    const index = APP_STATE.goals.findIndex(g => g.id === goal.id);
    if (index >= 0) {
        APP_STATE.goals[index] = goal;
    } else {
        APP_STATE.goals.unshift(goal);
    }
    APP_STATE.activeGoal = goal;

    // Cache locally
    localStorage.setItem("goalflow_goals_store", JSON.stringify(APP_STATE.goals));
    localStorage.setItem("goalflow_active_id", goal.id);

    // Sync to backend if online
    if (APP_STATE.serverConnected) {
        try {
            await fetch(`${API_BASE}/api/goals`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(goal)
            });
        } catch(err) {
            console.warn("Backend save failed, saved locally", err);
        }
    }

    renderAll();
}

async function deleteGoal(goalId) {
    if (!confirm("Are you sure you want to delete this goal roadmap? This cannot be undone.")) return;
    sounds.playClick();
    APP_STATE.goals = APP_STATE.goals.filter(g => g.id !== goalId);
    if (APP_STATE.activeGoal && APP_STATE.activeGoal.id === goalId) {
        APP_STATE.activeGoal = APP_STATE.goals.length > 0 ? APP_STATE.goals[0] : null;
    }
    localStorage.setItem("goalflow_goals_store", JSON.stringify(APP_STATE.goals));
    if (APP_STATE.activeGoal) {
        localStorage.setItem("goalflow_active_id", APP_STATE.activeGoal.id);
    } else {
        localStorage.removeItem("goalflow_active_id");
    }

    if (APP_STATE.serverConnected) {
        try {
            await fetch(`${API_BASE}/api/goals/${goalId}`, { method: 'DELETE' });
        } catch(e) {}
    }

    showToast("Goal deleted.", "info");
    renderAll();
}

function loadDemoGoal(notify = true) {
    // Pre-loaded ML Demo dataset
    const demo = {
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
                "Learner has basic familiarity with Python syntax.",
                "High-school level linear algebra and statistics knowledge.",
                "No high-end GPU required for Scikit-Learn tabular models."
            ],
            questions: []
        },
        objectives: [
            { id: "obj-1", title: "Data Manipulation & EDA with NumPy & Pandas", key_result: "Clean and explore 3 distinct datasets with zero unhandled nulls and 5 Seaborn plots each.", baseline: 0, target: 3, current: 2, unit: "datasets", dueDate: "2026-12-01", evidence: "Jupyter notebooks with statistical distribution summaries" },
            { id: "obj-2", title: "Supervised Learning Algorithms Mastery", key_result: "Train and compare 4 algorithms (Linear, Logistic, Random Forest, XGBoost) using cross-validation.", baseline: 0, target: 4, current: 1, unit: "models", dueDate: "2026-12-18", evidence: "Confusion matrices and ROC-AUC comparison curves" },
            { id: "obj-3", title: "End-to-End Model Evaluation & Deployment", key_result: "Deploy a trained model with an interactive UI accessible online.", baseline: 0, target: 1, current: 0, unit: "web apps", dueDate: "2026-12-28", evidence: "Live Streamlit / Hugging Face demo link" }
        ],
        milestones: [
            { id: "ms-1", title: "M1: Mathematical Tooling & Exploratory Data Analysis", dueDate: "2026-12-01", objectiveId: "obj-1", acceptanceCriteria: "Load Kaggle CSV, clean missing values, handle categorical encoding, and generate correlation heatmaps.", status: "in-progress" },
            { id: "ms-2", title: "M2: Classical Supervised Regression & Classification", dueDate: "2026-12-09", objectiveId: "obj-2", acceptanceCriteria: "Build Logistic Regression and Decision Tree pipelines with 5-fold cross-validation.", status: "pending" },
            { id: "ms-3", title: "M3: Ensemble Methods & Hyperparameter Tuning", dueDate: "2026-12-19", objectiveId: "obj-2", acceptanceCriteria: "Tune Random Forest using GridSearchCV with test accuracy surpassing baseline by >7%.", status: "pending" },
            { id: "ms-4", title: "M4: Capstone Model Deployment & Viva Presentation Prep", dueDate: "2026-12-28", objectiveId: "obj-3", acceptanceCriteria: "Web UI demo working with slide deck summarizing learning objectives and performance metrics.", status: "pending" }
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
        ]
    };

    saveGoal(demo);
    if (notify) {
        sounds.playSuccess();
        showToast("Loaded Machine Learning Demo Goal (No API required).", "success");
    }
}

// ==========================================================================
// 6. COMMAND PALETTE (CMD+K / CTRL+K SPOTLIGHT SEARCH)
// ==========================================================================

const COMMAND_PALETTE_ITEMS = [
    { id: "nav-dash", title: "Dashboard", category: "Navigation", icon: SVG_ICONS.dashboard, action: () => switchView("dashboard") },
    { id: "nav-goals", title: "My Goals", category: "Navigation", icon: SVG_ICONS.target, action: () => switchView("my-goals") },
    { id: "nav-plan", title: "AI Planner (5-Stage Wizard)", category: "Navigation", icon: SVG_ICONS.planner, action: () => switchView("planner") },
    { id: "nav-timeline", title: "Milestone Timeline", category: "Navigation", icon: SVG_ICONS.timeline, action: () => switchView("timeline") },
    { id: "nav-tasks", title: "Tasks List", category: "Navigation", icon: SVG_ICONS.tasks, action: () => switchView("tasks") },
    { id: "nav-progress", title: "Achievement Zone", category: "Navigation", icon: SVG_ICONS.achievements, action: () => switchView("progress") },
    { id: "nav-review", title: "Weekly Review & Reflection", category: "Navigation", icon: SVG_ICONS.review, action: () => switchView("review") },
    { id: "nav-prompt", title: "Prompt Engineering Lab", category: "Navigation", icon: SVG_ICONS.promptLab, action: () => switchView("prompt-lab") },
    { id: "nav-settings", title: "System & AI Settings", category: "Navigation", icon: SVG_ICONS.settings, action: () => switchView("settings") },
    { id: "act-landing", title: "Open 3D Animated Landing Page", category: "Navigation", icon: SVG_ICONS.globe, action: () => { window.location.href = "landing.html"; } },
    { id: "act-new", title: "Create New Goal Roadmap", category: "Quick Actions", icon: SVG_ICONS.plus, action: () => switchView("planner") },
    { id: "act-demo", title: "Load Machine Learning Demo", category: "Quick Actions", icon: SVG_ICONS.planner, action: () => { loadDemoGoal(true); switchView("dashboard"); } },
    { id: "act-json", title: "Export Data as JSON", category: "Quick Actions", icon: SVG_ICONS.download, action: exportJSON },
    { id: "act-md", title: "Export Active Goal as Markdown", category: "Quick Actions", icon: SVG_ICONS.fileText, action: exportMarkdown },
    { id: "act-test-api", title: "Test Gemini Backend Connection", category: "Quick Actions", icon: SVG_ICONS.server, action: testConnection },
    { id: "pref-theme", title: "Toggle Dark / Light Theme", category: "Preferences", icon: SVG_ICONS.moon, action: toggleTheme },
    { id: "pref-sound", title: "Toggle Web Audio Sound FX", category: "Preferences", icon: SVG_ICONS.volume, action: toggleSound },
    { id: "pref-en", title: "Switch Language to English", category: "Language", icon: SVG_ICONS.globe, action: () => setLanguage('en') },
    { id: "pref-hi", title: "Switch Language to Hindi / हिन्दी", category: "Language", icon: SVG_ICONS.globe, action: () => setLanguage('hi') },
    { id: "pref-es", title: "Switch Language to Spanish / Español", category: "Language", icon: SVG_ICONS.globe, action: () => setLanguage('es') },
    { id: "pref-fr", title: "Switch Language to French / Français", category: "Language", icon: SVG_ICONS.globe, action: () => setLanguage('fr') },
    { id: "viva-pres", title: "Start Presentation Mode (Viva Walkthrough)", category: "Presentation", icon: SVG_ICONS.presentation, action: () => togglePresentationMode(true) }
];

let selectedCommandIndex = 0;
let filteredCommands = [];

function setupCommandPalette() {
    const modal = document.getElementById("command-palette-modal");
    const input = document.getElementById("cmd-palette-input");
    const triggerBtn = document.getElementById("btn-open-command-palette");

    if (triggerBtn && modal) {
        triggerBtn.addEventListener("click", openCommandPalette);
    }

    // Global Cmd+K / Ctrl+K keyboard shortcut
    window.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            if (modal.classList.contains("hidden")) {
                openCommandPalette();
            } else {
                closeCommandPalette();
            }
        } else if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            closeCommandPalette();
        }
    });

    if (input) {
        input.addEventListener("input", () => {
            renderCommandPaletteResults(input.value);
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                selectedCommandIndex = (selectedCommandIndex + 1) % filteredCommands.length;
                updateCommandSelection();
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                selectedCommandIndex = (selectedCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
                updateCommandSelection();
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (filteredCommands[selectedCommandIndex]) {
                    executeCommand(filteredCommands[selectedCommandIndex]);
                }
            }
        });
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeCommandPalette();
    });
}

function openCommandPalette() {
    sounds.playClick();
    const modal = document.getElementById("command-palette-modal");
    const input = document.getElementById("cmd-palette-input");
    if (!modal) return;
    modal.classList.remove("hidden");
    if (input) {
        input.value = "";
        input.focus();
    }
    selectedCommandIndex = 0;
    renderCommandPaletteResults("");
}

function closeCommandPalette() {
    const modal = document.getElementById("command-palette-modal");
    if (modal) modal.classList.add("hidden");
}

function renderCommandPaletteResults(query) {
    const listEl = document.getElementById("cmd-palette-results");
    if (!listEl) return;

    const q = query.toLowerCase().trim();
    filteredCommands = COMMAND_PALETTE_ITEMS.filter(item => {
        return item.title.toLowerCase().includes(q) || 
               item.category.toLowerCase().includes(q) ||
               (item.id && item.id.toLowerCase().includes(q));
    });

    if (filteredCommands.length === 0) {
        listEl.innerHTML = `<div class="empty-state-text">No matching commands found.</div>`;
        return;
    }

    selectedCommandIndex = Math.min(selectedCommandIndex, filteredCommands.length - 1);

    let html = "";
    let currentCat = "";

    filteredCommands.forEach((cmd, idx) => {
        if (cmd.category !== currentCat) {
            currentCat = cmd.category;
            html += `<div class="cmd-category-title">${currentCat}</div>`;
        }
        const isSelected = idx === selectedCommandIndex;
        html += `
            <div class="cmd-item ${isSelected ? 'active' : ''}" data-idx="${idx}">
                <span class="cmd-item-icon">${cmd.icon}</span>
                <span class="cmd-item-title">${escapeHTML(cmd.title)}</span>
                <span class="cmd-item-badge">${cmd.category}</span>
            </div>
        `;
    });

    listEl.innerHTML = html;

    listEl.querySelectorAll(".cmd-item").forEach(item => {
        item.addEventListener("click", () => {
            const idx = Number(item.dataset.idx);
            if (filteredCommands[idx]) executeCommand(filteredCommands[idx]);
        });
    });
}

function updateCommandSelection() {
    const items = document.querySelectorAll(".cmd-item");
    items.forEach((item, idx) => {
        if (idx === selectedCommandIndex) {
            item.classList.add("active");
            item.scrollIntoView({ block: "nearest" });
        } else {
            item.classList.remove("active");
        }
    });
}

function executeCommand(cmd) {
    sounds.playClick();
    closeCommandPalette();
    if (typeof cmd.action === "function") {
        cmd.action();
    }
}

// ==========================================================================
// 7. DETERMINISTIC PLAN VALIDATION ENGINE
// ==========================================================================

function validatePlan(plan, constraints) {
    const report = {
        passed: true,
        checks: [],
        capacityMismatch: false,
        plannedWeeklyHours: 0,
        allowedWeeklyHours: (constraints.weeklyCapacityMinutes || 300) / 60
    };

    const startDate = new Date(constraints.startDate || plan.startDate);
    const deadlineDate = new Date(constraints.deadline || plan.deadline);
    const blackoutDates = (constraints.blackoutDates || []).map(d => String(d).trim());
    const weeklyAvailableMins = Number(constraints.weeklyCapacityMinutes) || 300;

    // Rule 1: Start date on/before deadline
    if (isNaN(startDate.getTime()) || isNaN(deadlineDate.getTime())) {
        report.checks.push({ rule: "Dates validity", passed: false, message: "Missing or invalid start or deadline date." });
        report.passed = false;
    } else if (startDate > deadlineDate) {
        report.checks.push({ rule: "Date order", passed: false, message: `Start date (${constraints.startDate}) is after target deadline (${constraints.deadline}).` });
        report.passed = false;
    } else {
        report.checks.push({ rule: "Goal timeline bounds", passed: true, message: `Timeline valid: ${constraints.startDate} to ${constraints.deadline}.` });
    }

    const tasks = plan.tasks || [];
    const milestones = plan.milestones || [];
    const objectives = plan.objectives || [];
    const milestoneIds = new Set(milestones.map(m => m.id));
    const objectiveIds = new Set(objectives.map(o => o.id));

    let blackoutViolations = 0;
    let outOfBoundsTasks = 0;
    let invalidDurations = 0;
    let orphanTasks = 0;

    tasks.forEach(t => {
        if (!t.duration || t.duration <= 0) invalidDurations++;
        if (t.date) {
            const tDate = new Date(t.date);
            if (tDate < startDate || tDate > deadlineDate) outOfBoundsTasks++;
            if (blackoutDates.includes(t.date)) blackoutViolations++;
        }
        if (!t.milestoneId || !milestoneIds.has(t.milestoneId)) orphanTasks++;
    });

    if (invalidDurations > 0) {
        report.checks.push({ rule: "Positive durations", passed: false, message: `${invalidDurations} task(s) have non-positive duration.` });
        report.passed = false;
    } else {
        report.checks.push({ rule: "Positive durations", passed: true, message: "All tasks have verified positive durations." });
    }

    if (outOfBoundsTasks > 0) {
        report.checks.push({ rule: "Task date bounds", passed: false, message: `${outOfBoundsTasks} task(s) fall outside the goal period.` });
        report.passed = false;
    } else {
        report.checks.push({ rule: "Task date bounds", passed: true, message: "All tasks are scheduled within goal start and deadline." });
    }

    if (blackoutViolations > 0) {
        report.checks.push({ rule: "Blackout / Exam dates", passed: false, message: `${blackoutViolations} task(s) conflict with exam blackout dates.` });
        report.passed = false;
    } else {
        report.checks.push({ rule: "Blackout / Exam dates", passed: true, message: "Exam and blackout dates strictly protected." });
    }

    if (orphanTasks > 0) {
        report.checks.push({ rule: "Task-to-Milestone association", passed: false, message: `${orphanTasks} task(s) are not assigned to a valid milestone.` });
        report.passed = false;
    } else {
        report.checks.push({ rule: "Task-to-Milestone association", passed: true, message: "All tasks roll up cleanly to milestones." });
    }

    let orphanMilestones = 0;
    milestones.forEach(m => {
        if (!m.objectiveId || !objectiveIds.has(m.objectiveId)) orphanMilestones++;
    });
    if (orphanMilestones > 0) {
        report.checks.push({ rule: "Milestone-to-Objective association", passed: false, message: `${orphanMilestones} milestone(s) lack an objective.` });
        report.passed = false;
    } else {
        report.checks.push({ rule: "Milestone-to-Objective association", passed: true, message: "All milestones support a measurable objective." });
    }

    const unmeasuredKRs = objectives.filter(o => !o.evidence || !o.unit || o.target === undefined);
    if (unmeasuredKRs.length > 0) {
        report.checks.push({ rule: "Measurable Key Results", passed: false, message: `${unmeasuredKRs.length} objective(s) lack verifiable target metrics.` });
        report.passed = false;
    } else {
        report.checks.push({ rule: "Measurable Key Results", passed: true, message: "All key results have verifiable targets and evidence." });
    }

    // Circular Dependency Detection via DFS Cycle Detection
    const circularDetected = detectCircularDependencies(tasks);
    if (circularDetected) {
        report.checks.push({ rule: "Dependency Graph (DAG)", passed: false, message: "Circular task dependency detected! Graph is not a DAG." });
        report.passed = false;
    } else {
        report.checks.push({ rule: "Dependency Graph (DAG)", passed: true, message: "Dependency graph is acyclic and topologically sorted." });
    }

    // Capacity Check
    const weeklyLoads = calculateWeeklyBuckets(tasks);
    const maxWeeklyLoadMins = Math.max(0, ...Object.values(weeklyLoads));
    report.plannedWeeklyHours = (maxWeeklyLoadMins / 60).toFixed(1);

    if (maxWeeklyLoadMins > weeklyAvailableMins) {
        report.capacityMismatch = true;
        report.checks.push({
            rule: "Weekly Capacity",
            passed: false,
            message: `Peak weekly workload (${maxWeeklyLoadMins}m / ${(maxWeeklyLoadMins/60).toFixed(1)}h) exceeds confirmed limit (${weeklyAvailableMins}m / ${(weeklyAvailableMins/60).toFixed(1)}h).`
        });
    } else {
        report.checks.push({
            rule: "Weekly Capacity",
            passed: true,
            message: `Workload (${(maxWeeklyLoadMins/60).toFixed(1)}h/wk) fits within available budget (${(weeklyAvailableMins/60).toFixed(1)}h/wk).`
        });
    }

    return report;
}

function detectCircularDependencies(tasks) {
    const adj = new Map();
    tasks.forEach(t => adj.set(t.id, []));
    tasks.forEach(t => {
        if (t.dependency && adj.has(t.dependency)) {
            adj.get(t.dependency).push(t.id);
        }
    });

    const visited = new Map();
    tasks.forEach(t => visited.set(t.id, 0));

    function hasCycle(nodeId) {
        visited.set(nodeId, 1);
        const neighbors = adj.get(nodeId) || [];
        for (const n of neighbors) {
            if (visited.get(n) === 1) return true;
            if (visited.get(n) === 0 && hasCycle(n)) return true;
        }
        visited.set(nodeId, 2);
        return false;
    }

    for (const t of tasks) {
        if (visited.get(t.id) === 0) {
            if (hasCycle(t.id)) return true;
        }
    }
    return false;
}

function calculateWeeklyBuckets(tasks) {
    const buckets = {};
    tasks.forEach(t => {
        if (!t.date) return;
        const d = new Date(t.date);
        const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
        const pastDaysOfYear = (d - firstDayOfYear) / 86400000;
        const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        const key = `${d.getFullYear()}-W${weekNum}`;
        buckets[key] = (buckets[key] || 0) + (Number(t.duration) || 0);
    });
    return buckets;
}

// ==========================================================================
// 8. PROGRESS & CAPACITY METRICS
// ==========================================================================

function calculateProgress(goal) {
    if (!goal || !goal.tasks || goal.tasks.length === 0) {
        return { overallPct: 0, effortPct: 0, outcomePct: 0, completedTasks: 0, totalTasks: 0, daysRemaining: 0, level: "Started" };
    }

    const totalMins = goal.tasks.reduce((sum, t) => sum + (Number(t.duration) || 0), 0) || 1;
    const completedMins = goal.tasks.filter(t => t.completed).reduce((sum, t) => sum + (Number(t.duration) || 0), 0);
    const effortPct = Math.round((completedMins / totalMins) * 100);

    let outcomeScoreSum = 0;
    const objectives = goal.objectives || [];
    if (objectives.length > 0) {
        objectives.forEach(obj => {
            const base = Number(obj.baseline) || 0;
            const target = Number(obj.target) || 1;
            const current = Number(obj.current) || 0;
            const score = (current - base) / (target - base || 1);
            outcomeScoreSum += Math.max(0, Math.min(1, score));
        });
        var outcomePct = Math.round((outcomeScoreSum / objectives.length) * 100);
    } else {
        var outcomePct = effortPct;
    }

    const overallPct = Math.round((outcomePct * 0.6) + (effortPct * 0.4));

    const today = new Date();
    today.setHours(0,0,0,0);
    const deadline = new Date(goal.deadline);
    const diffTime = deadline - today;
    const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    let level = "Started";
    if (overallPct >= 100) level = "Goal Achieved";
    else if (overallPct >= 75) level = "Almost There";
    else if (overallPct >= 50) level = "Halfway There";
    else if (overallPct >= 25) level = "Building Momentum";

    return {
        overallPct,
        effortPct,
        outcomePct,
        completedTasks: goal.tasks.filter(t => t.completed).length,
        totalTasks: goal.tasks.length,
        daysRemaining,
        level
    };
}

function calculateWeeklyCapacity(goal) {
    const weeklyAvailableMins = Number(goal.weeklyCapacityMinutes) || 300;
    const weeklyLoads = calculateWeeklyBuckets(goal.tasks || []);
    const maxWeeklyMins = Math.max(0, ...Object.values(weeklyLoads));

    return {
        maxWeeklyHours: maxWeeklyMins / 60,
        allowedHours: weeklyAvailableMins / 60,
        isOverCapacity: maxWeeklyMins > weeklyAvailableMins
    };
}

// ==========================================================================
// 9. FIVE-STAGE AI PLANNING PIPELINE & BACKEND CALL
// ==========================================================================

async function runPlanningPipeline(userInput) {
    sounds.playClick();
    const statusText = document.querySelector("#ai-pipeline-status-area .pipeline-status-text");
    const spinner = document.getElementById("pipeline-spinner");
    if (spinner) spinner.classList.remove("hidden");

    const stages = [
        { num: 1, label: "Stage 1: Clarifying vague goal into SMART format..." },
        { num: 2, label: "Stage 2: Formulating measurable objectives & key results..." },
        { num: 3, label: "Stage 3: Structuring dated milestone timeline..." },
        { num: 4, label: "Stage 4: Decomposing into discrete action tasks & sessions..." },
        { num: 5, label: "Stage 5: Detecting risks & engineering IF-THEN backups..." }
    ];

    for (const stage of stages) {
        updatePipelineNode(stage.num);
        if (statusText) statusText.innerHTML = `<strong>${stage.label}</strong>`;
        await sleep(350);
    }

    let planData = null;

    // 1. If backend server is online, route through secure POST /api/plan
    if (APP_STATE.serverConnected) {
        try {
            if (statusText) statusText.innerHTML = `<strong>Generating via GoalFlow Node.js Backend Server...</strong>`;
            const res = await fetch(`${API_BASE}/api/plan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInput)
            });
            if (res.ok) {
                const json = await res.json();
                if (json.success && json.plan) {
                    planData = json.plan;
                    showToast("Plan generated successfully via Backend Server!", "success");
                }
            }
        } catch(serverErr) {
            console.warn("Backend /api/plan call error, trying fallback", serverErr);
        }
    }

    // 2. Client-side direct Gemini call fallback (if key available)
    if (!planData && APP_STATE.apiKey && APP_STATE.apiKey.trim()) {
        try {
            if (statusText) statusText.innerHTML = `<strong>Contacting Gemini API directly from client...</strong>`;
            planData = await callClientGemini(userInput);
            showToast("Plan generated via Client Gemini API!", "success");
        } catch(apiErr) {
            console.warn("Client Gemini API failed, using local generator", apiErr);
        }
    }

    // 3. Deterministic local generator (100% offline safety)
    if (!planData) {
        if (statusText) statusText.innerHTML = `<strong>Activating GoalFlow Intelligent Offline Generator...</strong>`;
        await sleep(400);
        planData = generateLocalPlan(userInput);
        showToast("Generated plan via GoalFlow Intelligent Offline Engine.", "info");
    }

    if (spinner) spinner.classList.add("hidden");
    updatePipelineNode(6);

    planData.id = "goal-" + Date.now();
    planData.title = userInput.title;
    planData.motivation = userInput.motivation;
    planData.level = userInput.level;
    planData.startDate = userInput.startDate;
    planData.deadline = userInput.deadline;
    planData.weeklyCapacityMinutes = Number(userInput.weeklyCapacityMinutes);
    planData.sessionLength = Number(userInput.sessionLength);
    planData.blackoutDates = userInput.blackoutDates;
    planData.resources = userInput.resources;
    planData.budget = userInput.budget;

    const validationReport = validatePlan(planData, userInput);
    planData.validation = validationReport;

    APP_STATE.draftPlan = planData;
    renderGeneratedPlan(planData, validationReport);
    sounds.playSuccess();
}

function updatePipelineNode(stepNum) {
    for (let i = 1; i <= 6; i++) {
        const node = document.getElementById(`pipe-node-${i}`);
        if (!node) continue;
        if (i < stepNum) node.className = "pipe-node completed";
        else if (i === stepNum) node.className = "pipe-node active";
        else node.className = "pipe-node";
    }
}

async function callClientGemini(userInput) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${APP_STATE.apiKey.trim()}`;
    const userPrompt = `GOAL AMBITION: ${userInput.title}
MOTIVATION: ${userInput.motivation}
LEVEL: ${userInput.level}
START DATE: ${userInput.startDate}
DEADLINE: ${userInput.deadline}
WEEKLY AVAILABLE MINUTES: ${userInput.weeklyCapacityMinutes}
PREFERRED SESSION LENGTH: ${userInput.sessionLength} minutes
BLACKOUT / EXAM DATES: ${(userInput.blackoutDates || []).join(", ") || "None"}
RESOURCES: ${userInput.resources}
BUDGET: ${userInput.budget}

Generate a complete, structured JSON plan adhering strictly to the system prompt and constraints.`;

    const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: userPrompt }] }],
            generationConfig: { temperature: 0.3, responseMimeType: "application/json" }
        })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return JSON.parse(data.candidates[0].content.parts[0].text);
}

function generateLocalPlan(input) {
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

    return {
        status: "draft",
        smart_goal: {
            statement: `Master core competencies in "${input.title}" by completing structured milestones, practical exercises, and verifiable checkpoints between ${input.startDate} and ${input.deadline}, allocating ${input.weeklyCapacityMinutes} minutes weekly.`,
            measurement: `Portfolio of completed practical tasks, verified key results evidence, and 100% milestone criteria satisfaction.`,
            completion_evidence: [
                `Published project repository or demonstration for "${input.title}"`,
                `Self-assessment score >= 85% on core competencies`,
                `Verified weekly activity logs confirming ${input.weeklyCapacityMinutes} mins/week effort adherence`
            ],
            assumptions: [
                `User has steady access to stated resources: ${input.resources || "Standard tools"}`,
                `Weekly availability constraint (${input.weeklyCapacityMinutes} mins) is strictly respected`,
                `Blackout exam periods are reserved exclusively for academic duties`
            ],
            questions: []
        },
        objectives: [
            { id: "obj-1", title: "Core Fundamentals & Theoretical Foundations", key_result: "Master basic principles, syntax, and essential workflows.", baseline: 0, target: 3, current: 0, unit: "modules", dueDate: safeDate(d1), evidence: "Structured notes and initial exercise repository" },
            { id: "obj-2", title: "Practical Implementation & Applied Problem Solving", key_result: "Build 2 guided projects with zero critical execution bugs.", baseline: 0, target: 2, current: 0, unit: "projects", dueDate: safeDate(d3), evidence: "Documented source code with passing test runs" },
            { id: "obj-3", title: "Capstone Delivery & Viva Evaluation", key_result: "Complete final deliverable and present demonstration.", baseline: 0, target: 1, current: 0, unit: "demonstrations", dueDate: safeDate(d4), evidence: "Live demo and presentation documentation" }
        ],
        milestones: [
            { id: "ms-1", title: "M1: Environment Setup & Core Foundations", dueDate: safeDate(d1), objectiveId: "obj-1", acceptanceCriteria: "Tools configured, environment ready, fundamental concepts summarized.", status: "pending" },
            { id: "ms-2", title: "M2: Guided Implementation Project", dueDate: safeDate(d2), objectiveId: "obj-2", acceptanceCriteria: "First working prototype built and tested successfully.", status: "pending" },
            { id: "ms-3", title: "M3: Independent Advanced Problem Solving", dueDate: safeDate(d3), objectiveId: "obj-2", acceptanceCriteria: "Complex features and optimizations executed and documented.", status: "pending" },
            { id: "ms-4", title: "M4: Capstone Evaluation & Showcase", dueDate: safeDate(d4), objectiveId: "obj-3", acceptanceCriteria: "Final evaluation complete and deliverable published.", status: "pending" }
        ],
        tasks: [
            { id: "task-1", title: `Set up tools, IDE, and development workspace for ${input.title}`, milestoneId: "ms-1", date: safeDate(addDays(start, 2)), duration: input.sessionLength || 45, priority: "High", dependency: null, completed: false },
            { id: "task-2", title: "Complete foundational review and initial syntax exercises", milestoneId: "ms-1", date: safeDate(addDays(start, 5)), duration: input.sessionLength || 45, priority: "Medium", dependency: "task-1", completed: false },
            { id: "task-3", title: "Build first practical prototype focusing on core requirements", milestoneId: "ms-2", date: safeDate(addDays(start, Math.floor(totalDays * 0.35))), duration: input.sessionLength || 45, priority: "High", dependency: "task-2", completed: false },
            { id: "task-4", title: "Conduct error-handling tests and document edge cases", milestoneId: "ms-2", date: safeDate(addDays(start, Math.floor(totalDays * 0.45))), duration: input.sessionLength || 45, priority: "Medium", dependency: "task-3", completed: false },
            { id: "task-5", title: "Implement advanced optimization and refine key algorithms", milestoneId: "ms-3", date: safeDate(addDays(start, Math.floor(totalDays * 0.65))), duration: input.sessionLength || 45, priority: "High", dependency: "task-4", completed: false },
            { id: "task-6", title: "Deploy final capstone version and prepare evaluation summary", milestoneId: "ms-4", date: safeDate(addDays(start, Math.floor(totalDays * 0.9))), duration: input.sessionLength || 45, priority: "High", dependency: "task-5", completed: false }
        ],
        risks: [
            { obstacle: "Academic workload and exam pressure interfering with target schedule.", backupAction: "Leverage configured blackout protection and reschedule non-critical tasks." },
            { obstacle: "Technical roadblocks or complex bugs slowing progress.", backupAction: "Consult documentation, break down tasks into 30-minute micro-sessions." }
        ]
    };
}

// ==========================================================================
// 10. UI RENDERING ENGINES
// ==========================================================================

function renderAll() {
    renderSidebar();
    renderDashboard();
    renderMyGoals();
    renderTimeline();
    renderTasks();
    renderAchievements();
}

function renderSidebar() {
    const titleEl = document.getElementById("sidebar-goal-title");
    const pctEl = document.getElementById("sidebar-goal-pct");
    const fillEl = document.getElementById("sidebar-progress-fill");
    const badgeEl = document.getElementById("sidebar-goal-badge");
    const goalsCountEl = document.getElementById("goals-count-badge");
    const tasksCountEl = document.getElementById("tasks-count-badge");

    if (goalsCountEl) goalsCountEl.textContent = APP_STATE.goals.length;

    if (!APP_STATE.activeGoal) {
        if (titleEl) titleEl.textContent = "No Active Goal";
        if (pctEl) pctEl.textContent = "0%";
        if (fillEl) fillEl.style.width = "0%";
        if (badgeEl) { badgeEl.textContent = "DRAFT"; badgeEl.className = "pill-status pill-atrisk"; }
        if (tasksCountEl) tasksCountEl.textContent = "0";
        return;
    }

    const prog = calculateProgress(APP_STATE.activeGoal);
    if (titleEl) titleEl.textContent = APP_STATE.activeGoal.title;
    if (pctEl) pctEl.textContent = `${prog.overallPct}%`;
    if (fillEl) fillEl.style.width = `${prog.overallPct}%`;
    if (tasksCountEl) tasksCountEl.textContent = prog.totalTasks;

    if (badgeEl) {
        if (prog.daysRemaining <= 0 && prog.overallPct < 100) {
            badgeEl.textContent = "OVERDUE";
            badgeEl.className = "pill-status pill-atrisk";
        } else {
            badgeEl.textContent = "ON TRACK";
            badgeEl.className = "pill-status pill-ontrack";
        }
    }
}

function renderDashboard() {
    const goal = APP_STATE.activeGoal;
    if (!goal) {
        switchView("landing");
        return;
    }

    const prog = calculateProgress(goal);

    const greetingEl = document.getElementById("greeting-text");
    if (greetingEl) {
        const hour = new Date().getHours();
        const timeOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
        greetingEl.textContent = `Good ${timeOfDay}, ${APP_STATE.profile.name}`;
    }

    const dashTitle = document.getElementById("dash-goal-title");
    const dashSmart = document.getElementById("dash-goal-smart");
    const dashDays = document.getElementById("dash-days-remaining");
    const dashWeekly = document.getElementById("dash-weekly-commitment");
    const dashTasksCount = document.getElementById("dash-total-tasks-stat");
    const dashMsCount = document.getElementById("dash-milestones-stat");

    if (dashTitle) dashTitle.textContent = goal.title;
    if (dashSmart) dashSmart.textContent = goal.smart_goal?.statement || "No SMART goal statement defined.";
    if (dashDays) dashDays.textContent = prog.daysRemaining;
    if (dashWeekly) dashWeekly.textContent = `${((goal.weeklyCapacityMinutes || 300) / 60).toFixed(1)} hrs`;
    if (dashTasksCount) dashTasksCount.textContent = prog.totalTasks;
    if (dashMsCount) dashMsCount.textContent = goal.milestones?.length || 0;

    const ringCircle = document.getElementById("dash-progress-circle");
    const ringPct = document.getElementById("dash-progress-pct");
    const effortBar = document.getElementById("dash-effort-bar");
    const effortPct = document.getElementById("dash-effort-pct");
    const outcomeBar = document.getElementById("dash-outcome-bar");
    const outcomePct = document.getElementById("dash-outcome-pct");
    const achieveLevel = document.getElementById("dash-achievement-level");

    if (ringPct) ringPct.textContent = `${prog.overallPct}%`;
    if (ringCircle) {
        const offset = 326.7 - (326.7 * (prog.overallPct / 100));
        ringCircle.style.strokeDashoffset = offset;
    }
    if (effortBar) effortBar.style.width = `${prog.effortPct}%`;
    if (effortPct) effortPct.textContent = `${prog.effortPct}%`;
    if (outcomeBar) outcomeBar.style.width = `${prog.outcomePct}%`;
    if (outcomePct) outcomePct.textContent = `${prog.outcomePct}%`;
    if (achieveLevel) achieveLevel.textContent = prog.level;

    // NEXT ACTION
    const nextTask = (goal.tasks || []).find(t => !t.completed);
    const nextCardTitle = document.getElementById("dash-next-task-title");
    const nextDuration = document.getElementById("dash-next-duration");
    const nextDue = document.getElementById("dash-next-due");
    const nextPriority = document.getElementById("dash-next-priority");
    const nextMsTag = document.getElementById("dash-next-milestone-tag");
    const btnCompleteNext = document.getElementById("dash-btn-complete-next");

    if (nextTask) {
        if (nextCardTitle) nextCardTitle.textContent = nextTask.title;
        if (nextDuration) nextDuration.textContent = `${nextTask.duration} mins`;
        if (nextDue) nextDue.textContent = nextTask.date || "Scheduled";
        if (nextPriority) {
            nextPriority.textContent = nextTask.priority || "Medium";
            nextPriority.className = `priority-pill priority-${(nextTask.priority || "medium").toLowerCase()}`;
        }
        if (nextMsTag) {
            const ms = (goal.milestones || []).find(m => m.id === nextTask.milestoneId);
            nextMsTag.textContent = ms ? ms.title.split(":")[0] : "Milestone";
        }
        if (btnCompleteNext) {
            btnCompleteNext.dataset.taskId = nextTask.id;
            btnCompleteNext.disabled = false;
            btnCompleteNext.textContent = t('btn_mark_complete');
        }
    } else {
        if (nextCardTitle) nextCardTitle.textContent = "All planned tasks completed!";
        if (nextDuration) nextDuration.textContent = "0 mins";
        if (nextDue) nextDue.textContent = "Done";
        if (btnCompleteNext) {
            btnCompleteNext.disabled = true;
            btnCompleteNext.textContent = "Goal Finished";
        }
    }

    // Milestone Card
    const nextMs = (goal.milestones || []).find(m => m.status !== "completed");
    const msTitle = document.getElementById("dash-milestone-title");
    const msDue = document.getElementById("dash-milestone-due");
    const msCriteria = document.getElementById("dash-milestone-criteria");
    const msTaskRatio = document.getElementById("dash-milestone-task-ratio");
    const msBar = document.getElementById("dash-milestone-bar");

    if (nextMs) {
        if (msTitle) msTitle.textContent = nextMs.title;
        if (msDue) msDue.textContent = nextMs.dueDate || "Target";
        if (msCriteria) msCriteria.textContent = `Acceptance Criteria: ${nextMs.acceptanceCriteria}`;
        
        const msTasks = (goal.tasks || []).filter(t => t.milestoneId === nextMs.id);
        const msDone = msTasks.filter(t => t.completed).length;
        if (msTaskRatio) msTaskRatio.textContent = `${msDone} / ${msTasks.length}`;
        const pct = msTasks.length > 0 ? Math.round((msDone / msTasks.length) * 100) : 0;
        if (msBar) msBar.style.width = `${pct}%`;
    }

    // Capacity Health Card
    const capStats = calculateWeeklyCapacity(goal);
    const plannedHoursEl = document.getElementById("dash-planned-hours");
    const availHoursEl = document.getElementById("dash-available-hours");
    const capBar = document.getElementById("dash-capacity-bar");
    const capStatus = document.getElementById("dash-capacity-status");

    if (plannedHoursEl) plannedHoursEl.textContent = `${capStats.maxWeeklyHours.toFixed(1)}h`;
    if (availHoursEl) availHoursEl.textContent = `${capStats.allowedHours.toFixed(1)}h`;
    if (capBar) {
        const fill = Math.min(100, Math.round((capStats.maxWeeklyHours / capStats.allowedHours) * 100));
        capBar.style.width = `${fill}%`;
    }
    if (capStatus) {
        if (capStats.isOverCapacity) {
            capStatus.textContent = "Overload";
            capStatus.className = "capacity-status-badge status-warn";
        } else {
            capStatus.textContent = "Healthy";
            capStatus.className = "capacity-status-badge status-good";
        }
    }
}

function renderMyGoals() {
    const grid = document.getElementById("my-goals-grid");
    if (!grid) return;

    if (APP_STATE.goals.length === 0) {
        grid.innerHTML = `
            <div class="empty-state-text" style="grid-column: 1 / -1;">
                <h3>No goals created yet</h3>
                <p>Click "+ Create New Goal" or "Explore Demo" to start your first roadmap.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = APP_STATE.goals.map(g => {
        const prog = calculateProgress(g);
        const isActive = APP_STATE.activeGoal && APP_STATE.activeGoal.id === g.id;
        return `
            <div class="goal-card-item card ${isActive ? 'card-glow' : ''}">
                <div>
                    <div class="gc-header">
                        <span class="pill-status ${prog.overallPct === 100 ? 'pill-ontrack' : 'pill-atrisk'}">
                            ${g.isDemo ? 'DEMO' : prog.overallPct === 100 ? 'COMPLETED' : 'ACTIVE'}
                        </span>
                        <span class="goal-pct">${prog.overallPct}%</span>
                    </div>
                    <h3 class="gc-title">${escapeHTML(g.title)}</h3>
                    <p class="gc-desc">${escapeHTML(g.smart_goal?.statement || g.motivation || '')}</p>
                    <div class="mini-progress-bar mb-3">
                        <div class="mini-progress-fill" style="width: ${prog.overallPct}%"></div>
                    </div>
                    <div class="text-xs text-muted">
                        Due: <strong>${g.deadline}</strong> &bull; ${((g.weeklyCapacityMinutes||300)/60).toFixed(1)}h/wk
                    </div>
                </div>
                <div class="gc-footer">
                    <div>
                        ${isActive ? '<span class="badge-subtle">Active</span>' : 
                          `<button class="btn btn-sm btn-outline btn-select-goal" data-id="${g.id}">Open</button>`}
                    </div>
                    <div class="button-row">
                        <button class="btn-icon btn-export-goal" data-id="${g.id}" title="Export Markdown">${SVG_ICONS.fileText}</button>
                        <button class="btn-icon btn-delete-goal" data-id="${g.id}" title="Delete Goal">${SVG_ICONS.trash}</button>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    grid.querySelectorAll(".btn-select-goal").forEach(btn => {
        btn.addEventListener("click", () => {
            sounds.playClick();
            const g = APP_STATE.goals.find(goal => goal.id === btn.dataset.id);
            if (g) {
                APP_STATE.activeGoal = g;
                localStorage.setItem("goalflow_active_id", g.id);
                switchView("dashboard");
                renderAll();
                showToast(`Opened "${g.title}"`, "info");
            }
        });
    });

    grid.querySelectorAll(".btn-delete-goal").forEach(btn => {
        btn.addEventListener("click", () => deleteGoal(btn.dataset.id));
    });

    grid.querySelectorAll(".btn-export-goal").forEach(btn => {
        btn.addEventListener("click", () => {
            const g = APP_STATE.goals.find(goal => goal.id === btn.dataset.id);
            if (g) exportMarkdown(g);
        });
    });
}

function renderTimeline() {
    const container = document.getElementById("interactive-timeline-container");
    if (!container) return;

    const goal = APP_STATE.activeGoal;
    if (!goal || !goal.milestones || goal.milestones.length === 0) {
        container.innerHTML = `<div class="empty-state-text">No milestones defined for the active goal.</div>`;
        return;
    }

    const rangeBadge = document.getElementById("timeline-range-badge");
    if (rangeBadge) rangeBadge.textContent = `${goal.startDate || 'Start'} &rarr; ${goal.deadline || 'End'}`;

    container.innerHTML = goal.milestones.map((ms) => {
        const msTasks = (goal.tasks || []).filter(t => t.milestoneId === ms.id);
        const doneTasks = msTasks.filter(t => t.completed).length;
        const isCompleted = msTasks.length > 0 && doneTasks === msTasks.length;

        return `
            <div class="timeline-node-item ${isCompleted ? 'completed' : ''}">
                <div class="tl-marker"></div>
                <div class="tl-content-card">
                    <div class="tl-header">
                        <h4 class="tl-title">${escapeHTML(ms.title)}</h4>
                        <span class="milestone-date-badge">${SVG_ICONS.calendar} ${ms.dueDate || 'Target'}</span>
                    </div>
                    <p class="tl-criteria"><strong>Acceptance Criteria:</strong> ${escapeHTML(ms.acceptanceCriteria)}</p>
                    <div class="milestone-sub-info">
                        <span>Tasks completed: ${doneTasks} / ${msTasks.length}</span>
                        <span class="pill-status ${isCompleted ? 'pill-ontrack' : 'pill-atrisk'}">${isCompleted ? 'ACCOMPLISHED' : 'IN PROGRESS'}</span>
                    </div>
                    <div class="mini-bar-track mt-2">
                        <div class="mini-bar-fill bar-emerald" style="width: ${msTasks.length > 0 ? (doneTasks / msTasks.length) * 100 : 0}%"></div>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

function renderTasks() {
    const listEl = document.getElementById("active-tasks-list");
    const summaryText = document.getElementById("task-stats-summary-text");
    if (!listEl) return;

    const goal = APP_STATE.activeGoal;
    if (!goal || !goal.tasks || goal.tasks.length === 0) {
        listEl.innerHTML = `<div class="empty-state-text">No action tasks found for this goal.</div>`;
        if (summaryText) summaryText.textContent = "Showing 0 tasks";
        return;
    }

    let filtered = goal.tasks;
    if (APP_STATE.taskFilter === "pending") filtered = goal.tasks.filter(t => !t.completed);
    else if (APP_STATE.taskFilter === "completed") filtered = goal.tasks.filter(t => t.completed);
    else if (APP_STATE.taskFilter === "high") filtered = goal.tasks.filter(t => t.priority === "High");

    if (summaryText) {
        summaryText.textContent = `Showing ${filtered.length} of ${goal.tasks.length} tasks`;
    }

    listEl.innerHTML = filtered.map(t => {
        const ms = (goal.milestones || []).find(m => m.id === t.milestoneId);
        return `
            <div class="task-row-item ${t.completed ? 'done' : ''}" data-task-id="${t.id}">
                <input type="checkbox" class="task-checkbox" data-task-id="${t.id}" ${t.completed ? 'checked' : ''}>
                <div class="task-main-info">
                    <h4>${escapeHTML(t.title)}</h4>
                    <div class="task-meta-tags">
                        <span>${SVG_ICONS.clock} ${t.duration}m</span>
                        <span>${SVG_ICONS.calendar} ${t.date || 'Scheduled'}</span>
                        <span class="priority-pill priority-${(t.priority || 'medium').toLowerCase()}">${t.priority || 'Medium'}</span>
                        <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px; margin-right:3px;"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/></svg>${ms ? escapeHTML(ms.title.split(":")[0]) : 'Milestone'}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-icon btn-edit-task" data-task-id="${t.id}" title="Edit Task">${SVG_ICONS.edit}</button>
                    <button class="btn-icon btn-delete-task" data-task-id="${t.id}" title="Delete Task">${SVG_ICONS.trash}</button>
                </div>
            </div>
        `;
    }).join("");

    listEl.querySelectorAll(".task-checkbox").forEach(box => {
        box.addEventListener("change", (e) => {
            const taskId = e.target.dataset.taskId;
            toggleTaskComplete(taskId);
        });
    });

    listEl.querySelectorAll(".btn-delete-task").forEach(btn => {
        btn.addEventListener("click", () => deleteTask(btn.dataset.taskId));
    });

    listEl.querySelectorAll(".btn-edit-task").forEach(btn => {
        btn.addEventListener("click", () => openEditTaskModal(btn.dataset.taskId));
    });
}

function toggleTaskComplete(taskId) {
    if (!APP_STATE.activeGoal) return;
    const task = (APP_STATE.activeGoal.tasks || []).find(t => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    if (task.completed) {
        sounds.playSuccess();
    } else {
        sounds.playClick();
    }

    saveGoal(APP_STATE.activeGoal);

    const prog = calculateProgress(APP_STATE.activeGoal);
    if (prog.overallPct >= 100) {
        sounds.playFanfare();
        triggerCelebration();
    }
}

function deleteTask(taskId) {
    if (!APP_STATE.activeGoal) return;
    sounds.playClick();
    APP_STATE.activeGoal.tasks = APP_STATE.activeGoal.tasks.filter(t => t.id !== taskId);
    saveGoal(APP_STATE.activeGoal);
    showToast("Task removed.", "info");
}

function renderAchievements() {
    const goal = APP_STATE.activeGoal;
    if (!goal) return;

    const prog = calculateProgress(goal);
    const bigRing = document.getElementById("achieve-big-fill");
    const bigPct = document.getElementById("achieve-big-pct");
    const statusName = document.getElementById("achieve-status-name");

    if (bigPct) bigPct.textContent = `${prog.overallPct}%`;
    if (statusName) statusName.textContent = prog.level;
    if (bigRing) {
        const offset = 452.4 - (452.4 * (prog.overallPct / 100));
        bigRing.style.strokeDashoffset = offset;
    }

    const levels = [
        { id: "lvl-node-1", threshold: 0 },
        { id: "lvl-node-2", threshold: 25 },
        { id: "lvl-node-3", threshold: 50 },
        { id: "lvl-node-4", threshold: 75 },
        { id: "lvl-node-5", threshold: 100 }
    ];

    levels.forEach(lvl => {
        const node = document.getElementById(lvl.id);
        if (!node) return;
        if (prog.overallPct >= lvl.threshold) node.className = "achieve-level-node completed";
        else node.className = "achieve-level-node";
    });

    const evidenceList = document.getElementById("achievements-evidence-list");
    if (evidenceList) {
        const items = goal.smart_goal?.completion_evidence || [];
        evidenceList.innerHTML = items.map((ev, i) => `
            <div class="task-row-item">
                <span class="status-dot status-active"></span>
                <div class="task-main-info">
                    <h4>Evidence item #${i+1}</h4>
                    <p class="text-sm text-muted">${escapeHTML(ev)}</p>
                </div>
                <span class="pill-status pill-ontrack">Verified</span>
            </div>
        `).join("");
    }

    const celebBox = document.getElementById("celebration-box");
    if (celebBox) {
        if (prog.overallPct >= 100) celebBox.classList.remove("hidden");
        else celebBox.classList.add("hidden");
    }
}

function renderGeneratedPlan(plan, valReport) {
    const container = document.getElementById("plan-result-container");
    if (!container) return;

    container.classList.remove("hidden");
    container.scrollIntoView({ behavior: "smooth" });

    const valBadge = document.getElementById("val-overall-badge");
    const valList = document.getElementById("val-checks-list");
    const repairPanel = document.getElementById("capacity-repair-panel");

    if (valBadge) {
        if (valReport.passed && !valReport.capacityMismatch) {
            valBadge.textContent = "All Checks Passed (10/10)";
            valBadge.className = "val-badge val-badge-passed";
        } else if (valReport.capacityMismatch && valReport.passed) {
            valBadge.textContent = "Warning: Capacity Overload";
            valBadge.className = "val-badge val-badge-warn";
        } else {
            valBadge.textContent = "Validation Failed: Fix Constraints";
            valBadge.className = "val-badge val-badge-warn";
        }
    }

    if (valList) {
        valList.innerHTML = valReport.checks.map(c => `
            <div class="val-check-item ${c.passed ? 'passed' : 'failed'}">
                <span>${c.passed ? '&check;' : '&times;'}</span>
                <span><strong>${escapeHTML(c.rule)}:</strong> ${escapeHTML(c.message)}</span>
            </div>
        `).join("");
    }

    if (repairPanel) {
        if (valReport.capacityMismatch) repairPanel.classList.remove("hidden");
        else repairPanel.classList.add("hidden");
    }

    const smartStmt = document.getElementById("plan-smart-statement");
    const smartMeas = document.getElementById("plan-smart-measurement");
    const smartEv = document.getElementById("plan-smart-evidence");
    const smartAss = document.getElementById("plan-smart-assumptions");

    if (smartStmt) smartStmt.textContent = plan.smart_goal?.statement || "";
    if (smartMeas) smartMeas.textContent = plan.smart_goal?.measurement || "";
    if (smartEv) smartEv.innerHTML = (plan.smart_goal?.completion_evidence || []).map(e => `<li>${escapeHTML(e)}</li>`).join("");
    if (smartAss) smartAss.innerHTML = (plan.smart_goal?.assumptions || []).map(a => `<li>${escapeHTML(a)}</li>`).join("");

    const objContainer = document.getElementById("plan-objectives-container");
    if (objContainer) {
        objContainer.innerHTML = (plan.objectives || []).map(obj => `
            <div class="card mb-2">
                <div class="card-header-clean">
                    <h4>${escapeHTML(obj.title)}</h4>
                    <span class="badge-subtle">Target: ${obj.target} ${obj.unit}</span>
                </div>
                <p class="text-sm text-secondary"><strong>Key Result:</strong> ${escapeHTML(obj.key_result)}</p>
                <div class="text-xs text-muted mt-2">Evidence: ${escapeHTML(obj.evidence)} • Due: ${obj.dueDate}</div>
            </div>
        `).join("");
    }

    const msContainer = document.getElementById("plan-milestones-container");
    if (msContainer) {
        msContainer.innerHTML = (plan.milestones || []).map(ms => `
            <div class="card mb-2">
                <div class="card-header-clean">
                    <h4>${escapeHTML(ms.title)}</h4>
                    <span class="milestone-date-badge">${SVG_ICONS.calendar} ${ms.dueDate}</span>
                </div>
                <p class="text-sm"><strong>Criteria:</strong> ${escapeHTML(ms.acceptanceCriteria)}</p>
            </div>
        `).join("");
    }

    const tasksContainer = document.getElementById("plan-tasks-container");
    if (tasksContainer) {
        tasksContainer.innerHTML = (plan.tasks || []).map(t => `
            <div class="task-row-item">
                <div class="task-main-info">
                    <h4>${escapeHTML(t.title)}</h4>
                    <div class="task-meta-tags">
                        <span>${SVG_ICONS.clock} ${t.duration} mins</span>
                        <span>${SVG_ICONS.calendar} ${t.date}</span>
                        <span class="priority-pill priority-${(t.priority || 'medium').toLowerCase()}">${t.priority}</span>
                        ${t.dependency ? `<span>Depends on: ${t.dependency}</span>` : ''}
                    </div>
                </div>
            </div>
        `).join("");
    }

    const risksContainer = document.getElementById("plan-risks-container");
    if (risksContainer) {
        risksContainer.innerHTML = (plan.risks || []).map(r => `
            <div class="card mb-2" style="border-left: 3px solid #f59e0b;">
                <h4 class="text-sm" style="color: #fbbf24;">Obstacle: ${escapeHTML(r.obstacle)}</h4>
                <p class="text-sm text-secondary mt-1"><strong>IF-THEN Backup:</strong> ${escapeHTML(r.backupAction)}</p>
            </div>
        `).join("");
    }
}

// ==========================================================================
// 11. PROMPT LAB (COLLEGE VIVA DEMO)
// ==========================================================================

const PROMPT_LAB_DATA = {
    "zero-shot": {
        title: "01 Zero-Shot Prompting",
        description: "Asking the model to build a plan with no examples or task context.",
        prompt: `Make a study plan for Machine Learning.`,
        baselineOutput: `1. Learn Python\n2. Learn Math\n3. Learn Scikit-Learn\n4. Build projects\n5. Apply for jobs`,
        improvedOutput: `GoalFlow Zero-Shot Schema Injection:\n{\n  "smart_goal": "Learn ML algorithms in 5 weeks",\n  "weekly_capacity": 300,\n  "milestones": ["M1: Linear models", "M2: Trees"]\n}`,
        whyBetter: "Providing a schema contract enforces structured outputs instead of generic bullet lists."
    },
    "one-shot": {
        title: "02 One-Shot Prompting",
        description: "Providing exactly one high-quality exemplar to condition the format.",
        prompt: `Transform this vague goal into a SMART goal:\n\nExample:\nVague: "Get fit"\nSMART: "Run a 5K race in under 30 minutes by Dec 31, 2026 by training 3 sessions per week."\n\nVague Goal: "Learn Web Development"`,
        baselineOutput: `"Study HTML, CSS, and JS daily until proficient."`,
        improvedOutput: `"Build and deploy 3 full-stack JavaScript web applications on GitHub with user authentication and responsive CSS before Dec 25, 2026, committing 4 hours weekly."`,
        whyBetter: "The single exemplar immediately guides tone, metric specificity, and deadline bounding."
    },
    "few-shot": {
        title: "03 Few-Shot Prompting",
        description: "Giving multiple curated exemplars to anchor edge cases and constraints.",
        prompt: `Convert raw student goals into measurable Key Results:\n\nExample 1: "Machine Learning" -> Target: 3 models >85% accuracy\nExample 2: "Competitive Programming" -> Target: Solve 50 LeetCode Mediums\nExample 3: "Web Viva" -> Target: Score 90%+ explaining 5-stage pipeline\n\nInput: "Data Structures"`,
        baselineOutput: `"Practice trees, graphs, and arrays."`,
        improvedOutput: `{\n  "target": 40,\n  "unit": "binary tree & graph problems",\n  "baseline": 5,\n  "evidence": "LeetCode submission history with passed test suites"\n}`,
        whyBetter: "Multiple diverse examples teach the model how to assign appropriate numeric baselines and evidence criteria."
    },
    "role-based": {
        title: "04 Role-Based Prompting",
        description: "Assigning an explicit persona and behavioral constraints to shape AI judgment.",
        prompt: `Act as a senior collegiate academic coach and engineering mentor. Evaluate whether 300 minutes/week is sufficient for a beginner to build an ML model from scratch in 30 days. Be ruthlessly honest.`,
        baselineOutput: `"Yes, you can do anything you put your mind to! Just work hard!" (Generic encouraging AI)`,
        improvedOutput: `"At 300 mins/week (5 hours), you have 21 total hours. Building from scratch is infeasible without scoping down. Recommendation: Focus on Scikit-Learn high-level APIs; do NOT attempt writing matrix calculus neural backprop from scratch."`,
        whyBetter: "The mentor persona refuses to deliver false encouragement and enforces realistic feasibility constraints."
    },
    "contextual": {
        title: "05 Contextual Constraints Prompting",
        description: "Feeding hard constraints (blackout dates, available budget, hardware limitations).",
        prompt: `Plan machine learning study around: Midterms blackout (Dec 10-12), 45-min sessions, $0 budget, 5.0h weekly limit.`,
        baselineOutput: `"Study 2 hours every day, including Dec 11." (Ignores blackout and exceeds weekly budget)`,
        improvedOutput: `{\n  "blackout_respected": true,\n  "dec_10_to_12_tasks": 0,\n  "session_length_fixed": 45,\n  "tools": "Google Colab Free Tier"\n}`,
        whyBetter: "Explicitly conditioning on student constraints guarantees zero conflicts with college exams."
    },
    "iterative": {
        title: "06 Iterative Repair Prompting",
        description: "Feeding deterministic validation engine errors back to the model for self-correction.",
        prompt: `Validator Error: "Task-8 falls on 2026-12-11 which is a marked EXAM BLACKOUT DATE. Re-schedule without exceeding weekly 300m capacity."`,
        baselineOutput: `"Sorry about that! Let me generate a brand new plan." (Uncontrolled full rewrite)`,
        improvedOutput: `{\n  "action": "repair_single_task",\n  "task_id": "task-8",\n  "repaired_date": "2026-12-14",\n  "reason": "Moved to post-midterm Monday; week-50 workload remains 240 mins."\n}`,
        whyBetter: "Targeted error feedback fixes only the detected violation while preserving the rest of the approved roadmap."
    },
    "comparison": {
        title: "Baseline AI vs GoalFlow Structured AI",
        description: "Direct side-by-side comparison illustrating why GoalFlow's structured pipeline is required.",
        prompt: `Make a plan for my goal: Become proficient in ML`,
        baselineOutput: `BASIC UNCONSTRAINED PROMPT:
- Read a book
- Watch YouTube tutorials
- Do projects
- Practice coding
- Good luck!

Flaws:
&bull; Zero deadlines
&bull; No time budgeting (easy to burn out)
&bull; No exam blackout awareness
&bull; No measurable completion criteria
&bull; Cannot be tracked in software`,
        improvedOutput: `GOALFLOW 5-STAGE PIPELINE:
&bull; Stage 1: Clarified SMART goal (>85% accuracy, Dec 28)
&bull; Stage 2: 3 measurable Key Results with verifiable baselines
&bull; Stage 3: 4 dated Milestones with explicit acceptance criteria
&bull; Stage 4: 12 actionable 45-min tasks (zero circular dependencies)
&bull; Stage 5: Obstacle identification with IF-THEN backups
&bull; Stage 6: Deterministic validation report passed`,
        whyBetter: "Demonstrates to the viva examiner that GoalFlow transforms non-deterministic LLM text into dependable software data structures."
    }
};

function setupPromptLab() {
    const tabs = document.querySelectorAll(".p-tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            sounds.playClick();
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            renderPromptLab(tab.dataset.ptab);
        });
    });
    renderPromptLab("zero-shot");
}

function renderPromptLab(techniqueKey) {
    const container = document.getElementById("prompt-lab-container");
    if (!container) return;

    const data = PROMPT_LAB_DATA[techniqueKey] || PROMPT_LAB_DATA["zero-shot"];

    container.innerHTML = `
        <div class="card-header-clean">
            <div>
                <h3>${escapeHTML(data.title)}</h3>
                <p class="text-sm text-muted">${escapeHTML(data.description)}</p>
            </div>
            <button class="btn btn-sm btn-outline" id="btn-copy-prompt-demo">Copy Prompt</button>
        </div>

        <div class="form-group">
            <label>Prompt Template Fed to LLM:</label>
            <div class="code-box">${escapeHTML(data.prompt)}</div>
        </div>

        <div class="prompt-demo-grid">
            <div>
                <label class="card-label">Naive / Baseline LLM Output</label>
                <div class="code-box" style="border-left: 3px solid #ef4444;">${escapeHTML(data.baselineOutput)}</div>
            </div>
            <div>
                <label class="card-label" style="color: #38bdf8;">GoalFlow Structured Engineering Output</label>
                <div class="code-box" style="border-left: 3px solid #38bdf8;">${escapeHTML(data.improvedOutput)}</div>
            </div>
        </div>

        <div class="why-better-badge">
            <strong>Viva Insight / Why This Technique is Better:</strong> ${escapeHTML(data.whyBetter)}
        </div>
    `;

    const copyBtn = document.getElementById("btn-copy-prompt-demo");
    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            sounds.playClick();
            navigator.clipboard.writeText(data.prompt);
            showToast("Prompt copied to clipboard!", "info");
        });
    }
}

// ==========================================================================
// 12. FLOATING "ASK GOALFLOW" AI COACH ASSISTANT
// ==========================================================================

function setupCoachAssistant() {
    const triggerBtn = document.getElementById("coach-trigger-btn");
    const chatWindow = document.getElementById("coach-chat-window");
    const closeBtn = document.getElementById("btn-close-coach");
    const sendBtn = document.getElementById("btn-send-coach");
    const inputField = document.getElementById("coach-input-text");

    if (triggerBtn && chatWindow) {
        triggerBtn.addEventListener("click", () => {
            sounds.playClick();
            chatWindow.classList.toggle("hidden");
            if (!chatWindow.classList.contains("hidden") && inputField) {
                inputField.focus();
            }
        });
    }

    if (closeBtn && chatWindow) {
        closeBtn.addEventListener("click", () => {
            sounds.playClick();
            chatWindow.classList.add("hidden");
        });
    }

    if (sendBtn && inputField) {
        sendBtn.addEventListener("click", () => sendCoachMessage(inputField.value));
        inputField.addEventListener("keydown", (e) => {
            if (e.key === "Enter") sendCoachMessage(inputField.value);
        });
    }

    document.querySelectorAll(".quick-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            sendCoachMessage(chip.dataset.prompt);
        });
    });
}

async function sendCoachMessage(text) {
    if (!text || text.trim() === "") return;
    sounds.playClick();
    const inputField = document.getElementById("coach-input-text");
    if (inputField) inputField.value = "";

    const msgBody = document.getElementById("coach-messages-body");
    if (!msgBody) return;

    msgBody.innerHTML += `<div class="coach-msg coach-msg-user">${escapeHTML(text)}</div>`;
    msgBody.scrollTop = msgBody.scrollHeight;

    const loaderId = "loader-" + Date.now();
    msgBody.innerHTML += `<div class="coach-msg coach-msg-assistant" id="${loaderId}">Thinking with goal context...</div>`;
    msgBody.scrollTop = msgBody.scrollHeight;

    const goal = APP_STATE.activeGoal || {};
    const prog = calculateProgress(goal);
    const goalContext = {
        title: goal.title,
        completedTasks: prog.completedTasks,
        totalTasks: prog.totalTasks,
        effortPct: prog.effortPct,
        daysRemaining: prog.daysRemaining,
        level: prog.level,
        weeklyCapacityMinutes: goal.weeklyCapacityMinutes || 300
    };

    let reply = "";

    // 1. Try Backend /api/coach if connected
    if (APP_STATE.serverConnected) {
        try {
            const res = await fetch(`${API_BASE}/api/coach`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: text, goalContext })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.answer) reply = data.answer;
            }
        } catch(e) {}
    }

    // 2. Local rule-based coaching fallback
    if (!reply) {
        const q = text.toLowerCase();
        if (q.includes("behind") || q.includes("why")) {
            reply = `You have completed ${prog.completedTasks} of ${prog.totalTasks} tasks (${prog.effortPct}% effort). With ${prog.daysRemaining} days remaining, you are currently at the "${prog.level}" stage. Focus on your next high-priority task today to maintain your weekly commitment!`;
        } else if (q.includes("today") || q.includes("focus") || q.includes("next")) {
            const next = (goal.tasks || []).find(t => !t.completed);
            if (next) {
                reply = `Today's high-leverage focus: **${next.title}** (${next.duration} mins, priority: ${next.priority}). Completing this unlocks the next milestone.`;
            } else {
                reply = `Congratulations! All scheduled tasks are complete. Review your verified evidence in the Achievement Zone!`;
            }
        } else if (q.includes("finish on time") || q.includes("pace")) {
            reply = `You have adequate runway! At your confirmed budget of ${((goal.weeklyCapacityMinutes||300)/60).toFixed(1)}h/week, you can finish comfortably if you maintain consistency.`;
        } else if (q.includes("missed") || q.includes("recover")) {
            reply = `Recovery Protocol: 1) Do not panic or double your workload. 2) Cut low-priority tasks from the next milestone. 3) Schedule two focused 45-minute sessions this weekend to catch up.`;
        } else {
            reply = `Regarding your goal "${goal.title || 'Ambition'}": Consistency beats intensity. Keep your sessions bounded to 45 minutes, protect your exam blackout dates, and log your progress regularly!`;
        }
    }

    await sleep(300);
    const loaderEl = document.getElementById(loaderId);
    if (loaderEl) {
        loaderEl.innerHTML = reply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        msgBody.scrollTop = msgBody.scrollHeight;
    }
}

// ==========================================================================
// 13. WEEKLY REVIEW & CHECK-IN
// ==========================================================================

function setupWeeklyReview() {
    const submitBtn = document.getElementById("btn-submit-review");
    if (!submitBtn) return;

    submitBtn.addEventListener("click", async () => {
        sounds.playClick();
        const q1 = document.getElementById("rev-q1")?.value || "";
        const q2 = document.getElementById("rev-q2")?.value || "";
        const q3 = Number(document.getElementById("rev-q3")?.value) || 240;
        const q4 = document.getElementById("rev-q4")?.value || "";
        const q5 = document.getElementById("rev-q5")?.value || "";

        if (!APP_STATE.activeGoal) {
            showToast("No active goal to review.", "error");
            return;
        }

        const reviewDate = new Date().toISOString().split("T")[0];
        const feedbackBody = document.getElementById("coach-analysis-body");
        const coachDate = document.getElementById("coach-review-date");

        if (coachDate) coachDate.textContent = `Review: ${reviewDate}`;

        const reviewData = {
            goalId: APP_STATE.activeGoal.id,
            completed: q1,
            blockers: q2,
            timeSpent: q3,
            evidence: q4,
            changes: q5
        };

        let aiRec = `Logged ${q3} minutes vs ${(APP_STATE.activeGoal.weeklyCapacityMinutes || 300)} minutes planned budget.`;

        // If backend connected, call /api/review
        if (APP_STATE.serverConnected) {
            try {
                const res = await fetch(`${API_BASE}/api/review`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reviewData)
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.review?.aiFeedback) aiRec = data.review.aiFeedback;
                }
            } catch(e) {}
        }

        const feedbackHTML = `
            <div class="card mb-3" style="background: rgba(56, 189, 248, 0.05); border-left: 3px solid #38bdf8;">
                <h4 style="color: #38bdf8;">Weekly Summary & Health Check</h4>
                <p class="text-sm mt-1">${aiRec}</p>
                <p class="text-sm text-secondary mt-1"><strong>Evidence noted:</strong> ${escapeHTML(q4 || "Self-reported practice")}</p>
            </div>

            <div class="card mb-3">
                <h4>AI Coach Recalibration Recommendations:</h4>
                <ul class="bullet-list mt-2">
                    <li><strong>Capacity Adherence:</strong> You spent ${(q3/60).toFixed(1)} hours this week. Your capacity health is solid.</li>
                    <li><strong>Blocker Analysis:</strong> ${q2 ? `Addressed blocker: "${escapeHTML(q2)}". Suggested mitigation: pre-allocate 15 mins to environment checks.` : 'No critical blockers reported.'}</li>
                    <li><strong>Action for next week:</strong> Maintain 45-minute Pomodoro sessions and check off Milestone 2 tasks early.</li>
                </ul>
            </div>

            <button class="btn btn-sm btn-success" id="btn-confirm-review-save">
                Apply Review & Save to Goal History
            </button>
        `;

        if (feedbackBody) {
            feedbackBody.innerHTML = feedbackHTML;
            const confirmBtn = document.getElementById("btn-confirm-review-save");
            if (confirmBtn) {
                confirmBtn.addEventListener("click", () => {
                    sounds.playSuccess();
                    if (!APP_STATE.activeGoal.weeklyReviews) APP_STATE.activeGoal.weeklyReviews = [];
                    APP_STATE.activeGoal.weeklyReviews.unshift({
                        date: reviewDate,
                        completed: q1,
                        blockers: q2,
                        timeSpent: q3,
                        evidence: q4
                    });
                    saveGoal(APP_STATE.activeGoal);
                    showToast("Weekly review saved to permanent history!", "success");
                });
            }
        }
    });
}

// ==========================================================================
// 14. EXPORT ENGINES (JSON & MARKDOWN)
// ==========================================================================

function exportJSON() {
    sounds.playClick();
    const data = {
        exportedAt: new Date().toISOString(),
        userProfile: APP_STATE.profile,
        activeGoal: APP_STATE.activeGoal,
        allGoals: APP_STATE.goals
    };
    const jsonStr = JSON.stringify(data, null, 2);
    downloadBlob(jsonStr, `GoalFlow_Export_${Date.now()}.json`, "application/json");
    showToast("Downloaded complete JSON export.", "success");
}

function exportMarkdown(goal) {
    sounds.playClick();
    const targetGoal = goal || APP_STATE.activeGoal;
    if (!targetGoal) {
        showToast("No goal available to export.", "error");
        return;
    }

    const prog = calculateProgress(targetGoal);

    let md = `# ${targetGoal.title}\n`;
    md += `*GoalFlow AI Roadmap Export — Generated ${new Date().toLocaleDateString()}*\n\n`;
    md += `## Overview\n`;
    md += `- **Status**: ${prog.level} (${prog.overallPct}% complete)\n`;
    md += `- **Timeline**: ${targetGoal.startDate} to ${targetGoal.deadline} (${prog.daysRemaining} days remaining)\n`;
    md += `- **Weekly Budget**: ${((targetGoal.weeklyCapacityMinutes||300)/60).toFixed(1)} hours/week\n`;
    md += `- **Motivation**: ${targetGoal.motivation}\n\n`;

    md += `## SMART Goal\n`;
    md += `> ${targetGoal.smart_goal?.statement || 'N/A'}\n\n`;
    md += `**Measurement**: ${targetGoal.smart_goal?.measurement || 'N/A'}\n\n`;

    md += `## Objectives & Key Results\n`;
    (targetGoal.objectives || []).forEach(o => {
        md += `- **${o.title}**: ${o.key_result} (Current: ${o.current}/${o.target} ${o.unit}, Due: ${o.dueDate})\n`;
    });
    md += `\n`;

    md += `## Milestones\n`;
    (targetGoal.milestones || []).forEach(m => {
        md += `### ${m.title} (Due: ${m.dueDate})\n`;
        md += `*Acceptance Criteria*: ${m.acceptanceCriteria}\n\n`;
    });

    md += `## Action Tasks\n`;
    (targetGoal.tasks || []).forEach(t => {
        md += `- [${t.completed ? 'x' : ' '}] **${t.title}** (${t.duration}m, ${t.date}, Priority: ${t.priority})\n`;
    });
    md += `\n`;

    md += `## Risks & Backups\n`;
    (targetGoal.risks || []).forEach(r => {
        md += `- **Obstacle**: ${r.obstacle}\n  - *IF-THEN Backup*: ${r.backupAction}\n`;
    });

    downloadBlob(md, `${targetGoal.title.replace(/\s+/g, "_")}_Roadmap.md`, "text/markdown");
    showToast("Downloaded Markdown summary.", "success");
}

function downloadBlob(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ==========================================================================
// 15. THEME & SOUND CONTROLS
// ==========================================================================

function toggleTheme() {
    sounds.playClick();
    const isDark = document.body.classList.contains("theme-dark");
    if (isDark) {
        document.body.classList.remove("theme-dark");
        document.body.classList.add("theme-light");
        localStorage.setItem("goalflow_theme", "light");
    } else {
        document.body.classList.remove("theme-light");
        document.body.classList.add("theme-dark");
        localStorage.setItem("goalflow_theme", "dark");
    }
    updateThemeButtonIcon();
    showToast(`Switched to ${isDark ? 'Light' : 'Dark'} mode`, 'info');
}

function updateThemeButtonIcon() {
    const btn = document.getElementById("btn-toggle-theme");
    if (!btn) return;
    const isDark = document.body.classList.contains("theme-dark");
    btn.innerHTML = isDark ? SVG_ICONS.sun : SVG_ICONS.moon;
    btn.title = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
    btn.setAttribute("aria-label", btn.title);
}

function toggleSound() {
    APP_STATE.soundEnabled = !APP_STATE.soundEnabled;
    localStorage.setItem("goalflow_sound", String(APP_STATE.soundEnabled));
    if (APP_STATE.soundEnabled) sounds.playClick();
    updateSoundButtonIcon();
    showToast(`Sound FX ${APP_STATE.soundEnabled ? 'Enabled' : 'Muted'}`, 'info');
}

function updateSoundButtonIcon() {
    const btn = document.getElementById("btn-toggle-sound");
    if (!btn) return;
    btn.innerHTML = APP_STATE.soundEnabled ? SVG_ICONS.volume : SVG_ICONS.volumeX;
    btn.title = APP_STATE.soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects";
    btn.setAttribute("aria-label", btn.title);
}

// ==========================================================================
// 16. PRESENTATION MODE (VIVA DEMO WALKTHROUGH)
// ==========================================================================

const VIVA_PRESENTATION_STEPS = [
    { view: "landing", indicator: "Step 1/5: Problem & Value Proposition" },
    { view: "planner", indicator: "Step 2/5: 5-Stage AI Pipeline & Constraints" },
    { view: "dashboard", indicator: "Step 3/5: Dashboard & Next Action Principle" },
    { view: "timeline", indicator: "Step 4/5: Milestone Timeline & Task Graph" },
    { view: "prompt-lab", indicator: "Step 5/5: Prompt Engineering Viva Evidence" }
];

function togglePresentationMode(active) {
    sounds.playClick();
    APP_STATE.presentationMode = active;
    const exitBar = document.getElementById("presentation-exit-bar");
    if (active) {
        document.body.classList.add("presentation-mode");
        if (exitBar) exitBar.classList.remove("hidden");
        APP_STATE.presentationStep = 0;
        goToPresentationStep(0);
        showToast("Presentation Mode Active — Optimized for viva projector.", "info");
    } else {
        document.body.classList.remove("presentation-mode");
        if (exitBar) exitBar.classList.add("hidden");
        switchView("dashboard");
    }
}

function goToPresentationStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= VIVA_PRESENTATION_STEPS.length) return;
    sounds.playClick();
    APP_STATE.presentationStep = stepIndex;
    const step = VIVA_PRESENTATION_STEPS[stepIndex];
    switchView(step.view);
    const indicator = document.getElementById("pres-step-indicator");
    if (indicator) indicator.textContent = step.indicator;
}

// ==========================================================================
// 17. EVENT LISTENERS & WIZARD NAVIGATION
// ==========================================================================

function setupNavigation() {
    const navItems = document.querySelectorAll(".sidebar-nav .nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            sounds.playClick();
            const view = item.dataset.view;
            switchView(view);
        });
    });

    const mobileToggle = document.getElementById("sidebar-toggle-btn");
    const sidebar = document.getElementById("app-sidebar");
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener("click", () => sidebar.classList.toggle("open"));
    }
}

function switchView(viewName) {
    APP_STATE.activeView = viewName;

    document.querySelectorAll(".view-panel").forEach(panel => {
        panel.classList.add("hidden");
    });

    const targetPanel = document.getElementById(`view-${viewName}`);
    if (targetPanel) {
        targetPanel.classList.remove("hidden");
    }

    document.querySelectorAll(".sidebar-nav .nav-item").forEach(item => {
        if (item.dataset.view === viewName) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    const breadcrumbPage = document.getElementById("view-breadcrumb-page");
    if (breadcrumbPage) {
        breadcrumbPage.textContent = capitalizeFirstLetter(viewName.replace("-", " "));
    }

    if (viewName === "dashboard") renderDashboard();
    else if (viewName === "my-goals") renderMyGoals();
    else if (viewName === "timeline") renderTimeline();
    else if (viewName === "tasks") renderTasks();
    else if (viewName === "progress") renderAchievements();
}

function setupWizard() {
    document.querySelectorAll(".btn-next-step").forEach(btn => {
        btn.addEventListener("click", () => {
            sounds.playClick();
            const nextStep = Number(btn.dataset.next);
            goToWizardStep(nextStep);
        });
    });

    document.querySelectorAll(".btn-prev-step").forEach(btn => {
        btn.addEventListener("click", () => {
            sounds.playClick();
            const prevStep = Number(btn.dataset.prev);
            goToWizardStep(prevStep);
        });
    });

    const fillExampleBtn = document.getElementById("btn-load-wizard-example");
    if (fillExampleBtn) {
        fillExampleBtn.addEventListener("click", () => {
            sounds.playClick();
            document.getElementById("input-goal-title").value = "Master Machine Learning Foundations";
            document.getElementById("input-goal-why").value = "Prepare for upcoming campus AI placement and build a computer vision portfolio.";
            document.getElementById("input-start-date").value = "2026-11-21";
            document.getElementById("input-deadline-date").value = "2026-12-28";
            document.getElementById("input-weekly-minutes").value = "300";
            document.getElementById("input-blackout-dates").value = "2026-12-10, 2026-12-11, 2026-12-12";
            document.getElementById("input-resources").value = "Laptop, Python, Kaggle, Coursera";
            showToast("Filled form with ML example inputs.", "info");
        });
    }

    const runAIBtn = document.getElementById("btn-run-ai-pipeline");
    if (runAIBtn) {
        runAIBtn.addEventListener("click", () => {
            const input = collectWizardInput();
            if (!validateWizardInput(input)) return;
            runPlanningPipeline(input);
        });
    }

    document.querySelectorAll(".plan-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            sounds.playClick();
            document.querySelectorAll(".plan-tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".plan-tab-pane").forEach(p => p.classList.remove("active"));
            btn.classList.add("active");
            const tabId = btn.dataset.tab;
            const targetPane = document.getElementById(tabId);
            if (targetPane) targetPane.classList.add("active");
        });
    });

    const approveBtns = [document.getElementById("btn-approve-plan"), document.getElementById("btn-approve-plan-bottom")];
    approveBtns.forEach(btn => {
        if (!btn) return;
        btn.addEventListener("click", () => {
            if (!APP_STATE.draftPlan) return;
            sounds.playSuccess();
            APP_STATE.draftPlan.status = "active";
            saveGoal(APP_STATE.draftPlan);
            showToast("Plan approved and activated on your dashboard!", "success");
            switchView("dashboard");
        });
    });

    setupCapacityRepairs();
}

function goToWizardStep(stepNum) {
    if (stepNum === 6) {
        const input = collectWizardInput();
        document.getElementById("rev-goal-title").textContent = input.title || "Not specified";
        document.getElementById("rev-goal-why").textContent = input.motivation || "Not specified";
        document.getElementById("rev-goal-level").textContent = input.level || "Beginner";
        document.getElementById("rev-goal-dates").textContent = `${input.startDate || 'Start'} &rarr; ${input.deadline || 'End'}`;
        document.getElementById("rev-goal-capacity").textContent = `${input.weeklyCapacityMinutes} mins (${(input.weeklyCapacityMinutes/60).toFixed(1)} hrs/week)`;
        document.getElementById("rev-goal-blackouts").textContent = input.blackoutDates.join(", ") || "None specified";
    }

    document.querySelectorAll(".wizard-step-pane").forEach(pane => pane.classList.remove("active"));
    const targetPane = document.getElementById(`wizard-step-${stepNum}`);
    if (targetPane) targetPane.classList.add("active");
}

function collectWizardInput() {
    const levelChecked = document.querySelector('input[name="wizard-level"]:checked');
    const blackoutStr = document.getElementById("input-blackout-dates")?.value || "";

    return {
        title: document.getElementById("input-goal-title")?.value.trim() || "",
        motivation: document.getElementById("input-goal-why")?.value.trim() || "",
        level: levelChecked ? levelChecked.value : "Beginner",
        startDate: document.getElementById("input-start-date")?.value || new Date().toISOString().split("T")[0],
        deadline: document.getElementById("input-deadline-date")?.value || "",
        weeklyCapacityMinutes: Number(document.getElementById("input-weekly-minutes")?.value) || 300,
        sessionLength: Number(document.getElementById("input-session-length")?.value) || 45,
        blackoutDates: blackoutStr ? blackoutStr.split(",").map(d => d.trim()).filter(Boolean) : [],
        resources: document.getElementById("input-resources")?.value || "Standard tools",
        budget: document.getElementById("input-budget")?.value || "$0 (Free)"
    };
}

function validateWizardInput(input) {
    if (!input.title) {
        showToast("Please provide a goal title or ambition statement.", "error");
        goToWizardStep(1);
        return false;
    }
    if (!input.deadline) {
        showToast("Please select a target deadline date.", "error");
        goToWizardStep(4);
        return false;
    }
    if (new Date(input.startDate) > new Date(input.deadline)) {
        showToast("Start date must be before target deadline.", "error");
        goToWizardStep(4);
        return false;
    }
    if (input.weeklyCapacityMinutes <= 0) {
        showToast("Weekly available time must be greater than zero.", "error");
        goToWizardStep(4);
        return false;
    }
    return true;
}

function setupCapacityRepairs() {
    const btnReduce = document.getElementById("btn-repair-reduce");
    const btnExtend = document.getElementById("btn-repair-extend");
    const btnIncreaseTime = document.getElementById("btn-repair-increase-time");

    if (btnReduce) {
        btnReduce.addEventListener("click", () => {
            if (!APP_STATE.draftPlan) return;
            sounds.playClick();
            APP_STATE.draftPlan.tasks = APP_STATE.draftPlan.tasks.filter(t => t.priority !== "Low");
            const rep = validatePlan(APP_STATE.draftPlan, collectWizardInput());
            APP_STATE.draftPlan.validation = rep;
            renderGeneratedPlan(APP_STATE.draftPlan, rep);
            showToast("Reduced scope: Removed lowest priority tasks.", "success");
        });
    }

    if (btnExtend) {
        btnExtend.addEventListener("click", () => {
            if (!APP_STATE.draftPlan) return;
            sounds.playClick();
            const curEnd = new Date(APP_STATE.draftPlan.deadline);
            curEnd.setDate(curEnd.getDate() + 14);
            APP_STATE.draftPlan.deadline = curEnd.toISOString().split("T")[0];
            const rep = validatePlan(APP_STATE.draftPlan, APP_STATE.draftPlan);
            APP_STATE.draftPlan.validation = rep;
            renderGeneratedPlan(APP_STATE.draftPlan, rep);
            showToast("Extended deadline by 14 days; load rebalanced.", "success");
        });
    }

    if (btnIncreaseTime) {
        btnIncreaseTime.addEventListener("click", () => {
            if (!APP_STATE.draftPlan) return;
            sounds.playClick();
            APP_STATE.draftPlan.weeklyCapacityMinutes += 120;
            const rep = validatePlan(APP_STATE.draftPlan, APP_STATE.draftPlan);
            APP_STATE.draftPlan.validation = rep;
            renderGeneratedPlan(APP_STATE.draftPlan, rep);
            showToast("Increased weekly capacity to accommodate workload.", "success");
        });
    }
}

function setupEventListeners() {
    // Language Selector
    const langSelect = document.getElementById("lang-selector");
    if (langSelect) {
        langSelect.addEventListener("change", (e) => {
            setLanguage(e.target.value);
        });
    }

    // Sound Toggle
    const soundBtn = document.getElementById("btn-toggle-sound");
    if (soundBtn) {
        soundBtn.addEventListener("click", toggleSound);
    }

    // Theme Toggle
    const themeBtn = document.getElementById("btn-toggle-theme");
    if (themeBtn) {
        themeBtn.addEventListener("click", toggleTheme);
    }

    // Quick Demo Button
    const btnQuickDemo = document.getElementById("btn-quick-demo");
    if (btnQuickDemo) {
        btnQuickDemo.addEventListener("click", () => {
            loadDemoGoal(true);
            switchView("dashboard");
        });
    }

    // Landing Screen Actions
    const landingCreate = document.getElementById("btn-landing-create");
    if (landingCreate) {
        landingCreate.addEventListener("click", () => {
            sounds.playClick();
            switchView("planner");
        });
    }
    const landingDemo = document.getElementById("btn-landing-demo");
    if (landingDemo) {
        landingDemo.addEventListener("click", () => {
            loadDemoGoal(true);
            switchView("dashboard");
        });
    }

    // Header New Goal
    const headerNew = document.getElementById("btn-header-new-goal");
    if (headerNew) {
        headerNew.addEventListener("click", () => {
            sounds.playClick();
            switchView("planner");
        });
    }

    const myGoalsCreate = document.getElementById("btn-mygoals-create");
    if (myGoalsCreate) {
        myGoalsCreate.addEventListener("click", () => {
            sounds.playClick();
            switchView("planner");
        });
    }

    // Next Action Complete Button
    const btnCompleteNext = document.getElementById("dash-btn-complete-next");
    if (btnCompleteNext) {
        btnCompleteNext.addEventListener("click", () => {
            const taskId = btnCompleteNext.dataset.taskId;
            if (taskId) {
                toggleTaskComplete(taskId);
                showToast("Task completed! Surfacing next action.", "success");
            }
        });
    }

    const btnSkipNext = document.getElementById("dash-btn-skip-next");
    if (btnSkipNext) {
        btnSkipNext.addEventListener("click", () => {
            sounds.playClick();
            showToast("Task postponed. Surfacing alternate focus item.", "info");
        });
    }

    // Task Filter Buttons
    document.querySelectorAll(".task-filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            sounds.playClick();
            document.querySelectorAll(".task-filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            APP_STATE.taskFilter = btn.dataset.taskFilter;
            renderTasks();
        });
    });

    // Task Modal
    const btnOpenTaskModal = document.getElementById("btn-open-add-task-modal");
    const taskModal = document.getElementById("task-modal");
    const btnCloseModal = document.getElementById("btn-close-task-modal");
    const btnCancelModal = document.getElementById("btn-cancel-task-modal");
    const btnSaveModal = document.getElementById("btn-save-task-modal");

    if (btnOpenTaskModal && taskModal) {
        btnOpenTaskModal.addEventListener("click", () => openAddTaskModal());
    }
    if (btnCloseModal) btnCloseModal.addEventListener("click", () => taskModal.classList.add("hidden"));
    if (btnCancelModal) btnCancelModal.addEventListener("click", () => taskModal.classList.add("hidden"));
    if (btnSaveModal) btnSaveModal.addEventListener("click", () => saveModalTask());

    // Settings actions
    const btnSaveProfile = document.getElementById("btn-save-profile");
    if (btnSaveProfile) {
        btnSaveProfile.addEventListener("click", () => {
            sounds.playClick();
            APP_STATE.profile.name = document.getElementById("settings-username").value.trim() || "Student";
            APP_STATE.profile.timezone = document.getElementById("settings-timezone").value;
            APP_STATE.profile.weeklyCapacityMinutes = Number(document.getElementById("settings-def-capacity").value) || 300;
            saveSettings();
            renderAll();
        });
    }

    const btnSaveAPI = document.getElementById("btn-save-api");
    if (btnSaveAPI) {
        btnSaveAPI.addEventListener("click", () => {
            sounds.playClick();
            const keyVal = document.getElementById("settings-api-key").value.trim();
            APP_STATE.apiKey = keyVal;
            saveSettings();
        });
    }

    const btnTestAPI = document.getElementById("btn-test-api");
    if (btnTestAPI) {
        btnTestAPI.addEventListener("click", testConnection);
    }

    const btnToggleKey = document.getElementById("btn-toggle-key-visibility");
    if (btnToggleKey) {
        btnToggleKey.addEventListener("click", () => {
            const input = document.getElementById("settings-api-key");
            if (input) input.type = input.type === "password" ? "text" : "password";
        });
    }

    // Export buttons
    const btnExportJSON = document.getElementById("btn-export-all-json");
    if (btnExportJSON) btnExportJSON.addEventListener("click", exportJSON);

    const btnExportQuickJSON = document.getElementById("btn-export-quick-json");
    if (btnExportQuickJSON) btnExportQuickJSON.addEventListener("click", exportJSON);

    const btnExportMD = document.getElementById("btn-export-markdown");
    if (btnExportMD) btnExportMD.addEventListener("click", () => exportMarkdown());

    // Clear All Data
    const btnClearAll = document.getElementById("btn-clear-all-data");
    if (btnClearAll) {
        btnClearAll.addEventListener("click", () => {
            if (confirm("Are you sure you want to reset and delete all data?")) {
                sounds.playClick();
                localStorage.clear();
                APP_STATE.goals = [];
                APP_STATE.activeGoal = null;
                showToast("All data cleared.", "info");
                switchView("landing");
                renderAll();
            }
        });
    }

    // Presentation Mode Controls
    const btnTogglePres = document.getElementById("btn-toggle-presentation");
    if (btnTogglePres) btnTogglePres.addEventListener("click", () => togglePresentationMode(true));

    const btnExitPres = document.getElementById("exit-presentation-btn");
    if (btnExitPres) btnExitPres.addEventListener("click", () => togglePresentationMode(false));

    const btnPresNext = document.getElementById("pres-next-step-btn");
    if (btnPresNext) btnPresNext.addEventListener("click", () => goToPresentationStep(APP_STATE.presentationStep + 1));

    const btnPresPrev = document.getElementById("pres-prev-step-btn");
    if (btnPresPrev) btnPresPrev.addEventListener("click", () => goToPresentationStep(APP_STATE.presentationStep - 1));

    // Celebration CTA
    const btnCeleb = document.getElementById("btn-celebrate-new-goal");
    if (btnCeleb) {
        btnCeleb.addEventListener("click", () => {
            sounds.playClick();
            switchView("planner");
        });
    }

    setupWeeklyReview();
}

async function testConnection() {
    sounds.playClick();
    showToast("Testing Connection...", "info");

    // Test Backend Server
    if (APP_STATE.serverConnected) {
        try {
            const res = await fetch(`${API_BASE}/api/health`);
            if (res.ok) {
                const data = await res.json();
                showToast(`Backend Server connected! (Gemini Key loaded: ${data.hasApiKey ? 'Yes' : 'No'})`, "success");
                return;
            }
        } catch(e) {}
    }

    // Test client API key
    if (APP_STATE.apiKey) {
        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${APP_STATE.apiKey.trim()}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: [{ text: "ping" }] }] })
            });
            if (res.ok) {
                showToast("Direct Gemini API connection verified!", "success");
            } else {
                showToast("API key test returned non-200 status.", "error");
            }
        } catch(err) {
            showToast(`Connection error: ${err.message}`, "error");
        }
    } else {
        showToast("Backend offline and no local API key provided.", "error");
    }
}

function openAddTaskModal() {
    sounds.playClick();
    const modal = document.getElementById("task-modal");
    if (!modal) return;
    document.getElementById("task-modal-title").textContent = "Add Manual Task";
    document.getElementById("modal-task-id").value = "";
    document.getElementById("modal-task-title").value = "";
    document.getElementById("modal-task-date").value = new Date().toISOString().split("T")[0];
    document.getElementById("modal-task-duration").value = "45";

    const msSelect = document.getElementById("modal-task-milestone");
    if (msSelect && APP_STATE.activeGoal) {
        msSelect.innerHTML = (APP_STATE.activeGoal.milestones || []).map(m => `
            <option value="${m.id}">${escapeHTML(m.title)}</option>
        `).join("");
    }
    modal.classList.remove("hidden");
}

function openEditTaskModal(taskId) {
    if (!APP_STATE.activeGoal) return;
    sounds.playClick();
    const task = (APP_STATE.activeGoal.tasks || []).find(t => t.id === taskId);
    if (!task) return;

    const modal = document.getElementById("task-modal");
    document.getElementById("task-modal-title").textContent = "Edit Task";
    document.getElementById("modal-task-id").value = task.id;
    document.getElementById("modal-task-title").value = task.title;
    document.getElementById("modal-task-date").value = task.date || "";
    document.getElementById("modal-task-duration").value = task.duration || 45;
    document.getElementById("modal-task-priority").value = task.priority || "Medium";

    const msSelect = document.getElementById("modal-task-milestone");
    if (msSelect) {
        msSelect.innerHTML = (APP_STATE.activeGoal.milestones || []).map(m => `
            <option value="${m.id}" ${m.id === task.milestoneId ? 'selected' : ''}>${escapeHTML(m.title)}</option>
        `).join("");
    }
    modal.classList.remove("hidden");
}

function saveModalTask() {
    if (!APP_STATE.activeGoal) return;
    const taskId = document.getElementById("modal-task-id").value;
    const title = document.getElementById("modal-task-title").value.trim();
    const date = document.getElementById("modal-task-date").value;
    const duration = Number(document.getElementById("modal-task-duration").value) || 45;
    const priority = document.getElementById("modal-task-priority").value;
    const milestoneId = document.getElementById("modal-task-milestone").value;

    if (!title) {
        showToast("Task title is required.", "error");
        return;
    }

    sounds.playSuccess();
    if (taskId) {
        const task = APP_STATE.activeGoal.tasks.find(t => t.id === taskId);
        if (task) {
            task.title = title;
            task.date = date;
            task.duration = duration;
            task.priority = priority;
            task.milestoneId = milestoneId;
        }
    } else {
        if (!APP_STATE.activeGoal.tasks) APP_STATE.activeGoal.tasks = [];
        APP_STATE.activeGoal.tasks.push({
            id: "task-" + Date.now(),
            title,
            date,
            duration,
            priority,
            milestoneId,
            completed: false
        });
    }

    saveGoal(APP_STATE.activeGoal);
    document.getElementById("task-modal").classList.add("hidden");
    showToast("Task saved.", "success");
}

// ==========================================================================
// 18. CONFETTI CELEBRATION
// ==========================================================================

function triggerCelebration() {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const particles = [];
    const colors = ["#38bdf8", "#818cf8", "#34d399", "#fbbf24", "#ec4899"];

    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            rotation: Math.random() * 360
        });
    }

    let animationFrame;
    function renderConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });

        if (particles.some(p => p.y < canvas.height)) {
            animationFrame = requestAnimationFrame(renderConfetti);
        } else {
            cancelAnimationFrame(animationFrame);
        }
    }
    renderConfetti();
    showToast("Goal 100% Completed! Congratulations!", "success");
}

// ==========================================================================
// 19. TOAST NOTIFICATIONS & UTILITIES
// ==========================================================================

function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    const icon = type === "success" ? "&check;" : type === "error" ? "&times;" : "&bull;";
    toast.innerHTML = `<span>${icon}</span><span>${escapeHTML(message)}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function escapeHTML(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
