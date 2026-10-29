// Obsidian Cyber-Glass SVG component kit shared by profile READMEs.
// Content lives in build-assets.mjs next to this file.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

let out = "assets";
export const setOut = (dir) => { out = dir; mkdirSync(out, { recursive: true }); };

export const C = {
  bg: "#05070e", panel: "#0c101d", line: "#1a2033", text: "#e6e9f5", dim: "#7d849b", faint: "#4a5068",
  indigo: "#5e6ad2", violet: "#8b93ff", cyan: "#00e5ff", mongo: "#00ED64", nvidia: "#76B900", yc: "#FB651E",
  w3c: "#3d8fd6", lf: "#4f7cff", java: "#f89820", ts: "#3178c6", rust: "#dea584",
};
export const MONO = `'JetBrains Mono','SF Mono','Cascadia Code',Consolas,'Liberation Mono',monospace`;
export const SANS = `'Inter','Segoe UI',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif`;
export const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
export const monoW = (s, size) => s.length * size * 0.61;

// Shared defs: gradient border, glass fill, glow, grid pattern.
export const defs = (id, accent = C.indigo, accent2 = C.cyan) => `
  <defs>
    <linearGradient id="${id}-border" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${accent}" stop-opacity=".9"/>
      <stop offset=".5" stop-color="${C.line}" stop-opacity=".6"/>
      <stop offset="1" stop-color="${accent2}" stop-opacity=".8"/>
    </linearGradient>
    <linearGradient id="${id}-glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#10152a"/>
      <stop offset="1" stop-color="${C.bg}"/>
    </linearGradient>
    <radialGradient id="${id}-orb" cx=".85" cy="0" r=".9">
      <stop offset="0" stop-color="${accent}" stop-opacity=".28"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="${id}-grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M24 0H0V24" fill="none" stroke="#ffffff" stroke-opacity=".035"/>
    </pattern>
    <filter id="${id}-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>`;

export const frame = (id, w, h, r = 14) => `
  <rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="${r}" fill="url(#${id}-glass)"/>
  <rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="${r}" fill="url(#${id}-grid)"/>
  <rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="${r}" fill="url(#${id}-orb)"/>
  <rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="${r}" fill="none" stroke="url(#${id}-border)" stroke-width="1"/>`;

export const pulseDot = (x, y, color, id) => `
  <circle cx="${x}" cy="${y}" r="4" fill="${color}" filter="url(#${id}-glow)"/>
  <circle cx="${x}" cy="${y}" r="4" fill="none" stroke="${color}" class="pulse"/>`;

export const chip = (x, y, label, color, size = 11) => {
  const w = monoW(label, size) + 18;
  return {
    w,
    svg: `<g transform="translate(${x},${y})">
      <rect width="${w}" height="22" rx="11" fill="${color}" fill-opacity=".12" stroke="${color}" stroke-opacity=".45"/>
      <text x="${w / 2}" y="15" text-anchor="middle" font-family="${MONO}" font-size="${size}" fill="${color}">${esc(label)}</text>
    </g>`,
  };
};
export const chipRow = (x, y, items) => {
  let cx = x, s = "";
  for (const [label, color] of items) { const c = chip(cx, y, label, color); s += c.svg; cx += c.w + 8; }
  return s;
};

export const baseStyle = `
  <style>
    .pulse { transform-box: fill-box; transform-origin: center; animation: pulse 2.4s ease-out infinite; }
    @keyframes pulse { 0% { transform: scale(1); opacity: .9 } 100% { transform: scale(3.2); opacity: 0 } }
    @media (prefers-reduced-motion: reduce) { * { animation: none !important; opacity: 1 !important } }
  </style>`;

export const svg = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
  <title>${esc(title)}</title>${body}
