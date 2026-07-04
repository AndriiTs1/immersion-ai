# Architecture — Immersion AI (Italian)

> Актуальное состояние на 2026-06-28. Только то, что реально существует в коде.

---

## Stack

- **Next.js App Router** (`app/page.tsx`) — единственная страница, `"use client"`
- **TypeScript** — строгий режим
- **Tailwind CSS** + **shadcn/ui** (Card, CardContent, Badge, Button, Tabs, Progress)
- **Web Speech API** — TTS (`speechSynthesis`) + STT (`SpeechRecognition / webkitSpeechRecognition`)
- **localStorage** — единственное хранилище прогресса, нет бэкенда

---

## Структура файлов

```
app/
  page.tsx                   # Главная страница, управляет activeCard

components/
  site-header.tsx            # [ACTIVE] Шапка: "День N · 🔥 X%"
  mission-card.tsx           # [ACTIVE] Карточка 1: фразы дня
  mission-runner.tsx         # [ACTIVE] TTS/STT цикл для фраз
  grammar-card.tsx           # [ACTIVE] Карточка 2: грамматика (4 времени)
  grammar-runner.tsx         # [ACTIVE] TTS/STT цикл для грамматики
  dialog-card.tsx            # [ACTIVE] Карточка 3: живой диалог A/B
  day-summary.tsx            # [ACTIVE] Экран завершения дня
  feature-card.tsx           # [ACTIVE] Статическая карточка будущих фич (opacity-70)
  day-runner.tsx             # [LEGACY] Старый монолитный компонент Mission+Grammar
  practice-card.tsx          # [LEGACY] Статические задания без интерактивности
  streak-card.tsx            # [LEGACY] Карточка с числом дней стрика

hooks/
  useDayProgress.ts          # [ACTIVE] Shared store через useSyncExternalStore
  useSpeechEngine.ts         # [ACTIVE] TTS + STT абстракция
  useProgress.ts             # [LEGACY] Старый хук (current_day, last_completed_date)

lib/
  day-progress.ts            # Типы DayProgress + localStorage утилиты
  phrases.ts                 # Фразы дней 1–7 (italianPack)
  grammar.ts                 # Глаголы дней 1–7 (grammarDays)
  dialogs.ts                 # Диалоги дней 1–7 (dialogs[])
  features.ts                # 4 статических описания будущих фич
  utils.ts                   # cn() от shadcn

types/
  speech-recognition.d.ts   # Типы SpeechRecognitionInstance (onresult, onerror, onend)
```

---

## Прогресс-система

### Тип DayProgress (`lib/day-progress.ts`)

```ts
interface DayProgress {
  day: number;               // текущий день (1–7)
  missionCompleted: boolean; // фразы пройдены
  completedTenses: Tense[];  // ["presente", "passato", ...]
  dialogCompleted: boolean;  // диалог завершён
  completed: boolean;        // весь день завершён
  completedAt: string;       // ISO timestamp
  startedAt: string;         // ISO timestamp
}
type Tense = "presente" | "passato" | "imperfetto" | "futuro";
```

**localStorage ключи:**
| Ключ | Тип | Описание |
|---|---|---|
| `current_progress` | JSON | Объект DayProgress |
| `streak` | строка | Число дней подряд |

**Утилиты:**
- `loadProgress()` — читает из localStorage, fallback на DEFAULT
- `saveProgress(p)` — пишет в localStorage
- `advanceDay(p)` — day+1, сброс всех полей, streak++

### useDayProgress (`hooks/useDayProgress.ts`)

Module-level store: `let store: DayProgress | null` + `const listeners = new Set<() => void>()`.

Все компоненты подписаны через `useSyncExternalStore(subscribe, getStore, () => DEFAULT)`.
`setStore()` → `persist()` → `listeners.forEach(cb => cb())` → синхронный ребрендер всех подписчиков.

**API:**
| Функция | Действие |
|---|---|
| `completeMission()` | `missionCompleted = true` |
| `completeTense(tense)` | добавляет tense в `completedTenses` (идемпотентно) |
| `completeDialog()` | `dialogCompleted = true` |
| `completeDay()` | `completed = true` + записывает `completedAt` |
| `startNextDay()` | `advanceDay()`: day+1, streak++, сброс полей |

### Формула прогресса (site-header.tsx)

