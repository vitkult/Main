import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Team = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [activeCategory, setActiveCategory] = useState("all");

 const teamMembers = [
  {
    id: 1,
    name: "Saravana Kumar S",
    role: "President",
    category: "founders",
    image: "https://www.dropbox.com/scl/fi/cv62okout8yzg9kwk9lmb/precident.jpg?rlkey=oeg9g4fd7vwirxzjpqcem2spp&st=28t9n3by&raw=1",
    bio: "Leading the team with vision and dedication, fostering a vibrant cultural environment.",
    skills: ["Leadership", "Event Planning"],
    isFounder: true
  },
  {
    id: 2,
    name: "Aditya Patil",
    role: "Vice President",
    category: "founders",
    image: "https://www.dropbox.com/scl/fi/prlcv4snzjv0xigv37eck/aditya_vice_preci.jpg?rlkey=7xoyi5st1y6tojr17k30nirb9&st=jve77w02&raw=1",
    bio: "Supporting the president and coordinating various initiatives to ensure smooth operations.",
    skills: ["Coordination", "Communication"],
    isFounder: true
  },
  
  {
    id: 25,
    name: "Sanjana Kori",
    role: "Acting Vice President",
    category: "management",
    image: "https://www.dropbox.com/scl/fi/nbykiqpk9fc3h2x86ykyr/Sanjana_non_tech_lead.png?rlkey=pai06plr1td9nl7els89dxn1g&st=h941soqq&raw=1",
    bio: "Supporting the president and coordinating various initiatives to ensure smooth operations.",
    skills: ["Coordination", "Communication"],
    isFounder: false
  },
  {
    id: 3,
    name: "Vijay Prajwal J",
    role: "Secretary",
    category: "founders",
    image: "https://www.dropbox.com/scl/fi/jkve2ddtziyahgqzfwl7s/Vijay_secr.jpg?rlkey=1hbmm0vbcafq8ojiwacchi6b2&st=0g4t2yhj&raw=1",
    bio: "Maintaining records, communication, and administrative tasks for the team.",
    skills: ["Administration", "Documentation"],
    isFounder: true
  },
  
  {
    id: 34,
    name: "Sushanth",
    role: "Treasurer",
    category: "founders",
    image: "https://www.dropbox.com/scl/fi/jh9mg34iszs1rsxwt42ov/Screenshot-2025-07-21-160709.png?rlkey=kxb4nvoigx3b4u5y33wgnx2sd&st=03p3i5sy&raw=1",
    bio: "Manages the financial health and budget of the organization.",
    skills: ["Finance", "Budgeting", "Accounting"],
    isFounder: true
  },
  {
    id: 7,
    name: "Charan Gowda DN",
    role: "Acting Secretary and Co-Treasurer",
    category: ["management"],
    image: "https://www.dropbox.com/scl/fi/2vqqyljs8fozusjh6v4h9/Screenshot-2025-07-21-153753.png?rlkey=lcnbdu83md292c9r507us79a8&st=pyu4l17j&raw=1",
    bio: "Assisting in managing administrative and financial tasks for the team.",
    skills: ["Finance", "Administration"],
    isFounder: false
  },
  {
    id: 8,
    name: "Vishnu Nair",
    role: "Technical Lead",
    category: "technical",
    image: "https://www.dropbox.com/scl/fi/ej9fyjknrlaoamqkjjoy7/Screenshot-2025-09-01-164937.png?rlkey=9kvslo3hldb37s6ktxowlcweh&st=ev4vikcg&raw=1",
    bio: "Overseeing all technical operations and ensuring seamless execution of digital platforms.",
    skills: ["Web Development", "Technical Leadership"],
    isFounder: false
  },
  {
    id: 9,
    name: "Navnit",
    role: "Technical Co-Lead",
    category: "technical",
    image: "https://www.dropbox.com/scl/fi/vgb6qr7lbq4nhz1a26btf/Screenshot-2025-09-01-194758.png?rlkey=8smdhmb1c9qn3v2reudlfporh&st=yl97z12c&raw=1",
    bio: "Assisting in managing the technical aspects and digital presence of our events.",
    skills: ["Website Administrator", "Web Development", "Full-Stack"],
    isFounder: false
  },
  {
    id: 10,
    name: "Sweta",
    role: "Technical Co-Lead",
    category: "technical",
    image: "https://www.dropbox.com/scl/fi/xstudozf9379b8v3otv2a/Screenshot-2025-09-01-174834.png?rlkey=yisaz5i80xwrld0clxf05nvmb&st=493d9kzo&raw=1",
    bio: "Assisting in managing the technical aspects and digital presence of our events.",
    skills: ["Web Development", "Machine-learning"],
    isFounder: false
  },
  {
    id: 31,
    name: "Anshika Mittal",
    role: "Technical LinkedIn Initiative",
    category: "technical",
    image: "https://www.dropbox.com/scl/fi/fjch87fj3lyovhj8likdb/Screenshot-2025-09-01-180343.png?rlkey=ubga4sgf7ab595z3nu8h9z0f7&st=wpwk02y7&raw=1",
    bio: "Leading the technical LinkedIn outreach to grow our professional network.",
    skills: ["LinkedIn", "Networking", "Technical Writing"],
    isFounder: false
  },
  {
    id: 32,
    name: "Murugavel",
    role: "Technical Operations",
    category: "technical",
    image: "https://www.dropbox.com/scl/fi/6cyf3nn7zl2l39m5jilkx/Screenshot-2025-09-01-175844.png?rlkey=bka5hp73rhfn09hujbz147qq7&st=jfawzd05&raw=1",
    bio: "Overseeing daily technical operations to ensure smooth workflow.",
    skills: ["Operations", "System Management"],
    isFounder: false
  },
  {
    id: 33,
    name: "Anjana Manoj",
    role: "Technical Operations",
    category: "technical",
    image: "https://www.dropbox.com/scl/fi/d9oyemwpz0xgj0ewjlome/Screenshot-2025-09-01-180149.png?rlkey=avwgj4liabpqpshfsitpwg0cl&st=ti6x03ja&raw=1",
    bio: "Assisting in technical operations and project coordination.",
    skills: ["Operations", "Coordination"],
    isFounder: false
  },
  {
    id: 11,
    name: "Jayanth CV",
    role: "Event Management Lead",
    category: ["founders", "event_and_design"],
    image: "https://www.dropbox.com/scl/fi/w7vhzizdevyxaexdqgonm/jayanth_event_team_colead.jpg?rlkey=ilbiuj1zipq8x3gfudmc27cev&st=wqpdu0a3&raw=1",
    bio: "Collaborating on planning and executing memorable cultural events.",
    skills: ["Event Planning", "Teamwork"],
    isFounder: true
  },
  {
    id: 4,
    name: "Shashank Salimath",
    role: "Event Management Lead",
    category: ["founders", "event_and_design"],
    image: "https://www.dropbox.com/scl/fi/cyuyutpokd4k3pkyr3uys/Screenshot-2025-08-11-192851.png?rlkey=5m87i5l1ufml763iokbtn4k1s&st=kml6o300&raw=1",
    bio: "Managing cultural events and fostering a vibrant community spirit.",
    skills: ["Event Planning", "Teamwork"],
    isFounder: true
  }, 
  {
      id: 9,
      name: "Kanak Garg",
      role: "Event Management Co-Lead",
      category: "event_and_design",
      image: "https://www.dropbox.com/scl/fi/qe5l8u8a5v4mpa1raigbr/Screenshot-2025-07-21-153820.png?rlkey=nyasdc0mhd2m7i94d0dbtp431&st=txb1pjy2&raw=1",
      bio: "Ensuring effective scheduling and smooth planning for all activities.",
      skills: ["Scheduling", "Planning"],
      isFounder: false
    },

  {
    id: 5,
    name: "Aswin Pillai",
    role: "Scheduling and Planning Lead",
    category: ["event_and_design", "management"],
    image: "https://www.dropbox.com/scl/fi/j597fjlb9bcea7inq4p7k/Screenshot-2025-09-01-183443.png?rlkey=dfb1phqvw7wleyuyoand4amu7&st=t3vddtfo&raw=1",
    bio: "Leading the scheduling and planning efforts to ensure a seamless flow of all events and activities.",
    skills: ["Scheduling", "Planning"],
    isFounder: false
  },
  {
    id: 12,
    name: "Aldrin Jose Kurian",
    role: "Operations Leads",
    category: "event_and_design",
    image: "https://www.dropbox.com/scl/fi/4jefqbwvbxkpz0optz4li/Screenshot-2025-07-21-152930.png?rlkey=8b92dne68ewdn6vw7lkw8ru1c&st=dzq75uxp&raw=1",
    bio: "Overseeing all operational aspects to ensure efficient event execution.",
    skills: ["Operations", "Logistics"],
    isFounder: false
  },
  {
    id: 13,
    name: "Chakritha Goud Korakoppula",
    role: "Operations Leads",
    category: "event_and_design",
    image: "https://www.dropbox.com/scl/fi/1wbzn3yxz8fthgo89l6lk/aditi_vit.jpg?rlkey=cy477fmal8kb6tejoa312g4gu&st=f3pw4wuj&raw=1",
    bio: "Ensuring smooth and effective functioning of all club activities.",
    skills: ["Operations", "Management"],
    isFounder: false
  },
  {
    id: 14,
    name: "Aditi Singh",
    role: "Operations Co-Lead",
    category: "event_and_design",
    image: "https://www.dropbox.com/scl/fi/2zcah7n2vgjw570h7uqgm/Screenshot-2025-08-10-230152.png?rlkey=wodljxj4rv5k2glqdcmzop4lx&st=7oer2uwj&raw=1",
    bio: "Assisting with operational planning and execution.",
    skills: ["Operations", "Planning"],
    isFounder: false
  },
  {
    id: 15,
    name: "Megeshwara",
    role: "Media Lead",
    category: "event_and_design",
    image: "https://www.dropbox.com/scl/fi/4dd30x6hajso9fw6k3fs3/Screenshot-2025-07-21-155154.png?rlkey=t2dcz0vza3vv2ou6jh0qzd3v2&st=pvdu8cxh&raw=1",
    bio: "Leading the capture and creation of visual content for all events.",
    skills: ["Photography", "Videography"],
    isFounder: false
  },
  {
    id: 16,
    name: "Vidhu Vinod",
    role: "Design Lead",
    category: "event_and_design",
    image: "https://www.dropbox.com/scl/fi/m82u2a0j2c8v4wderxsgx/Screenshot-2025-07-21-154825.png?rlkey=jq3v61jnf69hnna41e1z4huu3&st=ussm8eb9&raw=1",
    bio: "Spearheading creative design for all visual assets and promotional materials.",
    skills: ["Graphic Design", "UI/UX"],
    isFounder: false
  },
  {
    id: 17,
    name: "Harsh Panchal",
    role: "Design Co-Leads",
    category: "event_and_design",
    image: "https://www.dropbox.com/scl/fi/5b0vx7r4lq21ojhp6cjqs/Screenshot-2025-08-10-225307.png?rlkey=2bbnj6m3ugp4xa76b41819quw&st=n4r7e71q&raw=1",
    bio: "Collaborating on artistic direction and design execution.",
    skills: ["Graphic Design", "Illustration"],
    isFounder: false
  },
  {
    id: 18,
    name: "Rishi Raj",
    role: "Design Co-Leads",
    category: "event_and_design",
    image: "https://www.dropbox.com/scl/fi/kosdrcq8ikauqcp5jwp0e/Screenshot-2025-07-21-154408.png?rlkey=otrheb2pdaplelh4vkf97bh3r&st=hl2vyaov&raw=1",
    bio: "Assisting in developing compelling visual designs.",
    skills: ["Graphic Design", "Branding"],
    isFounder: false
  },
  {
    id: 19,
    name: "Aeganathen Sai",
    role: "Discipline Lead",
    category: "management",
    image: "https://www.dropbox.com/scl/fi/n0zmu9lhrcsmpj1qbhs96/Screenshot-2025-07-21-155006.png?rlkey=wsz9ogkp57tb6y9ga71oao7ab&st=4dhukunv&raw=1",
    bio: "Ensuring adherence to guidelines and maintaining order during events.",
    skills: ["Coordination", "Rules Enforcement"],
    isFounder: false
  },
  {
    id: 20,
    name: "Navya Pillai",
    role: "Content Leads",
    category: "event_and_design",
    image: "https://www.dropbox.com/scl/fi/w1uiti68vpwonpvfmlh3p/Screenshot-2025-07-21-153612.png?rlkey=lyx91rdu7nsf0vnxwmbf0357m&st=wqcjs0jz&raw=1",
    bio: "Crafting engaging narratives and content for all club platforms.",
    skills: ["Content Creation", "Writing"],
    isFounder: false
  },
  {
    id: 21,
    name: "Vansh Vardhan",
    role: "Content Leads",
    category: "event_and_design",
    image: "https://www.dropbox.com/scl/fi/ytj31j4e3a0csanvo8o5b/Screenshot-2025-07-21-153232.png?rlkey=ff11jwbopizc2tytj8qn2eowy&st=34lbzd5x&raw=1",
    bio: "Developing compelling content to highlight our cultural events.",
    skills: ["Content Strategy", "Storytelling"],
    isFounder: false
  },
  {
    id: 22,
    name: "San Maria Job",
    role: "Content Co-Lead",
    category: "event_and_design",
    image: "https://www.dropbox.com/scl/fi/yp7hojhs9ya9tgp11m3qo/Screenshot-2025-08-11-193012.png?rlkey=kdykzqtlpo17ghhiemra05sv4&st=be3339yj&raw=1",
    bio: "Assisting in content creation and strategy.",
    skills: ["Content Creation", "Editing"],
    isFounder: false
  },
  {
    id: 23,
    name: "Shanmugha Priya",
    role: "PR and Outreach Lead",
    category: "management",
    image: "https://www.dropbox.com/scl/fi/e92nl64buvoeg8nc95ha3/Screenshot-2025-07-21-145820.png?rlkey=385k9hxbq4tr6o48udaf9vug3&st=vflna64b&raw=1",
    bio: "Managing public relations and expanding our community reach.",
    skills: ["Public Relations", "Outreach"],
    isFounder: false
  },
  {
    id: 24,
    name: "Akshat Singh Tomar",
    role: "PR and Outreach Co-Lead",
    category: "management",
    image: "https://www.dropbox.com/scl/fi/8ufyfl7lb9ud82irmgygs/Screenshot-2025-07-21-151751.png?rlkey=dz0949vzj8j8myiwo9cebjp8u&st=wu5tkogg&raw=1",
    bio: "Supporting PR efforts and fostering external partnerships.",
    skills: ["Public Relations", "Partnerships"],
    isFounder: false
  },
      {
      id: 26,
      name: "Krishnaveni TS",
      role: "Human Resources Team",
      category: "management",
      image: "https://www.dropbox.com/scl/fi/7dw89h7i7ydhv53edc6wd/Screenshot-2025-09-04-204725.png?rlkey=xufd28vs4web5h9l9vp9sborb&st=ka84wy5n&raw=1",
      bio: "Assisting in human resources activities and team coordination.",
      skills: ["HR", "Recruitment"],
      isFounder: false
    },
    {
      id: 27,
      name: "Raksha Vindhya",
      role: "Human Resources Team",
      category: "management",
      image: "https://www.dropbox.com/scl/fi/rgz58g6ki22m4zp2cfbr3/Screenshot-2025-09-04-205606.png?rlkey=3j4fc1iwd6anwpj06cdnozgr0&st=igka5hzv&raw=1",
      bio: "Managing human resources and employee engagement.",
      skills: ["HR", "Employee Relations"],
      isFounder: false
    },
    {
      id: 28,
      name: "Ganavi",
      role: "Human Resources Team",
      category: "management",
      image: "https://www.dropbox.com/scl/fi/sz8dy6ergsdsdhv1wh8o0/Screenshot-2025-09-04-204951.png?rlkey=ykpncyknxu8lhiaw7vo4sqr1x&st=x4za19a8&raw=1",
      bio: "Assisting in human resources functions and support.",
      skills: ["HR", "Support"],
      isFounder: false
    },

];

  const categories = [
    { id: "all", name: "All Members", icon: "👥" },
    { id: "founders", name: "Founders", icon: "👑" },
    { id: "technical", name: "Technical", icon: "💻" },
    { id: "event_and_design", name: "Event & Design", icon: "🎨" },
    { id: "management", name: "Management", icon: "📊" },
  ];

  const filteredMembers = activeCategory === "all"
    ? teamMembers
    : teamMembers.filter(member =>
      Array.isArray(member.category)
        ? member.category.includes(activeCategory)
        : member.category === activeCategory
    );

  const founders = teamMembers.filter(member => member.isFounder);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 text-center bg-gradient-to-br from-background via-muted/40 to-background/80 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-lg bg-background/80 rounded-3xl shadow-2xl border border-primary/20 px-6 py-10 animate-fade-in">
            <h1 className="text-6xl font-bold text-electric mb-6 animate-slide-in-up">
              Our <span className="text-cyber">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in">
              Meet the team working on and behind the scenes at VITKULT.
              Passionately minds, Creative thinkers and Cultural trailblazers who
              turn dreams into reality!
            </p>
          </div>
        </div>
      </section>
      {/* Founders Section */}
      <section className="py-16 px-4 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-neon mb-12 animate-fade-in">
            🏆 Founding Members
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {founders.map((member, index) => (
              <Card
                key={member.id}
                className="card-hologram p-6 group perspective-1000 animate-slide-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="preserve-3d group-hover:rotate-y-12 transition-transform duration-700">
                  {/* Member Image */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-electric p-1 animate-bounce-in">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-bold animate-fade-in">
                      FOUNDER
                    </div>
                  </div>
                  {/* Member Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-1 animate-fade-in">{member.name}</h3>
                    <p className="text-primary font-semibold mb-2 animate-fade-in">{member.role}</p>
                  </div>
                  {/* Bio */}
                  <p className="text-sm text-muted-foreground text-center mb-4 leading-relaxed animate-fade-in">
                      {member.bio}
                    </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Team Categories Filter */}
      <section className="py-8 px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, i) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "gaming" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`transition-all duration-300 animate-bounce-in ${activeCategory === category.id ? 'shadow-electric' : ''}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>
      {/* Team Members Grid */}
      <section className="py-16 px-4 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member, index) => (
              <Card
                key={member.id}
                className="card-glow p-6 group hover:scale-105 transition-all duration-500 animate-slide-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Member Image */}
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-cyber p-1 animate-bounce-in">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {member.isFounder && (
                    <Award className="absolute -top-1 -right-1 h-6 w-6 text-accent animate-fade-in" />
                  )}
                </div>
                {/* Member Info */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-foreground mb-1 animate-fade-in">{member.name}</h3>
                  <p className="text-primary text-sm font-semibold mb-1 animate-fade-in">{member.role}</p>
                </div>
                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full animate-fade-in"
                        style={{ animationDelay: `${skillIndex * 50}ms` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