</svg>
`;
export const write = (name, content) => writeFileSync(join(out, name), content);

// ─── Hero: terminal boot HUD ─────────────────────────────────────────────
// lines: array of [text, color][] segments, revealed one after another.
export const hero = ({ name, subtitle, host, uplink, lines, statusText = "all systems nominal", nameGradient = ["#ffffff", C.violet, C.cyan], file = "hero.svg" }) => {
  const W = 1200, id = "h";
  const x0 = 40, y0 = 196, lh = 23, fs = 14.5, step = 0.32;
  const H = y0 + lines.length * lh + 34;
  let body = "", css = "";
  lines.forEach((segs, i) => {
    let spans = "";
    for (const [t, col] of segs) spans += `<tspan fill="${col}">${esc(t)}</tspan>`;
    css += `.l${i}{opacity:0;animation:in .35s ease-out ${(0.6 + i * step).toFixed(2)}s forwards}`;
    body += `<text class="l${i}" x="${x0}" y="${y0 + i * lh}" font-family="${MONO}" font-size="${fs}" xml:space="preserve">${spans}</text>`;
  });
  const cursorY = y0 + lines.length * lh;
  const cursorDelay = (0.6 + lines.length * step).toFixed(2);
  const content = `${defs(id)}
  <style>
    @keyframes in { from { opacity: 0; transform: translateX(-6px) } to { opacity: 1; transform: none } }
    ${css}
    .cur { opacity: 0; animation: in .2s ${cursorDelay}s forwards, blink 1s steps(1) ${cursorDelay}s infinite; }
    @keyframes blink { 50% { opacity: 0 } }
    .scan { animation: scan 7s linear infinite; }
    @keyframes scan { from { transform: translateY(-40px) } to { transform: translateY(${H}px) } }
    .pulse { transform-box: fill-box; transform-origin: center; animation: pulse 2.4s ease-out infinite; }
    @keyframes pulse { 0% { transform: scale(1); opacity: .9 } 100% { transform: scale(3.2); opacity: 0 } }
    @media (prefers-reduced-motion: reduce) { * { animation: none !important; opacity: 1 !important } }
  </style>
  <linearGradient id="h-name" x1="0" x2="1">${nameGradient.map((c, i) => `<stop offset="${i / (nameGradient.length - 1)}" stop-color="${c}"/>`).join("")}</linearGradient>
  <linearGradient id="h-scan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cyan}" stop-opacity="0"/><stop offset="1" stop-color="${C.cyan}" stop-opacity=".07"/></linearGradient>
  <clipPath id="h-clip"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="16"/></clipPath>
  ${frame(id, W, H, 16)}
  <g clip-path="url(#h-clip)"><rect class="scan" x="0" y="0" width="${W}" height="40" fill="url(#h-scan)"/></g>

  <circle cx="28" cy="26" r="6" fill="#ff5f57"/><circle cx="48" cy="26" r="6" fill="#febc2e"/><circle cx="68" cy="26" r="6" fill="#28c840"/>
  <text x="${W / 2}" y="31" text-anchor="middle" font-family="${MONO}" font-size="12.5" fill="${C.faint}">${esc(host)}</text>
  <line x1="0" y1="50" x2="${W}" y2="50" stroke="${C.line}"/>

  <text x="40" y="112" font-family="${SANS}" font-size="50" font-weight="700" letter-spacing="-1.5" fill="url(#h-name)">${esc(name)}</text>
  <text x="42" y="146" font-family="${MONO}" font-size="14" fill="${C.dim}">${esc(subtitle)}</text>
  ${pulseDot(W - 54 - monoW(statusText, 13), 100, C.mongo, id)}
  <text x="${W - 40}" y="105" text-anchor="end" font-family="${MONO}" font-size="13" fill="${C.mongo}">${esc(statusText)}</text>
  <text x="${W - 40}" y="130" text-anchor="end" font-family="${MONO}" font-size="12" fill="${C.faint}">uplink: ${esc(uplink)}</text>
  <line x1="40" y1="168" x2="${W - 40}" y2="168" stroke="${C.line}" stroke-dasharray="2 6"/>

  ${body}
  <text class="cur" x="${x0}" y="${cursorY}" font-family="${MONO}" font-size="${fs}"><tspan fill="${C.mongo}">❯ </tspan><tspan fill="${C.text}">▍</tspan></text>`;
  write(file, svg(W, H, content, `${name} — ${subtitle}`));
};

// ─── Section header ──────────────────────────────────────────────────────
export const header = (file, num, label, sub, accent = C.indigo) => {
  const W = 1200, H = 72;
  const content = `
  <linearGradient id="s-line" x1="0" x2="1"><stop offset="0" stop-color="${accent}"/><stop offset=".4" stop-color="${C.cyan}" stop-opacity=".5"/><stop offset="1" stop-color="${C.cyan}" stop-opacity="0"/></linearGradient>
  <style>.sweep{animation:sweep 5s ease-in-out infinite}@keyframes sweep{0%{transform:translateX(-200px);opacity:0}30%{opacity:1}100%{transform:translateX(1200px);opacity:0}}@media (prefers-reduced-motion: reduce){.sweep{animation:none;opacity:0}}</style>
  <text x="0" y="30" font-family="${MONO}" font-size="13" fill="${accent}" letter-spacing="2">// ${num}</text>
  <text x="${monoW(`// ${num}`, 13) + 22}" y="31" font-family="${SANS}" font-size="22" font-weight="600" fill="${C.text}" letter-spacing="-.3">${esc(label)}</text>
  <text x="${W}" y="30" text-anchor="end" font-family="${MONO}" font-size="12" fill="${C.dim}">${esc(sub)}</text>
  <rect x="0" y="50" width="${W}" height="1.5" fill="url(#s-line)"/>
  <rect class="sweep" x="0" y="49" width="160" height="3.5" rx="2" fill="${C.cyan}" opacity=".8"/>`;
  write(file, svg(W, H, content, label));
};

// ─── Accreditation strip ─────────────────────────────────────────────────
export const programs = (items, file = "programs.svg") => {
  const W = 1200, H = 64, id = "a", fs = 13, gap = 12;
  const widths = items.map(([l]) => monoW(l, fs) + 44);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
  let x = (W - total) / 2, body = "";
  items.forEach(([label, color], i) => {
    const w = widths[i];
    body += `<g transform="translate(${x},14)">
      <rect width="${w}" height="36" rx="18" fill="${color}" fill-opacity=".09" stroke="${color}" stroke-opacity=".55"/>
      <circle cx="18" cy="18" r="4" fill="${color}" filter="url(#a-glow)"/>
      <text x="32" y="23" font-family="${MONO}" font-size="${fs}" fill="${color}">${esc(label)}</text>
    </g>`;
    x += w + gap;
  });
  write(file, svg(W, H, defs(id) + body, `Programs: ${items.map((i) => i[0]).join(", ")}`));
};

// ─── Cards ───────────────────────────────────────────────────────────────
export const card = ({ file, w = 590, h = 270, accent, accent2 = C.cyan, kicker, title, tagline, bullets, chips, status, statusColor, title2 }) => {
  const id = file.replace(/\W/g, "");
  let y = 152, bl = "";
  for (const b of bullets) {
    bl += `<text x="30" y="${y}" font-family="${SANS}" font-size="14" fill="${C.text}" fill-opacity=".86"><tspan fill="${accent}">▸ </tspan>${esc(b)}</text>`;
    y += 25;
  }
  const content = `${defs(id, accent, accent2)}${baseStyle}
  ${frame(id, w, h)}
  <text x="30" y="40" font-family="${MONO}" font-size="11.5" letter-spacing="1.5" fill="${accent}">${esc(kicker)}</text>
  ${pulseDot(w - 30 - monoW(status, 11.5) - 14, 36, statusColor, id)}
  <text x="${w - 30}" y="40" text-anchor="end" font-family="${MONO}" font-size="11.5" fill="${statusColor}">${esc(status)}</text>
  <text x="30" y="80" font-family="${SANS}" font-size="27" font-weight="700" letter-spacing="-.6" fill="${C.text}">${esc(title)}${title2 ? `<tspan fill="${C.dim}" font-weight="400" font-size="18"> ${esc(title2)}</tspan>` : ""}</text>
  <text x="30" y="110" font-family="${SANS}" font-size="14.5" fill="${C.dim}">${esc(tagline)}</text>
  <line x1="30" y1="128" x2="${w - 30}" y2="128" stroke="${C.line}"/>
  ${bl}
  ${chipRow(30, h - 46, chips)}`;
  write(file, svg(w, h, content, `${title} — ${tagline}`));
};

// ─── Merged upstream PR card ─────────────────────────────────────────────
export const mergedCard = ({ file, repo, number, mergedOn, commit, title, description, chips, additions, deletions, files }) => {
  const W = 1200, H = 210, id = "m", A = "#a371f7";
  const content = `${defs(id, A, C.cyan)}${baseStyle}
  ${frame(id, W, H)}
  <g transform="translate(30,26)">
    <rect width="92" height="24" rx="12" fill="${A}" fill-opacity=".16" stroke="${A}" stroke-opacity=".6"/>
    <text x="46" y="16.5" text-anchor="middle" font-family="${MONO}" font-size="11.5" fill="${A}" letter-spacing="1">⑂ MERGED</text>
  </g>
  <text x="138" y="43" font-family="${MONO}" font-size="12.5" fill="${C.dim}">${esc(repo)} · #${number} · merged ${esc(mergedOn)}</text>
  <text x="${W - 30}" y="43" text-anchor="end" font-family="${MONO}" font-size="12.5" fill="${C.faint}">commit <tspan fill="${C.cyan}">${esc(commit)}</tspan></text>
  <text x="30" y="92" font-family="${SANS}" font-size="25" font-weight="700" letter-spacing="-.5" fill="${C.text}">${esc(title)}</text>
  ${description.map((d, i) => `<text x="30" y="${124 + i * 22}" font-family="${SANS}" font-size="14.5" fill="${C.dim}">${esc(d)}</text>`).join("")}
  ${chipRow(30, H - 44, chips)}
  <text x="${W - 30}" y="${H - 28}" text-anchor="end" font-family="${MONO}" font-size="13"><tspan fill="${C.mongo}">+${additions}</tspan><tspan fill="${C.faint}"> / </tspan><tspan fill="#f85149">−${deletions}</tspan><tspan fill="${C.faint}"> · ${files} files</tspan></text>`;
  write(file, svg(W, H, content, `Merged: ${repo} #${number}, ${title}`));
};

