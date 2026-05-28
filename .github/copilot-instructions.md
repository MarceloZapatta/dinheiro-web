# Copilot Instructions for Next.js Projects

## Best Practices

### Code Style & Structure
- Use functional components with hooks (not class components)
- Keep components focused and reusable
- Use TypeScript for type safety
- Follow naming conventions: PascalCase for components, camelCase for variables/functions

### Project Organization
- Organize files by feature/domain, not by type
- Keep pages in `/app` directory (App Router)
- Place reusable components in `/components`
- Store utilities in `/lib` or `/utils`
- Keep types in `/types` or inline with interfaces

### Performance & Optimization
- Use `next/image` for images (not `<img>`)
- Implement dynamic imports for code splitting
- Memoize components with `React.memo` when needed
- Use `useMemo` and `useCallback` judiciously
- Optimize bundles by lazy-loading heavy dependencies

### State Management
- Use React Context for simple state
- Prefer server components when possible
- Use client components only when necessary (events, hooks)
- Consider Zustand or Redux for complex state

### API & Data Fetching
- Use Next.js API routes for backend
- Fetch data in server components when possible
- Implement proper error handling and loading states
- Cache responses appropriately with `cache` option
- Use ISR (Incremental Static Regeneration) for static pages

### Testing & Quality
- Write unit tests for utilities and hooks
- Test components with React Testing Library
- Maintain >70% code coverage
- Use ESLint and Prettier for code formatting
- Run type checking with TypeScript

### SEO & Metadata
- Set metadata in layouts or pages
- Use descriptive page titles and descriptions
- Implement proper heading hierarchy (h1, h2, etc.)
- Add structured data when appropriate

### Security
- Never expose sensitive keys in client code
- Validate and sanitize user inputs
- Use environment variables for secrets
- Implement CSRF protection for forms
- Keep dependencies updated

### Documentation
- Document component props with TypeScript
- Add JSDoc comments for complex functions
- Maintain a README with setup instructions
- Document API endpoints and data models