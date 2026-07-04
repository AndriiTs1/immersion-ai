"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MissionRunner } from "@/components/mission-runner";
import { cn } from "@/lib/utils";
import { useDayProgress } from "@/hooks/useDayProgress";
import { italianPack } from "@/lib/phrases";

export function MissionCard({
  className,
  onComplete,
}: {
  className?: string;
  onComplete?: () => void;
}) {
  const { progress, completeMission } = useDayProgress();
  const [showTransition, setShowTransition] = useState(false);

  const filtered = italianPack.phrases.filter((p) =>
    p.tags.includes(`stage-${progress.day}`),
  );
  const phrases =
    filtered.length > 0
      ? filtered
      : italianPack.phrases.filter((p) => p.tags.includes("stage-1"));

  return (
    <Card
      className={cn(
        "border border-zinc-700 border-t-2 border-t-amber-400 bg-zinc-900 shadow-xl shadow-black/40",
        className,
      )}
    >
      <CardContent className="flex flex-col p-6 h-full">
        <div className="shrink-0 flex justify-center items-center gap-4 mb-6">
          <Badge className="bg-zinc-800 text-zinc-300">
            DAY {String(progress.day).padStart(2, "0")}
          </Badge>
          <span className="text-sm text-zinc-400">Beginner → Conversational</span>
        </div>

        <div className="flex-1 min-h-0 w-full">
          {showTransition ? (
            <div className="flex flex-col items-center text-center gap-4 h-full justify-center">
              <div className="text-5xl">🧠</div>
              <h3 className="text-xl font-bold text-zinc-50">Фразы дня пройдены!</h3>
              <div className="flex flex-wrap justify-center gap-2 text-sm text-zinc-400">
                <span>✅ Фразы</span>
                <span>⬜ Presente</span>
                <span>⬜ Passato</span>
                <span>⬜ Imperfetto</span>
                <span>⬜ Futuro</span>
              </div>
              <Button
                className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
                onClick={onComplete}
              >
                Перейти к грамматике →
              </Button>
            </div>
          ) : (
            <MissionRunner
              phrases={phrases}
              onComplete={() => {
                completeMission();
                setShowTransition(true);
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
