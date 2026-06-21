import { Badge } from "@/components/ui/badge";

export function SiteHeader() {
  return (
    <div className="mb-8 flex items-baseline justify-between border-b border-zinc-800 pb-4">
      <div className="flex items-baseline gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          IntegrationAI
        </h1>
        <span className="text-sm text-zinc-500">Speak First Method</span>
      </div>

      <Badge variant="secondary">🇮🇹 Italian</Badge>
    </div>
  );
}
