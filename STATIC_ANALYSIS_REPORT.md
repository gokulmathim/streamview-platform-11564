# Static Analysis Report - StreamView Frontend

Date: 2025-12-09

Scope:
- Project: streamview-platform-11564/streaming_frontend (React 18, CRA 5)
- Checks: Lint config review, dependency sanity, code inspection for common issues

Summary of Findings:
- ESLint flat config present (eslint.config.mjs) but ESLint packages are not installed. Running eslint would currently fail.
- package.json includes legacy "eslintConfig": "react-app", which conflicts conceptually with the flat config approach.
- Custom rule 'no-unused-vars' ignores 'React|App'; ignoring 'App' may hide legitimate unused variable warnings.
- Test globals defined (test, expect) but not 'jest'. CRA usually configures this; adding 'jest' global is recommended if using flat config for lint.
- API JSON.parse calls are not guarded; corrupted localStorage could throw and break the app.
- Minor hook dependency nits (acceptable but can be improved).

Recommended Actions:
1) Align ESLint and dependencies
- Install devDependencies:
  - eslint
  - @eslint/js
  - eslint-plugin-react
  - eslint-plugin-react-hooks (recommended)
  - eslint-plugin-jsx-a11y (recommended)
- Add scripts:
  - "lint": "eslint ."
  - "lint:fix": "eslint . --fix"
- Remove legacy "eslintConfig": { "extends": "react-app" } from package.json and rely on eslint.config.mjs.

2) ESLint rules
- Remove 'App' from varsIgnorePattern under no-unused-vars.
- Enable:
  - "react-hooks/rules-of-hooks": "error"
  - "react-hooks/exhaustive-deps": "warn"
- Add jsx-a11y recommended if installed.

3) Robustness improvements
- Wrap JSON.parse with try/catch in services/api.js for USER, WATCHLIST, HISTORY, SUBSCRIPTION to avoid crashes on malformed storage.

4) Optional hygiene
- In PlayerModal effect, consider including 'item' in deps to ensure event listeners reset when video changes.
- Keep 'mounted' guard in Browse (already done). For Watchlist, unmount is low-risk due to single-shot effect.

Notes:
- Type checks: Not applicable (no TypeScript).
- Environment variables from request details are not used in this mock; no action needed.

Next steps for maintainers:
- Run: npm i -D eslint @eslint/js eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
- Then: npm run lint
