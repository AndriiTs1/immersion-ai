export type CEFRLevel = "A1" | "A2" | "B1";

export type Phrase = {
  id: string;
  it: string;
  ru: string;
  context: string;
  difficulty: number;
  tags: string[];
  level: CEFRLevel;
};

export type LanguagePack = {
  code: string;
  name: string;
  phrases: Phrase[];
  voice: string;
};

export const italianPack: LanguagePack = {
  code: "it",
  name: "Italiano",
  voice: "it-IT",
  phrases: [
    // --- Произношение: ключевые звукосочетания ---
    {
      id: "pron1",
      it: "Voglio imparare l'italiano.",
      ru: "Я хочу выучить итальянский.",
      context: "Произношение: gli",
      difficulty: 1,
      tags: ["pronunciation", "gli", "day-1"],
      level: "A1",
    },
    {
      id: "pron2",
      it: "Ho bisogno di tempo libero.",
      ru: "Мне нужно свободное время.",
      context: "Произношение: gn",
      difficulty: 2,
      tags: ["pronunciation", "gn", "day-1"],
      level: "A2",
    },
    {
      id: "pron3",
      it: "Che cosa fai oggi?",
      ru: "Что ты делаешь сегодня?",
      context: "Произношение: che",
      difficulty: 1,
      tags: ["pronunciation", "che", "day-1"],
      level: "A1",
    },
    {
      id: "pron4",
      it: "Chi sei?",
      ru: "Кто ты?",
      context: "Произношение: chi",
      difficulty: 1,
      tags: ["pronunciation", "chi", "day-1"],
      level: "A1",
    },
    {
      id: "pron5",
      it: "Lascio il lavoro alle sei.",
      ru: "Я заканчиваю работу в шесть.",
      context: "Произношение: sci",
      difficulty: 2,
      tags: ["pronunciation", "sci", "day-1"],
      level: "A2",
    },
    {
      id: "pron6",
      it: "Mangio il pesce la sera.",
      ru: "Вечером я ем рыбу.",
      context: "Произношение: sce",
      difficulty: 2,
      tags: ["pronunciation", "sce", "day-1"],
      level: "A2",
    },

    // --- Essere (быть) в Presente ---
    {
      id: "ess1",
      it: "Sono pronto a parlare.",
      ru: "Я готов говорить.",
      context: "Essere — io",
      difficulty: 1,
      tags: ["verb-essere", "presente", "day-1"],
      level: "A1",
    },
    {
      id: "ess2",
      it: "Sei stanco oggi?",
      ru: "Ты устал сегодня?",
      context: "Essere — tu",
      difficulty: 1,
      tags: ["verb-essere", "presente", "day-1"],
      level: "A1",
    },
    {
      id: "ess3",
      it: "È molto gentile.",
      ru: "Он/она очень добрый(ая).",
      context: "Essere — lui/lei",
      difficulty: 2,
      tags: ["verb-essere", "presente", "day-1"],
      level: "A2",
    },

    // --- Avere (иметь) в Presente ---
    {
      id: "av1",
      it: "Ho una domanda.",
      ru: "У меня есть вопрос.",
      context: "Avere — io",
      difficulty: 1,
      tags: ["verb-avere", "presente", "day-1"],
      level: "A1",
    },
    {
      id: "av2",
      it: "Hai tempo adesso?",
      ru: "У тебя есть время сейчас?",
      context: "Avere — tu",
      difficulty: 1,
      tags: ["verb-avere", "presente", "day-1"],
      level: "A1",
    },
    {
      id: "av3",
      it: "Ha un'idea interessante.",
      ru: "У него/неё есть интересная идея.",
      context: "Avere — lui/lei",
      difficulty: 2,
      tags: ["verb-avere", "presente", "day-1"],
      level: "A2",
    },

    // --- Частотные слова в личных фразах ---
    {
      id: "f1",
      it: "Lavoro da casa ogni giorno.",
      ru: "Я работаю из дома каждый день.",
      context: "Частые слова: casa, giorno",
      difficulty: 2,
      tags: ["frequency", "casa", "giorno", "day-1"],
      level: "A2",
    },
    {
      id: "f2",
      it: "Non ho molto tempo libero.",
      ru: "У меня немного свободного времени.",
      context: "Частые слова: tempo",
      difficulty: 2,
      tags: ["frequency", "tempo", "day-1"],
      level: "A2",
    },
    {
      id: "f3",
      it: "Il mio lavoro è interessante.",
      ru: "Моя работа интересная.",
      context: "Частые слова: lavoro",
      difficulty: 1,
      tags: ["frequency", "lavoro", "day-1"],
      level: "A1",
    },
    {
      id: "f4",
      it: "Sono una persona curiosa.",
      ru: "Я любопытный человек.",
      context: "Частые слова: persona",
      difficulty: 2,
      tags: ["frequency", "persona", "day-1"],
      level: "A2",
    },
    {
      id: "f5",
      it: "Vivo qui da un anno.",
      ru: "Я живу здесь уже год.",
      context: "Частые слова: vivere",
      difficulty: 2,
      tags: ["frequency", "vivere", "day-1"],
      level: "A2",
    },
    {
      id: "f6",
      it: "Voglio cambiare la mia vita.",
      ru: "Я хочу изменить свою жизнь.",
      context: "Частые слова: vita",
      difficulty: 2,
      tags: ["frequency", "vita", "day-1"],
      level: "A2",
    },

    // --- День 0: исходные личные фразы (оставлены для повторения) ---
    {
      id: "p1",
      it: "Sono uno sviluppatore.",
      ru: "Я разработчик.",
      context: "О себе",
      difficulty: 1,
      tags: ["self-intro", "work", "day-0"],
      level: "A1",
    },
    {
      id: "p2",
      it: "Lavoro con l'intelligenza artificiale.",
      ru: "Я работаю с искусственным интеллектом.",
      context: "О работе",
      difficulty: 2,
      tags: ["work", "day-0"],
      level: "A2",
    },
    {
      id: "p3",
      it: "Vivo a Lugano con la mia famiglia.",
      ru: "Я живу в Лугано с семьёй.",
      context: "О себе",
      difficulty: 1,
      tags: ["self-intro", "daily", "day-0"],
      level: "A1",
    },
    {
      id: "p4",
      it: "Sto imparando l'italiano.",
      ru: "Я учу итальянский.",
      context: "О себе",
      difficulty: 1,
      tags: ["self-intro", "day-0"],
      level: "A1",
    },
    {
      id: "p5",
      it: "Mi piace il mio lavoro.",
      ru: "Мне нравится моя работа.",
      context: "О работе",
      difficulty: 1,
      tags: ["work", "day-0"],
      level: "A1",
    },
    {
      id: "p6",
      it: "Oggi ho una riunione importante.",
      ru: "Сегодня у меня важная встреча.",
      context: "Повседневное",
      difficulty: 2,
      tags: ["daily", "work", "day-0"],
      level: "A2",
    },
  ],
};
