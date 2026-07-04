"use client";

import { Button } from "@/components/ui/button";
import { type DayProgress } from "@/lib/day-progress";

interface DaySummaryProps {
  progress: DayProgress;
  onNextDay: () => void;
}

export function DaySummary({ progress, onNextDay }: DaySummaryProps) {
  const startMs = progress.startedAt ? new Date(progress.startedAt).getTime() : 0;
  const endMs = new Date(progress.completedAt || progress.startedAt).getTime();
  const minutes = Math.round((endMs - startMs) / 60000);

  return (
    <div className="flex flex-col items-center text-center gap-4 py-8">
      <div className="text-6xl">🎉</div>
      <h2 className="text-3xl font-bold text-zinc-50">День {progress.day} пройден!</h2>

      <div className="flex flex-col gap-2 text-sm">
        {progress.missionCompleted && <div className="text-zinc-200">✅ Фразы дня</div>}
        {progress.completedTenses.includes("presente") && (
          <div className="text-zinc-200">✅ Presente</div>
        )}
        {progress.completedTenses.includes("passato") && (
          <div className="text-zinc-200">✅ Passato</div>
        )}
        {progress.completedTenses.includes("imperfetto") && (
          <div className="text-zinc-200">✅ Imperfetto</div>
        )}
        {progress.completedTenses.includes("futuro") && (
          <div className="text-zinc-200">✅ Futuro</div>
        )}
        {progress.dialogCompleted && <div className="text-zinc-200">✅ Диалог дня</div>}
      </div>

      <p className="text-zinc-400 text-sm">Время сессии: {minutes} минут</p>

      <Button
        className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
        onClick={onNextDay}
      >
        Завтра — День {progress.day + 1} →
      </Button>
    </div>
  );
}
