import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function MissionCard() {
  return (
    <Card className="border-zinc-800 bg-zinc-900 lg:col-span-2">
      <CardContent className="flex flex-col items-center text-center p-10">
        <div className="mb-6 flex items-center gap-4">
          <Badge>DAY 01</Badge>

          <span className="text-sm text-zinc-400">
            Beginner → Conversational
          </span>
        </div>

        <h2 className="mb-3 text-4xl font-bold text-white">
          Your Mission Today
        </h2>

        <p className="mb-8 max-w-2xl text-zinc-400">
          Focus on speaking first. No grammar overload. Listen, repeat, answer
          and build automatic speech patterns.
        </p>

        <div className="mb-3 flex w-full max-w-xl justify-between text-sm text-zinc-300">
          <span>Daily Progress</span>
          <span>0%</span>
        </div>

        <div className="w-full max-w-xl">
          <Progress value={0} className="mb-8" />
        </div>

        <Button size="lg" className="h-12 px-8">
          Start Mission →
        </Button>
      </CardContent>
    </Card>
  );
}
