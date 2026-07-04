"use client";

import { useSyncExternalStore, useCallback } from "react";
import {
  loadProgress,
  saveProgress as persist,
  advanceDay,
  type DayProgress,
  type Tense,
} from "@/lib/day-progress";

const DEFAULT: DayProgress = {
  day: 1,
  missionCompleted: false,
  completedTenses: [],
  dialogCompleted: false,
  completed: false,
  completedAt: "",
  startedAt: "",
};

let store: DayProgress | null = null;
const listeners = new Set<() => void>();

function getStore(): DayProgress {
  if (store === null) store = loadProgress();
  return store;
}

function getStreak(): number {
  return Number(localStorage.getItem("streak") ?? "0") || 0;
}

function setStore(p: DayProgress): void {
  store = p;
  persist(p);
  listeners.forEach((cb) => cb());
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useDayProgress() {
  const progress = useSyncExternalStore(subscribe, getStore, () => DEFAULT);
  const streak = useSyncExternalStore(subscribe, getStreak, () => 0);

  const completeMission = useCallback(() => {
    setStore({ ...getStore(), missionCompleted: true });
  }, []);

  const completeTense = useCallback((tense: Tense) => {
    const current = getStore();
    if (current.completedTenses.includes(tense)) return;
    setStore({ ...current, completedTenses: [...current.completedTenses, tense] });
  }, []);

  const completeDialog = useCallback(() => {
    setStore({ ...getStore(), dialogCompleted: true });
  }, []);

  const completeDay = useCallback(() => {
    setStore({ ...getStore(), completed: true, completedAt: new Date().toISOString() });
  }, []);

  const startNextDay = useCallback(() => {
    const next = advanceDay(getStore());
    store = next;
    listeners.forEach((cb) => cb());
  }, []);

  return { progress, streak, completeMission, completeTense, completeDialog, completeDay, startNextDay };
}
