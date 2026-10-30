/**
 * Projects. Add a project by appending an object here and (optionally) an
 * image in /public/work. The home list, the /work/[slug] page, the sitemap
 * and metadata are generated from this file; no layout code changes needed.
 *
 * Writing rules: first person, plain English, specific over impressive.
 * Strings starting with "TODO(safwan)" are hidden in production.
 */

export type ProjectLabel =
  | "FOUNDER PROJECT"
  | "LIVE PRODUCT"
  | "HARDWARE PROTOTYPE"
  | "RESEARCH"
  | "IN PROGRESS"
  | "PLANNED"
  | "INTERNSHIP";

export type DiagramNode = { label: string; sub?: string };

export type Project = {
  slug: string;
  title: string;
  idea: string; // one line shown in the list
  label: ProjectLabel;
  year: string;
  role: string;
  stack: string[];
  problem: string;
  built: string;
  diagram: { caption: string; nodes: DiagramNode[] };
  results: { value: string; label: string }[];
  resultsNote?: string;
  changes: string;
  links: { label: string; href: string }[];
  image?: { src: string; alt: string; width: number; height: number };
  paperId?: string;
};

export const projects: Project[] = [
  {
    slug: "zenix",
    title: "Zenix",
    idea: "Describe a UI component and three AI agents design, style and code it, animated.",
    label: "FOUNDER PROJECT",
    year: "2025",
    role: "Solo founder. Built during Lovable Shipped Season 1.",
    stack: ["Python", "FastAPI", "Multi-agent orchestration", "React", "Tailwind CSS", "Motion"],
    problem:
      "Hand-writing animated interface components is slow, and most generated UI looks the same. Zenix takes a short description and returns a working component with layout, styling and motion already in it.",
    built:
      "A three-agent pipeline: one agent plans the layout, one decides the styling, and one writes the code. The agents run behind a FastAPI service tuned for low-latency hand-offs, and the product around them has a component library, themes and a waitlist.",
    diagram: {
      caption: "How a request moves through Zenix",
      nodes: [
        { label: "Prompt", sub: "describe the component" },
        { label: "Layout agent", sub: "structure" },
        { label: "Style agent", sub: "look and motion" },
        { label: "Code agent", sub: "React · Tailwind" },
        { label: "Component", sub: "animated, ready" },
      ],
    },
    results: [
      { value: "Top 28", label: "in Asia, Lovable weekly challenge" },
      { value: "3,000+", label: "participants in the challenge" },
      { value: "3", label: "agents in the pipeline" },
    ],
    resultsNote: "Ranked in the top 1% globally of that challenge.",
    changes: "TODO(safwan): what failed or what you would build differently.",
    links: [{ label: "Live demo", href: "https://zenixx.netlify.app" }],
    image: {
      src: "/work/zenix.webp",
      alt: "The Zenix landing page: a headline about bringing soul back to interfaces, with buttons to browse UI elements or try the agents.",
      width: 1600,
      height: 860,
    },
  },
  {
    slug: "neuronav",
    title: "NeuroNav",
    idea: "Upload a brain MRI and see what the model found, why, and where, in 3D.",
    label: "LIVE PRODUCT",
    year: "2025",
    role: "Built end to end during my incubation at SU Knowledge Hub.",
    stack: ["Python", "FastAPI", "TensorFlow", "scikit-learn", "OpenCV", "Grad-CAM", "React", "Three.js", "Supabase"],
    problem:
      "Reading brain MRIs takes specialist time, and a classifier that only outputs a label is hard for a clinician to trust. Doctors need to see why a model flagged a scan before they believe it.",
    built:
      "A full-stack platform: upload a scan, a multi-model engine (CNN, SVM and Random Forest) classifies it, Grad-CAM shows which regions drove the prediction, and an interactive 3D brain lets you explore the result. Image preprocessing and augmentation make the models more robust.",
    diagram: {
      caption: "NeuroNav request flow",
      nodes: [
        { label: "Upload", sub: "MRI scan" },
        { label: "Preprocess", sub: "clean and augment" },
        { label: "Classify", sub: "CNN · SVM · RF" },
        { label: "Explain", sub: "Grad-CAM heatmap" },
        { label: "Explore", sub: "3D brain viewer" },
      ],
    },
    results: [
      { value: "3", label: "models compared: CNN, SVM, Random Forest" },
      { value: "Grad-CAM", label: "visual evidence for every prediction" },
      { value: "Live", label: "deployed web app" },
    ],
    resultsNote: "TODO(safwan): test accuracy per model and the dataset you trained on.",
    changes: "TODO(safwan): what you would change.",
    links: [
      { label: "Live app", href: "https://neuro-naav.netlify.app/" },
      { label: "Code on GitHub", href: "https://github.com/safwannuddin/Neuro-Nav" },
    ],
  },
  {
    slug: "aegisui",
    title: "AegisUI",
    idea: "Catching AI-generated interfaces that pass schema checks but still mislead people.",
    label: "RESEARCH",
    year: "2026",
    role: "Lead author, with Saba Hajira.",
    stack: ["Python", "scikit-learn", "Isolation Forest", "Autoencoder", "Random Forest"],
    problem:
      "AI agents increasingly send structured payloads that a client renders as a real interface. A payload can be perfectly valid and still be harmful: a button whose label and action disagree, or a widget wired to sensitive data. Schema validation does not see this.",
    built:
      "A pipeline that generates UI payloads across five domains, injects five families of attack, extracts 18 behavioural features from each payload, and benchmarks three detectors on the result.",
    diagram: {
      caption: "AegisUI benchmark pipeline",
      nodes: [
        { label: "Generate", sub: "payloads, 5 domains" },
        { label: "Inject", sub: "5 attack families" },
        { label: "Extract", sub: "18 features" },
        { label: "Detect", sub: "IF · AE · RF" },
        { label: "Evaluate", sub: "4,000 payloads" },
      ],
    },
    results: [
      { value: "93.1%", label: "accuracy, Random Forest" },
      { value: "0.952", label: "ROC-AUC" },
      { value: "4,000", label: "labelled payloads, 1,000 malicious" },
    ],
    resultsNote:
      "A benign-only autoencoder was a workable option when no attack labels exist. Layout abuse was the easiest attack to detect; manipulative UI was the hardest.",
    changes:
      "Manipulative UI stayed the hardest family to catch, which points to features that read meaning, not only structure. TODO(safwan): what you would try next.",
    links: [
      { label: "Paper on arXiv", href: "https://arxiv.org/abs/2603.05031" },
      { label: "PDF", href: "https://arxiv.org/pdf/2603.05031" },
    ],
    paperId: "2603.05031",
  },
  {
    slug: "apex",
    title: "APEX",
    idea: "Letting AI agents pay for API calls over UPI, with a spending policy built in.",
    label: "RESEARCH",
    year: "2026",
    role: "Lead author, with Mohammed Mouzam, Mohammed Imran and Syed Badar Uddin Faizan.",
    stack: ["Python", "FastAPI", "SQLite", "HMAC tokens"],
    problem:
      "Agents that call paid APIs need a way to pay per request without a human approving every charge. HTTP 402 payment gating exists, but it is mostly tied to cryptocurrency. APEX tests the idea on real-time fiat payments such as UPI, and adds a policy so an agent cannot overspend.",
    built:
      "A challenge, settle, consume flow: the API answers with a payment challenge, a policy engine decides whether the agent may pay, settlement is idempotent, and the agent receives a short-lived HMAC-signed token that it spends on the call.",
    diagram: {
      caption: "APEX request flow",
      nodes: [
        { label: "Challenge", sub: "API returns 402" },
        { label: "Policy", sub: "may this agent pay?" },
        { label: "Settle", sub: "UPI, idempotent" },
        { label: "Token", sub: "HMAC, short-lived" },
        { label: "Consume", sub: "call the API" },
      ],
    },
    results: [
      { value: "27.3%", label: "less total spend with policy on" },
      { value: "100%", label: "replay and invalid tokens blocked" },
      { value: "19.6 ms", label: "average latency added" },
    ],
    resultsNote:
      "Evaluated against three baselines across six scenarios. Under policy, 52.8% of legitimate requests succeeded.",
    changes:
      "The policy trades approvals for spend control: just over half of legitimate requests went through. TODO(safwan): how you would raise that without losing control.",
    links: [
      { label: "Paper on arXiv", href: "https://arxiv.org/abs/2604.02023" },
      { label: "PDF", href: "https://arxiv.org/pdf/2604.02023" },
    ],
    paperId: "2604.02023",
  },
  {
    slug: "mira",
    title: "MIRA",
    idea: "A screen-free AI learning buddy for kids that listens, thinks and talks back in under two seconds.",
    label: "HARDWARE PROTOTYPE",
    year: "2025",
    role: "Solo build: hardware, backend and app.",
    stack: ["Python", "FastAPI", "Gemini", "Whisper", "Neural TTS", "ESP32", "React", "SQLite"],
    problem:
      "Most learning apps for children mean more screen time. MIRA tries the opposite: a small device a child can simply talk to, which answers with a voice instead of a screen.",
    built:
      "An ESP32 records the child's voice and streams it to a FastAPI backend. Whisper turns speech into text, Gemini writes the answer, neural text-to-speech speaks it, and the audio goes back to the device's speaker. A web dashboard lets parents see sessions and control the robot.",
    diagram: {
      caption: "MIRA voice loop",
      nodes: [
        { label: "ESP32", sub: "mic in" },
        { label: "Whisper", sub: "speech to text" },
        { label: "Gemini", sub: "the answer" },
        { label: "Neural TTS", sub: "text to speech" },
        { label: "ESP32", sub: "speaker out" },
      ],
    },
    results: [
      { value: "< 2 s", label: "end-to-end voice response" },
      { value: "ESP32", label: "audio loop optimised on-device" },
      { value: "0", label: "screens needed by the child" },
    ],
    resultsNote: "",
    changes: "TODO(safwan): what you would change.",
    links: [{ label: "Code on GitHub", href: "https://github.com/safwannuddin/mira-companion-ai" }],
  },
  {
    slug: "fair-price",
    title: "Fair Price",
    idea: "A London home price estimator, with linear regression written from scratch.",
    label: "IN PROGRESS",
    year: "2026",
    role: "Solo project.",
    stack: ["Python", "NumPy", "HM Land Registry data", "EPC data", "API"],
    problem:
      "I want to understand regression end to end on real data, not through a library call. London house prices are public, messy and worth getting right, so they make a good test.",
    built:
      "Linear regression implemented from first principles, trained on HM Land Registry price-paid records joined with Energy Performance Certificate data, and served as an API that returns an estimate.",
    diagram: {
      caption: "Planned pipeline",
      nodes: [
        { label: "Data", sub: "Land Registry + EPC" },
        { label: "Prepare", sub: "clean and join" },
        { label: "Model", sub: "regression from scratch" },
        { label: "API", sub: "price estimate" },
      ],
    },
    results: [],
    resultsNote: "In progress. Error metrics will go here once the model is trained.",
    changes: "TODO(safwan): notes once the first version is trained.",
    links: [],
  },
  {
    slug: "agent-injection-tester",
    title: "Agent injection tester",
    idea: "Testing whether hidden instructions in a web page or email can hijack an AI agent.",
    label: "PLANNED",
    year: "2027",
    role: "Solo project. Builds on my agent security research.",
    stack: ["Python", "TODO(safwan): agent frameworks to test"],
    problem:
      "AI agents read web pages and emails for us. Text hidden inside them can tell the agent to do something the user never asked for. I want a repeatable way to measure how often that works.",
    built:
      "Planned: a set of test pages and emails with hidden instructions, a harness that runs an agent against them, and a log of every tool call so a hijack is visible.",
    diagram: {
      caption: "Planned design",
      nodes: [
        { label: "Test input", sub: "page or email" },
        { label: "Agent", sub: "under test" },
        { label: "Observer", sub: "logs tool calls" },
        { label: "Report", sub: "hijacked or not" },
      ],
    },
    results: [],
    resultsNote: "Planned for 2027. Nothing is built yet.",
    changes: "",
    links: [],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
