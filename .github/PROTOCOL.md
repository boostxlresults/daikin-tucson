# Daikin Tucson Website Rebuild Protocol

## Overview
This document defines the development protocol and technical standards for the Daikin Tucson website rebuild project. All contributors must follow these guidelines to ensure consistency, quality, and successful project delivery.

## Version Control and Git Workflow

### Branch Strategy
- **main branch**: Production-ready code only. Protected branch.
- **Feature branches**: All development work must be done in feature branches
  - Naming convention: `feature/descriptive-name` or `copilot/descriptive-name`
  - Examples: `feature/contact-form`, `feature/services-page`, `copilot/setup-nextjs`

### Pull Request Requirements
- **No direct commits to main**: All changes must go through Pull Requests
- **PR approval required**: At least one review before merging
- **PR must include**:
  - Clear description of changes
  - Link to related issue or task
  - Testing evidence (screenshots for UI changes)
  - Updated documentation if applicable

### Commit Message Standards
- Use clear, descriptive commit messages
- Format: `[Component] Brief description of change`
- Examples:
  - `[Pages] Add contact form with validation`
  - `[Config] Update Tailwind colors for Daikin brand`
  - `[Docs] Add API documentation for services endpoint`

## Next.js Architecture Requirements

### Pages Router (Required)
- **Must use Pages Router**: App Router is not permitted for this project
- All routes defined in `/pages` directory
- File-based routing structure:
  - `/pages/index.tsx` → Homepage
  - `/pages/about.tsx` → About page
  - `/pages/services/[slug].tsx` → Dynamic service pages
  - `/pages/api/*` → API routes

### Project Structure
```
daikin-tucson/
├── pages/              # Pages Router pages and API routes
├── components/         # Reusable React components
├── lib/               # Utility functions and helpers
├── styles/            # Global CSS and Tailwind config
├── public/            # Static assets (images, fonts, etc.)
├── types/             # TypeScript type definitions
└── .github/           # GitHub workflows and documentation
```

## Technology Stack

### Core Technologies (Required)
- **Next.js 15**: Using Pages Router architecture
- **React 18**: Latest stable version
- **TypeScript**: Strict mode enabled
- **Tailwind CSS**: Utility-first CSS framework

### Additional Dependencies
- **clsx** and **tailwind-merge**: For conditional className composition
- **ESLint**: Code quality and style enforcement
- **PostCSS** with **Autoprefixer**: CSS processing

### Build and Development
- **Development server**: Port 3000
- **Type checking**: Must pass before commits
- **Linting**: Must pass ESLint checks
- **Build verification**: Production build must succeed

## Sitemap-Driven Development

### Completeness Requirements
Development must follow the site's information architecture as defined in the sitemap:

1. **Phase 1**: Sitemap analysis and URL inventory
2. **Phase 2**: Core pages implementation
3. **Phase 3**: Dynamic routes and content pages
4. **Phase 4**: API routes and backend integration
5. **Phase 5**: Testing, optimization, and launch

### Page Completion Criteria
Each page is considered complete when:
- [ ] Page component implemented with TypeScript
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] SEO metadata configured (title, description, OG tags)
- [ ] Performance optimized (images, fonts, CSS)
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] Cross-browser tested
- [ ] Content approved by stakeholders

## Design and Branding Standards

### Color Palette
Custom Daikin Tucson colors defined in `tailwind.config.ts`:
- **Primary Blue**: `#0066B3` (daikin-primary)
- **Secondary Blue**: `#00A3E0` (daikin-secondary)  
- **Accent Gold**: `#FFB81C` (daikin-accent)
- **Navy**: `#003366` (daikin-navy)
- **Desert Colors**: Sand, Sage, Terracotta (Tucson theme)

### Typography
- **Headings**: Bold, navy color, responsive sizing
- **Body**: System font stack for performance
- **Line height**: Relaxed for readability

### Component Guidelines
- Use Tailwind utility classes
- Create reusable components in `/components`
- Follow naming convention: PascalCase for components
- Export types alongside components

## Quality Assurance

### Code Quality
- **TypeScript strict mode**: No `any` types without justification
- **ESLint**: Zero warnings in production code
- **Type safety**: All props and state properly typed
- **Code review**: All PRs must be reviewed

### Performance Standards
- **Lighthouse scores**: 
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 95+
- **Core Web Vitals**:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

### Testing Requirements
- **Manual testing**: All features tested in development
- **Browser testing**: Chrome, Firefox, Safari, Edge
- **Device testing**: Mobile (iOS/Android), Tablet, Desktop
- **Accessibility**: Screen reader testing

## Phase Roadmap

### Phase 0: Foundation Setup ✅ COMPLETE
- [x] Next.js 15 with Pages Router
- [x] TypeScript configuration
- [x] Tailwind CSS setup
- [x] Project structure
- [x] Git workflow established
- [x] Protocol documentation

### Phase 1: Discovery and Planning
- [ ] Complete sitemap analysis
- [ ] URL structure inventory
- [ ] Content audit
- [ ] Component library planning
- [ ] Design system finalization

### Phase 2: Core Pages
- [ ] Homepage
- [ ] About page
- [ ] Services overview
- [ ] Contact page
- [ ] Global navigation and footer

### Phase 3: Extended Pages
- [ ] Individual service pages
- [ ] Blog/resources section
- [ ] Customer testimonials
- [ ] FAQ page
- [ ] Service areas

### Phase 4: Advanced Features
- [ ] Contact forms with validation
- [ ] Quote request system
- [ ] Service booking integration
- [ ] CMS integration (if required)
- [ ] Search functionality

### Phase 5: Launch Preparation
- [ ] Performance optimization
- [ ] SEO implementation
- [ ] Analytics setup
- [ ] Cross-browser testing
- [ ] Accessibility audit
- [ ] Production deployment

## Development Environment

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- Git

### Setup Instructions
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Production build
npm run build

# Start production server
npm start
```

### Environment Variables
- Copy `.env.example` to `.env.local`
- Configure all required variables
- Never commit `.env.local` to version control

## Support and Questions

For questions or clarifications on this protocol:
1. Check this document first
2. Review existing code examples
3. Ask in project discussions
4. Contact project maintainers

## Protocol Updates

This protocol is a living document. Updates require:
- Discussion with development team
- Pull request with changes
- Approval from project lead
- Version number increment

**Current Version**: 1.0.0  
**Last Updated**: February 5, 2026  
**Status**: Active
