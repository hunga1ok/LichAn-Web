# GEMINI.md — Lịch An (lichan.com)

Behavioral guidelines to reduce common LLM coding mistakes. Merged with project-specific instructions.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## 5. Project-Specific Rules — Lịch An

### Tech Stack
- **Framework**: Next.js 16+ (App Router) with Turbopack
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 (use `@import "tailwindcss"` in globals.css, NO tailwind.config)
- **UI Components**: Native HTML + Tailwind (shadcn/ui planned)
- **Font**: Inter (Google Fonts with Vietnamese subset)

### Architecture
- `src/app/` — Next.js App Router pages (Server Components by default)
- `src/components/` — Reusable React components
- `src/lib/lunar/` — Lunar calendar algorithm library (Hồ Ngọc Đức)
- `src/lib/constants.ts` — All constants (Can, Chi, Trực, Ngày lễ, Tiết khí...)
- `src/types/lunar.ts` — TypeScript interfaces for all lunar data

### Key Rules
- **LÕI LỊCH ÂM ĐÃ ĐƯỢC KHÓA (LOCKED)**: Tuyệt đối KHÔNG sửa đổi các file trong `src/lib/lunar/core/`. Mọi tính toán, truy vấn âm lịch từ bên ngoài (UI, Components, Pages) bắt buộc phải thông qua interface `ILunarService` hoặc singleton `lunarService` từ `@/lib/lunar`.
- **Server Components by default.** Only use `'use client'` when client interactivity is needed (forms, state, event handlers).
- **All UI text must be in Vietnamese.**
- **Comments in code should be in Vietnamese.**
- **Color theme**: Primary `#8B6914` (vàng nâu), Background `#FEF7E6`, Accent `#D4A017`, Danger `#DC240E`.
- **Responsive mobile-first design.** Always test on mobile viewport.
- **SEO matters.** Every page needs proper metadata, Schema.org JSON-LD when relevant.

### Build & Verify
```bash
npm test         # Bộ kiểm thử 64/64 unit tests toán học âm lịch phải PASS 100%
npm run build    # Must pass with 0 errors
npx tsc --noEmit # TypeScript check
npm run dev      # Dev server at localhost:3000
```

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
