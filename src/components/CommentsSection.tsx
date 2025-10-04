import { useState } from "react";
import { ThumbsUp, ThumbsDown, Trash2, Edit2, User as UserIcon, MessageCircle, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  isEdited?: boolean;
  isOwner?: boolean;
}

interface CommentsSectionProps {
  videoId: string;
}

export function CommentsSection({ videoId }: CommentsSectionProps) {
  const [showGeminiTopics, setShowGeminiTopics] = useState(false);
  const [showFirestorm, setShowFirestorm] = useState(false);
  const geminiTopics = ["Key Concepts", "Important Dates", "Main Ideas", "Review Points"];
  
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "John Doe",
      content: "Great educational content! Really helpful.",
      date: "2024-01-15",
      likes: 12,
      dislikes: 1,
      isOwner: true,
    },
    {
      id: "2",
      author: "Jane Smith",
      content: "Thanks for sharing this!",
      date: "2024-01-14",
      likes: 8,
      dislikes: 0,
      isEdited: true,
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "Current User",
        content: newComment,
        date: new Date().toISOString().split("T")[0],
        likes: 0,
        dislikes: 0,
        isOwner: true,
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleEdit = (commentId: string) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment) {
      setEditingId(commentId);
      setEditContent(comment.content);
    }
  };

  const handleSaveEdit = (commentId: string) => {
    setComments(
      comments.map((c) =>
        c.id === commentId
          ? { ...c, content: editContent, isEdited: true }
          : c
      )
    );
    setEditingId(null);
    setEditContent("");
  };

  const handleDelete = (commentId: string) => {
    setComments(comments.filter((c) => c.id !== commentId));
  };

  const handleLike = (commentId: string) => {
    setComments(
      comments.map((c) =>
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  const handleDislike = (commentId: string) => {
    setComments(
      comments.map((c) =>
        c.id === commentId ? { ...c, dislikes: c.dislikes + 1 } : c
      )
    );
  };

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>

      <div className="flex gap-2">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px]"
        />
        <Button onClick={handleAddComment}>Post</Button>
      </div>

      <div className="space-y-3">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  <span className="font-medium text-sm">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {comment.date}
                  </span>
                  {comment.isEdited && (
                    <Badge variant="outline" className="text-xs">
                      Edited
                    </Badge>
                  )}
                </div>
                {comment.isOwner && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleEdit(comment.id)}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleDelete(comment.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>

              {editingId === comment.id ? (
                <div className="space-y-2">
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSaveEdit(comment.id)}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm mb-2">{comment.content}</p>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center gap-1"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span className="text-xs">{comment.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDislike(comment.id)}
                      className="flex items-center gap-1"
                    >
                      <ThumbsDown className="h-3 w-3" />
                      <span className="text-xs">{comment.dislikes}</span>
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
