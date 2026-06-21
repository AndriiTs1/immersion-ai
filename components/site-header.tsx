import { Badge } from "@/components/ui/badge";

export function SiteHeader() {
  return (
    <div className="mb-3 flex items-center justify-between border-b border-zinc-800 pb-2">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold tracking-tight text-zinc-50">
          IntegrationAI
        </h1>
        <span className="text-xs text-zinc-500">Speak First Method</span>
      </div>

      <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
        🇮🇹 Italian
      </Badge>
    </div>
  );
}
