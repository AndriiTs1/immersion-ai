"use client";

import { useState } from "react";

type Status = "idle" | "listening" | "correct" | "retry";

interface SpeechEngine {
  status: Status;
  heard: string;
  speak: (text: string) => void;
  listen: (target: string) => void;
  reset: () => void;
}

function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[.,!?;:'"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function useSpeechEngine(voice: string): SpeechEngine {
  const [status, setStatus] = useState<Status>("idle");
  const [heard, setHeard] = useState("");

  function speak(text: string) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = voice;
    speechSynthesis.speak(utter);
  }

  function listen(target: string) {
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) {
      alert("Голосовой ввод поддерживается только в Chrome.");
      return;
    }
    const recognition = new Ctor();
    recognition.lang = voice;
    recognition.interimResults = false;

    setStatus("listening");

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setHeard(transcript);
      setStatus(normalize(transcript) === normalize(target) ? "correct" : "retry");
    };

    recognition.onerror = () => setStatus("idle");

    // always fires — resets "listening" if no result/error came through
    recognition.onend = () => {
      setStatus((prev) => (prev === "listening" ? "idle" : prev));
    };

    recognition.start();
  }

  function reset() {
    setStatus("idle");
    setHeard("");
  }

  return { status, heard, speak, listen, reset };
}
