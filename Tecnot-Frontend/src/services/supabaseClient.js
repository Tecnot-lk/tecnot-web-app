// Temporary mock Supabase client for AI integration testing
// This bypasses Supabase authentication to let the app run

export const supabase = {
  auth: {
    getUser: async () => ({ 
      data: { user: null }, 
      error: null 
    }),
    getSession: async () => ({ 
      data: { session: null }, 
      error: null 
    })
  },
  from: (table) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        then: async (cb) => cb({ data: [], error: null })
      }),
      then: async (cb) => cb({ data: [], error: null })
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: null, error: null }),
        then: async (cb) => cb({ data: [], error: null })
      }),
      then: async (cb) => cb({ data: [], error: null })
    }),
    update: () => ({
      eq: () => ({
        then: async (cb) => cb({ data: null, error: null })
      })
    }),
    delete: () => ({
      eq: () => ({
        then: async (cb) => cb({ data: null, error: null })
      })
    })
  })
}