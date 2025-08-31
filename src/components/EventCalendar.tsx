import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ExternalLink,
  Star,
} from "lucide-react";
import { upcomingEvents } from "@/pages/Events";
import { Link } from "react-router-dom";

const EventCalendar = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Events", color: "primary" },
    { id: "Hackathon", name: "Hackathons", color: "accent" },
    { id: "Workshop", name: "Workshops", color: "secondary" },
    { id: "Gaming", name: "Gaming", color: "success" },
    { id: "Tech Talk", name: "Tech Talks", color: "primary" },
  ];

  const filteredEvents =
    selectedCategory === "all"
      ? upcomingEvents
      : upcomingEvents.filter((event) => event.type === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Registrations Open":
        return "bg-success/10 text-success border border-success/20";
      case "Almost Full":
        return "bg-accent/10 text-accent border border-accent/20";
      case "Coming Soon":
        return "bg-secondary/10 text-secondary border border-secondary/20";
      case "Free Entry":
        return "bg-primary/10 text-primary border border-primary/20";
      default:
        return "bg-muted/10 text-muted-foreground border border-border";
    }
  };

  return (
    <section className="py-20 px-4 bg-background relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 relative inline-block">
            Upcoming <span className="text-cyber">Events</span>
            {/* Decorative dots */}
            <span className="absolute -top-4 left-8 w-2 h-2 bg-foreground rounded-full"></span>
            <span className="absolute -top-4 left-16 w-2 h-2 bg-foreground rounded-full"></span>
          </h2>
          {/* Decorative lines */}
          <div className="relative w-full flex justify-center mt-6">
            <div className="absolute top-0 left-8 right-0 h-px bg-border"></div>
            <div className="absolute top-3 left-0 w-8 h-px bg-border -rotate-45"></div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-10 leading-relaxed">
            Join our electrifying events where innovation meets competition.
            Level up your skills and connect with fellow tech enthusiasts!
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "gaming" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`transition-all duration-300 rounded-full px-6 py-2 ${
                selectedCategory === category.id
                  ? "shadow-lg shadow-primary/30"
                  : "hover:border-primary/40 hover:text-primary"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        <div
          className={`grid grid-cols-1 gap-8 ${
            filteredEvents.length > 1 ? "md:grid-cols-2" : ""
          }`}
        >
          {filteredEvents.length > 0
            ? filteredEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className={`relative p-8 border border-border/60 bg-background/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group ${
                    event.featured ? "ring-2 ring-primary/30" : ""
                  } ${
                    filteredEvents.length === 1
                      ? "max-w-3xl mx-auto w-full"
                      : ""
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient top border on hover */}
                  <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber to-electric scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>

                  {/* Event Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        {event.featured && (
                          <Star className="h-5 w-5 text-accent fill-current drop-shadow-md" />
                        )}
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-electric transition-colors">
                          {event.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Users className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{event.participants} participants expected</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant={event.featured ? "gaming" : "electric"}
                      className="flex-1 group w-full cursor-pointer hover:scale-[1.01] hover:shadow-md hover:shadow-primary/20 transition-all duration-300"
                      asChild
                    >
                      <Link to="/hackathon">
                        Register Now
                        <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="sm:self-start cursor-pointer hover:border-primary/50 hover:text-primary transition-colors duration-300"
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))
            : (selectedCategory === "Workshop" ||
                selectedCategory === "Gaming" ||
                selectedCategory === "Tech Talk") && (
                <div className="text-center py-16 border border-border/60 rounded-2xl bg-background/50 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Stay Tuned!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We're working on exciting {selectedCategory.toLowerCase()}{" "}
                    events. Check back soon for updates!
                  </p>
                  <Button variant="gaming" asChild>
                    <Link to="/hackathon">Explore Hackathons</Link>
                  </Button>
                </div>
              )}
        </div>

        {/* View All Events Button */}
        <div className="text-center mt-16">
          <Button
            variant="hologram"
            size="lg"
            className="group px-8 py-4 rounded-full"
            asChild
          >
            <Link to="/events">
              <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              View All Events
              <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventCalendar;
