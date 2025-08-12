import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, ExternalLink, Star } from "lucide-react";
import { upcomingEvents } from "@/pages/Events";
import { Link } from "react-router-dom";

const EventCalendar = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Events", color: "primary" },
    { id: "Hackathon", name: "Hackathons", color: "accent" },
    { id: "Workshop", name: "Workshops", color: "secondary" },
    { id: "Gaming", name: "Gaming", color: "success" },
    { id: "Tech Talk", name: "Tech Talks", color: "primary" }
  ];

  const filteredEvents = selectedCategory === "all"
    ? upcomingEvents
    : upcomingEvents.filter(event => event.type === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Registrations Open": return "text-success";
      case "Almost Full": return "text-accent";
      case "Coming Soon": return "text-secondary";
      case "Free Entry": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-electric mb-6">
            Upcoming <span className="text-cyber">Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
              className="transition-all duration-300"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        <div className={`grid grid-cols-1 gap-8 ${filteredEvents.length > 1 ? 'md:grid-cols-2' : ''}`}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <Card 
                key={event.id} 
                className={`card-glow p-6 hover:scale-[1.02] transition-all duration-500 ${
                  event.featured ? 'ring-2 ring-primary/30' : ''
                } ${filteredEvents.length === 1 ? 'max-w-3xl mx-auto w-full' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Event Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {event.featured && (
                        <Star className="h-5 w-5 text-accent fill-current" />
                      )}
                      <h3 className="text-2xl font-bold text-foreground">
                        {event.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mt-2">{event.description}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)} bg-current/10 whitespace-nowrap`}>
                    {event.status}
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
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
                    className="flex-1 group w-full"
                    asChild
                  >
                    <Link to="/hackathon">
                      Register Now
                      <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" className="sm:self-start">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            // Show "Stay tuned" message for Workshop, Gaming, and Tech Talk categories
            (selectedCategory === "Workshop" || selectedCategory === "Gaming" || selectedCategory === "Tech Talk") && (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-foreground mb-4">Stay Tuned!</h3>
                <p className="text-muted-foreground mb-6">
                  We're working on exciting {selectedCategory.toLowerCase()} events. Check back soon for updates!
                </p>
                <Button variant="gaming" asChild>
                  <Link to="/hackathon">Explore Hackathons</Link>
                </Button>
              </div>
            )
          )}
        </div>

        {/* View All Events Button */}
        <div className="text-center mt-12">
          <Button variant="hologram" size="lg" className="group" asChild>
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