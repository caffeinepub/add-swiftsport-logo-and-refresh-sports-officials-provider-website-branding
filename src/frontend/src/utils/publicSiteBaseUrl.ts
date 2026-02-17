/**
 * Centralized utility for retrieving the public site base URL.
 * 
 * This utility provides a single source of truth for the site's base URL,
 * which is especially useful when the deployment domain changes or when
 * generating absolute URLs for external use (e.g., metadata, referral links,
 * share URLs, or any context where the full public URL is needed).
 * 
 * Configuration:
 * - Set VITE_PUBLIC_SITE_BASE_URL at build time to configure the production domain
 * - For SwiftSport: VITE_PUBLIC_SITE_BASE_URL=https://swiftsportshub.com
 * - Falls back to window.location.origin when not configured (development)
 * 
 * The utility automatically normalizes URLs by:
 * - Trimming whitespace
 * - Removing all trailing slashes
 * - Validating http/https protocol
 * 
 * Example usage:
 * ```typescript
 * import { getPublicSiteBaseUrl, getPublicSiteHostname } from '@/utils/publicSiteBaseUrl';
 * 
 * // Get full base URL
 * const siteUrl = getPublicSiteBaseUrl(); // "https://swiftsportshub.com"
 * 
 * // Get hostname for tracking/identifiers
 * const hostname = getPublicSiteHostname(); // "swiftsportshub.com"
 * 
 * // Build absolute URLs
 * const shareUrl = `${getPublicSiteBaseUrl()}/contact`;
 * const appIdentifier = encodeURIComponent(getPublicSiteHostname());
 * ```
 * 
 * IMPORTANT: Always use these utilities instead of:
 * - Hardcoded domain strings (e.g., "https://swiftsportshub.com")
 * - Direct window.location.origin access (for public-facing URLs)
 * - Manual URL construction for external/absolute URLs
 * 
 * This ensures consistent URL generation across the application and makes
 * domain changes (e.g., staging vs production) seamless.
 */

/**
 * Returns the public site base URL.
 * 
 * Priority:
 * 1. VITE_PUBLIC_SITE_BASE_URL environment variable (if set at build time and valid)
 * 2. window.location.origin (runtime fallback for development)
 * 
 * The returned URL is normalized to remove all trailing slashes and validated
 * to ensure it's a proper absolute URL with http/https protocol.
 * 
 * @returns The public site base URL without trailing slash (e.g., "https://swiftsportshub.com")
 */
export function getPublicSiteBaseUrl(): string {
  // Check for build-time environment variable
  const envBaseUrl = import.meta.env.VITE_PUBLIC_SITE_BASE_URL;
  
  if (envBaseUrl && typeof envBaseUrl === 'string') {
    // Trim whitespace
    const trimmed = envBaseUrl.trim();
    
    if (trimmed) {
      // Remove all trailing slashes
      const normalized = trimmed.replace(/\/+$/, '');
      
      // Validate it's a proper absolute URL with http/https
      try {
        const url = new URL(normalized);
        if (url.protocol === 'http:' || url.protocol === 'https:') {
          return normalized;
        }
      } catch {
        // Invalid URL format, fall through to runtime fallback
        console.warn('Invalid VITE_PUBLIC_SITE_BASE_URL format, falling back to window.location.origin');
      }
    }
  }
  
  // Fallback to runtime origin (no trailing slash)
  if (typeof window !== 'undefined' && window.location) {
    return window.location.origin;
  }
  
  // Ultimate fallback (should rarely be reached)
  return '';
}

/**
 * Returns the hostname extracted from the public site base URL.
 * Useful for generating app identifiers, tracking parameters, or any
 * context where just the domain name is needed.
 * 
 * @returns The hostname (e.g., "swiftsportshub.com") or "unknown-app" if unavailable
 */
export function getPublicSiteHostname(): string {
  try {
    const baseUrl = getPublicSiteBaseUrl();
    if (!baseUrl) return 'unknown-app';
    
    const url = new URL(baseUrl);
    return url.hostname;
  } catch {
    return 'unknown-app';
  }
}

/**
 * Constructs an absolute URL by combining the public site base URL with a path.
 * Handles leading slashes in the path automatically.
 * 
 * @param path - The path to append (e.g., "/contact", "about", "/services/")
 * @returns The complete absolute URL (e.g., "https://swiftsportshub.com/contact")
 * 
 * @example
 * buildAbsoluteUrl('/contact') // "https://swiftsportshub.com/contact"
 * buildAbsoluteUrl('about') // "https://swiftsportshub.com/about"
 * buildAbsoluteUrl('/services/') // "https://swiftsportshub.com/services"
 */
export function buildAbsoluteUrl(path: string): string {
  const baseUrl = getPublicSiteBaseUrl();
  if (!baseUrl) return path;
  
  // Normalize path: ensure it starts with / and remove trailing slashes
  const normalizedPath = ('/' + path.replace(/^\/+/, '')).replace(/\/+$/, '');
  
  return `${baseUrl}${normalizedPath}`;
}
