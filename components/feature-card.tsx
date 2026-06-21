import { Card, CardContent } from "@/components/ui/card";

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900 transition hover:border-zinc-700 hover:-translate-y-1">
      <CardContent className="flex flex-col items-center text-center p-8">
        <div className="mb-4 text-5xl">{icon}</div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-3 text-sm text-zinc-400">{description}</p>
      </CardContent>
    </Card>
  );
}
