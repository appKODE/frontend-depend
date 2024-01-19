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

## 🚀 Версионирование и публикация пакетов

- `pnpm add-changeset` - Генерация файла изменений (changeset)

- `pnpm version-packages` - Обновление версий, changelog'ов и зависимостей пакетов.

- `pnpm release` - Публикация изменений в реестре пакетов и создание git-тегов.

### Генерация Changelog'а

Для создания changelog'а запустите `pnpm add-changeset` локально:

1. **Какие пакеты вы хотите включить?** – Это покажет, какие пакеты изменились, а какие остались неизменными. По умолчанию ни один пакет не включен. Нажмите `пробел`, чтобы выбрать пакеты, которые вы хотите включить в changeset.

2. **Какие пакеты должны иметь мажорный апдейт?** – Нажмите `пробел`, чтобы выбрать пакеты, для которых вы хотите увеличить версии.

3. Если это первый мажорный апдейт, подтвердите, что хотите выпустить его.

4. Напишите краткое описание изменений.

5. Подтвердите, что changeset корректный.

6. В папке `changeset` будет создан новый файл Markdown с резюме и списком включенных пакетов.
   Эти файлы changeset'ов должны быть частью вашего PR и зафиксированы в основной ветке, готовые для будущей публикации.

Эти файлы changeset'ов должны быть частью вашего PR и зафиксированы в основной ветке, готовые для будущей публикации.

### Выпуск (Releasing)

После слияния вашего PR в основную ветку, GitHub Action создаст PR со всеми обновленными версиями пакетов и обновленными changelog'ами. Если будут слиты еще PR с дополнительными changeset'ами, то PR, открытый GitHub Action, будет обновлен.

Слияние этого PR, помимо обновления всех измененных файлов, вызовет цикл релиза GitHub Action, в котором он попытается опубликовать каждый пакет, не помеченный как `private`
