'use client'

import { useState, useEffect } from 'react'

interface SiteSettings {
  [key: string]: string
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings')
        const result = await response.json()

        if (result.success) {
          // Convert the settings object to a simple key-value mapping
          const settingsMap: SiteSettings = {}
          Object.entries(result.data).forEach(([key, value]) => {
            settingsMap[key] = (value as any).value || value
          })
          setSettings(settingsMap)
        } else {
          setError(result.error || 'Failed to load settings')
        }
      } catch (err) {
        setError('Failed to load settings')
        console.error('Error fetching site settings:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return {
    settings,
    isLoading,
    error,
    // Helper functions for common settings
    getPhone: () => settings.site_phone || '(662) 200-2249',
    getEmail: () => settings.site_email || 'info@pontotocinsuranceagency.com',
    getAddress: () => settings.site_address || '158 MS-15, Suite D, Pontotoc, MS 38863',
    getName: () => settings.site_name || 'Pontotoc Insurance Agency',
    getHours: () => settings.site_hours || 'Mon - Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM, Sun: Closed'
  }
}
