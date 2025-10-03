import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Award, Crown, Sparkles, Zap } from "lucide-react";

interface AwardType {
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  subsRequired: number;
}

interface ProfileAwardsProps {
  subscriberCount: number;
}

export function ProfileAwards({ subscriberCount }: ProfileAwardsProps) {
  const awards: AwardType[] = [
    {
      name: "Starter Award",
      description: "Created an account",
      icon: <Star className="h-6 w-6 text-amber-500" />,
      unlocked: true,
      subsRequired: 0,
    },
    {
      name: "Rising Star",
      description: "Reached 100 subscribers",
      icon: <Sparkles className="h-6 w-6 text-blue-500" />,
      unlocked: subscriberCount >= 100,
      subsRequired: 100,
    },
    {
      name: "Good Award",
      description: "Reached 1,000 subscribers",
      icon: <Trophy className="h-6 w-6 text-green-500" />,
      unlocked: subscriberCount >= 1000,
      subsRequired: 1000,
    },
    {
      name: "Best Award",
      description: "Reached 5,000 subscribers",
      icon: <Award className="h-6 w-6 text-purple-500" />,
      unlocked: subscriberCount >= 5000,
      subsRequired: 5000,
    },
    {
      name: "Nice Award",
      description: "Reached 10,000 subscribers",
      icon: <Zap className="h-6 w-6 text-orange-500" />,
      unlocked: subscriberCount >= 10000,
      subsRequired: 10000,
    },
    {
      name: "Awesome Award",
      description: "Reached 20,000 subscribers",
      icon: <Crown className="h-6 w-6 text-amber-600" />,
      unlocked: subscriberCount >= 20000,
      subsRequired: 20000,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Awards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {awards.map((award) => (
            <div
              key={award.name}
              className={`flex flex-col items-center p-4 rounded-lg border-2 ${
                award.unlocked
                  ? "border-primary bg-primary/5"
                  : "border-muted bg-muted/30 opacity-50"
              }`}
            >
              <div className="mb-2">{award.icon}</div>
              <h4 className="font-semibold text-sm text-center mb-1">
                {award.name}
              </h4>
              <p className="text-xs text-muted-foreground text-center">
                {award.description}
              </p>
              {!award.unlocked && award.subsRequired > 0 && (
                <Badge variant="outline" className="mt-2 text-xs">
                  {award.subsRequired.toLocaleString()} subs needed
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
