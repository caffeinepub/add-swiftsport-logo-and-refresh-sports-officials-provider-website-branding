# Specification

## Summary
**Goal:** Clearly identify the site as “Version 8” by showing a configurable website version in the UI, metadata, and deployment docs.

**Planned changes:**
- Add a build-time environment variable (defaulting to `8`) to control the displayed site version.
- Display a small, unobtrusive “Version 8” label in the site footer that renders correctly across light/dark mode and mobile/desktop.
- Expose the same version value in HTML document metadata via a machine-readable version indicator (e.g., meta tag), without affecting existing canonical/OpenGraph/Twitter URL logic.
- Update deployment documentation with instructions and an example command showing how to set the version env var (including default behavior when not set).

**User-visible outcome:** Visitors can see a subtle “Version 8” label in the footer, and operators can verify the deployed version via document metadata and deployment docs.
