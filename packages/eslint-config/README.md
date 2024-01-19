Описание [на русском](https://github.com/appKODE/frontend-depend/blob/main/packages/eslint-config/docs/README-ru.md)

# @kode-frontend/eslint-config

[![Version][version-badge]][package]

## 📥 Install

Add `@kode-frontend/eslint-config` dependency to your project.

```shell
# Using npm
npm install --save-dev eslint@^8 prettier @kode-frontend/eslint-config

# Using yarn
yarn add -D eslint@^8 prettier @kode-frontend/eslint-config

# Using pnpm
pnpm install -D eslint@^8 prettier @kode-frontend/eslint-config
```

## 🎮 Usage

There are two configurations to extend this shared config.

### 1. React (web)

Contains:

- React
- Typescript
- Jest

```json
// .eslintrc.cjs

{
  "extends": ["@kode-frontend/eslint-config/web"]
}
```

### 2. React Native (mobile)

Contains:

- React Native
- Typescript
- Jest

```json
// .eslintrc.cjs

{
  "extends": ["@kode-frontend/eslint-config/native"]
}
```

## 📖 Sort configurations

You can optionally add sort configuration to the web and native configs.

```json
// .eslintrc.cjs

{
  "extends": [
    "@kode-frontend/eslint-config/{web/native}",
    "@kode-frontend/eslint-config/sort"
  ]
}
```

It will sort the enums, interfaces, jsx props, maps, object types, objects, union types, and more. You can find more details in [this documentation]().

It can be useful to have a diff that is easier to read, or to have consistent code.

## 📝 Configuration

You can _override rules_ from the shared configuration, by setting your own values within the rules property:

```json
// .eslintrc.cjs

{
  "extends": "@kode-frontend/eslint-config/{web,native}",
  "rules": {
    "react/jsx-newline": "warn"
  }
}
```

You might also need to add the following to your ESLint config if you get an error about Jest not being able to detect the version:

```json
// .eslintrc.cjs

{
  "settings": {
    "jest": { "version": "detect" }
  }
}
```

### Scripts

Some commonly used scripts in `package.json`.

```json
// package.json

{
  "scripts": {
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --fix --ext ts,tsx"
  }
}
```

## 🐛 Possible problems

### React-Native

If you get an error about "EEXIST: file already exists, mkdir \* info ..."

Just uninstall `@kode-frontend/eslint-config`.

[version-badge]: https://img.shields.io/npm/v/@kode-frontend/eslint-config.svg?style=flat-square
[package]: https://www.npmjs.com/package/@kode-frontend/eslint-config
