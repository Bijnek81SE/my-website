# Unified Chemistry Content & Extension Architecture

## Milestone 1: Platform feature catalog

Public tools and site areas are now registered once in `content/platform/feature-catalog.ts`.
The catalog is the authoritative source for:

- global-search entries;
- sitemap routes and metadata;
- Playwright route smoke tests.

Each record has a stable id, route, title, description, feature kind, and optional typed capabilities.
Validation rejects duplicate ids, duplicate routes, invalid routes, and incomplete search metadata.

## Adding a public feature

1. Implement the feature and route.
2. Add one record to `platformFeatures`.
3. Add focused feature tests.

Search, sitemap, and route smoke coverage are derived automatically from the registration.
Future milestones will apply the same model to molecules, reactions, mechanisms, reagents,
spectroscopy datasets, lessons, knowledge relationships, recommendations, and Workspace tools.
