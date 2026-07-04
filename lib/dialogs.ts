type DialogLine = {
  id: string;
  speaker: "A" | "B";
  it: string;
  ru: string;
};

type DayDialog = {
  day: number;
  title: string;
  scenario: string;
  lines: DialogLine[];
};

export const dialogs: DayDialog[] = [
  {
    day: 1,
    title: "Знакомство",
    scenario: "Встреча с новым соседом",
    lines: [
      { id: "1-1", speaker: "A", it: "Ciao! Come ti chiami?", ru: "Привет! Как тебя зовут?" },
      { id: "1-2", speaker: "B", it: "Mi chiamo Andrii. E tu?", ru: "Меня зовут Андрей. А тебя?" },
      { id: "1-3", speaker: "A", it: "Io mi chiamo Marco. Piacere!", ru: "Меня зовут Марко. Приятно!" },
      { id: "1-4", speaker: "B", it: "Piacere mio! Di dove sei?", ru: "Мне тоже приятно! Откуда ты?" },
      { id: "1-5", speaker: "A", it: "Sono italiano. E tu?", ru: "Я итальянец. А ты?" },
      { id: "1-6", speaker: "B", it: "Vengo dall'Ucraina, ma vivo qui a Lugano.", ru: "Я из Украины, но живу здесь в Лугано." },
    ],
  },
  {
    day: 2,
    title: "В кафе",
    scenario: "Заказ кофе",
    lines: [
      { id: "2-1", speaker: "A", it: "Buongiorno! Cosa prende?", ru: "Доброе утро! Что будете?" },
      { id: "2-2", speaker: "B", it: "Un caffè, per favore.", ru: "Кофе, пожалуйста." },
      { id: "2-3", speaker: "A", it: "Subito. Vuole anche qualcosa da mangiare?", ru: "Сейчас. Хотите что-нибудь поесть?" },
      { id: "2-4", speaker: "B", it: "No grazie, solo il caffè. Quant'è?", ru: "Нет спасибо, только кофе. Сколько стоит?" },
      { id: "2-5", speaker: "A", it: "Un euro e cinquanta.", ru: "Полтора евро." },
      { id: "2-6", speaker: "B", it: "Ecco a lei. Grazie!", ru: "Вот, пожалуйста. Спасибо!" },
    ],
  },
  {
    day: 3,
    title: "На работе",
    scenario: "Знакомство с коллегой",
    lines: [
      { id: "3-1", speaker: "A", it: "Ciao, sei nuovo qui?", ru: "Привет, ты здесь новый?" },
      { id: "3-2", speaker: "B", it: "Sì, ho iniziato oggi. Mi chiamo Andrea.", ru: "Да, я начал сегодня. Меня зовут Андрей." },
      { id: "3-3", speaker: "A", it: "Benvenuto! Io sono Sara. Di cosa ti occupi?", ru: "Добро пожаловать! Я Сара. Чем ты занимаешься?" },
      { id: "3-4", speaker: "B", it: "Sono sviluppatore. Lavoro con l'AI.", ru: "Я разработчик. Работаю с ИИ." },
      { id: "3-5", speaker: "A", it: "Interessante! Anch'io lavoro con i dati.", ru: "Интересно! Я тоже работаю с данными." },
      { id: "3-6", speaker: "B", it: "Ottimo, potremo collaborare!", ru: "Отлично, сможем сотрудничать!" },
    ],
  },
  {
    day: 4,
    title: "В магазине",
    scenario: "Покупка продуктов",
    lines: [
      { id: "4-1", speaker: "A", it: "Buonasera! Posso aiutarla?", ru: "Добрый вечер! Могу помочь?" },
      { id: "4-2", speaker: "B", it: "Sì, cerco del pane fresco.", ru: "Да, ищу свежий хлеб." },
      { id: "4-3", speaker: "A", it: "Eccolo qui. Vuole altro?", ru: "Вот он. Хотите ещё что-нибудь?" },
      { id: "4-4", speaker: "B", it: "Sì, mi serve anche del latte.", ru: "Да, мне нужно ещё молоко." },
      { id: "4-5", speaker: "A", it: "Quanto ne vuole?", ru: "Сколько вам нужно?" },
      { id: "4-6", speaker: "B", it: "Un litro, grazie. Quanto costa tutto?", ru: "Один литр, спасибо. Сколько всё стоит?" },
    ],
  },
  {
    day: 5,
    title: "Транспорт",
    scenario: "На автобусной остановке",
    lines: [
      { id: "5-1", speaker: "A", it: "Scusi, questo autobus va in centro?", ru: "Извините, этот автобус едет в центр?" },
      { id: "5-2", speaker: "B", it: "Sì, ci vuole circa venti minuti.", ru: "Да, это займёт около двадцати минут." },
      { id: "5-3", speaker: "A", it: "Grazie. Sa quando passa il prossimo?", ru: "Спасибо. Знаете когда следующий?" },
      { id: "5-4", speaker: "B", it: "Tra cinque minuti, credo.", ru: "Через пять минут, думаю." },
      { id: "5-5", speaker: "A", it: "Perfetto. È la prima volta che viene a Lugano?", ru: "Отлично. Вы впервые в Лугано?" },
      { id: "5-6", speaker: "B", it: "No, vivo qui da un anno.", ru: "Нет, я живу здесь уже год." },
    ],
  },
  {
    day: 6,
    title: "У врача",
    scenario: "Запись к врачу",
    lines: [
      { id: "6-1", speaker: "A", it: "Buongiorno, come posso aiutarla?", ru: "Доброе утро, чем могу помочь?" },
      { id: "6-2", speaker: "B", it: "Vorrei fissare un appuntamento con il dottore.", ru: "Я хотел бы записаться к врачу." },
      { id: "6-3", speaker: "A", it: "Per quando?", ru: "На когда?" },
      { id: "6-4", speaker: "B", it: "Prima possibile, per favore. Non mi sento bene.", ru: "Как можно скорее, пожалуйста. Я плохо себя чувствую." },
      { id: "6-5", speaker: "A", it: "Può venire domani mattina alle nove?", ru: "Вы можете прийти завтра утром в девять?" },
      { id: "6-6", speaker: "B", it: "Sì, perfetto. Grazie mille.", ru: "Да, отлично. Большое спасибо." },
    ],
  },
  {
    day: 7,
    title: "Ресторан",
    scenario: "Ужин в ресторане",
    lines: [
      { id: "7-1", speaker: "A", it: "Buonasera! Ha la prenotazione?", ru: "Добрый вечер! У вас есть бронь?" },
      { id: "7-2", speaker: "B", it: "Sì, ho prenotato per due persone.", ru: "Да, я забронировал на двух человек." },
      { id: "7-3", speaker: "A", it: "Benissimo. Ecco il menu.", ru: "Отлично. Вот меню." },
      { id: "7-4", speaker: "B", it: "Grazie. Cosa consiglia oggi?", ru: "Спасибо. Что вы рекомендуете сегодня?" },
      { id: "7-5", speaker: "A", it: "Il risotto ai funghi è ottimo stasera.", ru: "Ризотто с грибами сегодня великолепно." },
      { id: "7-6", speaker: "B", it: "Perfetto, prendo quello. E una bottiglia d'acqua.", ru: "Отлично, возьму это. И бутылку воды." },
    ],
  },
];

export type { DayDialog, DialogLine };
