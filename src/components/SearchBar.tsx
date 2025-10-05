import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Mic, 
  X, 
  Search, 
  TrendingUp, 
  Clock, 
  Bookmark, 
  Flag, 
  Lightbulb,
  Smile,
  Calculator,
  Type,
  Globe,
  Languages
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const trendingSearches = ["Calculus Basics", "World War 2", "Python Programming", "Chemistry 101"];
const symbolCategories = {
  emojis: ["😀", "📚", "🎓", "✨", "💡", "🔥", "⭐", "❤️", "👍", "🌟"],
  math: ["∑", "∫", "√", "π", "∞", "≈", "≠", "≤", "≥", "±"],
  accented: ["á", "é", "í", "ó", "ú", "ñ", "ü", "à", "è", "ì"],
  language: ["中", "日", "한", "ア", "א", "ا", "थ", "ก", "ბ", "α"],
  chinese: ["你", "好", "学", "习", "教", "育", "视", "频", "课", "程"]
};

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(["Math basics", "Science tutorials"]);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [topResults] = useState<string[]>([
    "Introduction to Mathematics",
    "World History Overview",
    "Science Fundamentals",
    "Language Arts Basics"
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        onSearch(query);
        if (!recentSearches.includes(query)) {
          setRecentSearches([query, ...recentSearches].slice(0, 10));
        }
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

  const addSymbol = (symbol: string) => {
    setQuery(prev => prev + symbol);
  };

  const handleSaveSearch = () => {
    if (query.trim() && !savedSearches.includes(query)) {
      setSavedSearches([...savedSearches, query]);
      toast.success("Search saved!");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          type="text"
          placeholder="Search educational videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-64 h-12 text-base"
        />
        
        {/* Hover Symbol Buttons */}
        {isHovered && (
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 flex gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 bg-gray-500 hover:bg-gray-600">
                  <span className="text-black italic text-xs font-bold">fx</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Smile className="h-4 w-4" />
                    Emojis
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {symbolCategories.emojis.map((s) => (
                      <Button key={s} size="sm" variant="outline" onClick={() => addSymbol(s)}>{s}</Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 bg-red-500 hover:bg-red-600">
                  <span className="text-black italic text-xs font-bold">fn</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Math
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {symbolCategories.math.map((s) => (
                      <Button key={s} size="sm" variant="outline" onClick={() => addSymbol(s)}>{s}</Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 bg-green-500 hover:bg-green-600">
                  <span className="text-black italic text-xs font-bold">fq</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Accented
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {symbolCategories.accented.map((s) => (
                      <Button key={s} size="sm" variant="outline" onClick={() => addSymbol(s)}>{s}</Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 bg-blue-500 hover:bg-blue-600">
                  <span className="text-black italic text-xs font-bold">fp</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Language
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {symbolCategories.language.map((s) => (
                      <Button key={s} size="sm" variant="outline" onClick={() => addSymbol(s)}>{s}</Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 bg-yellow-500 hover:bg-yellow-600">
                  <span className="text-black italic text-xs font-bold">fl</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Chinese
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {symbolCategories.chinese.map((s) => (
                      <Button key={s} size="sm" variant="outline" onClick={() => addSymbol(s)}>{s}</Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
        
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

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <Button size="sm" variant="outline" onClick={handleSaveSearch}>
          <Bookmark className="h-3 w-3 mr-1" />
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={() => toast.info("Search reported")}>
          <Flag className="h-3 w-3 mr-1" />
          Report
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <h4 className="font-semibold">Trending Searches</h4>
              {trendingSearches.map((search, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setQuery(search)}
                >
                  {search}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              Recent
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <h4 className="font-semibold">Recent Searches</h4>
              {recentSearches.map((search, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setQuery(search)}
                >
                  {search}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline">
              <Lightbulb className="h-3 w-3 mr-1" />
              Suggestions
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <h4 className="font-semibold">Recommendations</h4>
              <p className="text-sm text-muted-foreground">
                Try Math, Science, or History
              </p>
            </div>
          </PopoverContent>
        </Popover>
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