// ─── Footer waveform ─────────────────────────────────────────────────────
export const footer = (label, colors = [C.mongo, C.indigo, C.cyan], file = "footer.svg") => {
  const W = 1200, H = 120, n = 96, bw = 6, gap = (W - 80 - n * bw) / (n - 1);
  let bars = "";
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const env = Math.sin(Math.PI * t) ** 1.4;
    const h = 6 + env * (20 + 34 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.43)));
    const x = 40 + i * (bw + gap);
    const dur = (1.2 + ((i * 37) % 11) / 10).toFixed(2);
    const del = (((i * 53) % 17) / 10).toFixed(2);
    bars += `<rect class="b" style="animation-duration:${dur}s;animation-delay:-${del}s" x="${x.toFixed(1)}" y="${(50 - h / 2).toFixed(1)}" width="${bw}" height="${h.toFixed(1)}" rx="3" fill="url(#f-g)"/>`;
  }
  const content = `
  <linearGradient id="f-g" x1="0" x2="1">${colors.map((c, i) => `<stop offset="${i / (colors.length - 1)}" stop-color="${c}"/>`).join("")}</linearGradient>
  <style>.b{transform-box:fill-box;transform-origin:center;animation:eq ease-in-out infinite alternate}@keyframes eq{from{transform:scaleY(.35)}to{transform:scaleY(1)}}@media (prefers-reduced-motion: reduce){.b{animation:none}}</style>
  ${bars}
  <text x="${W / 2}" y="108" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${C.faint}" letter-spacing="3">${esc(label)}</text>`;
  write(file, svg(W, H, content, "Animated waveform footer"));
};
