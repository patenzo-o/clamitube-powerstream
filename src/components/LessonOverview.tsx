import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, MessageSquare, Video } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  publishedDate: string;
}

interface LessonOverviewProps {
  subjectName: string;
  grade: string;
  lessons: Lesson[];
}

export function LessonOverview({ subjectName, grade, lessons }: LessonOverviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{subjectName}</span>
            <Badge variant="secondary">Grade: {grade}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Lessons Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Lessons
            </h3>
            <div className="space-y-2">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                  <span className="font-medium">{lesson.title}</span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {lesson.publishedDate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Assessments Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Assessments</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Students must answer quizzes and other assessments. Text submission feature available with formatting options: bold, italic, underline.
            </p>
            <Button variant="outline" size="sm">View Assessments</Button>
          </div>

          {/* Meetings Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Video className="h-5 w-5" />
              Meetings
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Daily videos that users need to watch. Teachers, admins, and owners can group certain videos with lessons.
            </p>
            <Button variant="outline" size="sm">View Meetings</Button>
          </div>

          {/* Discussions Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Discussions
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Paragraphs that users can join or report. Teachers, admins, and owners can write discussions and post them.
            </p>
            <Button variant="outline" size="sm">View Discussions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
