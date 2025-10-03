import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bold, Italic, Underline, Plus } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export function AssessmentEditor() {
  const [content, setContent] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessment Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 mb-2">
          <Toggle pressed={isBold} onPressedChange={setIsBold}>
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle pressed={isItalic} onPressedChange={setIsItalic}>
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle pressed={isUnderline} onPressedChange={setIsUnderline}>
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
        
        <Textarea
          placeholder="Type your answer here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`min-h-[150px] ${isBold ? 'font-bold' : ''} ${isItalic ? 'italic' : ''} ${isUnderline ? 'underline' : ''}`}
        />
        
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Question
          </Button>
          <Button variant="outline">Add Paragraph</Button>
        </div>
      </CardContent>
    </Card>
  );
}