```
steps = (missionCompleted ? 1 : 0) + completedTenses.length + (dialogCompleted ? 1 : 0)
dayPercent = Math.round((steps / 6) * 100)
```

6 шагов: Фразы + Presente + Passato + Imperfetto + Futuro + Диалог.

---

## Компоненты (активные)

### `app/page.tsx`

`activeCard: "mission" | "grammar" | "dialog" | "summary"`.

**Opacity-логика (desktop):**

| activeCard | MissionCard | GrammarCard | DialogCard |
|---|---|---|---|
| `"mission"` | 100% | opacity-40 + no-pointer | opacity-40 + no-pointer |
| `"grammar"` | opacity-40 + no-pointer | 100% + border-t-amber | opacity-40 + no-pointer |
| `"dialog"` | opacity-40 + no-pointer | opacity-40 + no-pointer | 100% |
| `"summary"` | col-span-3 DaySummary card | | |

Переход: `onComplete` → `"grammar"` → `onAllComplete` → `"dialog"` → `onComplete` → `completeDay()` + `"summary"`.

Mobile: snap-sections (h-svh), без opacity-логики, диалог в отдельной секции.

---

### `site-header.tsx`

Шапка страницы. Читает `progress` и `streak` из `useDayProgress()`.
Цвет 🔥: zinc-500 (0%) / amber-400 (1–99%) / emerald-400 (100%).

---

### `mission-card.tsx`

Фильтрует `italianPack.phrases` по тегу `day-{N}`, fallback на `day-1`.
По завершении: `completeMission()` → transition-экран "Фразы дня пройдены!" → `onComplete()` → `activeCard = "grammar"`.
Граница: `border-t-2 border-t-amber-400`.

### `mission-runner.tsx`

TTS/STT цикл по фразам. Состояния:
- `index` — текущая фраза
- `tried: boolean` — была ли хотя бы одна попытка STT
- `canSkip = tried && status !== "correct" && status !== "listening"` → кнопка "Пропустить →"
- Всегда доступна кнопка "Следующая фраза →" (обычный скип без STT)

---

### `grammar-card.tsx`

Данные: `grammarDays.find(d => d.day === progress.day)`.
4 вкладки Tabs. Завершённые → ✓ в TabsTrigger.
Auto-advance: после каждого `completeTense()` открывается следующая вкладка.
По завершении всех 4 тенсов: `onAllComplete()` → `activeCard = "dialog"`.
Граница: `border border-zinc-700 border-t-2 border-t-purple-400`.

### `grammar-runner.tsx`

TTS/STT цикл по `GrammarPhrase[]`. При завершении: overlay "✓ {tenseLabel} completato" на 1 секунду → `onComplete()`.

---

### `dialog-card.tsx`

Данные: `dialogs.find(d => d.day === progress.day)`. Сброс при смене дня через `key={progress.day}` в page.tsx.

**Состояния:**
- `hasStarted` — старт-экран с кнопкой "Начать диалог"
- `activeIndex` — текущая реплика (0..N-1)
- `listened` — нажималась ли 🔊 на текущей реплике
- `tried` — нажималась ли 🎤 на текущей реплике
- `completed` — локальный флаг завершения (не из store, чтобы не было race condition)

**Speaker A:** 🔊 → `speak()` → автопереход через 1500ms через `setTimeout(() => advance(capturedIndex), 1500)`.

**Speaker B:** 🔊 Слушать → `speak()` + `listened=true` → 🎤 Говорить → `tried=true` + `listen()` → STT.
- `status === "correct"` → "✓ Верно!" + "Далее →"
- `status === "retry"` → "Попробуй ещё раз" + "🎤 Говорить"
- `canSkip = tried && status !== "listening" && status !== "correct"` → "Пропустить →"

**Завершение последней реплики:** `setCompleted(true)` + `completeDialog()` + `onComplete?.()`.
`onComplete` из page.tsx: `completeDay()` + `setActiveCard("summary")`.
Граница: `border-t-2 border-t-sky-500`.

---

### `day-summary.tsx`

Чеклист: ✅ Фразы / Presente / Passato / Imperfetto / Futuro / Диалог.
Время сессии: `completedAt − startedAt` в минутах.
Кнопка "Завтра — День N+1 →" → `startNextDay()` + `setActiveCard("mission")`.

---

### `feature-card.tsx`

