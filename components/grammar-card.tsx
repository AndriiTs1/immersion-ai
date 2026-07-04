"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { GrammarRunner } from "@/components/grammar-runner";
import { grammarDays } from "@/lib/grammar";
import { useDayProgress } from "@/hooks/useDayProgress";
import { type Tense } from "@/lib/day-progress";

const TENSE_ORDER: Tense[] = ["presente", "passato", "imperfetto", "futuro"];

const tenses = [
  {
    id: "presente" as Tense,
    label: "Presente",
    emoji: "⚡",
    subtitle: "Сейчас и всегда",
    theoryIt: "Azioni abituali, fatti generali e ciò che accade ora.",
    theoryRu: "Привычные действия, общие факты и то, что происходит прямо сейчас.",
    formula: "Sogg. + verbo (-are/-ere/-ire)",
    formulaRu: "Глагол меняется по лицу: -o, -i, -a, -iamo, -ate, -ano",
  },
  {
    id: "passato" as Tense,
    label: "Passato",
    emoji: "🕰️",
    subtitle: "Завершённое прошлое",
    theoryIt: "Azioni concluse nel passato con un momento preciso.",
    theoryRu: "Действия, завершённые в прошлом в конкретный момент.",
    formula: "Sogg. + avere/essere + participio",
    formulaRu: "Вспомогательный avere/essere + причастие прошедшего времени",
  },
  {
    id: "imperfetto" as Tense,
    label: "Imperfetto",
    emoji: "🌊",
    subtitle: "Длительное прошлое",
    theoryIt: "Azioni abituali o in corso nel passato, descrizioni e stati.",
    theoryRu: "Повторяющиеся или незавершённые действия в прошлом, фон и описания.",
    formula: "Sogg. + radice + -avo/-evo/-ivo",
    formulaRu: "Корень глагола + суффикс по группе (-avo, -evo, -ivo)",
  },
  {
    id: "futuro" as Tense,
    label: "Futuro",
    emoji: "🚀",
    subtitle: "Будущее и гипотезы",
    theoryIt: "Azioni future, supposizioni e richieste cortesi.",
    theoryRu: "Будущие действия, предположения о настоящем и вежливые просьбы.",
    formula: "Sogg. + infinito (-e) + -ò/-ai/-à",
    formulaRu: "Инфинитив без -e + окончание: -ò, -ai, -à, -emo, -ete, -anno",
  },
];

export function GrammarCard({
  className,
  onAllComplete,
}: {
  className?: string;
  onAllComplete?: () => void;
}) {
  const [activeTense, setActiveTense] = useState<Tense>("presente");
  const [runnerOpen, setRunnerOpen] = useState(false);
  const { progress, completeTense } = useDayProgress();

  const dayData = grammarDays.find((d) => d.day === progress.day) ?? grammarDays[0];
  const phrases = dayData.phrases.filter((p) => p.tense === activeTense);
  const activeTenseData = tenses.find((t) => t.id === activeTense)!;

  function handleTenseComplete() {
    const alreadyDone = progress.completedTenses.includes(activeTense);
    const nowCompleted = alreadyDone
      ? progress.completedTenses
      : [...progress.completedTenses, activeTense];

    if (!alreadyDone) completeTense(activeTense);

    setRunnerOpen(false);

    const nextIdx = TENSE_ORDER.indexOf(activeTense) + 1;
    if (nextIdx < TENSE_ORDER.length) {
      setActiveTense(TENSE_ORDER[nextIdx]);
    }

    if (nowCompleted.length === 4) {
      onAllComplete?.();
    }
  }

  if (runnerOpen) {
    return (
      <Card className={cn("border border-zinc-700 border-t-2 border-t-purple-400 bg-zinc-900 shadow-xl shadow-black/40", className)}>
        <CardContent className="p-4 h-full flex flex-col">
          <div className="shrink-0 mb-3 flex items-center">
            <button
              onClick={() => setRunnerOpen(false)}
              className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
            >
              ← Назад
            </button>
            <div className="flex-1 text-center">
              <p className="text-sm font-semibold text-emerald-400">
                {activeTenseData.label} · {dayData.verb}
              </p>
            </div>
          </div>
          <div className="flex-1 min-h-0 flex flex-col">
            <GrammarRunner
              phrases={phrases}
              onClose={() => setRunnerOpen(false)}
              onComplete={handleTenseComplete}
              tenseLabel={activeTenseData.label}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("border border-zinc-700 border-t-2 border-t-purple-400 bg-zinc-900 shadow-xl shadow-black/40", className)}>
      <CardContent className="p-4 h-full flex flex-col">

        <div className="shrink-0 mb-3 text-center">
          <h2 className="text-2xl lg:text-lg font-bold text-violet-400">Grammar Engine</h2>
          <p className="text-base lg:text-xs text-zinc-500">
            {dayData.verb} — {dayData.translation}
          </p>
        </div>

        <Tabs
          value={activeTense}
          onValueChange={(v) => setActiveTense(v as Tense)}
          className="flex-1 min-h-0 gap-2 w-full"
        >
          <TabsList className="shrink-0 w-full grid grid-cols-4 bg-zinc-800/80 h-9 rounded-lg p-0.5">
            {tenses.map((tense) => {
              const done = progress.completedTenses.includes(tense.id);
              return (
                <TabsTrigger
                  key={tense.id}
                  value={tense.id}
                  className="text-base lg:text-[11px] font-semibold rounded-md data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-sm text-zinc-400 transition-all"
                >
                  {tense.emoji} {tense.label}{done ? " ✓" : ""}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {tenses.map((tense) => (
            <TabsContent
              key={tense.id}
              value={tense.id}
              className="flex-1 grid grid-rows-3 gap-2 mt-0 w-full min-h-0"
            >
              {/* Теория */}
              <div className="min-h-0 rounded-xl bg-zinc-800 border-l-2 border-l-violet-500 px-4 flex flex-col items-center justify-center text-center">
                <p className="text-sm lg:text-[10px] font-bold uppercase tracking-widest text-violet-400 mb-1">
                  {tense.subtitle}
                </p>
                <p className="text-lg lg:text-sm italic text-zinc-200 leading-tight mb-1">
                  {tense.theoryIt}
                </p>
                <p className="text-base lg:text-xs text-zinc-400 leading-tight">
                  {tense.theoryRu}
                </p>
              </div>

              {/* Формула */}
              <div className="min-h-0 rounded-xl bg-zinc-800 border-l-2 border-l-amber-400 px-4 flex flex-col items-center justify-center text-center">
                <p className="text-sm lg:text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
                  Формула
                </p>
                <p className="font-mono text-lg lg:text-sm text-amber-300 mb-1">{tense.formula}</p>
                <p className="text-sm lg:text-[10px] leading-snug text-zinc-500">{tense.formulaRu}</p>
              </div>

              {/* Практика */}
              <div
                className="min-h-0 rounded-xl bg-zinc-800 border-l-2 border-l-emerald-500 px-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-zinc-700/80 transition-colors group"
                onClick={() => setRunnerOpen(true)}
              >
                <p className="text-lg lg:text-[11px] font-bold uppercase tracking-widest text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  Практика
                </p>
                <p className="text-sm lg:text-[10px] text-zinc-600 group-hover:text-zinc-500 transition-colors">
                  нажми чтобы начать →
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>

      </CardContent>
    </Card>
  );
}
