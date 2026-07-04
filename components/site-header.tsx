"use client";

import { Badge } from "@/components/ui/badge";
import { useDayProgress } from "@/hooks/useDayProgress";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { progress } = useDayProgress();

  const completedSteps =
    (progress.missionCompleted ? 1 : 0) +
    progress.completedTenses.length +
    (progress.dialogCompleted ? 1 : 0);
  const dayPercent = Math.round((completedSteps / 6) * 100);

  return (
    <div className="mb-3 flex items-center justify-between border-b border-zinc-800 pb-2">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold tracking-tight text-zinc-50">IntegrationAI</h1>
        <span className="text-xs text-zinc-500">Speak First Method</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-zinc-400 font-medium">День {progress.day}</span>
        <span className="mx-3 text-zinc-700">·</span>
        <span
          className={cn(
            "text-sm font-medium",
            dayPercent === 0
              ? "text-zinc-500"
              : dayPercent === 100
                ? "text-emerald-400"
                : "text-amber-400",
          )}
        >
          🔥 {dayPercent}%
        </span>
        <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
          🇮🇹 Italian
        </Badge>
      </div>
    </div>
  );
}
