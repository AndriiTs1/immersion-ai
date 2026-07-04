"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { italianPack } from "@/lib/phrases";
import { type GrammarPhrase } from "@/lib/grammar";
import { useSpeechEngine } from "@/hooks/useSpeechEngine";

interface GrammarRunnerProps {
  phrases: GrammarPhrase[];
  onClose?: () => void;
  onComplete?: () => void;
  tenseLabel?: string;
}

export function GrammarRunner({
  phrases,
  onClose,
  onComplete,
  tenseLabel = "",
}: GrammarRunnerProps) {
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const { status, heard, speak, listen, reset } = useSpeechEngine(italianPack.voice);

  const phrase = phrases[index];
  const progress = Math.round(((index + 1) / phrases.length) * 100);
  const isLast = index === phrases.length - 1;

  function next() {
    if (isLast) {
      if (onComplete) {
        setJustCompleted(true);
        setTimeout(() => {
          setJustCompleted(false);
          onComplete();
        }, 1000);
        return;
      }
      setCompleted(true);
      return;
    }
    reset();
    setIndex((i) => i + 1);
  }

  function restart() {
    setCompleted(false);
    reset();
    setIndex(0);
  }

  if (completed) {
    return (
      <div className="flex-1 min-h-0 flex w-full flex-col items-center text-center justify-center py-8">
        <div className="mb-4 text-5xl">🎉</div>
        <h2 className="mb-2 text-3xl font-bold text-zinc-50">Отлично! Все фразы пройдены.</h2>
        <p className="mb-8 text-zinc-300">
          Повтори ещё раз — повторение закрепляет автоматизм лучше, чем переход дальше.
        </p>
        <div className="flex gap-3">
          <Button
            className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
            onClick={restart}
          >
            🔁 Пройти ещё раз
          </Button>
          {onClose && (
            <Button
              variant="ghost"
              className="bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white"
              onClick={onClose}
            >
              ← К теории
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 min-h-0 flex w-full flex-col items-center text-center">
      {justCompleted && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/90 rounded-xl z-10">
          <p className="text-emerald-400 text-xl font-bold">✓ {tenseLabel} completato</p>
        </div>
      )}

      {/* Top: местоимение */}
      <div className="shrink-0 pt-2 pb-4">
        <Badge
          variant="outline"
          className="border-amber-400/40 bg-amber-400/10 text-amber-300"
        >
          {phrase.pronoun}
        </Badge>
        <p className="mt-2 text-xs uppercase tracking-wide text-zinc-500">
          Послушай и повтори вслух
        </p>
      </div>

      {/* Middle: фраза */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-2">
        <h2 className="text-2xl font-bold text-zinc-50 leading-snug">{phrase.it}</h2>
        <p className="mt-2 text-zinc-300 text-sm">{phrase.ru}</p>

        <div className="mt-3 h-5 flex items-center justify-center">
          {heard && !status.match(/correct|retry/) && (
            <p className="text-sm text-zinc-400">
              Ты сказал: <span className="text-zinc-100">{heard}</span>
            </p>
          )}
          {status === "correct" && (
            <p className="text-sm text-emerald-400">Отлично! Верно сказано.</p>
          )}
          {status === "retry" && (
            <p className="text-sm text-amber-400">Почти — попробуй ещё раз.</p>
          )}
        </div>
      </div>

      {/* Bottom: кнопки и прогресс */}
      <div className="shrink-0 w-full pb-4">
        <div className="flex gap-3 justify-center mb-4">
          <Button
            variant="outline"
            className="border-zinc-700 bg-transparent text-zinc-200 hover:bg-zinc-800 hover:text-white"
            onClick={() => speak(phrase.it)}
          >
            🔊 Слушать
          </Button>
          <Button
            className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
            onClick={() => listen(phrase.it)}
            disabled={status === "listening"}
          >
            {status === "listening" ? "Слушаю..." : "🎤 Повторить"}
          </Button>
        </div>

        <div className="w-full max-w-xs mx-auto mb-3">
          <Progress value={progress} className="mb-1" />
          <p className="text-right text-xs text-zinc-500">
            {index + 1} / {phrases.length}
          </p>
        </div>

        <Button
          variant="ghost"
          className="bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-amber-300"
          onClick={next}
        >
          {isLast ? "Завершить →" : "Следующая фраза →"}
        </Button>
      </div>
    </div>
  );
}
