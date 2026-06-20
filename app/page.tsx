import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl p-6 md:p-10">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">IntegrationAI</h1>
            <p className="mt-1 text-zinc-400">
              ImmersionAI • Language Acceleration System
            </p>
          </div>

          <Badge variant="secondary">🇮🇹 Italian</Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-zinc-800 bg-zinc-900 lg:col-span-2">
            <CardContent className="flex flex-col items-center text-center p-10">
              <div className="mb-6 flex items-center gap-4">
                <Badge>DAY 01</Badge>

                <span className="text-sm text-zinc-400">
                  Beginner → Conversational
                </span>
              </div>

              <h2 className="mb-3 text-4xl font-bold">Your Mission Today</h2>

              <p className="mb-8 max-w-2xl text-zinc-400">
                Focus on speaking first. No grammar overload. Listen, repeat,
                answer and build automatic speech patterns.
              </p>

              <div className="mb-3 flex w-full max-w-xl justify-between text-sm">
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

          <Card className="border-zinc-800 bg-zinc-900">
            <CardContent className="flex flex-col items-center text-center p-8">
              <div className="mb-6 text-6xl">🔥</div>

              <h3 className="text-2xl font-bold">Streak</h3>

              <p className="mt-2 text-zinc-400">
                Keep your daily immersion streak alive.
              </p>

              <div className="mt-8 text-6xl font-bold">0</div>

              <div className="text-zinc-500">days</div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-zinc-800 bg-zinc-900 transition hover:border-zinc-700 hover:-translate-y-1">
            <CardContent className="flex flex-col items-center text-center p-8">
              <div className="mb-4 text-5xl">🧠</div>

              <h3 className="text-lg font-semibold">Phrase Engine</h3>

              <p className="mt-3 text-sm text-zinc-400">
                Core speaking patterns and high-frequency phrases.
              </p>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900 transition hover:border-zinc-700 hover:-translate-y-1">
            <CardContent className="flex flex-col items-center text-center p-8">
              <div className="mb-4 text-5xl">🎧</div>

              <h3 className="text-lg font-semibold">Shadowing</h3>

              <p className="mt-3 text-sm text-zinc-400">
                Listen and repeat like native speakers.
              </p>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900 transition hover:border-zinc-700 hover:-translate-y-1">
            <CardContent className="flex flex-col items-center text-center p-8">
              <div className="mb-4 text-5xl">🗣️</div>

              <h3 className="text-lg font-semibold">Speaking Lab</h3>

              <p className="mt-3 text-sm text-zinc-400">
                Build automatic speech without translation.
              </p>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900 transition hover:border-zinc-700 hover:-translate-y-1">
            <CardContent className="flex flex-col items-center text-center p-8">
              <div className="mb-4 text-5xl">🤖</div>

              <h3 className="text-lg font-semibold">AI Partner</h3>

              <p className="mt-3 text-sm text-zinc-400">
                Real conversations powered by AI.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
