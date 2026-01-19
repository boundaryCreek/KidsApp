<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Kids App - Next.js Project

### Design System Guidelines
When writing CSS or styling components in this project, use the comprehensive design system variables defined in `src/app/globals.css`:

**Colors**: Use `--color-primary-*`, `--color-secondary-*`, `--color-accent-*`, `--color-neutral-*`, `--color-success-*`, `--color-warning-*`, `--color-error-*`, `--color-info-*` instead of hardcoded colors.

**Typography**: Use `--font-size-*`, `--font-weight-*`, `--line-height-*`, `--letter-spacing-*` variables.

**Spacing**: Use `--space-*` variables for margins, padding, and gaps instead of arbitrary values.

**Border Radius**: Use `--radius-*` variables (sm, base, md, lg, xl, 2xl, 3xl, full).

**Shadows**: Use `--shadow-*` variables (sm, base, md, lg, xl, 2xl, inner).

**Transitions**: Use `--transition-*` and `--ease-*` variables for animations.

**Container Widths**: Use `--container-*` variables for max-widths.

**Examples**:
```css
.button {
  background-color: var(--color-primary-600);
  color: var(--color-neutral-50);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-colors);
}
```

Use utility classes when available: `.text-primary`, `.bg-surface`, `.shadow-lg`, etc.

### Project Setup Status
- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements - Next.js with TypeScript and Tailwind CSS
- [x] Scaffold the Project - Created Next.js app successfully
- [x] Design System - Comprehensive CSS variables added to globals.css
- [ ] Install Required Extensions - No extensions needed for Next.js
- [x] Compile the Project - Dependencies installed successfully
- [ ] Create and Run Task
- [ ] Launch the Project
- [ ] Ensure Documentation is Complete