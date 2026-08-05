# Testing Guide

## Commands

- `npm run test` runs unit and component tests once.
- `npm run test:watch` runs Vitest in watch mode.
- `npm run test:coverage` writes text, HTML, and LCOV coverage reports.
- `npm run test:e2e` runs Playwright route smoke tests.
- `npm run quality` runs lint, unit/component tests, and the production build.

## Test layout

- `tests/unit/` covers chemistry engines and immutable state utilities.
- `tests/components/` covers user interaction and accessibility contracts.
- `tests/e2e/` verifies representative production routes in Chromium.
- `tests/fixtures/` contains reusable molecule and mechanism data.

## Authoring rules

Prefer behavior over implementation details. Test chemistry invariants, public APIs, accessible roles, labels, keyboard behavior, and route availability. Add a regression test whenever a bug is fixed in an engine or player.
