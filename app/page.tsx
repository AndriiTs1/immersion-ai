"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { MissionCard } from "@/components/mission-card";
import { DialogCard } from "@/components/dialog-card";
import { FeatureCard } from "@/components/feature-card";
import { GrammarCard } from "@/components/grammar-card";
import { DaySummary } from "@/components/day-summary";
import { features } from "@/lib/features";
import { useDayProgress } from "@/hooks/useDayProgress";
import { cn } from "@/lib/utils";

export default function Home() {
  const [activeCard, setActiveCard] = useState<"mission" | "grammar" | "dialog" | "summary">("mission");
  const { progress, completeDay, startNextDay } = useDayProgress();

  function handleNextDay() {
    startNextDay();
    setActiveCard("mission");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Mobile: полноэкранные секции, скролл вниз */}
      <div className="lg:hidden">
        {activeCard === "summary" ? (
          <div className="min-h-screen flex items-center justify-center px-4">
            <DaySummary progress={progress} onNextDay={handleNextDay} />
          </div>
        ) : (
          <>
            <section className="h-svh snap-start flex flex-col">
              <div className="px-4 pt-4 shrink-0">
                <SiteHeader />
              </div>
              <div className="flex-1">
                <MissionCard
                  className="h-full rounded-none border-x-0"
                  onComplete={() => setActiveCard("grammar")}
                />
              </div>
            </section>

            <section className="h-svh snap-start">
              <GrammarCard
                className="h-full rounded-none border-x-0"
                onAllComplete={() => {
                  completeDay();
                  setActiveCard("summary");
                }}
              />
            </section>

            <section className="h-svh snap-start">
              <DialogCard key={progress.day} className="h-full rounded-none border-x-0" />
            </section>

            <section className="snap-start px-4 py-6">
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature) => (
                  <FeatureCard key={feature.title} {...feature} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden lg:block mx-auto max-w-7xl p-6">
        <SiteHeader />

        <div className="grid grid-cols-3 gap-6 auto-rows-[560px]">
          {activeCard === "summary" ? (
            <Card className="col-span-3 border-t-2 border-t-amber-400 bg-zinc-900">
              <CardContent className="h-full flex items-center justify-center">
                <DaySummary progress={progress} onNextDay={handleNextDay} />
              </CardContent>
            </Card>
          ) : (
            <>
              <MissionCard
                className={cn(
                  "transition-all duration-300",
                  activeCard === "mission"
                    ? "opacity-100"
                    : "opacity-40 pointer-events-none",
                )}
                onComplete={() => setActiveCard("grammar")}
              />
              <GrammarCard
                className={cn(
                  "transition-all duration-300",
                  activeCard === "grammar"
                    ? "opacity-100 border-t-amber-400"
                    : "opacity-40 pointer-events-none",
                )}
                onAllComplete={() => setActiveCard("dialog")}
              />
              <DialogCard
                key={progress.day}
                className={cn(
                  "transition-all duration-300",
                  activeCard === "dialog"
                    ? "opacity-100"
                    : "opacity-40 pointer-events-none",
                )}
                onComplete={() => {
                  completeDay();
                  setActiveCard("summary");
                }}
              />
            </>
          )}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </main>
  );
}
