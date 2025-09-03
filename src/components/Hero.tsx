import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  Cpu,
  Gamepad2,
  Zap,
  Bot,
  Rocket,
  Users,
  Calendar,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CandleAnimation from "./ui/CandleAnimation";

const floatingIcons = [
  { Icon: Code, delay: "0s", position: "top-20 left-10" },
  { Icon: Cpu, delay: "1s", position: "top-32 right-20" },
  { Icon: Gamepad2, delay: "2s", position: "top-48 left-1/4" },
  { Icon: Bot, delay: "0.5s", position: "top-64 right-1/3" },
  { Icon: Rocket, delay: "1.5s", position: "top-80 left-2/3" },
  { Icon: Zap, delay: "2.5s", position: "top-96 right-10" },
];

const Hero = () => {
  const [showCuteBot, setShowCuteBot] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    let isVisible = true;

    const interval = setInterval(() => {
      isVisible = !isVisible;
      setShowCuteBot(isVisible);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRedirect = () => {
    setAnimating(true);
    setTimeout(() => {
      window.location.href = "/pages/index.html";
    }, 3000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden particle-bg">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_110%)]"></div>

      {floatingIcons.map(({ Icon, delay, position }, index) => (
        <Icon
          key={index}
          className={`absolute h-8 w-8 text-primary/30 float opacity-50 ${position}`}
          style={{ animationDelay: delay }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>

      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-4"
        initial={{ y: "-100vh", rotate: -15 }}
        animate={{
          y: 0,
          rotate: 0,
          transition: {
            type: "spring",
            damping: 5,
            stiffness: 40,
            duration: 1.5,
          },
        }}
        whileInView="visible"
      >
        <div className="mb-8 relative">
          {showCuteBot && (
            <motion.div
              onClick={handleRedirect}
              className="absolute z-50 top-10 left-10 flex flex-col items-center cursor-pointer"
              initial={{ x: 300, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  damping: 10,
                  stiffness: 100,
                  duration: 0.5,
                },
              }}
              exit={{
                x: 300,
                opacity: 0,
                transition: {
                  duration: 0.5,
                  delay: 2,
                },
              }}
            >
              <motion.div
                className="cursor-pointer"
                animate={{
                  rotate: [0, 20, -20, 20, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: 0,
                  delay: 0.5,
                }}
              >
                <Bot className="h-16 w-16 text-electric animate-bounce-subtle cursor-pointer" />
              </motion.div>
              <span className="text-sm text-electric font-semibold mt-2 cursor-pointer select-none">
                Hi!
              </span>
            </motion.div>
          )}

          {animating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black rounded-lg shadow-lg">
          <CandleAnimation  />
        </div>
      )}

          <h1 className="text-6xl md:text-8xl mt-32 mb-20 font-bold text-electric leading-tight">
            VIT<span className="text-cyber">KULT</span>
          </h1>

          <div className="mb-8 relative">
            <div className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 backdrop-blur-sm">
              <p className="text-lg md:text-xl font-medium text-primary/90 tracking-wide">
                <span className="text-electric font-semibold">VIT</span>{" "}
                <span className="text-cyber font-semibold">Karunadu</span>{" "}
                <span className="text-neon font-semibold">Unnati</span>{" "}
                <span className="text-muted-foreground">for</span>{" "}
                <span className="text-electric font-semibold">Language</span>{" "}
                <span className="text-muted-foreground">and</span>{" "}
                <span className="text-cyber font-semibold">Technology</span>
              </p>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-4">
            Where Art, Culture & Tech Collide
          </h2>
        </div>

        <p className=" text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Step into VIT Bhopal's most dynamic club where innovation meets
          India's tech capital mindset, creativity fuses with cutting-edge code
          and the future is engineered by passionate minds from every corner of
          India.
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
            className="group border-2 border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
            asChild
          >
            <Link to="/register">
              <Code className="h-6 w-6 group-hover:scale-110 transition-transform duration-300 cursor-pointer" />
              Register for Hackathon
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            {
              number: "100+",
              label: "Active Members",
              icon: Users,
              description: "VIT Bhopal students and tech enthusiasts",
            },
            {
              number: "5+",
              label: "Projects Built",
              icon: Code,
              description: "AI, Web Dev & Innovation",
            },
            {
              number: "4+",
              label: "Events Hosted",
              icon: Calendar,
              description: "Hackathons & Workshops",
            },
            {
              number: "0+",
              label: "Awards Won",
              icon: Trophy,
              description: "National & Regional Recognition",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer"
              >
                <div className="gaming-container p-6 mb-4">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:text-primary-glow transition-colors duration-300" />
                  <div className="text-3xl font-bold text-electric mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-sm font-semibold">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
