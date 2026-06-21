import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MissionRunner } from "@/components/mission-runner";

export function MissionCard() {
  return (
    <Card className="border border-zinc-700 border-t-2 border-t-amber-400 bg-zinc-900 shadow-xl shadow-black/40 lg:col-span-2">
      <CardContent className="flex flex-col items-center text-center p-10">
        <div className="mb-6 flex items-center gap-4">
          <Badge className="bg-zinc-800 text-zinc-300">DAY 01</Badge>
          <span className="text-sm text-zinc-400">
            Beginner → Conversational
          </span>
        </div>

        <MissionRunner />
      </CardContent>
    </Card>
  );
}
