# Specification

## Summary
**Goal:** Fix the “Failed to load requests” experience by ensuring admin-only requests data and UI are only accessed after confirming the caller is an admin, with more reliable admin detection and clearer admin-facing errors.

**Planned changes:**
- Gate rendering of the Requests Review (admin requests) section so it only appears after admin status is confirmed true, preventing non-admin visitors from triggering the requests fetch.
- Update the requests React Query logic so `getAllRequests()` only runs when admin status has been determined and is true, avoiding non-admin/anonymous error states.
- Add a stable backend method `isCallerAdmin : async Bool` that returns `true` for admins and `false` otherwise (no trap), and use it from the frontend admin detection hook.
- Improve admin requests UI error messaging: show “Access Denied” plus a hint about the `caffeineAdminToken` URL parameter when access is denied; otherwise show a general failure message with safe raw error details for troubleshooting (English text).

**User-visible outcome:** Non-admin visitors no longer see the admin Requests Review section or its error banner; admins continue to see and load requests, and get clearer, actionable error messages if something fails.
