# Specification

## Summary
**Goal:** Finalize mainnet + custom domain deployment documentation and ensure the frontend consistently uses a centralized public-site base URL for absolute link generation.

**Planned changes:**
- Replace the broken/unfinished markdown code fence in `frontend/DEPLOYMENT.md` with a complete, step-by-step guide for deploying backend + frontend to IC mainnet, setting `VITE_PUBLIC_SITE_BASE_URL=https://swiftsportshub.com` (normalized/no trailing slash), and connecting the custom domain `swiftsportshub.com` (DNS + IC-side domain configuration) so the site is reachable at `https://swiftsportshub.com`.
- Update `frontend/LIVE_URLS.md` to be the single source of truth post-launch by documenting the final custom domain URL and the fallback IC boundary URL, and adding instructions to replace `[FRONTEND_CANISTER_ID]` / `[BACKEND_CANISTER_ID]` placeholders and update status fields after deployment/domain activation.
- Refactor any frontend absolute URL generation that depends on the public site domain to use `frontend/src/utils/publicSiteBaseUrl.ts` (respecting `VITE_PUBLIC_SITE_BASE_URL`) rather than hardcoding `swiftsportshub.com` or relying on `window.location.origin`.

**User-visible outcome:** Maintainers can follow complete docs to deploy to IC mainnet, configure `swiftsportshub.com` as the production domain, and the app generates absolute URLs based on the configured public site base URL.
