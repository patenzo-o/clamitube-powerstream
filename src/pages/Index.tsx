import { Header } from "@/components/Header";
import { VideoCard } from "@/components/VideoCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  const videoData = [
    {
      title: "Introduction to Mathematics",
      description: "Basic mathematical concepts and foundations",
      thumbnail: "/placeholder.svg",
      duration: "15:30",
      category: "Mathematics",
      date: "2024-01-15"
    },
    {
      title: "World History Overview",
      description: "A comprehensive look at world history",
      thumbnail: "/placeholder.svg",
      duration: "22:45",
      category: "History",
      date: "2024-01-14"
    },
    {
      title: "Science Fundamentals",
      description: "Core principles of scientific study",
      thumbnail: "/placeholder.svg",
      duration: "18:20",
      category: "Science",
      date: "2024-01-13"
    },
    {
      title: "Language Arts Basics",
      description: "Essential language and writing skills",
      thumbnail: "/placeholder.svg",
      duration: "20:15",
      category: "Language",
      date: "2024-01-12"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to Clamastream
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover educational videos designed to help you learn and grow. 
            From mathematics to science, we have content for every learner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videoData.map((video, index) => (
            <VideoCard
              key={index}
              title={video.title}
              author="Educational Content"
              dateCreated={video.date}
              views={1000 + index * 500}
              tags={[video.category]}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;