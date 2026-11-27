/**
 * GoalFlow AI - 3D Animated Landing Page Engine
 * Three.js WebGL Constellation + Interactive Simulator + Parallax Physics
 */

(function () {
    'use strict';

    // ==========================================================================
    // 1. THREE.JS 3D WEBGL AMBIENT ENGINE
    // ==========================================================================
    let scene, camera, renderer;
    let terrainMesh, terrainGeom;
    let polyhedra = [];
    let particleSystem;
    let light1, light2, light3;
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let clock = new THREE.Clock();
    let shockwave = { active: false, radius: 0, maxRadius: 60, speed: 1.2, originX: 0, originY: 0 };

    function init3D() {
        const canvas = document.getElementById('webgl-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        // Scene setup
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x060911, 0.018);

        // Camera setup
        const aspect = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 1000);
        camera.position.set(0, 0, 32);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Ambient & Directional Lights
        const ambientLight = new THREE.AmbientLight(0x0e1424, 2.0);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, 20, 15);
        scene.add(dirLight);

        // Colored Orbiting Point Lights
        light1 = new THREE.PointLight(0x38bdf8, 3.5, 60); // Sky Cyan
        scene.add(light1);

        light2 = new THREE.PointLight(0x818cf8, 3.0, 60); // Electric Indigo
        scene.add(light2);

        light3 = new THREE.PointLight(0x10b981, 2.2, 50); // Emerald Mint
        scene.add(light3);

        createTerrainGrid();
        createConstellationPolyhedra();
        createParticleField();

        window.addEventListener('resize', onWindowResize, { passive: true });
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('click', onCanvasClick);

        animate();
    }

    // 3D Undulating Terrain / Lattice Grid
    function createTerrainGrid() {
        const width = 110;
        const height = 110;
        const segs = 55;
        terrainGeom = new THREE.PlaneGeometry(width, height, segs, segs);

        // Store original Z positions for harmonic wave calculation
        const pos = terrainGeom.attributes.position;
        terrainGeom.userData = {
            baseZ: new Float32Array(pos.count),
            initialX: new Float32Array(pos.count),
            initialY: new Float32Array(pos.count)
        };
        for (let i = 0; i < pos.count; i++) {
            terrainGeom.userData.baseZ[i] = pos.getZ(i);
            terrainGeom.userData.initialX[i] = pos.getX(i);
            terrainGeom.userData.initialY[i] = pos.getY(i);
        }

        const terrainMat = new THREE.MeshStandardMaterial({
            color: 0x0284c7,
            wireframe: true,
            transparent: true,
            opacity: 0.18,
            roughness: 0.4,
            metalness: 0.8
        });

        terrainMesh = new THREE.Mesh(terrainGeom, terrainMat);
        terrainMesh.rotation.x = -Math.PI / 2.3;
        terrainMesh.position.y = -14;
        terrainMesh.position.z = -5;
        scene.add(terrainMesh);
    }

    // Floating 3D Geometric Nodes (Representing the 5-Stage System)
    function createConstellationPolyhedra() {
        const geometries = [
            { geom: new THREE.IcosahedronGeometry(2.4, 0), pos: [-14, 5, -2], color: 0x38bdf8, speed: 0.6 },
            { geom: new THREE.OctahedronGeometry(2.0, 0), pos: [15, 6, -5], color: 0x818cf8, speed: 0.5 },
            { geom: new THREE.DodecahedronGeometry(2.2, 0), pos: [-11, -6, 2], color: 0xa855f7, speed: 0.4 },
            { geom: new THREE.TorusGeometry(2.2, 0.7, 16, 40), pos: [13, -7, 0], color: 0x10b981, speed: 0.7 },
            { geom: new THREE.TetrahedronGeometry(1.8, 0), pos: [0, 11, -8], color: 0x38bdf8, speed: 0.55 }
        ];

        geometries.forEach((item, index) => {
            const group = new THREE.Group();

            // Inner solid faceted core
            const solidMat = new THREE.MeshStandardMaterial({
                color: item.color,
                metalness: 0.85,
                roughness: 0.25,
                transparent: true,
                opacity: 0.75
            });
            const solidMesh = new THREE.Mesh(item.geom, solidMat);
            group.add(solidMesh);

            // Outer glowing wireframe shell
            const wireMat = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true,
                transparent: true,
                opacity: 0.25
            });
            const wireMesh = new THREE.Mesh(item.geom, wireMat);
            wireMesh.scale.set(1.08, 1.08, 1.08);
            group.add(wireMesh);

            group.position.set(...item.pos);
            group.userData = {
                rotSpeedX: (Math.random() * 0.008 + 0.004) * (index % 2 === 0 ? 1 : -1),
                rotSpeedY: (Math.random() * 0.008 + 0.004),
                initialY: item.pos[1],
                floatSpeed: item.speed,
                phase: Math.random() * Math.PI * 2
            };

            polyhedra.push(group);
            scene.add(group);
        });

        // Add 3D Dynamic Laser DAG Lines between polyhedra
        const lineMat = new THREE.LineBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.15
        });

        const points = [];
        for (let i = 0; i < polyhedra.length - 1; i++) {
            points.push(polyhedra[i].position);
            points.push(polyhedra[i + 1].position);
        }
        points.push(polyhedra[polyhedra.length - 1].position);
        points.push(polyhedra[0].position);

        const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
        const lineSegments = new THREE.LineSegments(lineGeom, lineMat);
        scene.add(lineSegments);
    }

    // Floating Starlight Particle Field
    function createParticleField() {
        const particleCount = 750;
        const geom = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const scales = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 80;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
            scales[i] = Math.random() * 0.8 + 0.2;
        }

        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const mat = new THREE.PointsMaterial({
            color: 0x93c5fd,
            size: 0.15,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending
        });

        particleSystem = new THREE.Points(geom, mat);
        scene.add(particleSystem);
    }

    function onMouseMove(e) {
        mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    function onCanvasClick(e) {
        // Trigger 3D terrain shockwave originating from click
        shockwave.active = true;
        shockwave.radius = 0;
        shockwave.originX = (e.clientX / window.innerWidth) * 40 - 20;
        shockwave.originY = -(e.clientY / window.innerHeight) * 40 + 20;
    }

    function onWindowResize() {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        // Smooth camera parallax with spring inertia
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        camera.position.x = mouse.x * 4.5;
        camera.position.y = mouse.y * 3.0;
        camera.lookAt(0, 0, 0);

        // Orbit colored point lights
        if (light1) {
            light1.position.x = Math.sin(time * 0.7) * 22;
            light1.position.y = Math.cos(time * 0.5) * 14;
            light1.position.z = Math.sin(time * 0.3) * 12 + 6;
        }
        if (light2) {
            light2.position.x = Math.cos(time * 0.6) * -24;
            light2.position.y = Math.sin(time * 0.8) * -12;
            light2.position.z = Math.cos(time * 0.4) * 10;
        }
        if (light3) {
            light3.position.x = Math.sin(time * 0.4) * 18;
            light3.position.y = Math.cos(time * 0.9) * 16;
            light3.position.z = Math.sin(time * 0.6) * 15;
        }

        // Animate floating polyhedra
        polyhedra.forEach(poly => {
            poly.rotation.x += poly.userData.rotSpeedX;
            poly.rotation.y += poly.userData.rotSpeedY;
            poly.position.y = poly.userData.initialY + Math.sin(time * poly.userData.floatSpeed + poly.userData.phase) * 0.85;

            // Soft reaction to cursor
            poly.rotation.z += (mouse.x * 0.3 - poly.rotation.z) * 0.02;
        });

        // Animate terrain waves
        if (terrainGeom) {
            const pos = terrainGeom.attributes.position;
            const u = terrainGeom.userData;
            const count = pos.count;

            if (shockwave.active) {
                shockwave.radius += shockwave.speed;
                if (shockwave.radius > shockwave.maxRadius) {
                    shockwave.active = false;
                }
            }

            for (let i = 0; i < count; i++) {
                const x = u.initialX[i];
                const y = u.initialY[i];

                // Harmonic wave formula
                let waveZ = Math.sin(x * 0.12 + time * 0.9) * 1.5 +
                            Math.cos(y * 0.14 + time * 0.8) * 1.4 +
                            Math.sin((x + y) * 0.06 + time * 1.1) * 0.8;

                // Shockwave pulse if active
                if (shockwave.active) {
                    const dist = Math.hypot(x - shockwave.originX, y - shockwave.originY);
                    const diff = Math.abs(dist - shockwave.radius);
                    if (diff < 4) {
                        waveZ += Math.cos((diff / 4) * Math.PI) * 3.5 * (1 - shockwave.radius / shockwave.maxRadius);
                    }
                }

                pos.setZ(i, waveZ);
            }
            pos.needsUpdate = true;
        }

        // Rotate ambient star particles
        if (particleSystem) {
            particleSystem.rotation.y = time * 0.02;
            particleSystem.rotation.x = time * 0.01;
        }

        renderer.render(scene, camera);
    }

    // ==========================================================================
    // 2. INTERACTIVE SIMULATOR WIDGET CONTROLLER (ON LANDING PAGE)
    // ==========================================================================

    const SIMULATOR_PRESETS = {
        ml: {
            title: "Master Machine Learning & Deep Learning",
            why: "Build production AI portfolio and qualify for Machine Learning Engineering internships.",
            level: "Intermediate",
            duration: "5 Weeks (Dec 28, 2026)",
            capacity: "5.0 hrs/week (300 mins)",
            stages: {
                clarify: {
                    title: "Stage 01: SMART Goal Formalization",
                    desc: "Transforms ambiguous aspiration into mathematically verifiable conditions of satisfaction.",
                    items: [
                        "Formal SMART Statement: Build, train, and deploy 3 production-grade ML models with >85% accuracy on public datasets by Dec 28, 2026.",
                        "Primary Metric: Evaluation test accuracy &gt; 85% with zero training data leakage.",
                        "Verified Evidence: GitHub repositories with working FastAPI deployment inference endpoints and ROC-AUC curve plots."
                    ]
                },
                objectives: {
                    title: "Stage 02: Objectives & Key Results (OKRs)",
                    desc: "Aligns high-level ambition with empirical, quantified milestone criteria.",
                    items: [
                        "KR1: Preprocess, clean, and visualize 3 Kaggle benchmark datasets (zero missing values).",
                        "KR2: Train and evaluate Random Forest, Gradient Boosting, and CNN models.",
                        "KR3: Build containerized Docker inference REST API serving live model predictions in <100ms."
                    ]
                },
                milestones: {
                    title: "Stage 03: Chronological Milestone DAG",
                    desc: "Dated milestones guaranteed to fit between your start date and target deadline.",
                    items: [
                        "M1 (Due Dec 01): Python Data Science Foundation (NumPy, Pandas, Matplotlib EDA).",
                        "M2 (Due Dec 10): Classical Machine Learning Core (Regression, Classification, Cross-validation).",
                        "M3 (Due Dec 20): Deep Learning & Neural Network Architecture (PyTorch / TensorFlow).",
                        "M4 (Due Dec 28): Model Deployment & REST API Portfolio Publication."
                    ]
                },
                tasks: {
                    title: "Stage 04: Actionable 45-Minute Focus Tasks",
                    desc: "Atomic micro-sessions sized for high-leverage flow states with zero circular dependencies.",
                    items: [
                        "Task 1 (45m): Setup Python 3.11 virtualenv with Poetry and install PyTorch, Scikit-learn.",
                        "Task 2 (45m): Clean Kaggle tabular dataset; engineer 4 polynomial interaction features.",
                        "Task 3 (45m): Train baseline Logistic Regression; compute precision, recall, and F1-score.",
                        "Task 4 (45m): Optimize Hyperparameters using Optuna Bayesian Optimization over 50 trials.",
                        "Task 5 (45m): Export trained model via ONNX runtime and write Dockerfile for containerization."
                    ]
                },
                validation: {
                    title: "Stage 05: Deterministic Logic Engine Validation",
                    desc: "Deterministic verification report guaranteeing calendar safety and workload feasibility.",
                    items: [
                        "Workload Capacity Balance: Planned 4.5h/week vs Available 5.0h/week (90% Load - SAFE).",
                        "DAG Dependency Check: 0 circular dependencies detected across 12 micro-tasks (Passed).",
                        "Exam Blackout Guard: Zero tasks scheduled during Dec 10-12 Midterm blackout dates.",
                        "Completion Feasibility Index: 98.4% Mathematical Confidence."
                    ]
                }
            }
        },
        gpa: {
            title: "Score 9.5+ GPA in College Semester",
            why: "Qualify for merit scholarships and secure direct admission to top Masters programs.",
            level: "Intermediate",
            duration: "10 Weeks (Finals Week)",
            capacity: "7.0 hrs/week (420 mins)",
            stages: {
                clarify: {
                    title: "Stage 01: SMART Academic Objective",
                    desc: "Converts academic anxiety into structured weekly mastery intervals.",
                    items: [
                        "Formal SMART Statement: Score an overall semester GPA of 9.5+ by securing 'A' grades in all 5 core engineering courses by Feb 15, 2027.",
                        "Primary Metric: Average internal test score &ge; 92% across all course quizzes and lab practicals.",
                        "Verified Evidence: Completed graded assignments, verified professor marks sheet, and lab submissions."
                    ]
                },
                objectives: {
                    title: "Stage 02: Key Academic Deliverables",
                    desc: "Measurable academic performance targets.",
                    items: [
                        "KR1: Complete 100% of weekly problem sets 48 hours prior to university deadlines.",
                        "KR2: Score 90%+ on all mid-semester exams across Algorithms, Operating Systems, and DBMS.",
                        "KR3: Complete full past-5-years question papers with handwritten solutions."
                    ]
                },
                milestones: {
                    title: "Stage 03: Academic Milestones",
                    desc: "Structured around course curriculum milestones.",
                    items: [
                        "M1: First Half Syllabus Mastery & Handwritten Comprehensive Formula Cheatsheet.",
                        "M2: Mid-Semester Exam Revision Sprint & Mock Exam Testing.",
                        "M3: Advanced Elective Modules & Lab Experiments Documentation.",
                        "M4: Comprehensive University Finals Review & Past-Year Question Solving."
                    ]
                },
                tasks: {
                    title: "Stage 04: Structured Study Sessions",
                    desc: "Active recall and spaced repetition micro-blocks.",
                    items: [
                        "Session 1 (45m): Solve 5 Dynamic Programming LeetCode Medium recurrence relations.",
                        "Session 2 (45m): Diagram OS Virtual Memory Page Replacement Algorithms (LRU, FIFO).",
                        "Session 3 (45m): Implement B+ Tree indexing and SQL query optimization benchmarks.",
                        "Session 4 (45m): Timed mock exam simulation under university test conditions."
                    ]
                },
                validation: {
                    title: "Stage 05: Academic Guard Validation",
                    desc: "Exam blackout safety guarantees.",
                    items: [
                        "Exam Buffer: 5 days prior to midterms reserved solely for active recall revision.",
                        "Weekly Hours Limit: 420 mins respected; burnout risk mathematically minimized.",
                        "Prerequisite Check: Operating Systems threads verified before concurrency synchronization."
                    ]
                }
            }
        },
        mvp: {
            title: "Build & Ship an AI Startup MVP in 60 Days",
            why: "Acquire first 100 paying beta users and validate product-market fit.",
            level: "Advanced",
            duration: "8 Weeks (60 Days)",
            capacity: "10.0 hrs/week (600 mins)",
            stages: {
                clarify: {
                    title: "Stage 01: Venture SMART Objective",
                    desc: "Sharpens vague entrepreneurial dreams into a lean, launchable product scope.",
                    items: [
                        "Formal SMART Statement: Build and launch a functional AI micro-SaaS with Stripe billing and onboard 25 active beta users by Day 60.",
                        "Primary Metric: 25 active users generating at least 5 AI operations per week.",
                        "Verified Evidence: Live URL with HTTPS, automated Stripe subscription checkout, and telemetry logs."
                    ]
                },
                objectives: {
                    title: "Stage 02: Product OKRs",
                    desc: "Quantifiable milestones for traction and infrastructure.",
                    items: [
                        "KR1: Core AI pipeline processing user inputs and returning structured responses in <3 seconds.",
                        "KR2: User authentication, JWT sessions, and role-based workspace management.",
                        "KR3: Landing page with interactive live preview and Stripe checkout integration."
                    ]
                },
                milestones: {
                    title: "Stage 03: Product Milestones",
                    desc: "Weekly sprints from prototype to production launch.",
                    items: [
                        "M1 (Week 2): Architecture, database schema, and AI proxy backend operational.",
                        "M2 (Week 4): Frontend dashboard UI and core prompt engineering workflow.",
                        "M3 (Week 6): Stripe billing, rate limiting, and automated transactional emails.",
                        "M4 (Week 8): Public Product Hunt launch and outbound founder outreach."
                    ]
                },
                tasks: {
                    title: "Stage 04: Engineering Micro-Tasks",
                    desc: "Zero-bloat coding sessions designed for shipping velocity.",
                    items: [
                        "Sprint 1 (60m): Setup PostgreSQL schema with Prisma ORM and write User/Subscription models.",
                        "Sprint 2 (45m): Integrate Gemini API with streaming responses and token rate limiter.",
                        "Sprint 3 (60m): Build responsive dashboard layout with Tailwind CSS and Lucide icons.",
                        "Sprint 4 (45m): Configure Stripe webhook listener for subscription renewal and cancellation."
                    ]
                },
                validation: {
                    title: "Stage 05: Velocity Validation",
                    desc: "Hard limits preventing scope creep.",
                    items: [
                        "Scope Reduction Engine: Automatically pruned non-essential chat features to meet Day 60 deadline.",
                        "Workload Guard: 10 hrs/week distributed cleanly over weeknights and weekend mornings.",
                        "Infrastructure Feasibility: Zero-maintenance serverless stack selected."
                    ]
                }
            }
        },
        interview: {
            title: "Clear Google SWE Technical Interviews",
            why: "Secure Software Engineer offer at Google with top-tier compensation.",
            level: "Advanced",
            duration: "8 Weeks (56 Days)",
            capacity: "8.0 hrs/week (480 mins)",
            stages: {
                clarify: {
                    title: "Stage 01: Interview SMART Objective",
                    desc: "Deconstructs technical interview prep into concrete algorithmic patterns.",
                    items: [
                        "Formal SMART Statement: Master all 14 algorithmic patterns, solve 120 curated LeetCode problems with optimal Big-O complexity, and pass 4 peer mock interviews by Week 8.",
                        "Primary Metric: Solve unknown LeetCode Medium problems in &le; 22 minutes with optimal time/space complexity.",
                        "Verified Evidence: GitHub repo with 120 documented problem solutions and recorded peer mock feedback."
                    ]
                },
                objectives: {
                    title: "Stage 02: Mastery Key Results",
                    desc: "Empirical benchmarks for algorithmic competence.",
                    items: [
                        "KR1: Solve 40 Data Structure fundamentals (Two Pointers, Sliding Window, Fast/Slow Pointers).",
                        "KR2: Solve 50 Graph, Tree, and Dynamic Programming problems with memoization/tabulation.",
                        "KR3: Complete 4 System Design mock sessions (URL Shortener, Distributed Cache, Rate Limiter)."
                    ]
                },
                milestones: {
                    title: "Stage 03: Prep Milestones",
                    desc: "Pattern-by-pattern progression timeline.",
                    items: [
                        "M1: Linear Data Structures & Search/Sort Optimization Mastery.",
                        "M2: Non-linear Data Structures: Trees, BSTs, Tries, and Heaps.",
                        "M3: Advanced Graph Algorithms (BFS, DFS, Dijkstra, Topological Sort).",
                        "M4: System Design Architecture & High-Pressure Mock Interview Gauntlet."
                    ]
                },
                tasks: {
                    title: "Stage 04: Algorithmic Drills",
                    desc: "Focused problem-solving intervals.",
                    items: [
                        "Drill 1 (45m): Implement LRU Cache with Doubly Linked List and Hash Map in Python.",
                        "Drill 2 (45m): Solve 'Word Ladder' using bidirectional BFS graph traversal.",
                        "Drill 3 (45m): Derive space-optimized O(N) solution for 'Longest Increasing Subsequence'.",
                        "Drill 4 (45m): Design a distributed rate limiter with Redis Token Bucket algorithm."
                    ]
                },
                validation: {
                    title: "Stage 05: Interview Preparedness Validator",
                    desc: "Deterministic confidence calculation.",
                    items: [
                        "Pattern Coverage: 14 out of 14 core SWE interview patterns accounted for.",
                        "Spaced Repetition: Staggered review intervals scheduled on Days 3, 7, and 21.",
                        "Workload Safety: 8 hrs/week evenly distributed to prevent cognitive fatigue."
                    ]
                }
            }
        }
    };

    let activePreset = 'ml';
    let activeStage = 'clarify';

    function initSimulator() {
        const chips = document.querySelectorAll('.sim-chip');
        const tabs = document.querySelectorAll('.sim-stage-tab');
        const launchBtn = document.getElementById('sim-launch-btn');

        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activePreset = chip.dataset.preset;
                updateSimulatorContent();
            });
        });

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeStage = tab.dataset.stage;
                updateSimulatorContent();
            });
        });

        if (launchBtn) {
            launchBtn.addEventListener('click', () => {
                const preset = SIMULATOR_PRESETS[activePreset];
                if (preset) {
                    try {
                        // Stage preset as active goal draft in localStorage
                        localStorage.setItem('goalflow_landing_import', JSON.stringify({
                            title: preset.title,
                            why: preset.why,
                            level: preset.level,
                            capacity: preset.capacity
                        }));
                    } catch (e) {}
                }
                window.location.href = 'AI.html#planner';
            });
        }

        updateSimulatorContent();
    }

    function updateSimulatorContent() {
        const preset = SIMULATOR_PRESETS[activePreset];
        if (!preset) return;

        const stageData = preset.stages[activeStage];
        if (!stageData) return;

        const titleEl = document.getElementById('sim-pane-title');
        const descEl = document.getElementById('sim-pane-desc');
        const listEl = document.getElementById('sim-pane-list');

        if (titleEl) titleEl.textContent = stageData.title;
        if (descEl) descEl.textContent = stageData.desc;

        if (listEl) {
            listEl.innerHTML = stageData.items.map(item => `
                <li>
                    <span class="bullet-dot"></span>
                    <span>${item}</span>
                </li>
            `).join('');
        }
    }

    // ==========================================================================
    // 3. 3D TILT PHYSICS FOR CARDS ON HOVER
    // ==========================================================================
    function initCardTilt() {
        const cards = document.querySelectorAll('.pillar-card, .comp-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotX = ((y - centerY) / centerY) * -7;
                const rotY = ((x - centerX) / centerX) * 7;

                card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            });
        });
    }

    // ==========================================================================
    // DOM READY INITIALIZATION
    // ==========================================================================
    document.addEventListener('DOMContentLoaded', () => {
        init3D();
        initSimulator();
        initCardTilt();
    });

})();
