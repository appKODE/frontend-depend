# @kode-frontend/eslint-config

## 📥 Установка

Добавьте зависимость `@kode-frontend/eslint-config` в ваш проект.

```shell
# Используя npm
npm install --save-dev eslint prettier @kode-frontend/eslint-config

# Используя yarn
yarn add -D eslint prettier @kode-frontend/eslint-config

# Используя pnpm
pnpm install -D eslint prettier @kode-frontend/eslint-config
```

## 🎮 Использование

Есть две конфигурации для расширения этой общей конфигурации.

### 1. React (web)

Содержит:

- React
- TypeScript
- Jest

```json
// .eslintrc.cjs

{
  "extends": ["@kode-frontend/eslint-config/web"]
}
```

### 2. React Native (mobile)

Содержит:

- React Native
- TypeScript
- Jest

```json
// .eslintrc.cjs

{
  "extends": ["@kode-frontend/eslint-config/native"]
}
```

## 📖 Конфигурация с сортировкой

Вы также можете добавить сортировку конфигурации в общую конфигурацию, добавив в свойство `extends`:

```json
// .eslintrc.cjs

{
  "extends": [
    "@kode-frontend/eslint-config/{web,native}",
    "@kode-frontend/eslint-config/sort"
  ]
}
```

Она сортирует `enums`, `interfaces`, `jsx props`, `maps`, `object types`, `objects`, `union types` и др. [В этой документации]() вы найдете больше подробностей.

Она может быть полезна, чтобы diff был легко читаемый, или чтобы код был консистентным.

## 📝 Конфигурация

Вы можете переопределить правила из общей конфигурации, установив свои значения внутри свойства `rules`:

```json
// .eslintrc.cjs

{
  "extends": "@kode-frontend/eslint-config/{web,native}",
  "rules": {
    "react/jsx-newline": "warn"
  }
}
```

Вам также может потребоваться добавить следующее в вашу конфигурацию ESLint, если возникнет ошибка о том, что Jest не может определить версию:

```json
// .eslintrc.cjs

{
  "settings": {
    "jest": { "version": "detect" }
  }
}
```

## Скрипты

Некоторые часто используемые скрипты в package.json.

```json
// package.json

{
  "scripts": {
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --fix --ext ts,tsx"
  }
}
```
