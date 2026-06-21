import { SiteHeader } from "@/components/site-header";
import { MissionCard } from "@/components/mission-card";
import { StreakCard } from "@/components/streak-card";
import { FeatureCard } from "@/components/feature-card";
import { features } from "@/lib/features";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl p-6 md:p-10">
        <SiteHeader />

        <div className="grid gap-6 lg:grid-cols-3">
          <MissionCard />
          <StreakCard />
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
