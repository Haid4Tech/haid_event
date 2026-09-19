<!-- BEGIN:nextjs-agent-rules -->
# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant docs in `node_modules/next/dist/docs/`.
Your training data is outdated the docs bundled with this project's `next` version are the source of truth.
<!-- END:nextjs-agent-rules -->

# Project rules (keep these outside the managed block)

- Prefer App Router patterns that match the installed Next.js docs.
- Do not invent deprecated `pages/` or old caching APIs unless the docs say otherwise.
- Ask before large refactors; keep changes scoped to the task.