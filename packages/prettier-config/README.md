# @kode-frontend/prettier-config

## 📥 Install

Add `@kode-frontend/prettier-config` dependency to your project.

```shell
# Using npm
npm i --save-dev @kode-frontend/prettier-config

# Using yarn
yarn add -D @kode-frontend/prettier-config

# Using pnpm
pnpm add -D @kode-frontend/prettier-config
```

## 🎮 Usage

There are three approaches to extend this shared config.

### 1. Reference it in your package.json

```json
{
  // ...
  "prettier": "@kode-frontend/prettier-config"
}
```

### 2. Use any of the supported extensions to export a string

```json
// .prettierrc.json

"@kode-frontend/prettier-config"
```

### 3. Overwrite some properties from the shared configuration

```javascript
//.prettierrc.js

module.exports = {
  ...require('@kode-frontend/prettier-config'),
  semi: true,
}
```

## 🙈 Ignoring Code

`Prettier` does not provide a full solution to share the `.prettierignore` file. But we can still share the file between projects using one of two approaches below.

### 1. Using `--ignore-path` CLI option

The simplest way to do this is using `--ignore-path` CLI option.

```bash
prettier ** --write --ignore-path node_modules/@kode-frontend/prettier-config/.prettierignore
```

By this way, there's no need to create a new file in your project folder. But you also can't extend the `.prettierignore` file.

### 2. Copy the ignore file to your project folder

If you want to extend the ignore file, run the following command in the root of your project folder:

```bash
# Unix
cp "node_modules/@kode-frontend/prettier-config\.prettierignore" ".prettierignore"

# Windows
copy "node_modules\@kode-frontend\prettier-config\.prettierignore" ".prettierignore"
```

It will copy the `.prettierignore` from `@kode-frontend/prettier-config` to your project root folder.

### Scripts

Some commonly used scripts in `package.json`.

```json
// package.json

{
  "scripts": {
    "prettier:fix": "prettier ** --write",
    "prettier:check": "prettier ** --list-different"
  }
}
```
