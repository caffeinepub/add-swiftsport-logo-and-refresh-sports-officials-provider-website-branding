# Specification

## Summary
**Goal:** Update SwiftSport contact details, add a chatbot-style lead capture flow for referee requirements with backend persistence, and improve landing-page marketing copy and visuals.

**Planned changes:**
- Update all email/phone displays, mailto/tel links, copy-to-clipboard values, and “Send via Email” actions to use swiftsports1512@gmail.com and 8431680623 across the site (including footer/contact areas).
- Add a floating, open/close chatbot-style lead-capture widget on the landing page to collect referee request details (sport, number of officials, date/time, location, competition level, requester name + phone/email), allow review, and submit.
- Persist submitted chatbot requests in the existing Motoko backend (single actor), including createdAt, and add backend methods to create and list stored requests for verification/testing.
- Refresh marketing copy (hero, services/process, CTAs, contact prompts) to be more conversion-focused while staying accurate to a sports officials provider.
- Add and integrate new static marketing images (hero + supporting section) and a chatbot avatar icon from frontend public assets with responsive layout and English alt text.

**User-visible outcome:** Visitors see the updated SwiftSport contact info everywhere, can submit referee requirement requests through an on-page chatbot and receive a confirmation/reference, and experience stronger marketing copy with new attention-grabbing images on the landing page.
