# Website Rebuild Protocol

## Authority Order
1. **GUARDRAILS** (hard rules; never violate without explicit override)
2. **SITEMAP AUTHORITY & REBUILD COMPLETENESS**
3. **BUILD CHECKLIST** (defines "done" and required phases)
4. **TEMPLATE REPOSITORY STRUCTURE**
5. **DISCOVERY PROCESS**
6. **SETUP/OPERATIONS**

## Key Rules

### GitHub + PR Workflow
- ✅ Feature branches only (no direct main commits after bootstrap)
- ✅ Pull requests for all code changes
- ✅ Phase 1 Discovery must complete before code PRs

### Next.js Pages Router Enforcement
- ✅ "dev": "next dev -p 3000"
- ✅ "build": "next build"
- ✅ "start": "next start -p 3000"
- ❌ NO vite, wouter, App Router
- ✅ Strict TypeScript

### No Placeholders
- ❌ No lorem ipsum, sample data, bracket placeholders
- ✅ Real content only

### Sitemap-Driven Completeness
- ✅ Fetch sitemap_index.xml (or variants)
- ✅ Enumerate ALL referenced sitemaps
- ✅ Produce URL inventory (JSON/CSV)
- ✅ Coverage matrix: Rebuilt / Redirected / Missing
- ❌ NO "pick and choose" pages

### Tech Stack
- Next.js Pages Router (TypeScript, strict)
- Tailwind CSS
- shadcn/ui (Radix primitives)
- lucide-react + react-icons/si
- react-hook-form + zod
- Data: /data (JSON manifests + markdown)

## Phases
- **Phase 0**: Repo + Next.js toolchain verification
- **Phase 1**: Discovery (sitemap ingestion, scope, URL inventory)
- **Phase 2-9**: Build per checklist

## Current Status
- Phase 0: ✅ In Progress (Next.js initialization)
- Phase 1: ⏳ Pending (Discovery questions)