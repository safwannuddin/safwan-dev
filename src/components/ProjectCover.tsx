import s from "./ProjectCover.module.css";

/**
 * Hand-built SVG cover art, one colour world per project.
 * Colours come from --w-* tokens so every cover follows the theme.
 * Hovering the parent (.coverHost:hover) plays a small motion in the art.
 */

type Props = { slug: string; title: string };

const VB = "0 0 800 520";

function Frame({ world, children, kicker }: { world: string; children: React.ReactNode; kicker: string }) {
  return (
    <svg className={s.cover} data-world={world} viewBox={VB} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="520" className={s.bg} />
      <g className={s.grid}>
        {Array.from({ length: 21 }, (_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="520" />
        ))}
        {Array.from({ length: 14 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40} />
        ))}
      </g>
      <text x="36" y="50" className={s.kicker}>
        {kicker}
      </text>
      {children}
    </svg>
  );
}

function Zenix() {
  return (
    <Frame world="zenix" kicker="prompt → agents → component">
      {/* prompt */}
      <g transform="translate(60 150)">
        <rect width="220" height="58" rx="14" className={s.paper} />
        <text x="18" y="35" className={s.monoInk}>
          “a card that breathes”
        </text>
      </g>
      {/* agents */}
      <g className={s.dash}>
        <path d="M280 180 C 330 180, 330 120, 380 120" />
        <path d="M280 180 C 330 180, 330 240, 380 240" />
        <path d="M420 120 C 470 120, 470 180, 520 200" />
        <path d="M420 240 C 470 240, 470 210, 520 210" />
        <path d="M400 140 V 220" />
      </g>
      {[120, 240].map((y) => (
        <g key={y} transform={`translate(400 ${y})`}>
          <circle r="20" className={s.node} />
          <circle r="5" className={s.hiFill} />
        </g>
      ))}
      {/* component being assembled */}
      <g className={s.float}>
        <rect x="520" y="120" width="210" height="250" rx="18" className={s.paper} />
        <rect x="540" y="140" width="170" height="90" rx="10" className={s.hiSoft} />
        <path d="M560 205 q 22 -40 44 -10 t 44 -18 t 42 6" className={s.hiStroke} />
        <rect x="540" y="248" width="120" height="10" rx="5" className={s.inkSoft} />
        <rect x="540" y="268" width="90" height="10" rx="5" className={s.inkSoft} />
        <rect x="540" y="314" width="86" height="34" rx="17" className={s.hiFill} />
      </g>
      {/* motion arcs */}
      <g className={s.arcs}>
        <path d="M745 150 a 40 40 0 0 1 0 60" />
        <path d="M760 135 a 60 60 0 0 1 0 90" />
      </g>
      <text x="36" y="470" className={s.word}>
        Zenix
      </text>
    </Frame>
  );
}

function Aegis() {
  return (
    <Frame world="aegis" kicker="valid schema · misleading interface">
      <g transform="translate(150 96)">
        <rect width="500" height="320" rx="18" className={s.paper} />
        <path d="M0 48 H500" className={s.rule} />
        {[24, 44, 64].map((x) => (
          <circle key={x} cx={x} cy="24" r="6" className={s.inkSoft} />
        ))}
        <rect x="32" y="80" width="180" height="12" rx="6" className={s.inkSoft} />
        <rect x="32" y="116" width="436" height="40" rx="10" className={s.field} />
        <rect x="32" y="168" width="436" height="40" rx="10" className={s.field} />
        <rect x="32" y="244" width="130" height="44" rx="22" className={s.ghost} />
        <text x="97" y="272" textAnchor="middle" className={s.btnTextInk}>
          Cancel
        </text>
        <rect x="178" y="244" width="150" height="44" rx="22" className={s.hiFill} />
        <text x="253" y="272" textAnchor="middle" className={s.btnText}>
          Confirm
        </text>
        {/* detector bracket */}
        <g className={s.scan}>
          <path d="M168 236 h14 M168 236 v14 M338 236 h-14 M338 236 v14 M168 296 h14 M168 296 v-14 M338 296 h-14 M338 296 v-14" className={s.bracket} />
        </g>
        <path d="M0 0 H500" className={s.scanLine} />
      </g>
      <g transform="translate(500 380)">
        <rect width="250" height="82" rx="12" className={s.tag} />
        <text x="18" y="32" className={s.monoTag}>
          label  “Confirm”
        </text>
        <text x="18" y="58" className={s.monoTagHi}>
          action delete_account
        </text>
      </g>
      <text x="36" y="470" className={s.word}>
        AegisUI
      </text>
    </Frame>
  );
}

