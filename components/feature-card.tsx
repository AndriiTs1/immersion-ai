import { Card, CardContent } from "@/components/ui/card";

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border border-zinc-800 bg-zinc-900/50">
      <CardContent className="flex flex-col items-center text-center p-8 opacity-70">
        <div className="mb-4 text-5xl grayscale">{icon}</div>
        <h3 className="text-lg font-semibold text-zinc-300">{title}</h3>
        <p className="mt-3 text-sm text-zinc-500">{description}</p>
      </CardContent>
    </Card>
  );
}
