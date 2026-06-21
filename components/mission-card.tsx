import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MissionRunner } from "@/components/mission-runner";

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

        <MissionRunner />
      </CardContent>
    </Card>
  );
}
