import { Header } from "@/components/Header";
import { VideoCard } from "@/components/VideoCard";
import { SearchBar } from "@/components/SearchBar";
import { FiltersSection } from "@/components/FiltersSection";
import { LessonsSection } from "@/components/LessonsSection";
import { DateFinderDialog } from "@/components/DateFinderDialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { TrendingUp, Clock, Video } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showMore, setShowMore] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

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
      author: "Prof. Smith",
      dateCreated: "2024-01-15",
      views: 15230,
      tags: ["Mathematics", "Education", "Basics"],
      duration: "15:30",
      quality: "4K",
      isNew: true,
      likes: 456,
      dislikes: 12,
      isVerified: true,
      commentsCount: 89,
    },
    {
      title: "World History Overview",
      author: "History Channel",
      dateCreated: "2024-01-14",
      views: 22450,
      tags: ["History", "Education"],
      duration: "22:45",
      quality: "1080p",
      likes: 892,
      dislikes: 23,
      isVerified: true,
      hasYouTubeFeature: true,
      commentsCount: 145,
    },
    {
      title: "Science Fundamentals",
      author: "Science Daily",
      dateCreated: "2024-01-13",
      views: 18200,
      tags: ["Science", "Education", "Physics"],
      duration: "18:20",
      quality: "1080p",
      likes: 567,
      dislikes: 15,
      isMembersOnly: true,
      commentsCount: 67,
    },
    {
      title: "Sponsored: Learn with EduPro",
      author: "EduPro",
      dateCreated: "2024-01-12",
      views: 50000,
      tags: ["Sponsored", "Education"],
      duration: "5:00",
      quality: "720p",
      isSponsored: true,
      likes: 0,
      dislikes: 0,
      commentsCount: 0,
    },
    {
      title: "Language Arts Basics",
      author: "Teacher Jane",
      dateCreated: "2024-01-12",
      views: 20150,
      tags: ["Language", "Education", "Writing"],
      duration: "20:15",
      quality: "1080p",
      likes: 723,
      dislikes: 18,
      isVerified: true,
      commentsCount: 112,
    },
    {
      title: "Advanced Programming",
      author: "Code Master",
      dateCreated: "2024-01-11",
      views: 31000,
      tags: ["Programming", "Technology"],
      duration: "35:00",
      quality: "4K",
      isNew: true,
      likes: 1234,
      dislikes: 45,
      isVerified: true,
      commentsCount: 234,
    },
  ];

  const displayedVideos = showMore ? videoData : videoData.slice(0, 4);

  return (
    <div className="min-h-screen">
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

        <SearchBar onSearch={setSearchQuery} />

        <div className="flex items-center justify-center gap-4 mb-6">
          <DateFinderDialog onDateSelect={setSelectedDate} />
        </div>

        <LessonsSection onTopicSelect={setSelectedLesson} />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Recommended Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedVideos.map((video, index) => (
              <VideoCard key={index} {...video} videoId={index.toString()} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setShowMore(!showMore)}
              variant="outline"
              className="px-8"
            >
              {showMore ? "See Less" : "See More Videos"}
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Recent Videos (Unmatched)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videoData
              .filter((v) => v.isNew)
              .map((video, index) => (
                <VideoCard key={index} {...video} videoId={`recent-${index}`} />
              ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Video className="h-6 w-6" />
            Most Popular Channels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videoData
              .filter((v) => v.isVerified)
              .slice(0, 4)
              .map((video, index) => (
                <VideoCard key={index} {...video} videoId={`popular-${index}`} />
              ))}
          </div>
        </div>
      </main>

      <FiltersSection 
        onFilterChange={(type, value) => setFilters({...filters, [type]: value})} 
      />
    </div>
  );
};

export default Index;