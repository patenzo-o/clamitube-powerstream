import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Globe, MapPin, Navigation, Smile, Clock, Bookmark, Flag, Sparkles } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface AdvancedSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch?: (params: any) => void;
}

export function AdvancedSearchDialog({ open, onOpenChange, onSearch }: AdvancedSearchDialogProps) {
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState("");
  const [northCoord, setNorthCoord] = useState("");
  const [southCoord, setSouthCoord] = useState("");
  const [eastCoord, setEastCoord] = useState("");
  const [westCoord, setWestCoord] = useState("");
  const [savedSearches, setSavedSearches] = useState<string[]>([
    "Science tutorials",
    "Math basics",
    "History lessons"
  ]);
  const [recentSearches] = useState<string[]>([
    "Introduction to Physics",
    "World War 2 History",
    "Algebra fundamentals"
  ]);

  const handleLocationSearch = () => {
    onSearch?.({ location, northCoord, southCoord, eastCoord, westCoord });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Advanced Search
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Searcher */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Image Search
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Upload an image to find matching videos
            </p>
            <Input type="file" accept="image/*" />
          </Card>

          {/* Location Searcher */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location Search
            </h3>
            
            <div className="space-y-3">
              <div>
                <Label>Country, State, or Province</Label>
                <Input
                  placeholder="Enter location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>North Coordinates</Label>
                  <Input
                    placeholder="N:"
                    value={northCoord}
                    onChange={(e) => setNorthCoord(e.target.value)}
                  />
                </div>
                <div>
                  <Label>South Coordinates</Label>
                  <Input
                    placeholder="S:"
                    value={southCoord}
                    onChange={(e) => setSouthCoord(e.target.value)}
                  />
                </div>
                <div>
                  <Label>East Coordinates</Label>
                  <Input
                    placeholder="E:"
                    value={eastCoord}
                    onChange={(e) => setEastCoord(e.target.value)}
                  />
                </div>
                <div>
                  <Label>West Coordinates</Label>
                  <Input
                    placeholder="W:"
                    value={westCoord}
                    onChange={(e) => setWestCoord(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={handleLocationSearch} className="w-full">
                <Navigation className="h-4 w-4 mr-2" />
                Search by Location
              </Button>
            </div>
          </Card>

          {/* Date Finder */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Date Finder
            </h3>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            {date && (
              <p className="text-sm text-center mt-2">
                Selected: {date.toLocaleDateString()}
              </p>
            )}
          </Card>

          {/* Saved Searches */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Bookmark className="h-5 w-5" />
              Saved Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {savedSearches.map((search, index) => (
                <Badge key={index} variant="secondary">
                  {search}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Recent Searches */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Searches
            </h3>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => onSearch?.({ query: search })}
                >
                  {search}
                </Button>
              ))}
            </div>
          </Card>

          {/* Search Actions */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Flag className="h-4 w-4 mr-2" />
              Report Search
            </Button>
            <Button variant="outline" className="flex-1">
              <Smile className="h-4 w-4 mr-2" />
              Add Symbols (fx)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
