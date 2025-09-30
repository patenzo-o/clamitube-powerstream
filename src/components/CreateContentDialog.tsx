import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Plus, X, Sparkles } from "lucide-react";

interface CreateContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateContentDialog = ({ open, onOpenChange }: CreateContentDialogProps) => {
  const { profile } = useAuth();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState<"video" | "lesson" | "course">("video");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [aiPrompt, setAiPrompt] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt for AI generation.",
        variant: "destructive",
      });
      return;
    }

    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: { prompt: aiPrompt, contentType }
      });

      if (error) throw error;

      setDescription(data.content);
      toast({
        title: "Content generated!",
        description: "AI has generated content based on your prompt.",
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error",
        description: "Failed to generate content with AI.",
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  const createContent = async () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('content')
        .insert({
          creator_id: profile?.user_id,
          title: title.trim(),
          description: description.trim(),
          content_type: contentType,
          tags,
          year,
          ai_prompt: aiPrompt.trim(),
          is_published: false
        });

      if (error) throw error;

      toast({
        title: "Content created!",
        description: `Your ${contentType} has been created successfully.`,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setAiPrompt("");
      setTags([]);
      setNewTag("");
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating content:', error);
      toast({
        title: "Error",
        description: "Failed to create content.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Educational Content
            <Badge variant="outline" className="ml-2 capitalize">
              {profile?.role}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter content title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type</Label>
                <Select value={contentType} onValueChange={(value: any) => setContentType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="lesson">Lesson</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                min="2000"
                max="2030"
              />
            </div>
          </div>

          {/* AI Generation Section */}
          <div className="space-y-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg border">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <h3 className="font-medium">AI Content Generation</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="aiPrompt">Describe what you want to create</Label>
              <Textarea
                id="aiPrompt"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="E.g., Create a comprehensive lesson about photosynthesis for middle school students..."
                rows={3}
              />
            </div>
            
            <Button 
              onClick={generateWithAI} 
              disabled={aiLoading || !aiPrompt.trim()}
              className="w-full"
              variant="outline"
            >
              {aiLoading ? "Generating..." : "Generate with AI"}
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter content description or let AI generate it above"
              rows={6}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <Button onClick={addTag} variant="outline" size="sm">
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={createContent} disabled={loading} className="flex-1">
              {loading ? "Creating..." : "Create Content"}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};