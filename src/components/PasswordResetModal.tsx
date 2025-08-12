import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { X, Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'

interface PasswordResetModalProps {
  isOpen: boolean
  onClose: () => void
  onBackToSignup: () => void
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ isOpen, onClose, onBackToSignup }) => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [isSent, setIsSent] = useState(false)

  const validateEmail = (email: string) => {
    const domain = email.split('@')[1]
    if (domain !== 'vitbhopal.ac.in') {
      setEmailError('Only @vitbhopal.ac.in emails are allowed')
      return false
    }
    setEmailError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      
      if (error) {
        toast.error(error.message)
      } else {
        setIsSent(true)
        toast.success('Password reset link sent! Check your email.')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (value && !validateEmail(value)) {
      setEmailError('Only @vitbhopal.ac.in emails are allowed')
    } else {
      setEmailError('')
    }
  }

  const handleBackToSignup = () => {
    setIsSent(false)
    setEmail('')
    setEmailError('')
    onBackToSignup()
  }

  const handleClose = () => {
    setIsSent(false)
    setEmail('')
    setEmailError('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-lg border border-primary/20 shadow-2xl">
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-electric flex items-center space-x-2">
              <Mail className="h-6 w-6 text-primary" />
              <span>Reset Password</span>
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-muted-foreground hover:text-primary"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">
            Enter your VIT Bhopal email to receive a password reset link
          </p>
        </DialogHeader>

        {!isSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-sm font-medium text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="your.email@vitbhopal.ac.in"
                  value={email}
                  onChange={handleEmailChange}
                  className={`pl-10 pr-4 h-11 border-2 transition-all duration-300 ${
                    emailError ? 'border-red-500 focus:border-red-500' : 'border-primary/20 focus:border-primary'
                  }`}
                  required
                />
              </div>
              {emailError && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{emailError}</span>
                </div>
              )}
              {email && !emailError && (
                <div className="flex items-center space-x-2 text-green-500 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>Valid VIT Bhopal email</span>
                </div>
              )}
            </div>

            <div className="pt-4 space-y-3">
              <Button
                type="submit"
                disabled={isLoading || !!emailError}
                className="w-full h-11 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Sending Reset Link...</span>
                  </div>
                ) : (
                  <span>Send Reset Link</span>
                )}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                onClick={handleBackToSignup}
                className="w-full h-10 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign Up
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Check Your Email</h3>
              <p className="text-muted-foreground text-sm">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-muted-foreground text-xs">
                Click the link in your email to reset your password. The link will expire in 1 hour.
              </p>
            </div>
            <Button
              onClick={handleClose}
              className="w-full h-11 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Got it, thanks!
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default PasswordResetModal
