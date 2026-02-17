/**
 * Site version utility
 * 
 * Reads the build-time environment variable VITE_SITE_VERSION and returns
 * a normalized display value. Defaults to "8" when the variable is not set
 * or is blank.
 * 
 * Usage:
 *   import { getSiteVersion } from '@/utils/siteVersion';
 *   const version = getSiteVersion(); // "8" (default) or configured value
 */

export function getSiteVersion(): string {
  const envVersion = import.meta.env.VITE_SITE_VERSION;
  
  // Return default version 8 if env var is not set or is blank
  if (!envVersion || typeof envVersion !== 'string' || !envVersion.trim()) {
    return '8';
  }
  
  return envVersion.trim();
}
