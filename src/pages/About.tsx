import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Trophy, 
  Rocket, 
  Code, 
  Gamepad2,
  Award,
  Calendar,
  MapPin,
  Linkedin,
  Instagram
} from "lucide-react";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  // const milestones = [
  //   {
  //     year: "2025",
  //     title: "Club Foundation",
  //     description: "VITKULT was born with a vision to revolutionize tech culture at VIT Bhopal",
  //     icon: Rocket
  //   },
  //   {
  //     year: "2025",
  //     title: "First Hackathon",
  //     description: "Organized our inaugural hackathon with 200+ participants",
  //     icon: Code
  //   },
  //   {
  //     year: "2025",
  //     title: "Gaming Division",
  //     description: "Launched competitive gaming division with esports tournaments",
  //     icon: Gamepad2
  //   },
  //   {
  //     year: "2025",
  //     title: "500+ Members",
  //     description: "Crossed the milestone of 500 active community members",
  //     icon: Users
  //   },
  //   {
  //     year: "2025",
  //     title: "Industry Recognition",
  //     description: "Received awards for outstanding contribution to tech education",
  //     icon: Award
  //   }
  // ];

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

  const values = [
    {
      icon: Target,
      title: "Innovation First",
      description: "We believe in pushing boundaries and creating solutions that matter"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our strength lies in our diverse, supportive, and collaborative community"
    },
    {
      icon: Trophy,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from events to projects"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Driven by genuine passion for technology and gaming culture"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 text-center bg-gradient-to-br from-background via-muted/40 to-background/80 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-lg bg-background/80 rounded-3xl shadow-2xl border border-primary/20 px-6 py-10 animate-fade-in">
            <h1 className="text-6xl font-bold text-electric mb-6 animate-slide-in-up">
              About <span className="text-cyber">VITKULT</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '100ms' }}>
              VITKULT is a unique student club that unites art, culture, and technology on one platform. It is a space for dancers, musicians, designers, coders, actors, and innovators to explore their creativity and skills. We celebrate tradition while embracing innovation. From electrifying performances and cultural events to cutting-edge tech projects and hackathons, we merge creativity with technology in exciting ways.
              Our events include music and dance showcases, drama productions, workshops, TEDx talks, and social initiatives. We also work on AI-driven applications, website development, and interactive digital experiences.
              At VITKULT, ideas turn into reality, and passion meets purpose. It is where talents shine, cultures unite, and technology creates new possibilities. VITKULT is more than a club—it’s a movement of creativity, innovation, and impact!
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <Card className="card-glow p-8 animate-slide-in-up">
              <div className="text-center mb-6">
                <Target className="h-16 w-16 text-primary mx-auto mb-4 float animate-bounce-in" />
                <h2 className="text-3xl font-bold text-electric">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                To empower students with cutting-edge technical skills while fostering a vibrant gaming culture that promotes creativity, collaboration, and innovation. We aim to bridge the gap between academic learning and industry requirements.
              </p>
            </Card>
            {/* Vision */}
            <Card className="card-hologram p-8 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
              <div className="text-center mb-6">
                <Eye className="h-16 w-16 text-secondary mx-auto mb-4 float-delayed animate-bounce-in" />
                <h2 className="text-3xl font-bold text-cyber">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                To become India's most influential student-led technical community, producing industry-ready professionals who think innovatively, code elegantly, and game competitively while making a positive impact on society.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/20 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-electric mb-6 animate-fade-in">
              Our <span className="text-cyber">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '100ms' }}>
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="card-glow p-6 text-center group hover:scale-105 transition-all duration-500 animate-slide-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <Icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:text-primary-glow transition-colors duration-300 animate-bounce-in" />
                  <h3 className="text-xl font-bold text-foreground mb-3 animate-fade-in">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed animate-fade-in">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      {/* <section className="py-20 px-4 relative bg-gradient-to-br from-background via-muted/40 to-background/80 overflow-hidden animate-fade-in">
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_60%_20%,hsl(var(--primary-glow)),transparent_70%)]"></div>
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-electric mb-6 animate-fade-in">
              Our <span className="text-neon">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '100ms' }}>
              Milestones that shaped VITKULT into what it is today
            </p>
          </div>
          <div className="relative flex flex-col items-center">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent animate-shimmer rounded-full shadow-lg z-0"></div>
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center w-full mb-16 animate-slide-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="z-10 bg-background rounded-full border-4 border-primary shadow-lg flex items-center justify-center w-20 h-20 mb-4 animate-bounce-in">
                    <Icon className="h-10 w-10 text-primary animate-fade-in" style={{ animationDelay: '200ms' }} />
                  </div>
                  <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3">
                    <Card className="card-hologram p-8 text-center group hover:scale-105 transition-transform duration-500 shadow-xl">
                      <div className="text-2xl font-bold text-primary mb-2 animate-fade-in" style={{ animationDelay: '100ms' }}>{milestone.year}</div>
                      <h3 className="text-xl font-bold text-foreground mb-3 animate-fade-in" style={{ animationDelay: '200ms' }}>{milestone.title}</h3>
                      <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '300ms' }}>{milestone.description}</p>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/20 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-electric mb-6 animate-fade-in">
              VITKULT By <span className="text-cyber">Numbers</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "100+", label: "Active Members", icon: Users },
              { number: "5+", label: "Projects Completed", icon: Code },
              { number: "1+", label: "Events Hosted", icon: Calendar },
              { number: "0+", label: "Awards Won", icon: Trophy }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="gaming-container p-8 text-center group hover:scale-110 transition-transform duration-300 animate-slide-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:text-primary-glow transition-colors duration-300 animate-bounce-in" />
                  <div className="text-4xl font-bold text-electric mb-2 animate-fade-in">{stat.number}</div>
                  <div className="text-muted-foreground animate-fade-in">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="card-glow p-12 animate-slide-in-up">
            <h2 className="text-4xl font-bold text-electric mb-6 animate-fade-in">
              Get In <span className="text-cyber">Touch</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              Ready to join the revolution? Connect with us and be part of something extraordinary.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 animate-fade-in">
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground">VIT Bhopal University, Madhya Pradesh</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Calendar className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground">Meetings: Every Thursday 2 PM</span>
              </div>
            </div>
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
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
