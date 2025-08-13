import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, Users, Calendar, Info, Heart, MessageCircle, User, LogIn, Code, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import SignupModal from "./SignupModal";
import UserProfile from "./UserProfile";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { name: "Home", path: "/", icon: Zap },
    { name: "Team", path: "/team", icon: Users },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Hackathon", path: "/hackathon", icon: Code },
    { name: "About", path: "/about", icon: Info },
    { name: "Sponsor", path: "/sponsor", icon: Heart },
  ];

  // Add admin dashboard link if user is admin
  if (isAdmin) {
    navItems.push({ name: "Admin", path: "/admin", icon: Shield });
  }

  const isActive = (path: string) => location.pathname === path;

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('admin_users')
            .select('email')
            .eq('email', user.email)
            .single();
          
          if (error) {
            // If table doesn't exist or other error, check if user is super admin
            if (user.email === 'nithin.23mim10111@vitbhopal.ac.in') {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } else {
            setIsAdmin(!!data);
          }
        } catch (error) {
          // If there's an error, check if user is super admin
          if (user.email === 'nithin.23mim10111@vitbhopal.ac.in') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
    };
    
    checkAdminStatus();
  }, [user]);

  const [showKannada, setShowKannada] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setShowKannada(prev => !prev);
    }, 3000); // Slower transition - 3 seconds instead of 1.5
    
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl z-50 bg-background/80 backdrop-blur-lg border border-primary/20 rounded-2xl shadow-2xl transition-all duration-500 animate-fade-in">
      <div className="px-2 sm:px-4 lg:px-8 py-2">
        <div className="flex items-center justify-between h-12 overflow-hidden">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
      <div className="relative">
        <img
          src="/logo.PNG"
          alt="VITKULT Logo"
          className="h-8 w-8 object-contain group-hover:scale-110 transition-all duration-300 animate-bounce-in filter brightness-110 contrast-125 hue-rotate-15"
          style={{
            filter: 'brightness(1.2) contrast(1.3) saturate(1.4) hue-rotate(15deg)'
          }}
        />
        <div className="absolute inset-0 blur-md bg-primary/20 rounded-full animate-pulse"></div>
      </div>
      <div className="relative h-8 w-32 sm:w-36">
        <span className={`absolute inset-0 text-2xl font-extrabold tracking-wider transition-all duration-1000 ease-in-out ${
          showKannada
            ? "text-gradient-primary opacity-100 translate-y-0"
            : "text-gradient-secondary opacity-0 -translate-y-2"
        }`} style={{
          fontFamily: '"Rajdhani", "Orbitron", "Exo 2", sans-serif',
          textShadow: '0 0 12px rgba(59, 130, 246, 0.5)',
          letterSpacing: '0.05em',
          color: '#e2e8f0'
        }}>
          ವಿಟ್<span className="text-primary font-black" style={{
            textShadow: '0 0 15px rgba(59, 130, 246, 0.8), 0 0 25px rgba(59, 130, 246, 0.4)',
            color: '#3b82f6'
          }}>ಕ</span>ಲ್ಟ್
        </span>
        <span className={`absolute inset-0 text-2xl font-extrabold tracking-wider transition-all duration-1000 ease-in-out ${
          showKannada
            ? "text-gradient-secondary opacity-0 translate-y-2"
            : "text-gradient-primary opacity-100 translate-y-0"
        }`} style={{
          fontFamily: '"Rajdhani", "Orbitron", "Exo 2", sans-serif',
          textShadow: '0 0 12px rgba(59, 130, 246, 0.5)',
          letterSpacing: '0.05em',
          color: '#e2e8f0'
        }}>
          VIT<span className="text-primary font-black" style={{
            textShadow: '0 0 15px rgba(59, 130, 246, 0.8), 0 0 25px rgba(59, 130, 246, 0.4)',
            color: '#3b82f6',
            fontSize: '1.1em'
          }}>K</span>ULT
        </span>
      </div>
    </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center px-2">
            <div className="flex items-baseline space-x-2 lg:space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 group transition-all duration-300 ${
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <Icon className="h-4 w-4 group-hover:scale-125 transition-transform duration-300" />
                    <span>{item.name}</span>
                    {/* Animated underline */}
                    <span
                      className={`absolute left-0 -bottom-1 h-0.5 w-full rounded bg-primary transition-all duration-300 ${
                        active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                      }`}
                    ></span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            {user ? (
              <UserProfile />
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="group animate-fade-in text-muted-foreground hover:text-primary hover:bg-primary/5"
                  onClick={() => window.location.href = '/login'}
                >
                  <LogIn className="h-4 w-4 group-hover:scale-125 transition-transform duration-300" />
                  Login
                </Button>
                <Button 
                  variant="gaming" 
                  size="sm" 
                  className="group animate-fade-in"
                  onClick={() => setIsSignupOpen(true)}
                >
                  <User className="h-4 w-4 group-hover:scale-125 transition-transform duration-300" />
                  Sign up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-primary-glow"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-500 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden animate-fade-in`}
      >
        <div className="bg-background/95 backdrop-blur-lg border-t border-primary/20 rounded-b-2xl px-4 pt-2 pb-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3 group transition-all duration-300 ${
                  active
                    ? "text-primary bg-primary/10 border border-primary/30"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                <Icon className="h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="pt-4 space-y-3">
            {user ? (
              <div className="flex items-center space-x-2 px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center text-white text-sm font-semibold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-muted-foreground">Hi, {user.email?.split('@')[0]}</span>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="w-full group animate-fade-in text-muted-foreground hover:text-primary hover:bg-primary/5"
                  onClick={() => window.location.href = '/login'}
                >
                  <LogIn className="h-4 w-4 group-hover:scale-125 transition-transform duration-300" />
                  Login
                </Button>
                <Button 
                  variant="gaming" 
                  className="w-full group animate-fade-in"
                  onClick={() => setIsSignupOpen(true)}
                >
                  <User className="h-4 w-4 group-hover:scale-125 transition-transform duration-300" />
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
      />
    </nav>
  );
};

export default Navigation;