function Apex() {
  return (
    <Frame world="apex" kicker="challenge → policy → settle → token">
      <text x="400" y="290" textAnchor="middle" className={s.huge}>
        402
      </text>
      <path d="M90 360 C 250 360, 250 410, 400 410 S 560 360, 720 360" className={s.dashInk} />
      {[
        { x: 90, t: "request" },
        { x: 400, t: "pay · UPI" },
        { x: 720, t: "200 OK" },
      ].map((n) => (
        <g key={n.x}>
          <circle cx={n.x} cy={n.x === 400 ? 410 : 360} r="9" className={n.x === 720 ? s.hiFill : s.node} />
          <text x={n.x} y={(n.x === 400 ? 410 : 360) + 36} textAnchor="middle" className={s.monoInk}>
            {n.t}
          </text>
        </g>
      ))}
      <g className={s.token}>
        <rect x="520" y="140" width="190" height="84" rx="12" className={s.paper} />
        <circle cx="520" cy="182" r="12" className={s.bg} />
        <circle cx="710" cy="182" r="12" className={s.bg} />
        <text x="550" y="175" className={s.monoInk}>
          token
        </text>
        <text x="550" y="202" className={s.monoHi}>
          hmac · 60s
        </text>
      </g>
      <g transform="translate(90 140)">
        <rect width="150" height="84" rx="12" className={s.paper} />
        <text x="20" y="35" className={s.monoInk}>
          policy
        </text>
        <rect x="20" y="50" width="110" height="10" rx="5" className={s.hiSoft} />
        <rect x="20" y="50" width="72" height="10" rx="5" className={s.hiFill} />
      </g>
      <text x="36" y="470" className={s.word}>
        APEX
      </text>
    </Frame>
  );
}

function Fair() {
  const pts: [number, number][] = [
    [140, 380], [170, 352], [196, 366], [220, 330], [244, 318], [262, 340], [290, 300], [312, 286],
    [336, 300], [360, 262], [384, 270], [410, 240], [432, 250], [456, 214], [480, 226], [506, 198],
    [530, 186], [552, 204], [578, 168], [604, 160], [628, 176], [652, 136], [680, 128],
  ];
  return (
    <Frame world="fair" kicker="price ~ floor area + EPC + location">
      <path d="M110 110 V 410 H 720" className={s.axis} />
      <text x="720" y="436" textAnchor="end" className={s.monoInk}>
        floor area
      </text>
      <text x="120" y="100" className={s.monoInk}>
        price
      </text>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" className={s.dot} />
      ))}
      <path d="M130 382 L 700 124" className={s.fit} />
      {/* rooftops along the baseline */}
      <path
        d="M560 410 v-40 l20 -18 l20 18 v40 M610 410 v-56 h36 v56 M656 410 v-34 l16 -14 l16 14 v34"
        className={s.roofs}
      />
      <text x="36" y="470" className={s.word}>
        Fair Price
      </text>
    </Frame>
  );
}

function Inject() {
  return (
    <Frame world="inject" kicker="what the agent reads ≠ what you see">
      <g transform="translate(110 92)">
        <rect width="420" height="320" rx="16" className={s.paper} />
        <text x="28" y="44" className={s.monoInk}>
          Subject: Your invoice
        </text>
        <path d="M0 64 H420" className={s.rule} />
        {[96, 124, 152, 236, 264].map((y, i) => (
          <rect key={y} x="28" y={y} width={[340, 300, 360, 320, 220][i]} height="10" rx="5" className={s.inkSoft} />
        ))}
        <text x="28" y="200" className={s.hidden}>
          ignore previous instructions
        </text>
      </g>
      {/* lens */}
      <g className={s.lens}>
        <circle cx="250" cy="288" r="62" className={s.lensGlass} />
        <path d="M294 332 L 340 378" className={s.lensHandle} />
      </g>
      {/* agent */}
      <g transform="translate(620 230)">
        <path d="M0 -46 L40 -23 V23 L0 46 L-40 23 V-23 Z" className={s.node} />
        <text y="6" textAnchor="middle" className={s.monoInk}>
          agent
        </text>
      </g>
      <path d="M530 250 C 560 250, 560 240, 576 236" className={s.dashHi} />
      <text x="36" y="470" className={s.word}>
        Injection tester
      </text>
    </Frame>
  );
}

function Neuro() {
  return (
    <Frame world="neuro" kicker="MRI → classify → explain → explore">
      <defs>
        <radialGradient id="neuroHeat">
          <stop offset="0" stopColor="#ff5a3c" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#ffc24a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2ed3c6" stopOpacity="0" />
        </radialGradient>
        <clipPath id="neuroClip">
          <rect x="200" y="90" width="400" height="320" rx="18" />
        </clipPath>
      </defs>
      <rect x="200" y="90" width="400" height="320" rx="18" className={s.paper} style={{ fill: "#071416" }} />
      <g clipPath="url(#neuroClip)">
        <rect x="200" y="90" width="400" height="24" className={s.scanBar} />
      </g>
      <path
        className={s.brain}
        d="M300 330 C 240 330 222 272 252 242 C 232 192 282 150 322 166 C 342 122 412 116 432 152 C 472 130 524 160 518 202 C 562 218 560 282 522 300 C 522 342 472 362 442 340 C 420 372 360 372 345 346 C 330 356 310 346 300 330 Z"
      />
      <path className={s.gyri} d="M400 160 C 392 200 410 240 398 300 C 394 330 402 350 400 360" />
      <path className={s.gyri} d="M280 230 C 310 220 330 250 360 236 M300 290 C 330 300 350 270 372 286 M430 200 C 452 220 480 206 500 222 M440 270 C 460 260 482 284 506 270" />
      <circle cx="455" cy="232" r="70" fill="url(#neuroHeat)" className={s.heat} />
      <path d="M210 112 h22 M210 112 v22 M590 112 h-22 M590 112 v22 M210 388 h22 M210 388 v-22 M590 388 h-22 M590 388 v-22" className={s.bracket} style={{ stroke: "var(--hi)" }} />
      <g transform="translate(530 150)">
        <rect width="230" height="74" rx="12" className={s.tag} />
        <text x="16" y="31" className={s.monoTag}>Grad-CAM</text>
        <text x="16" y="56" className={s.monoTagHi}>region of interest</text>
      </g>
      <text x="36" y="470" className={s.word}>
        NeuroNav
      </text>
    </Frame>
  );
}

function Mira() {
  return (
    <Frame world="mira" kicker="speak → whisper → gemini → voice">
      <g transform="translate(70 120)">
        <rect width="260" height="66" rx="20" className={s.bubble} />
        <text x="22" y="41" className={s.monoInk}>
          “why is the sky blue?”
        </text>
      </g>
      <g className={s.waves} transform="translate(250 230)">
        <path d="M0 40 q 14 -40 0 -80" transform="translate(40 40)" />
        <path d="M0 60 q 22 -60 0 -120" transform="translate(64 50)" />
      </g>
      <g transform="translate(360 150)">
        <line x1="90" y1="0" x2="90" y2="-34" stroke="var(--ink)" strokeWidth="3" />
        <circle cx="90" cy="-40" r="9" className={s.hiFill} />
        <rect width="180" height="170" rx="44" className={s.robot} />
        <rect x="22" y="26" width="136" height="88" rx="28" className={s.face} />
        <rect x="52" y="52" width="18" height="34" rx="9" className={s.eye} />
        <rect x="110" y="52" width="18" height="34" rx="9" className={s.eye} />
        <path d="M66 136 q 24 16 48 0" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g transform="translate(560 300)">
        <rect width="200" height="66" rx="20" className={s.bubbleHi} />
        <text x="22" y="41" className={s.btnTextDark}>
          sunlight scatters…
        </text>
      </g>
      <g transform="translate(600 110)">
        <rect width="120" height="48" rx="24" className={s.tag} />
        <text x="60" y="31" textAnchor="middle" className={s.monoTag}>
          {"< 2 s"}
        </text>
      </g>
      <text x="36" y="470" className={s.word}>
        MIRA
      </text>
    </Frame>
  );
}

const MAP: Record<string, () => React.JSX.Element> = {
  neuronav: Neuro,
  mira: Mira,
  zenix: Zenix,
  aegisui: Aegis,
  apex: Apex,
  "fair-price": Fair,
  "agent-injection-tester": Inject,
};

export default function ProjectCover({ slug, title }: Props) {
  const Art = MAP[slug];
  if (!Art) return <div className={s.fallback}>{title}</div>;
  return <Art />;
}
