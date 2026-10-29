// Content for the prosteeler profile cards. Components live in kit.mjs.
// Usage: node .github/scripts/build-assets.mjs [outDir=assets]
import { C, setOut, hero, header, programs, card, footer } from "./kit.mjs";

// Emerald variant of the Obsidian Cyber-Glass palette.
Object.assign(C, { indigo: "#059669", violet: "#34d399", cyan: "#5eead4" });

setOut(process.argv[2] ?? "assets");
const E = C.violet, G = C.mongo, D = C.dim, T = C.text, Y = C.cyan;

hero({
  name: "prosteeler",
  subtitle: "co-founder & cto · systems architecture · web engineering",
  host: "prosteeler@excelmasters — zsh — 120×32",
  uplink: "github.com/prosteeler",
  nameGradient: ["#ffffff", C.violet, C.cyan],
  lines: [
    [["❯ ", G], ["whoami", T]],
    [["prosteeler", T], [" · co-founder & chief technology officer @ excel masters", D]],
    [[" ", D]],
    [["❯ ", G], ["systemctl status ", T], ["--infra", D]],
    [["● ", G], ["excelmasters.in       ", T], ["active (running)   ", G], ["learning platform · next.js on vercel edge", D]],
    [["● ", E], ["formula-core          ", T], ["org · open core    ", E], ["deterministic formula engine", D]],
    [["● ", E], ["chic-bot-service      ", T], ["community infra    ", E], ["discord gateway · onboarding · verification", D]],
    [[" ", D]],
    [["❯ ", G], ["cat ", T], ["/etc/stack", D]],
    [["next.js 15", T], [" · ", D], ["react 19", C.ts], [" · ", D], ["typescript", C.ts], [" → web    ", D], ["node", G], [" · ", D], ["bun", C.rust], [" → services    ", D], ["postgres", C.w3c], [" · ", D], ["mongodb", G], [" · ", D], ["redis", "#ff4438"], [" → data", D]],
    [[" ", D]],
    [["❯ ", G], ["programs ", T], ["--via excel-masters", D]],
    [["nvidia-inception", C.nvidia], ["  ", D], ["mongodb-for-startups", C.mongo], ["  ", D], ["yc-startup-school", C.yc]],
  ],
});

header("h-ventures.svg", "01", "Ventures & Infrastructure", "what i run in production", C.mongo);
header("h-systems.svg", "02", "Live Systems", "uptime · activity", Y);
header("h-stack.svg", "03", "Stack", "frontend · backend · infrastructure", E);
header("h-activity.svg", "04", "Contribution Activity", "regenerated every 12h", C.mongo);

programs([["NVIDIA Inception", C.nvidia], ["MongoDB for Startups", C.mongo], ["YC Startup School", C.yc]]);

card({
  file: "v-excelmasters.svg", accent: C.mongo, accent2: Y, kicker: "CO-FOUNDER & CTO", title: "Excel Masters",
  tagline: "Deterministic AI spreadsheet learning platform", status: "LIVE", statusColor: C.mongo,
  bullets: ["Owns platform architecture, infrastructure & delivery", "Interactive formula arenas & student tools", "Edge-deployed on Vercel with streaming SSR"],
  chips: [["next.js 15", T], ["typescript", C.ts], ["tailwind", Y], ["vercel edge", E]],
});
card({
  file: "v-chicbot.svg", accent: "#5865F2", accent2: C.mongo, kicker: "COMMUNITY INFRA", title: "Chic Bot Service",
  tagline: "Discord gateway & community automation", status: "DISCORD", statusColor: "#5865F2",
  bullets: ["Member verification, security & onboarding", "Auto-reconnecting WebSocket client", "Event-driven, modular command handlers"],
  chips: [["node.js", C.mongo], ["discord api", "#5865F2"], ["websockets", Y]],
});

footer("PROSTEELER · EXCEL MASTERS · END OF TRANSMISSION", [C.mongo, C.violet, C.cyan]);

console.log("assets written");
