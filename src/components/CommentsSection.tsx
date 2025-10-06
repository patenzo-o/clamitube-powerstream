import { useState } from "react";
import { ThumbsUp, ThumbsDown, Trash2, Edit2, User as UserIcon, Heart, Star, Paperclip, Image as ImageIcon, Film, Hash, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  loves: number;
  isLoved: boolean;
  rating: number;
  isEdited?: boolean;
  isOwner?: boolean;
  isCreatorActive?: boolean;
}

interface CommentsSectionProps {
  videoId: string;
  commentsEnabled?: boolean;
}

export function CommentsSection({ videoId, commentsEnabled = true }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "John Doe",
      content: "Great educational content! Really helpful.",
      date: "2024-01-15",
      likes: 12,
      dislikes: 1,
      loves: 5,
      isLoved: false,
      rating: 0,
      isOwner: true,
      isCreatorActive: true,
    },
    {
      id: "2",
      author: "Jane Smith",
      content: "Thanks for sharing this!",
      date: "2024-01-14",
      likes: 8,
      dislikes: 0,
      loves: 3,
      isLoved: false,
      rating: 0,
      isEdited: true,
      isCreatorActive: false,
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [filterCreator, setFilterCreator] = useState<'all' | 'active' | 'inactive'>('all');

  if (!commentsEnabled) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        Comments are turned off for this video.
      </div>
    );
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "Current User",
        content: newComment,
        date: new Date().toISOString().split("T")[0],
        likes: 0,
        dislikes: 0,
        loves: 0,
        isLoved: false,
        rating: 0,
        isOwner: true,
        isCreatorActive: true,
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

  const handleLove = (commentId: string) => {
    setComments(
      comments.map((c) =>
        c.id === commentId 
          ? { ...c, loves: c.isLoved ? c.loves - 1 : c.loves + 1, isLoved: !c.isLoved }
          : c
      )
    );
  };

  const handleRateComment = (commentId: string, rating: number) => {
    setComments(
      comments.map((c) =>
        c.id === commentId ? { ...c, rating } : c
      )
    );
    toast.success(`Rated ${rating} stars`);
  };

  const handleAttachment = (type: string) => {
    toast.success(`${type} attachment added`);
  };

  const sortedComments = [...comments].sort((a, b) => 
    sortBy === 'newest' ? Number(b.id) - Number(a.id) : Number(a.id) - Number(b.id)
  );

  const filteredComments = sortedComments.filter(c => {
    if (filterCreator === 'all') return true;
    if (filterCreator === 'active') return c.isCreatorActive;
    return !c.isCreatorActive;
  });

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCreator} onValueChange={(v: any) => setFilterCreator(v)}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Creators</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px]"
        />
        <div className="flex gap-2 flex-wrap">
          <Button type="button" size="sm" variant="outline" onClick={() => toast.info('Symbol picker opened')}>
            fx Symbols
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => handleAttachment('File')}>
            <Paperclip className="h-4 w-4 mr-1" /> File
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => handleAttachment('Image')}>
            <ImageIcon className="h-4 w-4 mr-1" /> Image
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => handleAttachment('Learnflix Video')}>
            <Film className="h-4 w-4 mr-1" /> Learnflix Video
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => handleAttachment('Claminges')}>
            <ImageIcon className="h-4 w-4 mr-1" /> Claminges
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => handleAttachment('Topic')}>
            <Hash className="h-4 w-4 mr-1" /> Topic
          </Button>
        </div>
        <Button onClick={handleAddComment}>Post Comment</Button>
      </div>

      <div className="space-y-3">
        {filteredComments.map((comment) => (
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
                  <div className="flex items-center gap-4 flex-wrap">
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
                    <div className="h-4 w-px bg-border" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLove(comment.id)}
                      className={`flex items-center gap-1 ${comment.isLoved ? 'text-red-500' : ''}`}
                    >
                      <Heart className={`h-3 w-3 ${comment.isLoved ? 'fill-current' : ''}`} />
                      <span className="text-xs">{comment.loves}</span>
                    </Button>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 cursor-pointer ${star <= comment.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          onClick={() => handleRateComment(comment.id, star)}
                        />
                      ))}
                    </div>
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