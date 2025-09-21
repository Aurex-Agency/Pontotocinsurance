import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET - Fetch all site settings
export async function GET() {
  try {
    const { data, error } = await (supabaseAdmin as any)
      .from('site_settings')
      .select('*')
      .order('key', { ascending: true })

    if (error) throw error

    // Convert array to object for easier frontend usage
    const settingsObject = data.reduce((acc: any, setting: any) => {
      acc[setting.key] = {
        value: setting.value,
        description: setting.description,
        id: setting.id
      }
      return acc
    }, {} as Record<string, any>)

    return NextResponse.json({ success: true, data: settingsObject })
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// PUT - Update site settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { settings } = body

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid settings data' },
        { status: 400 }
      )
    }

    const updatePromises = Object.entries(settings).map(async ([key, value]) => {
      const { error } = await (supabaseAdmin as any)
        .from('site_settings')
        .update({ value: value as string })
        .eq('key', key)

      if (error) {
        console.error(`Error updating setting ${key}:`, error)
        throw error
      }
    })

    await Promise.all(updatePromises)

    return NextResponse.json({ success: true, message: 'Settings updated successfully' })
  } catch (error) {
    console.error('Error updating site settings:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// POST - Create new site setting
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, value, description } = body

    if (!key || !value) {
      return NextResponse.json(
        { success: false, error: 'Key and value are required' },
        { status: 400 }
      )
    }

    const { error } = await (supabaseAdmin as any)
      .from('site_settings')
      .insert([{
        key,
        value,
        description: description || null
      }])

    if (error) throw error

    return NextResponse.json({ success: true, message: 'Setting created successfully' })
  } catch (error) {
    console.error('Error creating site setting:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
