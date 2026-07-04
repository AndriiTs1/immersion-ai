# IntegrationAI — Content Matrix

Таблица покрытия контента по 12 этапам. Используется как чек-лист при написании фраз и диалогов.

---

## Структура одного этапа (24 фразы)

| Блок | Количество | Описание |
|------|-----------|----------|
| Произношение | 3 | Специфические звуки итальянского в контексте темы |
| Личные фразы | 4 | Про реальную жизнь пользователя (обязательно) |
| Базовые конструкции A1 | 7 | Короткие, частотные, разговорные |
| Расширенные фразы A2 | 7 | Чуть сложнее, с новой грамматикой этапа |
| Повторение предыдущего | 3 | Фразы из прошлых этапов в новом контексте |

Итого: 24 фразы на этап

---

## Матрица покрытия

| Этап | Тема | Ключевые слова | Глаголы | Грамматика | Диалог | Фразы |
|------|------|---------------|---------|-----------|--------|-------|
| 1 | Я и моя жизнь | famiglia, lavoro, sport, casa | essere, avere, chiamarsi, vivere, lavorare | Presente базовый | Знакомство с соседом | ⬜ 0/24 |
| 2 | Кафе и ресторан | caffè, menu, conto, tavolo | prendere, volere, preferire, pagare | Presente + vorrei | Заказ кофе | ⬜ 7/24 |
| 3 | Магазин и рынок | prezzo, cassa, taglia, offerta | cercare, comprare, costare, avere bisogno | Presente + quanto costa | Покупка продуктов | ⬜ 7/24 |
| 4 | Работа и технологии | progetto, cliente, riunione, scadenza | lavorare, creare, cercare, inviare | Presente + stare + gerundio | Знакомство с работодателем | ⬜ 7/24 |
| 5 | Транспорт и город | fermata, biglietto, parcheggio, uscita | andare, prendere, arrivare, scendere | Presente + preposizioni luogo | Маршрут автобуса | ⬜ 7/24 |
| 6 | Врач и здоровье | febbre, dolore, ricetta, appuntamento | sentirsi, fare male, avere bisogno, portare | Presente + Passato Prossimo | Запись к врачу | ⬜ 7/24 |
| 7 | Аптека и SUVA | farmaco, dose, assicurazione, fattura | cercare, prendere, inviare, funzionare | Passato Prossimo + dovere/potere | В аптеке | ⬜ 0/24 |
| 8 | Дом и соседи | affitto, vicino, spazzatura, riscaldamento | abitare, parlare, dovere, raccogliere | Presente + Passato + Imperfetto начало | Разговор с соседом | ⬜ 0/24 |
| 9 | Школа и дети | maestro, orario, compiti, iscrizione | andare, finire, contattare, iscrivere | Presente + Imperfetto | Родительское собрание | ⬜ 0/24 |
| 10 | Банк и администрация | permesso, bolletta, dichiarazione, sportello | rinnovare, pagare, presentare, trovare | Presente + Futuro начало | В comune | ⬜ 0/24 |
| 11 | Спорт и свободное время | piscina, corsa, escursione, abbonamento | nuotare, correre, iscriversi, fare | Presente + Futuro + frequenza | Запись в бассейн | ⬜ 0/24 |
| 12 | Small talk | tempo, stagione, opinione, accordo | stare, sembrare, pensare, capire | Tutti i tempi + idiomatiche | Small talk с соседом | ⬜ 0/24 |

---

## Прогресс контента

### Фразы (phrases.ts)
- Этапы 1-7: ✅ 24/24 каждый
- Этапы 8-12: ⬜ 0/24 (не написаны)

### Диалоги (dialogs.ts)
- Этапы 1-7: ✅ написаны (6 реплик каждый)
- Этапы 8-12: ⬜ не написаны

### Грамматика (grammar.ts)
- Все 7 дней: ✅ написаны (глаголы × 4 времени × 10 фраз)
- Привязка к этапам: ⬜ нужно выровнять с Blueprint

---

## Следующие шаги по контенту

1. Дописать Этап 1 до 24 фраз (добавить блок произношения и повторения)
2. Расширить Этапы 2-7 с 7 до 24 фраз каждый
3. Написать Этапы 8-12 с нуля (фразы + диалоги)
4. Выровнять grammar.ts с этапами Blueprint

---

## Правила написания фраз

1. Каждая фраза должна быть произносимой вслух за 3-5 секунд
2. Перевод точный, без украшений
3. context описывает ситуацию использования
4. tags обязательно включают номер этапа: stage-1, stage-2 и т.д.
5. difficulty: 1 = A1, 2 = A2, 3 = B1
6. Личные фразы всегда содержат тег personal
7. Фразы произношения содержат тег pronunciation + звук: gli, gn, ce, ci, sce, sci
