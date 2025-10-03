import { Header } from "@/components/Header";
import { LessonOverview } from "@/components/LessonOverview";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Lessons() {
  const navigate = useNavigate();

  // Mock data - in real app this would come from database/API
  const lessons = [
    { id: "1", title: "Lesson 1 - Introduction", publishedDate: "2023-01-01" },
    { id: "2", title: "Lesson 2 - Advanced Concepts", publishedDate: "2023-01-15" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <LessonOverview
            subjectName="Mathematics"
            grade="A"
            lessons={lessons}
          />
        </div>
      </main>
    </div>
  );
}
