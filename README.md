<a href="https://github.com/prosteeler">
  <img src="assets/hero.svg" width="100%" alt="prosteeler — co-founder and CTO at Excel Masters. Terminal HUD showing infrastructure, stack and programs." />
</a>

<img src="assets/programs.svg" width="100%" alt="NVIDIA Inception · MongoDB for Startups · YC Startup School" />

<p align="center">
  <a href="https://www.excelmasters.in/"><img src="https://img.shields.io/badge/excelmasters.in-0c101d?style=flat-square&logo=googlechrome&logoColor=00ED64" alt="Excel Masters" /></a>
  <a href="https://github.com/ExcelMasters-in"><img src="https://img.shields.io/badge/ExcelMasters--in-0c101d?style=flat-square&logo=github&logoColor=34d399" alt="GitHub org" /></a>
  <a href="https://discord.gg/7vaHhewmtJ"><img src="https://img.shields.io/badge/discord-0c101d?style=flat-square&logo=discord&logoColor=5865F2" alt="Discord" /></a>
  <a href="mailto:contact@excelmasters.in"><img src="https://img.shields.io/badge/contact@excelmasters.in-0c101d?style=flat-square&logo=maildotru&logoColor=5eead4" alt="Email" /></a>
</p>

<br/>

<img src="assets/h-ventures.svg" width="100%" alt="01 — Ventures & Infrastructure" />

<p align="center">
  <a href="https://www.excelmasters.in/"><img src="assets/v-excelmasters.svg" width="49.5%" alt="Excel Masters — co-founder and CTO" /></a>
  <a href="https://github.com/Kukzze/chic-bot-service"><img src="assets/v-chicbot.svg" width="49.5%" alt="Chic Bot Service — Discord gateway and community automation" /></a>
</p>

<details>
<summary><b>⟢ Architecture: how Excel Masters keeps AI math deterministic</b> <sub>(click to expand)</sub></summary>
<br/>

```mermaid
%%{init: {'theme':'base','themeVariables':{'background':'#05070e','primaryColor':'#0c101d','primaryTextColor':'#e6e9f5','primaryBorderColor':'#059669','lineColor':'#5eead4','secondaryColor':'#10152a','tertiaryColor':'#05070e'}}}%%
flowchart LR
    U([Student question]) --> L[LLM<br/>intent + explanation]
    L -->|formula, not answer| T
    subgraph FC [formula-core · zero-dep]
        T[Tokenizer] --> P[Parser<br/>operator precedence] --> A[(AST)] --> E[Evaluator]
    end
    G[(In-browser grid)] -- cell refs --> E
    E -- exact result --> R([Answer on the grid])
    subgraph EDGE [Vercel Edge]
        R
    end
```

</details>

<img src="assets/h-systems.svg" width="100%" alt="02 — Live Systems" />

<table width="100%">
  <thead>
    <tr><th align="left">System</th><th align="left">Class</th><th align="left">Uplink</th><th align="left">Activity</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://www.excelmasters.in/"><b>excelmasters.in</b></a></td>
      <td><code>web platform</code></td>
      <td><img src="https://img.shields.io/website?url=https%3A%2F%2Fwww.excelmasters.in&style=flat-square&label=%E2%97%8F&labelColor=0c101d&up_message=online&up_color=00ED64&down_message=offline&down_color=f85149" alt="uptime" /></td>
      <td><img src="https://img.shields.io/badge/vercel-edge-0c101d?style=flat-square&logo=vercel&labelColor=0c101d&color=059669" alt="vercel edge" /></td>
    </tr>
    <tr>
      <td><a href="https://github.com/ExcelMasters-in/formula-core"><b>formula-core</b></a></td>
      <td><code>open core</code></td>
      <td><img src="https://img.shields.io/github/languages/top/ExcelMasters-in/formula-core?style=flat-square&labelColor=0c101d&color=3178c6" alt="language" /></td>
      <td><img src="https://img.shields.io/github/last-commit/ExcelMasters-in/formula-core?style=flat-square&label=%E2%97%8F&labelColor=0c101d&color=34d399" alt="last commit" /></td>
    </tr>
    <tr>
      <td><a href="https://github.com/Kukzze/chic-bot-service"><b>chic-bot-service</b></a></td>
      <td><code>discord bot</code></td>
      <td><img src="https://img.shields.io/github/languages/top/Kukzze/chic-bot-service?style=flat-square&labelColor=0c101d&color=f1e05a" alt="language" /></td>
      <td><img src="https://img.shields.io/github/last-commit/Kukzze/chic-bot-service?style=flat-square&label=%E2%97%8F&labelColor=0c101d&color=34d399" alt="last commit" /></td>
    </tr>
  </tbody>
</table>

<img src="assets/h-stack.svg" width="100%" alt="03 — Stack" />

<table width="100%">
  <tr>
    <td align="center" width="33%"><b>Frontend</b><br/><br/><img src="https://skillicons.dev/icons?i=ts,nextjs,react,tailwind&theme=dark" alt="TypeScript, Next.js, React, Tailwind" /></td>
    <td align="center" width="33%"><b>Backend & Data</b><br/><br/><img src="https://skillicons.dev/icons?i=nodejs,bun,postgres,mongodb,redis&theme=dark" alt="Node.js, Bun, PostgreSQL, MongoDB, Redis" /></td>
    <td align="center" width="33%"><b>Infrastructure</b><br/><br/><img src="https://skillicons.dev/icons?i=vercel,docker,linux,githubactions&theme=dark" alt="Vercel, Docker, Linux, GitHub Actions" /></td>
  </tr>
</table>

<img src="assets/h-activity.svg" width="100%" alt="04 — Contribution Activity" />

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/prosteeler/prosteeler/output/github-contribution-grid-snake-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/prosteeler/prosteeler/output/github-contribution-grid-snake.svg" />
  <img alt="Contribution snake" src="https://raw.githubusercontent.com/prosteeler/prosteeler/output/github-contribution-grid-snake.svg" width="100%" />
</picture>

<img src="assets/footer.svg" width="100%" alt="" />
