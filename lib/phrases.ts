export type Phrase = {
  id: string;
  it: string;
  ru: string;
  context: string;
  difficulty: number;
  tags: string[];
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
    {
      id: "p1",
      it: "Sono uno sviluppatore.",
      ru: "Я разработчик.",
      context: "О себе",
      difficulty: 1,
      tags: ["self-intro", "work"],
    },
    {
      id: "p2",
      it: "Lavoro con l'intelligenza artificiale.",
      ru: "Я работаю с искусственным интеллектом.",
      context: "О работе",
      difficulty: 2,
      tags: ["work"],
    },
    {
      id: "p3",
      it: "Vivo a Lugano con la mia famiglia.",
      ru: "Я живу в Лугано с семьёй.",
      context: "О себе",
      difficulty: 1,
      tags: ["self-intro", "daily"],
    },
    {
      id: "p4",
      it: "Sto imparando l'italiano.",
      ru: "Я учу итальянский.",
      context: "О себе",
      difficulty: 1,
      tags: ["self-intro"],
    },
    {
      id: "p5",
      it: "Mi piace il mio lavoro.",
      ru: "Мне нравится моя работа.",
      context: "О работе",
      difficulty: 1,
      tags: ["work"],
    },
    {
      id: "p6",
      it: "Oggi ho una riunione importante.",
      ru: "Сегодня у меня важная встреча.",
      context: "Повседневное",
      difficulty: 2,
      tags: ["daily", "work"],
    },
  ],
};
