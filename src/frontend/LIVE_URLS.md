# SwiftSport Live Production URLs

This document records the final production URLs for the SwiftSport application after mainnet deployment.

## Production URLs

### Custom Domain
- **URL:** https://swiftsportshub.com
- **Status:** ⏳ Pending DNS configuration
- **Notes:** Primary production URL for end users. This is the URL that should be used in all marketing materials, social media, and external communications.

### IC Boundary URL (Fallback)
- **URL:** `https://[FRONTEND_CANISTER_ID].icp0.io`
- **Status:** ⏳ Pending deployment
- **Notes:** Fallback URL that works regardless of DNS configuration. Always accessible even if custom domain has issues. Replace `[FRONTEND_CANISTER_ID]` with your actual frontend canister ID after deployment.

**Example format:** If your frontend canister ID is `abc123-xyz`, the URL would be `https://abc123-xyz.icp0.io`

## Canister IDs

### Backend Canister
- **Canister ID:** `[BACKEND_CANISTER_ID]`
- **Network:** IC Mainnet
- **Notes:** Replace `[BACKEND_CANISTER_ID]` with the actual canister ID from `dfx canister id backend --network ic`

### Frontend Canister
- **Canister ID:** `[FRONTEND_CANISTER_ID]`
- **Network:** IC Mainnet
- **Notes:** Replace `[FRONTEND_CANISTER_ID]` with the actual canister ID from `dfx canister id frontend --network ic`

## Deployment Verification Checklist

Use this checklist to verify the deployment is working correctly:

### Basic Functionality
- [ ] Landing page loads without errors
- [ ] All sections render correctly (Hero, Services, Process, Contact)
- [ ] Images and assets load properly
- [ ] Chatbot widget appears and is functional
- [ ] Footer displays correct year and attribution link

### End-to-End Testing
- [ ] Submit a test request via Quick Request form
- [ ] Submit a test request via Chatbot widget
- [ ] Verify success messages appear after submission
- [ ] Login with Internet Identity works
- [ ] Admin panel is accessible (for admin users)
- [ ] Submitted requests appear in admin view
- [ ] Copy-to-clipboard functionality works in admin panel

### URL Configuration
- [ ] Custom domain (swiftsportshub.com) resolves correctly
- [ ] IC boundary URL works as fallback
- [ ] Footer attribution link includes correct hostname in UTM parameter (`utm_content=swiftsportshub.com`)
- [ ] No trailing slashes in generated URLs
- [ ] All absolute URLs use the custom domain (not IC boundary URL)

### Performance & Security
- [ ] Page loads in under 3 seconds
- [ ] Mobile responsive design works correctly
- [ ] HTTPS certificate is valid (for custom domain)
- [ ] No console errors in browser developer tools
- [ ] All API calls to backend succeed

### Custom Domain Specific
- [ ] DNS records are correctly configured (CNAME or A record)
- [ ] DNS propagation is complete (use `nslookup swiftsportshub.com`)
- [ ] SSL certificate is provisioned and valid
- [ ] Both www and non-www versions work (if configured)
- [ ] HTTP redirects to HTTPS

## Deployment Information

- **Deployed By:** [Your Name/Team]
- **Deployment Date:** [YYYY-MM-DD]
- **dfx Version:** [Version Number]
- **Build Configuration:**
  - `VITE_PUBLIC_SITE_BASE_URL`: https://swiftsportshub.com
  - **Note:** This environment variable must be set during frontend build to ensure all absolute URLs use the custom domain

## Notes

[Add any deployment-specific notes, issues encountered, or special configurations here]

---

## Instructions for Maintainers

### After Deploying to Mainnet

1. **Get and record canister IDs:**
   ```bash
   # Get backend canister ID
   dfx canister id backend --network ic
   
   # Get frontend canister ID
   dfx canister id frontend --network ic
   ```

2. **Replace placeholders in this document:**
   - Replace `[FRONTEND_CANISTER_ID]` with your actual frontend canister ID
   - Replace `[BACKEND_CANISTER_ID]` with your actual backend canister ID
   - Update the IC Boundary URL with the actual canister ID

3. **Update Status fields:**
   - Change ⏳ Pending to ✅ Active once deployment is verified
   - For custom domain: Update status to ✅ Active after DNS configuration and SSL certificate provisioning

4. **Complete the verification checklist:**
   - Test each item in the checklist
   - Mark items as complete with [x]
   - Document any issues or deviations in the Notes section

5. **Fill in deployment information:**
   - Add your name/team
   - Record the deployment date
   - Note the dfx version used
   - Confirm the build configuration

6. **Verify custom domain configuration:**
   - Ensure `VITE_PUBLIC_SITE_BASE_URL=https://swiftsportshub.com` was set during build
   - Test that footer attribution link uses swiftsportshub.com in UTM parameters
   - Verify all absolute URLs use the custom domain

### After Custom Domain Activation

1. **Update custom domain status:**
   - Change status from ⏳ Pending to ✅ Active
   - Add activation date to Notes section

2. **Verify custom domain checklist:**
   - Complete all items in "Custom Domain Specific" section
   - Test both custom domain and IC boundary URL
   - Confirm SSL certificate is valid

3. **Update external references:**
   - Update marketing materials with custom domain
   - Update social media profiles
   - Update any documentation or links

### Ongoing Maintenance

- Keep this document updated with any configuration changes
- Record any issues or incidents in the Notes section
- Update canister IDs if canisters are recreated
- Monitor cycles balance and top up as needed
- Review and update the verification checklist periodically

### Troubleshooting

If the custom domain isn't working:
1. Verify DNS records are correct (see `frontend/DEPLOYMENT.md`)
2. Wait for DNS propagation (up to 24 hours)
3. Check SSL certificate status
4. Verify domain is registered with IC boundary nodes
5. Test IC boundary URL as fallback

If absolute URLs show IC boundary URL instead of custom domain:
1. Verify `VITE_PUBLIC_SITE_BASE_URL` was set during build
2. Redeploy frontend with correct environment variable:
   ```bash
   VITE_PUBLIC_SITE_BASE_URL=https://swiftsportshub.com dfx deploy frontend --network ic
   ```
3. Clear browser cache and test again
