import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Star, 
  Crown, 
  Zap, 
  Users, 
  Eye, 
  TrendingUp, 
  Target,
  CheckCircle,
  Mail,
  Phone,
  Calendar,
  Award,
  Handshake
} from "lucide-react";
import { useEffect } from "react";

const Sponsor = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  // const sponsorshipTiers = [
  //   {
  //     name: "Title Sponsor",
  //     icon: Crown,
  //     price: "",
  //     color: "accent",
  //     featured: true,
  //     benefits: [
  //       "Naming rights to major events",
  //       "Logo placement on all marketing materials",
  //       "Dedicated booth space at events",
  //       "Direct access to top talent for recruitment",
  //       "Social media mentions across all platforms",
  //       "Custom workshop hosting opportunities",
  //       "Priority partnership for future events",
  //       "Annual recognition ceremony"
  //     ]
  //   },
  //   {
  //     name: "Gold Sponsor",
  //     icon: Star,
  //     price: "",
  //     color: "primary",
  //     featured: false,
  //     benefits: [
  //       "Logo on event banners and merchandise",
  //       "Booth space at 3 major events",
  //       "Access to resume database",
  //       "Social media promotion",
  //       "Workshop hosting opportunity",
  //       "Quarterly talent showcase",
  //       "Brand mention in newsletters"
  //     ]
  //   },
  //   {
  //     name: "Silver Sponsor",
  //     icon: Zap,
  //     price: "",
  //     color: "secondary",
  //     featured: false,
  //     benefits: [
  //       "Logo on digital materials",
  //       "Booth space at 2 events",
  //       "Newsletter mentions",
  //       "Social media shout-outs",
  //       "Access to student projects",
  //       "Recruitment announcements"
  //     ]
  //   },
  //   {
  //     name: "Event Sponsor",
  //     icon: Heart,
  //     price: "",
  //     color: "success",
  //     featured: false,
  //     benefits: [
  //       "Exclusive event branding",
  //       "Opening ceremony mention",
  //       "Logo on event merchandise",
  //       "Social media coverage",
  //       "Direct student interaction",
  //       "Event photography rights"
  //     ]
  //   }
  // ];

  const currentSponsors = [
    { name: "You Can Be The First One", logo: "/placeholder.svg", tier: "Sponsor", partnership: "" }
  ];

  const metrics = [
    { value: "100+", label: "Active Members", icon: Users },
    { value: "10K+", label: "Social Media Reach", icon: Eye },
    // { value: "95%", label: "Placement Rate", icon: TrendingUp },
    { value: "4+", label: "Events Annually", icon: Target }
  ];

  const partnershipBenefits = [
    {
      title: "Talent Pipeline",
      description: "Direct access to VIT Bhopal's brightest minds in technology",
      icon: Users
    },
    {
      title: "Brand Visibility",
      description: "Extensive exposure across digital and physical platforms",
      icon: Eye
    },
    {
      title: "Innovation Partnership",
      description: "Collaborate on cutting-edge projects and research initiatives",
      icon: Zap
    },
    {
      title: "Community Impact",
      description: "Support education and make a lasting difference in student lives",
      icon: Heart
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
              Partner With <span className="text-cyber">VITKULT</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in">
              Join industry leaders in shaping the future of technology education. Gain access to exceptional talent while supporting innovation at VIT Bhopal.
            </p>
            <Button variant="gaming" size="xl" className="group animate-bounce-in">
              <Handshake className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              Start Partnership Journey
            </Button>
          </div>
        </div>
      </section>
      {/* Metrics Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/20 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-electric mb-4 animate-fade-in">
              Why Partner With <span className="text-cyber">Us?</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card
                  key={index}
                  className="gaming-container p-6 text-center group hover:scale-110 transition-transform duration-300 animate-slide-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <Icon className="h-12 w-12 text-primary mx-auto mb-3 group-hover:text-primary-glow transition-colors duration-300 animate-bounce-in" />
                  <div className="text-3xl font-bold text-electric mb-2 animate-fade-in">{metric.value}</div>
                  <div className="text-muted-foreground text-sm animate-fade-in">{metric.label}</div>
                </Card>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="card-glow p-6 text-center animate-slide-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <Icon className="h-10 w-10 text-primary mx-auto mb-4 animate-bounce-in" />
                  <h3 className="text-lg font-bold text-foreground mb-3 animate-fade-in">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed animate-fade-in">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* Sponsorship Tiers */}
      {/* <section className="py-20 px-4 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-electric mb-6 animate-fade-in">
              Sponsorship <span className="text-neon">Packages</span>
            </h2>
            <p className="text-xl text-muted-foreground animate-fade-in">
              Choose the perfect partnership level that aligns with your goals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sponsorshipTiers.map((tier, index) => {
              const Icon = tier.icon;
              return (
                <div key={index} className="relative">
                  {tier.featured && (
                    <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground animate-bounce-in z-20 shadow-lg">
                      Most Popular
                    </Badge>
                  )}
                  <Card
                    className={`card-hologram p-6 flex flex-col justify-between min-h-[500px] animate-slide-in-up ${tier.featured ? 'ring-2 ring-accent' : ''}`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex-grow">
                      <div className="text-center mb-6">
                        <Icon className="h-12 w-12 text-primary mx-auto mb-4 animate-bounce-in" />
                        <h3 className="text-2xl font-bold text-foreground mb-2 animate-fade-in">{tier.name}</h3>
                        <div className="text-3xl font-bold text-electric animate-fade-in">{tier.price}</div>
                      </div>
                      <ul className="space-y-3">
                        {tier.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start space-x-2 animate-fade-in" style={{ animationDelay: `${benefitIndex * 50}ms` }}>
                            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8 pt-4">
                      <Button
                        variant={tier.featured ? "gaming" : "outline"}
                        className="w-full animate-bounce-in"
                      >
                        Choose {tier.name}
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}
      {/* Current Sponsors */}
      <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/20 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-electric mb-6 animate-fade-in">
              Our Trusted <span className="text-cyber">Partners</span>
            </h2>
            <p className="text-xl text-muted-foreground animate-fade-in">
              Join these industry leaders who believe in our mission
            </p>
          </div>
          <div className="flex justify-center">
            {currentSponsors.map((sponsor, index) => (
              <Card
                key={index}
                className="card-glow p-8 text-center group hover:scale-105 transition-all duration-500 animate-slide-in-up max-w-sm"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-electric rounded-lg mx-auto mb-6 flex items-center justify-center animate-bounce-in">
                  <span className="text-white font-bold text-xl animate-fade-in">A</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2 animate-fade-in">{sponsor.name}</h3>
                <p className="text-lg text-primary mb-2 animate-fade-in">{sponsor.tier}</p>
                <p className="text-sm text-muted-foreground animate-fade-in">{sponsor.partnership} partnership</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-20 px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <Card className="card-glow p-12 text-center animate-slide-in-up">
            <Award className="h-16 w-16 text-accent mx-auto mb-6 pulse-glow animate-bounce-in" />
            <h2 className="text-4xl font-bold text-electric mb-6 animate-fade-in">
              Ready to Make an <span className="text-cyber">Impact?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              Let's discuss how we can create a meaningful partnership that benefits your organization and our student community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 animate-fade-in">
              <div className="flex flex-col items-center space-y-2">
                <Mail className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground">vitkult@vitbhopal.ac.in</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Phone className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground">+91 78928 50922</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Calendar className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground">Schedule a Meeting</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button variant="gaming" size="lg" className="group animate-bounce-in">
                <Heart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Become a Sponsor
              </Button>
              <Button variant="hologram" size="lg" className="animate-bounce-in" style={{ animationDelay: '100ms' }}>
                <Calendar className="h-5 w-5" />
                Schedule Meeting
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Sponsor;