# KODE Frontend ecosystem

This is an awesome collection on frontend packages at [KODE](https://kode.ru).

## What's inside?

This monorepo includes the following packages:

### 📦 Packages

- `@kode-frontend/prettier-config`: a [Prettier](https://prettier.io/) configuration

- `@kode-frontend/eslint-config`: a [ESLint](https://eslint.org/) configuration

- `@kode-frontend/commitlint-config`: a collection of rules for [Commitlint](https://commitlint.js.org/)

- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)

- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

## 👨‍💻 Develop

To develop all packages, clone this repo and run the following command:

```
cd frontend-rules
pnpm dev
```

## 🛠️ Build

To build all packages, run the following command:

```
cd frontend-rules
pnpm build
```

## 🤿 Dive-in

Cool things used in this monorepo:

- 🏎 [Turborepo](https://turbo.build/) — High-performance build system for monorepos

- 🐞 [Lefthook](https://github.com/evilmartians/lefthook) — Git hooks manager

- 📋 [Changesets](https://github.com/changesets/changesets) — Managing versioning, publishing and changelogs

- 🔄 [Syncpack](https://github.com/JamieMason/syncpack) — Ensures consistent dependencies and package.json style within packages in monorepo

- 🛠 [GitHub Actions](https://github.com/changesets/action) — Running workflows in continuous integration
