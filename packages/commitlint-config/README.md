# @kode-frontend/commitlint-config

[![Version][version-badge]][package]

## 📥 Install

Add `@kode-frontend/commitlint-config` dependency to your project.

```shell
# Using npm
npm i --save-dev @kode-frontend/commitlint-config

# Using yarn
yarn add -D @kode-frontend/commitlint-config

# Using pnpm
pnpm add -D @kode-frontend/commitlint-config
```

## 🎮 Usage

There are two approaches to extend this shared config.

### 1. (Preferred) Reference it in your package.json

```javascript
// commitlint.config.js

module.exports = {
  extends: ['@kode-frontend/commitlint-config'], // => @kode-frontend/commitlint-config
}
```

### 2. Or just the scope/owner of the package.

Just like "normal" extends listed above, this will add `<scope>/commitlint-config`.

```javascript
// commitlint.config.js

module.exports = {
  extends: ['@kode-frontend'], // => @kode-frontend/commitlint-config
}
```

[version-badge]: https://img.shields.io/npm/v/@kode-frontend/commitlint-config.svg?style=flat-square
[package]: https://www.npmjs.com/package/@kode-frontend/commitlint-config
