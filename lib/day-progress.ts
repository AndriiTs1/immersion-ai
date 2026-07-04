type Tense = "presente" | "passato" | "imperfetto" | "futuro";

interface DayProgress {
  day: number;
  missionCompleted: boolean;
  completedTenses: Tense[];
  dialogCompleted: boolean;
  completed: boolean;
  completedAt: string;
  startedAt: string;
}

const DEFAULT_PROGRESS: DayProgress = {
  day: 1,
  missionCompleted: false,
  completedTenses: [],
  dialogCompleted: false,
  completed: false,
  completedAt: "",
  startedAt: "",
};

export function loadProgress(): DayProgress {
  try {
    const raw = localStorage.getItem("current_progress");
    if (!raw) return { ...DEFAULT_PROGRESS, startedAt: new Date().toISOString() };
    return JSON.parse(raw) as DayProgress;
  } catch {
    return { ...DEFAULT_PROGRESS, startedAt: new Date().toISOString() };
  }
}

export function saveProgress(p: DayProgress): void {
  localStorage.setItem("current_progress", JSON.stringify(p));
}

export function advanceDay(p: DayProgress): DayProgress {
  const next: DayProgress = {
    day: p.day + 1,
    missionCompleted: false,
    completedTenses: [],
    dialogCompleted: false,
    completed: false,
    completedAt: "",
    startedAt: new Date().toISOString(),
  };
  localStorage.setItem("current_progress", JSON.stringify(next));
  localStorage.setItem(
    "streak",
    String(Number(localStorage.getItem("streak") ?? "0") + 1),
  );
  return next;
}

export type { DayProgress, Tense };
