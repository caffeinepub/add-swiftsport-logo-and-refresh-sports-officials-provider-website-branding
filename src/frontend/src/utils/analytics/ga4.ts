/**
 * Google Analytics 4 (GA4) wrapper utility
 * 
 * Provides safe analytics tracking that gracefully handles cases where GA4 is not enabled.
 * All functions are no-ops when GA4 is not initialized.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    __GA4_MEASUREMENT_ID__?: string;
  }
}

/**
 * Check if GA4 analytics is enabled and initialized
 */
export function isAnalyticsEnabled(): boolean {
  return !!(window.gtag && window.__GA4_MEASUREMENT_ID__);
}

/**
 * Track a custom event
 * @param eventName - Name of the event (e.g., 'quick_request_submitted')
 * @param eventParams - Optional parameters for the event (avoid PII)
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>): void {
  if (!isAnalyticsEnabled()) {
    return;
  }

  try {
    window.gtag!('event', eventName, eventParams);
  } catch (error) {
    // Silently fail - don't break the app if analytics fails
  }
}

/**
 * Track a page view
 * @param pageTitle - Optional page title
 * @param pagePath - Optional page path
 */
export function trackPageView(pageTitle?: string, pagePath?: string): void {
  if (!isAnalyticsEnabled()) {
    return;
  }

  try {
    const params: Record<string, any> = {};
    if (pageTitle) params.page_title = pageTitle;
    if (pagePath) params.page_path = pagePath;
    
    window.gtag!('event', 'page_view', params);
  } catch (error) {
    // Silently fail - don't break the app if analytics fails
  }
}

/**
 * Track a conversion event (for lead submissions)
 * @param conversionType - Type of conversion (e.g., 'quick_request', 'full_booking', 'chatbot')
 * @param eventParams - Optional parameters (avoid PII - no email, phone, names)
 */
export function trackConversion(conversionType: string, eventParams?: Record<string, any>): void {
  if (!isAnalyticsEnabled()) {
    return;
  }

  try {
    window.gtag!('event', 'conversion', {
      conversion_type: conversionType,
      ...eventParams,
    });
  } catch (error) {
    // Silently fail - don't break the app if analytics fails
  }
}
