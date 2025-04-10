import { Link } from "react-router-dom";
import { ArrowLeft, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Testimonials = () => {
  const featuredTestimonials = [
    {
      name: "Sarah Johnson",
      title: "Marketing Director, TechInnovate",
      image: "/avatars/sarah.jpg",
      content: "SocialScribe has transformed our LinkedIn content strategy. We've seen a 78% increase in engagement and have generated over 50 quality leads directly from our LinkedIn content in just three months.",
      rating: 5,
      featured: true,
    },
    {
      name: "David Chen",
      title: "Founder, GrowthHackers",
      image: "/avatars/david.jpg",
      content: "The AI-powered content suggestions are spot on. It's like having a content strategist and LinkedIn expert on my team. The time I save on content creation allows me to focus on building relationships with potential clients.",
      rating: 5,
      featured: true,
    },
    {
      name: "Emily Rodriguez",
      title: "Social Media Manager, FutureFirm",
      image: "/avatars/emily.jpg",
      content: "What impressed me most was how quickly I was able to establish a consistent posting schedule. The templates and AI suggestions make it easy to create engaging content even when I'm not feeling particularly creative.",
      rating: 5,
      featured: true,
    }
  ];

  const standardTestimonials = [
    {
      name: "Michael Barnes",
      title: "Independent Consultant",
      image: "/avatars/michael.jpg",
      content: "As a consultant, my personal brand is everything. SocialScribe has helped me position myself as a thought leader in my industry.",
      rating: 5,
    },
    {
      name: "Jennifer Lee",
      title: "VP of Sales, Enterprise Solutions",
      image: "/avatars/jennifer.jpg",
      content: "The analytics features help me understand what content resonates with my target audience. This data-driven approach has been key to our success.",
      rating: 4,
    },
    {
      name: "Robert Taylor",
      title: "CEO, StartupVision",
      image: "/avatars/robert.jpg",
      content: "We've tried other social media tools, but none of them understand LinkedIn like SocialScribe does. It's specifically designed for professionals.",
      rating: 5,
    },
    {
      name: "Sophia Martinez",
      title: "Career Coach",
      image: "/avatars/sophia.jpg",
      content: "I recommend SocialScribe to all my clients who want to boost their professional presence online. It's a game-changer.",
      rating: 5,
    },
    {
      name: "Daniel Washington",
      title: "Content Creator",
      image: "/avatars/daniel.jpg",
      content: "The content calendar and scheduling features have helped me maintain consistency, which is crucial for building an audience.",
      rating: 4,
    },
    {
      name: "Amanda Nguyen",
      title: "Recruiting Manager",
      image: "/avatars/amanda.jpg",
      content: "SocialScribe has helped our recruiting team establish stronger employer branding, resulting in higher quality applicants.",
      rating: 5,
    }
  ];

  const successStories = [
    {
      company: "TechInnovate",
      logo: "/logos/techinnovate.png",
      title: "How TechInnovate Increased Their LinkedIn Engagement by 78%",
      summary: "TechInnovate, a B2B SaaS company, was struggling to generate engagement on LinkedIn despite having a strong product and customer base. After implementing SocialScribe, they saw dramatic improvements in their content performance.",
      results: [
        "78% increase in overall engagement",
        "156% growth in comment activity",
        "50+ qualified leads generated directly from LinkedIn",
        "23% increase in profile visitors converting to website visits"
      ],
      quote: "SocialScribe didn't just help us post more consistently—it completely transformed how we think about our LinkedIn strategy. The AI suggestions helped us craft messages that truly resonated with our audience."
    },
    {
      company: "GrowthHackers",
      logo: "/logos/growthhackers.png",
      title: "GrowthHackers Saves 15+ Hours Per Week on Content Creation",
      summary: "David Chen, founder of GrowthHackers consulting, was spending too much time creating LinkedIn content manually, taking away from his client work. SocialScribe helped him automate the process while maintaining quality.",
      results: [
        "15+ hours saved weekly on content creation",
        "Consistent posting schedule (5x per week)",
        "42% increase in connection request acceptance rate",
        "68% increase in inbound client inquiries"
      ],
      quote: "The ROI has been incredible. Not only am I saving time, but the quality of my content has actually improved. The AI suggests topics and approaches I might not have considered."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur-md z-10 sticky top-0 shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="mr-8">
              <Logo animated />
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
              Customer Success Stories
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              See how professionals and businesses are transforming their LinkedIn presence with SocialScribe.
            </p>
          </div>

          {/* Featured testimonials */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {featuredTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-background rounded-xl border-2 border-primary/20 p-6 shadow-lg relative">
                <div className="absolute -top-5 right-5 bg-background border-2 border-green p-2 rounded-full">
                  <Quote className="h-6 w-6 text-green" />
                </div>
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </div>
            ))}
          </div>

          {/* Success stories */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-10 relative inline-block mx-auto w-full">
              <span className="relative">
                Detailed Success Stories
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              </span>
            </h2>

            <div className="space-y-16">
              {successStories.map((story, index) => (
                <div key={index} className="bg-background rounded-xl border border-border p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-bold mb-4">{story.title}</h3>
                      <p className="text-muted-foreground mb-6">{story.summary}</p>
                      
                      <h4 className="font-semibold mb-3 text-primary">Key Results:</h4>
                      <ul className="space-y-2 mb-6">
                        {story.results.map((result, i) => (
                          <li key={i} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-secondary mr-2" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <blockquote className="border-l-4 border-green pl-4 italic">
                        "{story.quote}"
                      </blockquote>
                    </div>
                    <div className="md:w-1/3 flex justify-center items-center">
                      <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center p-4">
                        <div className="text-xl font-bold text-primary">{story.company} Logo</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* More testimonials */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-10 relative inline-block mx-auto w-full">
              <span className="relative">
                More From Our Users
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              </span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {standardTestimonials.map((testimonial, index) => (
                <div key={index} className="bg-background rounded-lg border border-border p-4">
                  <div className="flex items-center mb-3">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-sm">{testimonial.name}</h3>
                      <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to transform your LinkedIn presence?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join hundreds of professionals already using SocialScribe to grow their personal brand and business on LinkedIn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing">
                <Button className="bg-primary hover:bg-primary/90 text-white min-w-[150px]">
                  View Pricing
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="min-w-[150px]">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 bg-background">
        <div className="container max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SocialScribe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Testimonials; 