Описание [на русском](https://github.com/appKODE/frontend-depend/blob/main/docs/README-ru.md)

# KODE Frontend ecosystem

This is a collection of configuration files for frontend applications from [KODE](https://appkode.dev/).

### What's inside?

This monorepo includes the following packages:

## 📦 Packages

- `@kode-frontend/prettier-config`: a [Prettier](https://prettier.io/) configuration. [[Documentation](https://github.com/appKODE/frontend-depend/blob/main/packages/prettier-config)]

- `@kode-frontend/eslint-config`: a [ESLint](https://eslint.org/) configuration. [[Documentation](https://github.com/appKODE/frontend-depend/blob/main/packages/eslint-config)]

- `@kode-frontend/commitlint-config`: a [Commitlint](https://commitlint.js.org/) configuration. [[Documentation](https://github.com/appKODE/frontend-depend/blob/main/packages/commitlint-config)]

## 🤿 Dive-in

Cool things used in this monorepo:

- 🏎 [Turborepo](https://turbo.build/) — High-performance build system for monorepos

- 🐞 [Lefthook](https://github.com/evilmartians/lefthook) — Git hooks manager

- 📋 [Changesets](https://github.com/changesets/changesets) — Managing versioning, publishing and changelogs

- 🔄 [Syncpack](https://github.com/JamieMason/syncpack) — Ensures consistent dependencies and package.json style within packages in monorepo

- 🛠 [GitHub Actions](https://github.com/changesets/action) — Running workflows in continuous integration

## 👨‍💻 Develop

To develop all packages, clone this repo and run the following command:

```bash
cd frontend-depend
pnpm dev
```

## 🛠️ Build

To build all packages, run the following command:

```bash
cd frontend-depend
pnpm build
```

## 🚀 Versioning & Publishing Packages

- `pnpm add-changeset` - Generate a changeset file

- `pnpm version-packages` - Update versions, changelogs and dependencies of packages.

- `pnpm release` - Publishes changes to package registry and creates git tags.

The monorepo uses Changesets to manage versions, create changelogs, and publish to the package registry.

### Generating the Changelog

To generate your changelog, run `pnpm add-changeset` locally:

1. **Which packages would you like to include?** – This shows which packages and changed and which have remained the same. By default, no packages are included. Press `space` to select the packages you want to include in the changeset.

2. **Which packages should have a major bump?** – Press `space` to select the packages you want to bump versions for.

3. If doing the first major version, confirm you want to release.

4. Write a summary for the changes.

5. Confirm the changeset looks as expected.

6. A new Markdown file will be created in the `changeset` folder with the summary and a list of the packages included.
   These changeset files should be part of your PR and committed into the trunk branch, ready for future release.

These changeset files should be part of your PR and committed into the trunk branch, ready for future release.

### Releasing

When you merge your PR into the trunk branch, the GitHub Action will create a PR with all of the package versions updated and changelogs updated. If more PRs get merged with more changesets then the PR opened by the GitHub Action will be updated.

Merging this PR will, along with updating all of the files it changed, make the GitHub Action trigger it's release cycle where it attempts to publish each package not marked as `private`
