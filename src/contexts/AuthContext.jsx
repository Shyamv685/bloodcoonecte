import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    if (supabase && supabase.auth) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }).catch((error) => {
        console.warn('Auth session error:', error)
        setUser(null)
        setLoading(false)
      })

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })

      return () => {
        if (subscription) {
          subscription.unsubscribe()
        }
      }
    } else {
      // If supabase is not configured, just set loading to false
      setLoading(false)
    }
  }, [])

  const value = {
    user,
    loading,
    signIn: async (email, password) => {
      if (!supabase || !supabase.auth) {
        throw new Error('Supabase is not configured')
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return data
    },
    signUp: async (email, password) => {
      if (!supabase || !supabase.auth) {
        throw new Error('Supabase is not configured')
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      return data
    },
    signOut: async () => {
      if (!supabase || !supabase.auth) {
        return
      }
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
