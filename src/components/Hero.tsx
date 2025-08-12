import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Cpu, Gamepad2, Zap, Bot, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const texts = [
    "Electrifying Tech Innovation",
    "Gaming the Future",
    "Code • Create • Conquer",
    "VIT Bhopal's Tech Elite"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const floatingIcons = [
    { Icon: Code, delay: "0s", position: "top-20 left-10" },
    { Icon: Cpu, delay: "1s", position: "top-32 right-20" },
    { Icon: Gamepad2, delay: "2s", position: "top-48 left-1/4" },
    { Icon: Bot, delay: "0.5s", position: "top-64 right-1/3" },
    { Icon: Rocket, delay: "1.5s", position: "top-80 left-2/3" },
    { Icon: Zap, delay: "2.5s", position: "top-96 right-10" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden particle-bg">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_110%)]"></div>
      
      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, position }, index) => (
        <Icon
          key={index}
          className={`absolute h-8 w-8 text-primary/30 float opacity-50 ${position}`}
          style={{ animationDelay: delay }}
        />
      ))}

      {/* Particle Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        {/* Main Heading with Glitch Effect */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl mt-20 mb-10 font-bold text-electric leading-tight">
            VIT<span className="text-cyber">KULT</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-4">
            Where Art, Culture & Tech Collide
          </h2>
          <div className="h-16 mb-6">
            <p 
              className={`text-2xl md:text-4xl font-semibold text-neon transition-all duration-500 ${
                isTyping ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {texts[currentText]}
            </p>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Join VIT Bhopal's most electrifying technical club where 
          <span className="text-primary font-semibold"> VIT Bhopal's innovation meets Bangalore technology culture</span>, 
          and the future is coded by passionate minds from across India.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button variant="gaming" size="xl" className="group">
            <Zap className="h-6 w-6 group-hover:animate-pulse" />
            Join the Revolution
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          <Button variant="hologram" size="xl" className="group" asChild>
            <Link to="/events">
              <Gamepad2 className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Explore Events
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="xl" 
            className="group border-2 border-primary text-primary hover:bg-primary hover:text-white"
            asChild
          >
            <Link to="/hackathon">
              <Code className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              Register for Hackathon
            </Link>
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: "500+", label: "Active Members", icon: Users, description: "VIT Bhopal students and tech enthusiasts" },
            { number: "50+", label: "Projects Built", icon: Code, description: "AI, Web Dev & Innovation" },
            { number: "25+", label: "Events Hosted", icon: Calendar, description: "Hackathons & Workshops" },
            { number: "10+", label: "Awards Won", icon: Trophy, description: "National & Regional Recognition" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer"
              >
                <div className="gaming-container p-6 mb-4">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:text-primary-glow transition-colors duration-300" />
                  <div className="text-3xl font-bold text-electric mb-2">{stat.number}</div>
                  <div className="text-muted-foreground text-sm font-semibold">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      
    </section>
  );
};

// Import icons that were referenced but not imported
import { Users, Calendar, Trophy } from "lucide-react";

export default Hero;
