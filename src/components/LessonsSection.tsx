import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const lessonTopics = [
  "T.L.E",
  "Science",
  "Aralin Panlipunan",
  "Language",
  "Math",
  "Filipino",
  "Reading",
  "GMRC",
  "Penmanship",
  "Conduct",
  "Programming",
  "Livestreaming",
];

interface LessonsSectionProps {
  onTopicSelect: (topic: string) => void;
}

export function LessonsSection({ onTopicSelect }: LessonsSectionProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Book className="h-6 w-6" />
          Lessons
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {lessonTopics.map((topic) => (
            <Button
              key={topic}
              variant="outline"
              onClick={() => onTopicSelect(topic)}
              className="h-auto py-4 flex flex-col items-center gap-2"
            >
              <Book className="h-5 w-5" />
              <span className="text-sm font-medium">{topic}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
