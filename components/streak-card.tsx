import { Card, CardContent } from "@/components/ui/card";

export function StreakCard() {
  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardContent className="flex flex-col items-center text-center p-8">
        <div className="mb-6 text-6xl">🔥</div>

        <h3 className="text-2xl font-bold text-white">Streak</h3>

        <p className="mt-2 text-zinc-400">
          Keep your daily immersion streak alive.
        </p>

        <div className="mt-8 text-6xl font-bold text-white">0</div>

        <div className="text-zinc-500">days</div>
      </CardContent>
    </Card>
  );
}
