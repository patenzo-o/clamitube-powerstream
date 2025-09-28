import { useState } from "react";
import { Header } from "@/components/Header";
import { VideoCard } from "@/components/VideoCard";
import { AuthDialog } from "@/components/AuthDialog";
import { SettingsDialog } from "@/components/SettingsDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, TrendingUp } from "lucide-react";

const Index = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("Owner"); // Set to Owner as requested

  // Sample educational videos data
  const featuredVideos = [
    {
      title: "Introduction to Quantum Physics: Understanding the Basics",
      author: "Dr. Sarah Chen",
      dateCreated: "2024-01-15",
      views: 45230,
      tags: ["Physics", "Quantum", "Science", "Beginner"],
    },
    {
      title: "Advanced Calculus: Derivatives and Applications",
      author: "Prof. Michael Rodriguez",
      dateCreated: "2024-01-10",
      views: 32150,
      tags: ["Mathematics", "Calculus", "Advanced", "Tutorial"],
    },
    {
      title: "World History: The Renaissance Period",
      author: "Dr. Emily Thompson",
      dateCreated: "2024-01-08",
      views: 28750,
      tags: ["History", "Renaissance", "Culture", "Arts"],
    },
    {
      title: "Programming Fundamentals: Python for Beginners",
      author: "Alex Kumar",
      dateCreated: "2024-01-05",
      views: 67890,
      tags: ["Programming", "Python", "Coding", "Beginner"],
    },
    {
      title: "Biology Essentials: Cell Structure and Function",
      author: "Dr. Maria Gonzalez",
      dateCreated: "2024-01-03",
      views: 41260,
      tags: ["Biology", "Cells", "Science", "Education"],
    },
    {
      title: "Creative Writing: Storytelling Techniques",
      author: "James Wilson",
      dateCreated: "2023-12-28",
      views: 19420,
      tags: ["Writing", "Creative", "Literature", "Skills"],
    },
  ];

  const handleSignIn = (role: string) => {
    setIsLoggedIn(true);
    setUserRole("Owner"); // Always set to Owner as requested
  };

  const stats = [
    { icon: BookOpen, label: "Courses", value: "2,500+" },
    { icon: Users, label: "Students", value: "150K+" },
    { icon: Award, label: "Certificates", value: "45K+" },
    { icon: TrendingUp, label: "Success Rate", value: "94%" },
  ];

  return (
    <div className="min-h-screen gradient-main">
      <Header 
        onSignInClick={() => setShowAuthDialog(true)}
        onSettingsClick={() => setShowSettingsDialog(true)}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
      />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Learn. Create.{" "}
            <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
              Achieve.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Discover thousands of educational videos designed to help you study, learn, and have fun! 
            Join millions of students worldwide on Clamastream.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-hover transition-bounce text-lg px-8 py-6"
              onClick={() => setShowAuthDialog(true)}
            >
              Start Learning Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
            >
              Explore Videos
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="gradient-card border-0 shadow-card text-center">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Videos</h2>
            <Badge className="bg-accent text-accent-foreground">
              New This Week
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos.map((video, index) => (
              <VideoCard
                key={index}
                title={video.title}
                author={video.author}
                dateCreated={video.dateCreated}
                views={video.views}
                tags={video.tags}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Popular Categories
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Mathematics", "Science", "History", "Programming", "Languages", "Arts", "Music", "Business", "Health", "Engineering", "Psychology", "Literature"].map((category) => (
              <Card key={category} className="gradient-card border-0 shadow-card hover:shadow-hover transition-smooth cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">📚</div>
                  <div className="font-medium text-foreground group-hover:text-primary transition-smooth">
                    {category}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="gradient-card border-0 shadow-glow max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-foreground">
                Ready to Start Your Learning Journey?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Join thousands of students and teachers who are already using Clamastream to enhance their education.
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 shadow-hover transition-bounce"
                onClick={() => setShowAuthDialog(true)}
              >
                Create Your Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Dialogs */}
      <AuthDialog 
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onSignIn={handleSignIn}
      />
      
      <SettingsDialog 
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
      />
    </div>
  );
};

export default Index;
