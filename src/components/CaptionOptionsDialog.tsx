import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Smile, 
  Calculator, 
  Languages, 
  Globe, 
  Type,
  X
} from "lucide-react";
import { useState } from "react";

interface CaptionOptionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const symbolCategories = {
  emojis: ["😀", "😂", "❤️", "👍", "🎓", "📚", "✨", "🔥", "💡", "🌟"],
  math: ["∑", "∫", "√", "π", "∞", "≈", "≠", "≤", "≥", "±"],
  accented: ["á", "é", "í", "ó", "ú", "ñ", "ü", "à", "è", "ì"],
  language: ["中", "日", "한", "ア", "א", "ا", "थ", "ก", "ბ", "α"],
  chinese: ["你", "好", "学", "习", "教", "育", "视", "频", "课", "程"]
};

export function CaptionOptionsDialog({ open, onOpenChange }: CaptionOptionsDialogProps) {
  const [hiddenCategories, setHiddenCategories] = useState<Set<string>>(new Set());
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [hideInappropriate, setHideInappropriate] = useState(false);

  const toggleCategory = (category: string) => {
    const newHidden = new Set(hiddenCategories);
    if (newHidden.has(category)) {
      newHidden.delete(category);
    } else {
      newHidden.add(category);
    }
    setHiddenCategories(newHidden);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Caption Options</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {/* Toggle All Captions */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">Toggle Captions</span>
              <Button
                variant={captionsEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setCaptionsEnabled(!captionsEnabled)}
              >
                {captionsEnabled ? "ON" : "OFF"}
              </Button>
            </div>

            {/* Hide Inappropriate */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">Hide Inappropriate Captions</span>
              <Button
                variant={hideInappropriate ? "default" : "outline"}
                size="sm"
                onClick={() => setHideInappropriate(!hideInappropriate)}
              >
                {hideInappropriate ? "ON" : "OFF"}
              </Button>
            </div>

            <Separator />

            {/* Category Filters */}
            <div className="space-y-3">
              <h3 className="font-semibold">Filter Caption Types</h3>

              {/* Emojis & Symbols */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-gray-500 text-black hover:bg-gray-600 w-12"
                    onClick={() => toggleCategory('emojis')}
                  >
                    fx
                  </Button>
                  <div className="flex items-center gap-1">
                    <Smile className="h-4 w-4" />
                    <span className="text-sm">Emojis & Symbols</span>
                  </div>
                </div>
                <Badge variant={hiddenCategories.has('emojis') ? "destructive" : "secondary"}>
                  {hiddenCategories.has('emojis') ? "Hidden" : "Visible"}
                </Badge>
              </div>

              {/* Mathematical Symbols */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-red-500 text-black hover:bg-red-600 w-12"
                    onClick={() => toggleCategory('math')}
                  >
                    fn
                  </Button>
                  <div className="flex items-center gap-1">
                    <Calculator className="h-4 w-4" />
                    <span className="text-sm">Mathematical Symbols</span>
                  </div>
                </div>
                <Badge variant={hiddenCategories.has('math') ? "destructive" : "secondary"}>
                  {hiddenCategories.has('math') ? "Hidden" : "Visible"}
                </Badge>
              </div>

              {/* Accented Symbols */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-green-500 text-black hover:bg-green-600 w-12"
                    onClick={() => toggleCategory('accented')}
                  >
                    fq
                  </Button>
                  <div className="flex items-center gap-1">
                    <Type className="h-4 w-4" />
                    <span className="text-sm">Accented Symbols</span>
                  </div>
                </div>
                <Badge variant={hiddenCategories.has('accented') ? "destructive" : "secondary"}>
                  {hiddenCategories.has('accented') ? "Hidden" : "Visible"}
                </Badge>
              </div>

              {/* Language Symbols */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-blue-500 text-black hover:bg-blue-600 w-12"
                    onClick={() => toggleCategory('language')}
                  >
                    fp
                  </Button>
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">Language Symbols</span>
                  </div>
                </div>
                <Badge variant={hiddenCategories.has('language') ? "destructive" : "secondary"}>
                  {hiddenCategories.has('language') ? "Hidden" : "Visible"}
                </Badge>
              </div>

              {/* Chinese Symbols */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-yellow-500 text-black hover:bg-yellow-600 w-12"
                    onClick={() => toggleCategory('chinese')}
                  >
                    fl
                  </Button>
                  <div className="flex items-center gap-1">
                    <Languages className="h-4 w-4" />
                    <span className="text-sm">Chinese Symbols</span>
                  </div>
                </div>
                <Badge variant={hiddenCategories.has('chinese') ? "destructive" : "secondary"}>
                  {hiddenCategories.has('chinese') ? "Hidden" : "Visible"}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Report Captions
              </Button>
              <Button variant="outline" className="w-full">
                Save Captions
              </Button>
              <Button variant="outline" className="w-full">
                Save to Caption Playlist
              </Button>
              <Button variant="outline" className="w-full">
                See Caption Playlists
              </Button>
              <Button variant="outline" className="w-full">
                Find Word in Captions
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
