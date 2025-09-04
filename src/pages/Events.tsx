import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Code,
  Gamepad2,
  Presentation,
  Award,
  Star,
  Coins,
  Wallet,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Certificate } from "crypto";

export const upcomingEvents = [
  {
    id: 1,
    title: "Event Season 1 - House Of Secrets + Season 2 - The Red File ",
    date: "Sept 12th 2025, Friday",
    time: "10:00AM to - 5:00PM",
    location: "Auditorium 1, Academic Block 1",
    type: "Gaming",
    participants: 200,
    prize: "Rs 80 Per Participant,  Rs 400 per Full Team (Team size 1-5)",
    description:
      "Dive into the enigmatic world of 'House of Secrets' and 'Red File' at VIT Bhopal University. Unravel mysteries, solve puzzles, and embark on thrilling adventures in these immersive gaming experiences. Join us for a journey filled with suspense and excitement!",
    image: "/poster1.jpg",
    status: "Registrations Open",
    featured: true,
    link: "https://docs.google.com/forms/d/1v289vkG0wyyN0qnMAjabZesSGB0p6dk_RPeRw0wSIvA/edit?ts=68b7c273",
  },
  {
    id: 2,
    title: "Generative and Agentic AI Session + Workshop",
    date: "Sept 11th 2025, Thursday",
    time: "1:30PM to - 5:00PM",
    location: "Auditorium 1, Academic Block 2",
    type: "Tech Talk",
    hybrid: true,
    participants: "400",
    prize: "Rupees 50  per participant",
    Certificate: "Certificates will be provided to all the Participants",
    description:
      "Speaker - Mr. Indranil Doss, a Senior Software Engineer (SDE-3) at Apollo.io in the AI Apps team and a post-graduate in Computer Science from IIT Dhanbad. With nearly a decade of industry experience across Apollo.io, Adobe, Myntra, InMobi he specializes in building scalable systems and applied AI solutions, with a focus on integrating generative AI into real-world products",
    image:
      "/posterTech.png",
    status: "Registrations Opening Soon",
    featured: true,
    link: "",
  },
  {
    id: 3,
    title:
      "BOTH : Generative and Agentic AI Session + Workshop AND Event Season 1 - House Of Secrets + Season 2 - The Red File ",
    date: "Sept 11th 2025, Thursday AND Sept 12th 2025, Friday",
    time: "1:30PM to - 5:00PM AND  10:00AM to - 5:00PM",
    location:
      "Auditorium 1, Academic Block 2 AND Auditorium 1, Academic Block 1",
    type: "Gaming",
    participants: 400,
    prize: "Rs 130   Per Participant,  Rs 650 per Full Team",
    description:
      "Speaker - Mr. Hari Prasad R CEO and Founder, DeepinsigthsX Gen AI Strategist, LLM System Architect, Author Of 3 AI Books Berlin, Germany AND Dive into the enigmatic world of 'House of Secrets' and 'Red File' at VIT Bhopal University. Unravel mysteries, solve puzzles, and embark on thrilling adventures in these immersive gaming experiences. Join us for a journey filled with suspense and excitement!",
    image:
      "https://eco-cdn.iqpc.com/eco/images/channel_content/images/ai-generated_images_comic_strip_in_blue_modern_styleruOsIIcWQV26K4grrs4kG4RLXQ3zj6fX5aeZucLh.webp", // Replace with a real image URL
    status: "Registrations Opening Soon",
    featured: true,
    link: "",
  },
];

