import { supabase, supabaseAdmin } from './supabase'

// Re-export supabase client for backward compatibility
export { supabase }

export interface User {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
  created_at: string
  last_sign_in_at?: string
}

export interface AuthError {
  message: string
  status?: number
}

export const auth = {
  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { success: true, user: data.user, error: null }
    } catch (error: any) {
      return { 
        success: false, 
        user: null, 
        error: { message: error.message, status: error.status } 
      }
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true, error: null }
    } catch (error: any) {
      return { 
        success: false, 
        error: { message: error.message } 
      }
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return { success: true, user, error: null }
    } catch (error: any) {
      return {
        success: false,
        user: null,
        error: { message: error.message }
      }
    }
  },

  // Create new user (admin only)
  async createUser(email: string, password: string, fullName?: string) {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        user_metadata: {
          full_name: fullName || email.split('@')[0]
        }
      })

      if (error) throw error

      return { success: true, user: data.user, error: null }
    } catch (error: any) {
      return { 
        success: false, 
        user: null, 
        error: { message: error.message, status: error.status } 
      }
    }
  },

  // Delete user (admin only)
  async deleteUser(userId: string) {
    try {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
      if (error) throw error
      return { success: true, error: null }
    } catch (error: any) {
      return { 
        success: false, 
        error: { message: error.message, status: error.status } 
      }
    }
  },

  // List all users (admin only)
  async listUsers() {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers()
      if (error) throw error
      return { success: true, users: data.users, error: null }
    } catch (error: any) {
      return { 
        success: false, 
        users: [], 
        error: { message: error.message, status: error.status } 
      }
    }
  },

  // Update user (admin only)
  async updateUser(userId: string, updates: { email?: string; user_metadata?: any }) {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, updates)
      if (error) throw error
      return { success: true, user: data.user, error: null }
    } catch (error: any) {
      return { 
        success: false, 
        user: null, 
        error: { message: error.message, status: error.status } 
      }
    }
  }
}
