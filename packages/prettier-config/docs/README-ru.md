# @kode-frontend/prettier-config

[![Version][version-badge]][package]

## 📥 Установка

Добавьте зависимость `@kode-frontend/prettier-config` в ваш проект.

```shell
# Используя npm
npm i --save-dev prettier @kode-frontend/prettier-config

# Используя yarn
yarn add -D prettier @kode-frontend/prettier-config

# Используя pnpm
pnpm add -D prettier @kode-frontend/prettier-config
```

## 🎮 Использование

Есть три способа расширить эту общую конфигурацию.

### 1. Ссылка на нее в вашем package.json

```json
{
  // ...
  "prettier": "@kode-frontend/prettier-config"
}
```

### 2. Используйте любое из поддерживаемых расширений

```json
// .prettierrc.json

"@kode-frontend/prettier-config"
```

### 3. Перезапись некоторых свойств из общей конфигурации

```javascript
//.prettierrc.js

module.exports = {
  ...require('@kode-frontend/prettier-config'),
  semi: true,
}
```

## 🙈 Игнорирование Кода

`Prettier` не предоставляет полного решения для общего использования файла `.prettierignore`. Но мы все равно можем делиться файлом между проектами, используя один из двух подходов ниже.

### 1. Использование опции CLI --ignore-path

Самый простой способ сделать это - использовать опцию CLI --ignore-path.

```bash
prettier ** --write --ignore-path node_modules/@kode-frontend/prettier-config/.prettierignore
```

Таким образом, нет необходимости создавать новый файл в папке вашего проекта. Но вы также не можете расширить файл `.prettierignore`.

### 2. Копирование файла ignore в папку вашего проекта

Если вы хотите расширить файл ignore, выполните следующую команду в корне папки вашего проекта:

```bash
# Unix
cp "node_modules/@kode-frontend/prettier-config\.prettierignore" ".prettierignore"

# Windows
copy "node_modules\@kode-frontend\prettier-config\.prettierignore" ".prettierignore"
```

Она скопирует .prettierignore из @kode-frontend/prettier-config в корень вашего проекта.

## Скрипты

Некоторые часто используемые скрипты в package.json.

```json
// package.json

{
  "scripts": {
    "prettier:fix": "prettier ** --write",
    "prettier:check": "prettier ** --list-different"
  }
}
```

[version-badge]: https://img.shields.io/npm/v/@kode-frontend/prettier-config.svg?style=flat-square
[package]: https://www.npmjs.com/package/@kode-frontend/prettier-config
