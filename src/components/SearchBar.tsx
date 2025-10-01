import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, X, Search } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [topResults, setTopResults] = useState<string[]>([
    "Introduction to Mathematics",
    "World History Overview",
    "Science Fundamentals",
    "Language Arts Basics"
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        onSearch(query);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };
      
      recognition.start();
    }
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          type="text"
          placeholder="Search educational videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-24 h-12 text-base"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="h-8 w-8"
            >
              <X size={18} />
            </Button>
          )}
          <Button
            variant={isListening ? "default" : "ghost"}
            size="icon"
            onClick={startVoiceSearch}
            className="h-8 w-8"
          >
            <Mic size={18} />
          </Button>
        </div>
      </div>
      
      {query && (
        <Card className="mt-2 p-4">
          <h4 className="text-sm font-semibold mb-2">Top Search Results</h4>
          <div className="space-y-2">
            {topResults
              .filter(result => result.toLowerCase().includes(query.toLowerCase()))
              .map((result, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(result)}
                  className="block w-full text-left text-sm hover:bg-accent p-2 rounded transition-colors"
                >
                  {result}
                </button>
              ))}
          </div>
        </Card>
      )}
    </div>
  );
};