Статические карточки-заглушки (opacity-70, grayscale). 4 штуки из `lib/features.ts`:
Phrase Engine / Shadowing / Speaking Lab / AI Partner.

---

## useSpeechEngine (`hooks/useSpeechEngine.ts`)

```ts
type Status = "idle" | "listening" | "correct" | "retry";
```

- `speak(text)` — `SpeechSynthesisUtterance`, `lang = "it-IT"`
- `listen(target)` — `SpeechRecognition`, `lang = "it-IT"`, сравнивает normalize(heard) === normalize(target)
- `reset()` — `status = "idle"`, `heard = ""`

**normalize:** NFD decompose → `\p{Diacritic}/gu` strip → lowercase → strip `.,!?;:'"` → trim.

**Обработчики:**
- `onresult` → `setStatus("correct" | "retry")`
- `onerror` → `setStatus("idle")`
- `onend` → если ещё `"listening"`, то `setStatus("idle")` (защита от тайм-аута)

STT работает только в Chrome/Chromium.

---

## Контент

### `lib/phrases.ts` — `italianPack.phrases[]`

Фразы фильтруются по тегу `"day-N"`.

| День | Тема | Фраз |
|---|---|---|
| 1 | Знакомство, произношение (gli/gn/che/chi/sci/sce), essere/avere | 12 |
| 2 | В кафе — vorrei, quant'è, оплата картой | 7 |
| 3 | На работе — riunione, progetto, коллеги | 7 |
| 4 | В магазине — cerco, quanto costa, chilo | 7 |
| 5 | Транспорт — dov'è, расписание, fermata | 7 |
| 6 | У врача — симптомы, farmacia, appuntamento | 7 |
| 7 | Ресторан — prenotazione, menu, conto | 7 |

### `lib/grammar.ts` — `grammarDays[]`

```ts
WordOfDay { day: number; verb: string; translation: string; phrases: GrammarPhrase[] }
GrammarPhrase { id, it, ru, tense: Tense, pronoun }
```

Один глагол в день, 10 фраз × 4 времени = 40 фраз. Дни 1–7.

### `lib/dialogs.ts` — `dialogs[]`

```ts
DayDialog { day, title, scenario, lines: DialogLine[] }
DialogLine { id, speaker: "A"|"B", it, ru }
```

6 реплик в день, дни 1–7.

| День | Сценарий |
|---|---|
| 1 | Знакомство с соседом |
| 2 | Заказ кофе в кафе |
| 3 | Знакомство с коллегой на работе |
| 4 | Покупка продуктов в магазине |
| 5 | Автобусная остановка в Лугано |
| 6 | Запись к врачу |
| 7 | Ужин в ресторане |

---

## Legacy-файлы (не используются в page.tsx)

| Файл | Причина устаревания |
|---|---|
| `components/day-runner.tsx` | Старый монолит Mission+Grammar, заменён отдельными карточками |
| `components/practice-card.tsx` | Статические упражнения без STT, не встроены в flow |
| `components/streak-card.tsx` | Заменён streak в site-header через useDayProgress |
| `hooks/useProgress.ts` | Старый хук (ключ `current_day`), заменён useDayProgress (ключ `current_progress`) |

---

## Чек-лист

### Готово
- [x] Desktop 3-колоночный layout + mobile snap-sections
- [x] Последовательный unlock: Mission → Grammar → Dialog → Summary
- [x] Progress-система: 6 шагов, localStorage, streak
- [x] Фразы дней 1–7 (phrases.ts, 57 фраз)
- [x] Грамматика дней 1–7 (grammar.ts, 4 времени × 10 фраз × 7 дней)
- [x] Диалоги дней 1–7 (dialogs.ts, 6 реплик × 7 дней)
- [x] STT: normalize diacritics, onend тайм-аут, "Пропустить →" (tried state)
- [x] Day Summary с чеклистом и временем сессии
- [x] SiteHeader "День N · 🔥 X%"

### Не реализовано
- [ ] Spaced repetition (линейный проход)
- [ ] Накопительный словарь пройденных слов
- [ ] Статистика по дням
- [ ] Shadowing, Speaking Lab, AI Partner (заглушки)
- [ ] Header на мобиле для секций Grammar / Dialog
- [ ] STT в браузерах кроме Chrome
- [ ] Контент для дней 8+
- [ ] Удаление/рефакторинг legacy-файлов
