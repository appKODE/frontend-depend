Описание [на русском](https://github.com/appKODE/frontend-depend/blob/main/docs/README-ru.md)

# KODE Frontend ecosystem

This is a collection of configuration files for frontend applications from [KODE](https://appkode.dev/).

### What's inside?

This monorepo includes the following packages:

## 📦 Packages

- `@kode-frontend/prettier-config`: a [Prettier](https://prettier.io/) configuration. [[Documentation](https://github.com/appKODE/frontend-depend/blob/main/packages/prettier-config)]

- `@kode-frontend/eslint-config`: a [ESLint](https://eslint.org/) configuration. [[Documentation](https://github.com/appKODE/frontend-depend/blob/main/packages/eslint-config)]

- `@kode-frontend/commitlint-config`: a [Commitlint](https://commitlint.js.org/) configuration. [[Documentation](https://github.com/appKODE/frontend-depend/blob/main/packages/commitlint-config)]

- `@kode-frontend/session-interceptor`: Session interceptor for handling jwt token update flow [[Documentation](https://github.com/appKODE/frontend-depend/tree/main/packages/session-interceptor)]

- `@kode-frontend/timeout-interceptor`: Interceptor adds TimeoutError to axios, you can check if the error is a timeout and execute your own logic. Actual for React Native apps. [[Documentation](https://github.com/appKODE/frontend-depend/tree/main/packages/timeout-interceptor)]

- `@kode-frontend/react-native-push-notification`: Push notification service for React Native apps [[Documentation](https://github.com/appKODE/frontend-depend/tree/main/packages/react-native-push-notification)]

- `@kode-frontend/pathfinder-web`: tool that allows to substitute the base URL for requests, helping with global error handling, testing, mocking, and more [[Documentation](https://github.com/appKODE/frontend-depend/tree/main/packages/pathfinder-web)]

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

## 📦 Making a Pull request

The [Changesets](https://github.com/changesets/changesets) tool is used to version and publish packages. If a PR affects the functionality of one of the packages, it must include a changeset.

The changesets file can be generated in two ways:

1. using the CLI command `pnpm changeset add`. After entering the command, you will be prompted to select the package in which the change was made, the release type (major, minor, patch) and enter a description of the change.
2. using [changeset bot](https://github.com/changesets/action). In this case, the page with the pull request will display a message with a 'No Changeset' banner and below a link to create a changeset - Click here if you're a maintainer who wants to add a changeset to this PR. Clicking on it generates and opens an md-file for editing. In it you should enter a clear description of the changes made in Russian, as well as add or remove package names (only if the bot has incorrectly identified them).

The change description can consist of any number of lines in md format. Here are a few peculiarities to pay attention to:

1. only the first line of the description is formatted (a hyphen "-" is added if there was none), the second and subsequent lines will go into CHANGELOG as you write them (the md markup will be preserved)
2. When adding a new component, you should specify '0.0.0' package version in package.json, specify major ('major') release type in the change set, and be sure to add the phrase 'new package $' in the description. An example is shown below.

```md
---
'@kode-frontend/session-interceptor': major
---

Added new package @kode-frontend/session-interceptor
```

## 🚀 Releases

After merging your PR into the main branch, GitHub Action will create a PR with all updated package versions and updated changelogs. If more PRs with additional changelogs are merged, the PR opened by GitHub Action will be updated.

Merging this PR, in addition to updating all changelogs, will trigger a GitHub Action release cycle in which it will publish every package not marked as `private`.
