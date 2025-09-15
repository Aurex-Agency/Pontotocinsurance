import { supabase, supabaseAdmin } from './supabase'

// Database utility functions for the insurance agency

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  service_type?: string
}

export interface QuoteRequest {
  name: string
  email: string
  phone: string
  service_type: string
  additional_info?: string
  created_at?: string
}

export interface TeamMember {
  id?: string
  name: string
  title: string
  bio: string
  image_url?: string
  email?: string
  phone?: string
  specialties?: string[]
  created_at?: string
  updated_at?: string
}

// Contact form submission
export async function submitContactForm(data: ContactFormData) {
  try {
    const { data: result, error } = await supabase
      .from('contact_submissions' as any)
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
        service_type: data.service_type || null,
        created_at: new Date().toISOString()
      }] as any)

    if (error) throw error
    return { success: true, data: result }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Quote request submission
export async function submitQuoteRequest(data: QuoteRequest) {
  try {
    const { data: result, error } = await supabase
      .from('quote_requests' as any)
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        service_type: data.service_type,
        additional_info: data.additional_info || null,
        status: 'pending',
        created_at: new Date().toISOString()
      }] as any)

    if (error) throw error
    return { success: true, data: result }
  } catch (error) {
    console.error('Error submitting quote request:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Team member operations
export async function getTeamMembers() {
  try {
    const { data, error } = await (supabaseAdmin as any)
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching team members:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function createTeamMember(member: TeamMember) {
  try {
    const { data, error } = await (supabaseAdmin as any)
      .from('team_members')
      .insert([{
        ...member,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error creating team member:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function updateTeamMember(id: string, member: Partial<TeamMember>) {
  try {
    const { data, error } = await (supabaseAdmin as any)
      .from('team_members')
      .update({
        ...member,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error updating team member:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function deleteTeamMember(id: string) {
  try {
    const { error } = await (supabaseAdmin as any)
      .from('team_members')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error deleting team member:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Analytics and reporting
export async function getContactSubmissions() {
  try {
    const { data, error } = await (supabaseAdmin as any)
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function getQuoteRequests() {
  try {
    const { data, error } = await (supabaseAdmin as any)
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching quote requests:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}