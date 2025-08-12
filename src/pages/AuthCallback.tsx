import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

const AuthCallback: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          toast.error('Authentication failed: ' + error.message)
          navigate('/login')
          return
        }

        if (data.session?.user) {
          const userEmail = data.session.user.email
          
          // Check if email is from allowed domain
          if (!userEmail || !userEmail.endsWith('@vitbhopal.ac.in')) {
            // Sign out the user immediately
            await supabase.auth.signOut()
            toast.error('Only @vitbhopal.ac.in email addresses are allowed. Please use your VIT Bhopal Google account.')
            navigate('/login')
            return
          }

          // Valid domain, proceed with login
          toast.success('Successfully signed in with Google!')
          navigate('/')
        } else {
          // No session, redirect to login
          navigate('/login')
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error)
        toast.error('An unexpected error occurred during authentication')
        navigate('/login')
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
        <p className="text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  )
}

export default AuthCallback