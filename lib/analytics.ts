export function trackLead(formId: string) {
  if (typeof window === 'undefined' || !['pontotocinsuranceagency.com', 'www.pontotocinsuranceagency.com'].includes(window.location.hostname)) return
  const analyticsWindow = window as typeof window & { gtag?: (...args: unknown[]) => void }
  try {
    analyticsWindow.gtag?.('event', 'generate_lead', { form_id: formId })
  } catch {
    // Analytics must never change a confirmed delivery into a visible failure.
  }
}
