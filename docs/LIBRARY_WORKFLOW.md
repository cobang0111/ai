# AI Automation Project Paper Workflow

This repository is structured as a static AI automation workspace. The papers module reads entries from `papers.js`; each entry can point to a local PDF, an external source, topic tags, and a short reading brief.

## Add a PDF

Use the bundled Codex Python runtime when available because it already includes `pypdf`:

```powershell
& "C:\Users\rkobb\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" tools\add_paper.py "path\to\paper.pdf" --collection "Inbox" --tags LLM memory
```

The command writes a JSON draft in `library_drafts/`.

## Generate a Summary

Set `OPENAI_API_KEY` before running the script to generate a Korean brief through the OpenAI Responses API:

```powershell
$env:OPENAI_API_KEY="..."
& "C:\Users\rkobb\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" tools\add_paper.py "path\to\paper.pdf" --collection "Inbox" --append
```

With `--append`, the generated entry is inserted into `papers.js` so the website publishes it as a new library item.

## Data Shape

Each entry uses this shape:

```js
{
  id: "paper-id",
  title: "Paper title",
  authors: ["Author One", "Author Two"],
  collection: "ICLR 2026",
  venue: "ICLR 2026",
  year: "2026",
  type: "Oral",
  priority: "high",
  pdf: "relative/path/to/paper.pdf",
  source: "https://openreview.net/...",
  keywords: ["LLM", "memory", "agents"],
  tags: ["LLM", "memory", "agents"],
  summary: "One short Korean paragraph.",
  abstractKo: "Korean translation/paraphrase of the abstract.",
  problem: "Problem statement derived from the introduction.",
  objective: "Objective derived from the introduction.",
  keyIdea: "Simple methodology derived from the introduction.",
  contribution: "Main contribution derived from the introduction.",
  takeaways: ["Signal one", "Signal two", "Signal three"],
  question: "A concrete reading question."
}
```

`priority` controls how prominently the paper appears:

- `high`: spotlight candidate
- `medium`: normal brief
- `low`: reference item
