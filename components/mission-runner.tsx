"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { italianPack, type Phrase } from "@/lib/phrases";

export function MissionRunner() {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "listening" | "correct" | "retry"
  >("idle");
  const [heard, setHeard] = useState("");

  const phrases = italianPack.phrases;
  const phrase: Phrase = phrases[index];
  const progress = Math.round((index / phrases.length) * 100);

  function speak(text: string) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = italianPack.voice;
    speechSynthesis.speak(utter);
  }

  function normalize(s: string) {
    return s
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .trim();
  }

  function listen() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Голосовой ввод поддерживается только в Chrome.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = italianPack.voice;
    recognition.interimResults = false;

    setStatus("listening");
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setHeard(transcript);
      setStatus(
        normalize(transcript) === normalize(phrase.it) ? "correct" : "retry"
      );
    };
    recognition.onerror = () => setStatus("idle");
    recognition.start();
  }

  function next() {
    setStatus("idle");
    setHeard("");
    setIndex((i) => Math.min(i + 1, phrases.length - 1));
  }

  return (
    <div className="flex w-full flex-col items-center text-center">
      <Badge
        variant="outline"
        className="mb-4 border-amber-400/40 bg-amber-400/10 text-amber-300"
      >
        {phrase.context}
      </Badge>

      <p className="mb-2 text-xs uppercase tracking-wide text-zinc-500">
        Эта фраза — про тебя. Послушай и повтори вслух.
      </p>

      <h2 className="mb-2 text-3xl font-bold text-zinc-50">{phrase.it}</h2>
      <p className="mb-6 text-zinc-300">{phrase.ru}</p>

      <div className="mb-6 flex gap-3">
        <Button
          variant="outline"
          className="border-zinc-700 bg-transparent text-zinc-200 hover:bg-zinc-800 hover:text-white"
          onClick={() => speak(phrase.it)}
        >
          🔊 Слушать
        </Button>
        <Button
          className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
          onClick={listen}
          disabled={status === "listening"}
        >
          {status === "listening" ? "Слушаю..." : "🎤 Повторить"}
        </Button>
      </div>

      {heard && (
        <p className="mb-4 text-sm text-zinc-400">
          Ты сказал: <span className="text-zinc-100">{heard}</span>
        </p>
      )}
      {status === "correct" && (
        <p className="mb-4 text-emerald-400">Отлично! Верно сказано.</p>
      )}
      {status === "retry" && (
        <p className="mb-4 text-amber-400">Почти — попробуй ещё раз.</p>
      )}

      <div className="mb-3 w-full max-w-xl">
        <Progress value={progress} className="mb-1" />
        <p className="text-right text-xs text-zinc-500">
          {index + 1} / {phrases.length}
        </p>
      </div>

      <Button
        variant="ghost"
        className="text-zinc-300 hover:text-amber-300"
        onClick={next}
      >
        Следующая фраза →
      </Button>
    </div>
  );
}
