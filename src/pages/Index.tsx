import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import EventCalendar from "@/components/EventCalendar";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      <Navigation />
      {/* Hero Section */}
      <Hero />
      {/* About Section */}
      <section className="py-20 px-4 relative bg-gradient-to-br from-background via-muted/40 to-background/80 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-electric mb-6 animate-fade-in">
              About <span className="text-cyber">VITKULT</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-fade-in">
              VITKULT is VIT Bhopal's premier club, fostering a unique fusion of
              technology and culture. We are a vibrant community that celebrates
              diversity through a spectrum of technical and non-technical
              events. We bring together developers, designers, writers, artists,
              and visionaries, all dedicated to pushing boundaries and creating
              the future.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
            {[
              {
                icon: Code,
                title: "Technical Excellence",
                description:
                  "Cutting-edge workshops, hackathons, and coding competitions that challenge your skills",
                color: "primary",
              },
              {
                icon: Users,
                title: "Community First",
                description:
                  "A supportive environment where collaboration and knowledge sharing thrive",
                color: "secondary",
              },
              {
                icon: Trophy,
                title: "Competition Ready",
                description:
                  "Regular contests and challenges to keep you sharp and competition-ready",
                color: "accent",
              },
              {
                icon: Rocket,
                title: "Innovation Hub",
                description:
                  "Transform ideas into reality with our project incubation and mentorship programs",
                color: "success",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="card-glow p-6 text-center group hover:scale-105 transition-all duration-500 animate-slide-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="mb-4">
                    <Icon className="h-12 w-12 text-primary mx-auto group-hover:text-primary-glow transition-colors duration-300 animate-bounce-in" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 animate-fade-in">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed animate-fade-in">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* Event Calendar Section */}
      <EventCalendar />
      {/* Sponsor Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-muted/20 animate-fade-in">
        <div className="max-w-6xl mx-auto text-center">
          <div className="gaming-container p-12 mb-12 animate-slide-in-up">
            <Heart className="h-16 w-16 text-accent mx-auto mb-6 pulse-glow animate-bounce-in" />
            <h2 className="text-4xl font-bold text-electric mb-6 animate-fade-in">
              Partner With <span className="text-cyber">VITKULT</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
              Join us in shaping the future of technology education. Support
              innovative minds and gain access to the brightest talent at VIT
              Bhopal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button
                variant="gaming"
                size="lg"
                className="group animate-bounce-in"
                asChild
              >
                <Link to="/sponsor">
                  <Heart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Become a Sponsor
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                variant="hologram"
                size="lg"
                className="animate-bounce-in"
                style={{ animationDelay: "100ms" }}
              >
                View Partnership Benefits
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Social Media & Community */}
      <section className="py-20 px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-electric mb-6 animate-fade-in">
            Join Our <span className="text-cyber">Community</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in">
            Stay connected with the latest updates, events, and opportunities.
            Follow us on social media and be part of the VITKULT family!
          </p>
          <div className="grid grid-cols-2 gap-6 mb-12 animate-fade-in">
            {[
              {
                platform: "LinkedIn",
                icon: Linkedin,
                followers: "100+",
                color: "secondary",
                link: "https://in.linkedin.com/company/vitkult-vitb",
              },
              {
                platform: "Instagram",
                icon: Instagram,
                followers: "200+",
                color: "success",
                link: "https://www.instagram.com/vitkult.vitb",
              },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <Card
                  key={index}
                  className="card-hologram p-6 text-center group cursor-pointer animate-slide-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => window.open(social.link, "_blank")}
                >
                  <Icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 animate-bounce-in" />
                  <h3 className="font-bold text-foreground mb-1 animate-fade-in">
                    {social.platform}
                  </h3>
                  <p className="text-sm text-muted-foreground animate-fade-in">
                    {social.followers} followers
                  </p>
                </Card>
              );
            })}
          </div>
          <Button
            variant="gaming"
            size="lg"
            className="group animate-bounce-in"
            onClick={() => setIsJoinCommunityModalOpen(true)}
          >
            <Users className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            Join Our Community
            <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>

          <Dialog
            open={isJoinCommunityModalOpen}
            onOpenChange={setIsJoinCommunityModalOpen}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Join Our Community</DialogTitle>
                <DialogDescription>
                  To join our community, please send an email to
                  vitkultclub@vitbhopal.ac.in with your details and interests.
                  Our team will get back to you with further information.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <p className="text-sm text-muted-foreground">
                    Email:{" "}
                    <span className="font-semibold">
                      vitkultclub@vitbhopal.ac.in
                    </span>
                  </p>
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <Button
                  type="button"
                  variant="gaming"
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
                  onClick={() => setIsJoinCommunityModalOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
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
            © 2024 VITKULT. Electrifying innovation since inception.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
