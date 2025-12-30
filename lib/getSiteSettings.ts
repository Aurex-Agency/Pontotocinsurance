import { getSiteSettings } from './database'

export interface SiteSettingsData {
  site_phone: string
  site_email: string
  site_address: string
  site_name: string
  site_hours: string
}

// Server-side function to get site settings with defaults
export async function getSiteSettingsData(): Promise<SiteSettingsData> {
  try {
    const result = await getSiteSettings()
    
    if (!result.success || !result.data) {
      // Return defaults if fetch fails
      return {
        site_phone: '(662) 200-2249',
        site_email: 'info@pontotocinsuranceagency.com',
        site_address: '158 MS-15, Suite D, Pontotoc, MS 38863',
        site_name: 'Pontotoc Insurance Agency',
        site_hours: 'Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 2:00 PM\nSun: Closed'
      }
    }

    // Extract values from settings object (database.ts returns simple key-value pairs)
    const settings = result.data
    return {
      site_phone: settings.site_phone || '(662) 200-2249',
      site_email: settings.site_email || 'info@pontotocinsuranceagency.com',
      site_address: settings.site_address || '158 MS-15, Suite D, Pontotoc, MS 38863',
      site_name: settings.site_name || 'Pontotoc Insurance Agency',
      site_hours: settings.site_hours || 'Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 2:00 PM\nSun: Closed'
    }
  } catch (error) {
    console.error('Error fetching site settings:', error)
    // Return defaults on error
    return {
      site_phone: '(662) 200-2249',
      site_email: 'info@pontotocinsuranceagency.com',
      site_address: '158 MS-15, Suite D, Pontotoc, MS 38863',
      site_name: 'Pontotoc Insurance Agency',
      site_hours: 'Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 2:00 PM\nSun: Closed'
    }
  }
}