const pastEvents = [
  {
    id: 4,
    title: "Udbhav: The Grand Inauguration",
    date: "2025-04-10",
    type: "Inauguration",
    participants: 400,
    description:
      "The official launch event of VITKULT, celebrating code, creativity, and culture with esteemed guests and performances.",
    image: "https://i.postimg.cc/Hn45bBDY/udbhav.jpg",
  },
];

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [activeTab, setActiveTab] = useState("upcoming");

  const getEventTypeIcon = (type: string) => {
    const eventTypeMap: { [key: string]: JSX.Element } = {
      Hackathon: <Code className="h-4 w-4 text-white" />,
      Workshop: <Presentation className="h-4 w-4 text-white" />,
      Gaming: <Gamepad2 className="h-4 w-4 text-white" />,
      Inauguration: <Award className="h-4 w-4 text-white" />,
      "Tech Talk": <Presentation className="h-4 w-4 text-white" />,
      Competition: <Trophy className="h-4 w-4 text-white" />,
    };
    return eventTypeMap[type] || <Calendar className="h-4 w-4 text-white" />;
  };

  const getEventTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      Hackathon: "bg-primary",
      Workshop: "bg-secondary",
      Gaming: "bg-accent",
      Inauguration: "bg-destructive",
    };
    return colorMap[type] || "bg-primary";
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Registrations Open":
        return "bg-green-500 hover:bg-green-600";
      case "Almost Full":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      {/* Hero Section */}
      <header className="pt-28 pb-16 text-center border-b bg-gradient-to-br from-background via-muted/40 to-background/80 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="backdrop-blur-lg bg-background/80 rounded-3xl shadow-2xl border border-primary/20 px-6 py-10 max-w-3xl mx-auto mb-10 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-electric mb-4 animate-slide-in-up">
              Our <span className="text-cyber">Events</span>
            </h1>
            <p
              className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              Join our electrifying events that challenge your skills, expand
              your horizons, and connect you with the brightest minds.
            </p>
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              {[
                { number: "1+", label: "Events Hosted" },
                { number: "500+", label: "Total Participants" },
                { number: "₹10k+", label: "Prizes Won" },
                { number: "4+", label: "Industry Speakers" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="gaming-container p-4 rounded-lg animate-slide-in-up"
                  style={{ animationDelay: `${300 + i * 100}ms` }}
                >
                  <div className="text-3xl font-bold text-electric">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
      {/* Tab Navigation */}
      <nav className="py-8 animate-fade-in">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="flex bg-card rounded-lg p-1 border shadow-lg">
            <Button
              variant={activeTab === "upcoming" ? "gaming" : "ghost"}
              onClick={() => setActiveTab("upcoming")}
              className={`w-40 transition-all duration-300 animate-bounce-in ${
                activeTab === "upcoming" ? "shadow-electric" : ""
              }`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming
            </Button>
            <Button
              variant={activeTab === "past" ? "gaming" : "ghost"}
              onClick={() => setActiveTab("past")}
              className={`w-40 transition-all duration-300 animate-bounce-in ${
                activeTab === "past" ? "shadow-electric" : ""
              }`}
            >
              <Award className="h-4 w-4 mr-2" />
              Past Events
            </Button>
          </div>
        </div>
      </nav>
      {/* Main Events Content */}
      <main className="container mx-auto px-4 pb-24 animate-fade-in">
        {activeTab === "upcoming" ? (
          <UpcomingEventsSection
            events={upcomingEvents}
            getEventTypeColor={getEventTypeColor}
            getEventTypeIcon={getEventTypeIcon}
            getStatusBadgeClass={getStatusBadgeClass}
          />
        ) : (
          <PastEventsSection
            events={pastEvents}
            getEventTypeColor={getEventTypeColor}
            getEventTypeIcon={getEventTypeIcon}
          />
        )}
      </main>
    </div>
  );
};

const UpcomingEventsSection = ({
  events,
  getEventTypeColor,
  getEventTypeIcon,
  getStatusBadgeClass,
}: any) => (
  <div className="space-y-12">
    {events.map((event, i) => (
      <Card
        key={event.id}
        className={`overflow-hidden card-glow transition-all duration-300 ${
          event.featured ? "ring-2 ring-primary" : ""
        } animate-slide-in-up`}
        style={{ animationDelay: `${i * 150}ms` }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Image Column */}
          <div className="md:col-span-4 relative">
            {event.featured && (
              <Badge className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground animate-bounce-in">
                <Star className="h-3 w-3 mr-1.5" /> Featured Event
              </Badge>
            )}
            <div
              className={`absolute top-3 right-3 p-2 rounded-lg z-10 ${getEventTypeColor(
                event.type
              )} animate-fade-in`}
              style={{ animationDelay: "100ms" }}
            >
              {getEventTypeIcon(event.type)}
            </div>
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-60 md:h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          {/* Details Column */}
          <div className="md:col-span-8 flex flex-col">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <Badge
                    variant="outline"
                    className="mb-2 animate-fade-in"
                    style={{ animationDelay: "200ms" }}
                  >
                    {event.type}
                  </Badge>
                  <CardTitle
                    className="text-2xl font-bold animate-fade-in"
                    style={{ animationDelay: "300ms" }}
                  >
                    {event.title}
                  </CardTitle>
                </div>
                <Badge
                  className={`mt-2 sm:mt-0 whitespace-nowrap text-white ${getStatusBadgeClass(
                    event.status
                  )} animate-fade-in`}
                  style={{ animationDelay: "400ms" }}
                >
                  {event.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent
              className="flex-grow animate-fade-in"
              style={{ animationDelay: "500ms" }}
            >
              <p className="text-muted-foreground mb-6 text-sm leading-[1.5]">
                {event.description}
              </p>
              {event.Certificate && (
                <div className="flex items-center gap-3 mb-4 text-sm text-accent font-semibold">
                  <span>{event.Certificate}</span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-primary" />{" "}
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-primary" />{" "}
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />{" "}
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-primary" />{" "}
                  {event.hybrid && <span>Hybrid mode – first 240 seats are offline, rest will be online. </span>}
                  {!event.hybrid && <span>{event.participants} Max Participants</span>}
                </div>
                {event.prize && (
                  <div className="flex items-center gap-3 sm:col-span-2">
                    <Wallet className="h-4 w-4 text-accent" />{" "}
                    <span className="font-semibold text-accent">
                      Registration Fees: {event.prize}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                  variant="gaming"
                  size="lg"
                  className="flex-1 animate-bounce-in cursor-pointer scale-95 hover:scale-100"
                  asChild
                >
                  <Link to={event.link}>Register Now</Link>
                </Button>
              </div>
            </CardFooter>
          </div>
        </div>
      </Card>
    ))}
  </div>
);

const PastEventsSection = ({
  events,
  getEventTypeColor,
  getEventTypeIcon,
}: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {events.map((event, i) => (
      <Card
        key={event.id}
        className="card-hologram flex flex-col overflow-hidden animate-slide-in-up"
        style={{ animationDelay: `${i * 100}ms` }}
      >
        <div className="relative">
          <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground z-10 animate-bounce-in">
            Completed
          </Badge>
          <div
            className={`absolute top-3 right-3 p-2 rounded-lg z-10 ${getEventTypeColor(
              event.type
            )} animate-fade-in`}
            style={{ animationDelay: "100ms" }}
          >
            {getEventTypeIcon(event.type)}
          </div>
          <img
            src={event.image}
            alt={event.title}
            className="w-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <CardHeader>
          <Badge
            variant="outline"
            className="w-fit mb-2 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            {event.type}
          </Badge>
          <CardTitle
            className="text-xl font-bold animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            {event.title}
          </CardTitle>
        </CardHeader>
        <CardContent
          className="flex-grow animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          <p className="text-muted-foreground text-sm mb-4">
            {event.description}
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />{" "}
              <span>
                {new Date(event.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />{" "}
              <span>~{event.participants} participants</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full animate-bounce-in">
            View Gallery
          </Button>
        </CardFooter>
      </Card>
    ))}
  </div>
);

export default Events;
