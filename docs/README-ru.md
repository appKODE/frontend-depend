# Экосистема KODE Frontend

Это коллекция конфигураций для фронтенд приложений от [KODE](https://appkode.dev/).

### Что внутри?

Этот монорепозиторий включает в себя следующие пакеты:

## 📦 Пакеты

- `@kode-frontend/prettier-config`: [Prettier](https://prettier.io/) конфигурация. [[Документация](https://github.com/appKODE/frontend-depend/blob/main/packages/prettier-config)]

- `@kode-frontend/eslint-config`: [ESLint](https://eslint.org/) конфигурация. [[Документация](https://github.com/appKODE/frontend-depend/blob/main/packages/eslint-config)]

- `@kode-frontend/commitlint-config`: [Commitlint](https://commitlint.js.org/) конфигурация. [[Документация](https://github.com/appKODE/frontend-depend/blob/main/packages/commitlint-config)]

## 🤿 Погружение в детали

Интересные вещи, использованные в этом монорепозитории:

- 🏎 [Turborepo](https://turbo.build/) — Высокопроизводительная система сборки для монорепозиториев

- 🐞 [Lefthook](https://github.com/evilmartians/lefthook) — Менеджер Git-хуков

- 📋 [Changesets](https://github.com/changesets/changesets) — Управление версиями, публикациями и changelogs

- 🔄 [Syncpack](https://github.com/JamieMason/syncpack) — Обеспечивает согласованные зависимости и стиль package.json внутри пакетов в монорепо

- 🛠 [GitHub Actions](https://github.com/changesets/action) — Запуск рабочих процессов в непрерывной интеграции

## 👨‍💻 Разработка

Для разработки всех пакетов клонируй этот репозиторий и выполни следующую команду:

```bash
cd frontend-depend
pnpm dev
```

## 🛠️ Сборка

Для сборки всех пакетов выполни следующую команду:

```bash
cd frontend-depend
pnpm build
```

## 📦 Выставление Pull request-а

Для версионирования и публикации пакетов используется инструмент [Changesets](https://github.com/changesets/changesets). Если PR затрагивает функциональность одного из пакетов, то он должен включать в себя набор изменений.

Файл с набором изменений можно сгенерировать двумя способами:

1. с помощью CLI команды `pnpm changeset add`. После ввода команды будет предложено выбрать пакет, в котором было произведено изменение, тип релиза (major, minor, patch) и ввести описание изменения.
2. с помощью [changeset bot](https://github.com/changesets/action). В этом случае на странице с pull request-ом будет отображено сообщение с баннером 'No Changeset' и ниже ссылка для создания набора изменений - Click here if you're a maintainer who wants to add a changeset to this PR. По клику на нее генерируется и открывается на редактирование md-файл. В нем нужно ввести понятное описание сделанных изменений на русском языке, а также добавить или удалить названия пакетов (только в случае если бот неверно их определил).

Описание изменения может состоять из произвольного количества строк в формате md. Вот несколько особенностей, на которые стоит обращать внимание:

1. форматируется только первая строка описания (добавляется дефис "-", если его не было), вторая и последующие строки попадут в CHANGELOG так, как вы их запишете (сохранится разметка md)
2. при добавлении нового компонента нужно указать '0.0.0' версию пакета в package.json, в наборе изменений указать мажорный ('major') тип релиза, а в описание обязательно добавить фразу 'Добавлен новый пакет $'. Пример приведен ниже.

```md
---
'@kode-frontend/session-interceptor': major
---

Добавлен новый пакет @kode-frontend/session-interceptor
```

## 🚀 Релизы

После слияния вашего PR в основную ветку, GitHub Action создаст PR со всеми обновленными версиями пакетов и обновленными changelog'ами. Если будут слиты еще PR с дополнительными changeset'ами, то PR, открытый GitHub Action, будет обновлен.

Слияние этого PR, помимо обновления всех измененных файлов, вызовет цикл релиза GitHub Action, в котором он опубликует каждый пакет, не помеченный как `private`.
