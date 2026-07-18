---
activation: always_on
---

# ESLint Enforcement Rule

This rule ensures that any code modifications strictly adhere to the project's ESLint configuration.

## Applicability

- **Glob**: `src/**/*.{js,jsx,ts,tsx}`
- **Activation**: Always on

## Instructions

1. **Adherence to ESLint**:
   - Every code modification in JavaScript, TypeScript, React, or Next.js files must conform to the rules defined in the root `./eslint.config.mjs` file.
   - Always read and inspect the `./eslint.config.mjs` file at the workspace root to verify rule configurations before finalizing edits.

2. **Error Resolution**:
   - If there are non-fixable lint errors, the agent must resolve them manually by adjusting the code. Under no circumstances should code be committed or presented as finished if it introduces new ESLint violations.
