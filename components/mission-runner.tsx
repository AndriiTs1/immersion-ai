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
      <Badge className="mb-4">{phrase.context}</Badge>
      <h2 className="mb-2 text-3xl font-bold text-white">{phrase.it}</h2>
      <p className="mb-6 text-zinc-400">{phrase.ru}</p>

      <div className="mb-6 flex gap-3">
        <Button variant="secondary" onClick={() => speak(phrase.it)}>
          🔊 Слушать
        </Button>
        <Button onClick={listen} disabled={status === "listening"}>
          {status === "listening" ? "Слушаю..." : "🎤 Повторить"}
        </Button>
      </div>

      {heard && (
        <p className="mb-4 text-sm text-zinc-500">
          Ты сказал: <span className="text-white">{heard}</span>
        </p>
      )}
      {status === "correct" && (
        <p className="mb-4 text-green-400">Отлично! Верно сказано.</p>
      )}
      {status === "retry" && (
        <p className="mb-4 text-amber-400">Почти — попробуй ещё раз.</p>
      )}

      <div className="mb-3 w-full max-w-xl">
        <Progress value={progress} />
      </div>

      <Button variant="ghost" onClick={next}>
        Следующая фраза →
      </Button>
    </div>
  );
}
