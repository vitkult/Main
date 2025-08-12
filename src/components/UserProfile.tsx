import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, User, Settings, Crown } from 'lucide-react'
import { toast } from 'sonner'

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut()
      toast.success('Successfully signed out')
    } catch (error) {
      toast.error('Error signing out')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  const getUserInitials = (email: string) => {
    const name = email.split('@')[0]
    return name.substring(0, 2).toUpperCase()
  }

  const getDisplayName = (email: string) => {
    const name = email.split('@')[0]
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/20 hover:from-primary/20 hover:to-primary-glow/20 transition-all duration-300 group"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={user.email || 'User'} />
            <AvatarFallback className="bg-gradient-to-r from-primary to-primary-glow text-white font-semibold text-sm">
              {getUserInitials(user.email || '')}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-56 bg-background/95 backdrop-blur-lg border border-primary/20 shadow-2xl animate-in slide-in-from-top-2"
        align="end"
        forceMount
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-foreground">{getDisplayName(user.email || '')}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        
        <DropdownMenuSeparator className="bg-primary/20" />
        
        <DropdownMenuItem className="cursor-pointer hover:bg-primary/5 transition-colors duration-200">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer hover:bg-primary/5 transition-colors duration-200">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer hover:bg-primary/5 transition-colors duration-200">
          <Crown className="mr-2 h-4 w-4 text-yellow-500" />
          <span>VITKULT Member</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-primary/20" />
        
        <DropdownMenuItem 
          className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserProfile
