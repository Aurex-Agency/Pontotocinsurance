// Meta (Facebook) Pixel global. The pixel is injected by the MetaPixel
// component; this just gives us types for calling window.fbq from funnels.
export {}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}
