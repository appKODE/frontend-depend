Описание [на русском](#)

# @kode-frontend/eslint-config

## 📥 Install

Add `@kode-frontend/eslint-config` dependency to your project.

```shell
# Using npm
npm install --save-dev @kode-frontend/eslint-config

# Using yarn
yarn add -D @kode-frontend/eslint-config

# Using pnpm
pnpm install -D @kode-frontend/eslint-config
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
