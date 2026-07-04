"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDayProgress } from "@/hooks/useDayProgress";
import { useSpeechEngine } from "@/hooks/useSpeechEngine";
import { dialogs, type DialogLine } from "@/lib/dialogs";

export function DialogCard({ className, onComplete }: { className?: string; onComplete?: () => void }) {
  const { progress, completeDialog } = useDayProgress();
  const [hasStarted, setHasStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [listened, setListened] = useState(false);
  const [tried, setTried] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { status, heard, speak, listen, reset } = useSpeechEngine("it-IT");

  const dialog = dialogs.find((d) => d.day === progress.day) ?? dialogs[0];
  const totalLines = dialog.lines.length;

  // show skip after at least one STT attempt and not currently listening or correct
  const canSkip = tried && status !== "listening" && status !== "correct";

  function advance(fromIndex: number) {
    const isLast = fromIndex === totalLines - 1;
    reset();
    setListened(false);
    setTried(false);
    if (isLast) {
      setCompleted(true);
      completeDialog();
      onComplete?.();
    } else {
      setActiveIndex(fromIndex + 1);
    }
  }

  function handleSpeakA(line: DialogLine) {
    if (listened) return;
    speak(line.it);
    setListened(true);
    const capturedIndex = activeIndex;
    setTimeout(() => advance(capturedIndex), 1500);
  }

  function handleSpeakB(line: DialogLine) {
    speak(line.it);
    setListened(true);
  }

  function handleListen(target: string) {
    setTried(true);
    listen(target);
  }

  return (
    <Card key={progress.day} className={cn("border-t-2 border-t-sky-500 bg-zinc-900", className)}>
      <CardContent className="p-4 h-full flex flex-col">

        {/* Header */}
        <div className="shrink-0 mb-3 text-center">
          <h2 className="text-2xl lg:text-lg font-bold text-sky-400">Диалог дня</h2>
          <p className="text-base lg:text-xs text-zinc-500">{dialog.scenario}</p>
        </div>

        {/* Start screen */}
        {!hasStarted ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-xl font-bold text-zinc-50">{dialog.title}</p>
            <p className="text-sm text-zinc-400">{dialog.scenario}</p>
            <Button
              className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
              onClick={() => setHasStarted(true)}
            >
              Начать диалог →
            </Button>
          </div>
        ) : (
          <>
            {/* Lines list */}
            <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 pr-1">
              {completed ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-xl font-bold text-emerald-400">✓ Диалог завершён!</p>
                </div>
              ) : (
                dialog.lines.map((line, i) => {
                  const isPast = i < activeIndex;
                  const isActive = i === activeIndex;
                  const isFuture = i > activeIndex;

                  return (
                    <div
                      key={line.id}
                      className={cn(
                        "rounded-xl transition-all",
                        isPast && "opacity-40 px-3 py-2",
                        isActive && "border border-amber-400/40 bg-amber-400/5 p-3",
                        isFuture && "opacity-20 px-3 py-2",
                      )}
                    >
                      {/* Speaker badge + text */}
                      {line.speaker === "A" ? (
                        <div className="flex items-start gap-2">
                          <Badge className="shrink-0 mt-0.5 text-[10px] px-1.5 h-4 border-0 bg-zinc-700 text-zinc-300">
                            A
                          </Badge>
                          <p className="text-sm text-zinc-100 font-medium leading-snug">{line.it}</p>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2">
                          <p className="flex-1 text-sm text-zinc-100 font-medium leading-snug">{line.it}</p>
                          <Badge className="shrink-0 mt-0.5 text-[10px] px-1.5 h-4 border-0 bg-amber-400/20 text-amber-300">
                            B
                          </Badge>
                        </div>
                      )}

                      {/* Translation */}
                      {(isActive || isPast) && (
                        <p className="text-xs text-zinc-500 mt-1 leading-snug pl-1">{line.ru}</p>
                      )}

                      {/* Controls — active only */}
                      {isActive && (
                        <div className="mt-3 flex flex-col gap-2">

                          {/* Speaker A: listen + auto-advance */}
                          {line.speaker === "A" && (
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-zinc-700 bg-transparent text-zinc-200 hover:bg-zinc-800 hover:text-white"
                                onClick={() => handleSpeakA(line)}
                                disabled={listened}
                              >
                                🔊 Слушать
                              </Button>
                              {listened && (
                                <span className="text-xs text-zinc-500">переход...</span>
                              )}
                            </div>
                          )}

                          {/* Speaker B: listen + STT */}
                          {line.speaker === "B" && (
                            <>
                              {heard && status === "retry" && (
                                <p className="text-xs text-zinc-400">
                                  Ты сказал: <span className="text-zinc-200">{heard}</span>
                                </p>
                              )}
                              {status === "correct" && (
                                <p className="text-sm font-medium text-emerald-400">✓ Верно!</p>
                              )}
                              {status === "retry" && (
                                <p className="text-sm font-medium text-amber-400">Попробуй ещё раз</p>
                              )}

                              <div className="flex flex-wrap gap-2">
                                {status !== "correct" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-zinc-700 bg-transparent text-zinc-200 hover:bg-zinc-800 hover:text-white"
                                    onClick={() => handleSpeakB(line)}
                                  >
                                    🔊 Слушать
                                  </Button>
                                )}

                                {listened && status !== "correct" && (
                                  <Button
                                    size="sm"
                                    className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
                                    onClick={() => handleListen(line.it)}
                                    disabled={status === "listening"}
                                  >
                                    {status === "listening" ? "Слушаю..." : "🎤 Говорить"}
                                  </Button>
                                )}

                                {canSkip && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-zinc-500 hover:text-zinc-300"
                                    onClick={() => advance(activeIndex)}
                                  >
                                    Пропустить →
                                  </Button>
                                )}

                                {status === "correct" && (
                                  <Button
                                    size="sm"
                                    className="bg-emerald-600 text-white hover:bg-emerald-500"
                                    onClick={() => advance(activeIndex)}
                                  >
                                    Далее →
                                  </Button>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Progress dots */}
            {!completed && (
              <div className="shrink-0 flex justify-center gap-1.5 mt-3">
                {dialog.lines.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i < activeIndex
                        ? "w-1.5 bg-emerald-500"
                        : i === activeIndex
                          ? "w-3 bg-sky-400"
                          : "w-1.5 bg-zinc-700",
                    )}
                  />
                ))}
              </div>
            )}
          </>
        )}

      </CardContent>
    </Card>
  );
}
