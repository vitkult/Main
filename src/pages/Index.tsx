import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import EventCalendar from "@/components/EventCalendar";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Users,
  Code,
  Trophy,
  Rocket,
  Heart,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Index = () => {
  const [isJoinCommunityModalOpen, setIsJoinCommunityModalOpen] =
    useState(false);
  const features = [
    {
      title: "Technical Excellence",
      description:
        "Cutting-edge workshops, hackathons, and coding competitions that challenge your skills.",
    },
    {
      title: "Community First",
      description:
        "A supportive environment where collaboration and knowledge sharing thrive.",
    },
    {
      title: "Competition Ready",
      description:
        "Regular contests and challenges to keep you sharp and competition-ready.",
    },
    {
      title: "Innovation Hub",
      description:
        "Transform ideas into reality with our project incubation and mentorship programs.",
    },
  ];
  const socials = [
    {
      platform: "LinkedIn",
      icon: Linkedin,
      followers: "100+",
      link: "https://in.linkedin.com/company/vitkult-vitb",
    },
    {
      platform: "Instagram",
      icon: Instagram,
      followers: "200+",
      link: "https://www.instagram.com/vitkult.vitb",
    },
  ];
  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      <Navigation />
      {/* Hero Section */}
      <Hero />
      {/* About Section */}
      <section className="py-20 px-4 bg-background relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16 relative"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold mb-6 relative inline-block"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              About <span className="text-cyber">VITKULT</span>
              <motion.span
                className="absolute -top-4 left-8 w-2 h-2 bg-foreground rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.span
                className="absolute -top-4 left-16 w-2 h-2 bg-foreground rounded-full"
                animate={{ y: [0, -6, 0], x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              />
            </motion.h2>

            <div className="relative w-full flex justify-center mt-6">
              <motion.div
                className="absolute top-0 left-8 right-0 h-px bg-border"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.div
                className="absolute top-3 left-0 w-8 h-px bg-border -rotate-45"
                initial={{ rotate: -90, opacity: 0 }}
                whileInView={{ rotate: -45, opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <motion.p
              className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mt-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              VITKULT is VIT Bhopal's premier club, fostering a unique fusion of
              technology and culture. We are a vibrant community that celebrates
              diversity through a spectrum of technical and non-technical
              events. We bring together developers, designers, writers, artists,
              and visionaries, all dedicated to pushing boundaries and creating
              the future.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40, rotate: -2 },
                  visible: { opacity: 1, y: 0, rotate: 0 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                }}
                whileHover={{ scale: 1.01 }}
                className="relative border border-border p-6 hover:bg-white/5 transition-colors group rounded-2xl"
              >
                <div className="flex items-center justify-center w-14 h-14 mb-6 font-extrabold text-muted-foreground text-xl border border-border relative">
                  {index + 1}
                  <span className="absolute top-1 left-1 w-3 h-3 border border-foreground border-b-0 border-r-0 rounded-tl"></span>
                  <span className="absolute bottom-1 right-1 w-3 h-3 border border-foreground border-t-0 border-l-0 rounded-br"></span>
                </div>

                <h3 className="text-lg font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                <motion.span
                  layoutId="hoverLine"
                  className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#f2ff00] to-[#ff7300] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Event Calendar Section */}
      <EventCalendar />
      {/* Sponsor Section */}
      <section className="px-4 bg-gradient-to-br from-background to-muted/20">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <div className="gaming-container p-10 mb-12 rounded-2xl shadow-lg border border-border/40">
            {/* Heading */}
            <h2 className="text-4xl font-bold text-electric mb-6">
              Partner With <span className="text-cyber">VITKULT</span>{" "}
              <span>
                <Heart className="h-16 w-16 text-red-500 fill-current mx-auto mb-6 inline" />
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Join us in shaping the future of technology education. Support
              innovative minds and gain access to the brightest talent at VIT
              Bhopal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="gaming"
                size="lg"
                className="group cursor-pointer hover:scale-[1.02] hover:shadow-md hover:shadow-accent/20 transition-all duration-300"
                asChild
              >
                <Link to="/sponsor">
                  <Heart className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Become a Sponsor
                  <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>

              <Button
                variant="hologram"
                size="lg"
                className="cursor-pointer hover:scale-[1.02] hover:shadow-md hover:shadow-primary/20 transition-all duration-300"
                style={{ animationDelay: "100ms" }}
              >
                View Partnership Benefits
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center gaming-container p-10 mb-12 rounded-2xl shadow-lg border border-border/40"
        >
          <h2 className="text-6xl font-bold text-electric mb-6">
            Join Our <span className="text-cyber">Community</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Stay connected with the latest updates, events, and opportunities.
            Follow us on social media and be part of the VITKULT family!
          </p>

          <motion.div
            className="grid grid-cols-2 gap-6 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Card
                    className="card-hologram p-6 text-center group cursor-pointer hover:scale-[1.03] hover:shadow-md hover:shadow-primary/20 transition-all duration-300"
                    onClick={() => window.open(social.link, "_blank")}
                  >
                    <Icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-bold text-foreground mb-1">
                      {social.platform}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {social.followers} followers
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <Button
            variant="gaming"
            size="lg"
            className="group cursor-pointer hover:scale-[1.02] hover:shadow-md hover:shadow-accent/20 transition-all duration-300"
            onClick={() => setIsJoinCommunityModalOpen(true)}
          >
            <Users className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
            Join Our Community
            <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>

          <Dialog
            open={isJoinCommunityModalOpen}
            onOpenChange={setIsJoinCommunityModalOpen}
          >
            <DialogContent className="sm:max-w-md rounded-2xl shadow-lg border border-border/40">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-electric">
                  Join Our Community
                </DialogTitle>
                <DialogDescription className="text-muted-foreground leading-relaxed">
                  To join our community, please send an email to{" "}
                  <span className="font-semibold text-foreground">
                    vitkultclub@vitbhopal.ac.in
                  </span>{" "}
                  with your details and interests. Our team will get back to you
                  with further information.
                </DialogDescription>
              </DialogHeader>

              <div className="flex items-center space-x-2 mt-4">
                <div className="grid flex-1 gap-2">
                  <p className="text-sm text-muted-foreground">
                    Email:{" "}
                    <span className="font-semibold">
                      vitkultclub@vitbhopal.ac.in
                    </span>
                  </p>
                </div>
              </div>

              <DialogFooter className="sm:justify-start mt-6">
                <Button
                  type="button"
                  variant="gaming"
                  className="cursor-pointer hover:scale-[1.02] transition-all duration-300"
                  onClick={() => {
                    window.location.href = "mailto:vitkultclub@vitbhopal.ac.in";
                    setIsJoinCommunityModalOpen(false);
                  }}
                >
                  Send Email
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer hover:border-primary/50 hover:text-primary transition-all duration-300"
                  onClick={() => setIsJoinCommunityModalOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-primary/20 bg-card/50 animate-fade-in">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Rocket className="h-8 w-8 text-primary float animate-bounce-in" />
            <span className="text-2xl font-bold text-electric animate-fade-in">
              VITKULT
            </span>
          </div>
          <p className="text-muted-foreground mb-6 animate-fade-in">
            VIT Bhopal University's Premier Non-Technical Club
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            {[
              {
                icon: Linkedin,
                link: "https://in.linkedin.com/company/vitkult-vitb",
              },
              {
                icon: Instagram,
                link: "https://www.instagram.com/vitkult.vitb",
              },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary animate-bounce-in"
                  onClick={() => window.open(social.link, "_blank")}
                >
                  <Icon className="h-5 w-5" />
                </Button>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground animate-fade-in">
            © 2025 VITKULT. Electrifying innovation since inception.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
