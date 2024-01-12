# KODE Frontend ecosystem

This is an awesome collection on frontend configs at [KODE](https://kode.ru).

## What's inside?

This monorepo includes the following packages:

### 📦 Packages

- `@kode-frontend/prettier-config`: a [Prettier](https://prettier.io/) configuration

- `@kode-frontend/eslint-config`: a [ESLint](https://eslint.org/) configuration

- `@kode-frontend/commitlint-config`: a collection of rules for [Commitlint](https://commitlint.js.org/)

- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)

- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

## 🤿 Dive-in

Cool things used in this monorepo:

- 🏎 [Turborepo](https://turbo.build/) — High-performance build system for monorepos

- 🐞 [Lefthook](https://github.com/evilmartians/lefthook) — Git hooks manager

- 📋 [Changesets](https://github.com/changesets/changesets) — Managing versioning, publishing and changelogs

- 🔄 [Syncpack](https://github.com/JamieMason/syncpack) — Ensures consistent dependencies and package.json style within packages in monorepo

- 🛠 [GitHub Actions](https://github.com/changesets/action) — Running workflows in continuous integration

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

## 🚀 Versioning & Publishing Packages

- pnpm add-changeset - Generate a changeset file
- pnpm version-packages - Update versions, changelogs and dependencies of packages.
- pnpm release - Publishes changes to package registry and creates git tags.

The monorepo uses Changesets to manage versions, create changelogs, and publish to the package registry. You'll need to create an NPM_TOKEN and GITHUB_TOKEN and add it to your GitHub repository settings to enable access to the package registry.

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

Merging this PR will, along with updating all of the files it changed, make the GitHub Action trigger it's release cycle where it attempts to publish each package not marked as `private` within the workspaces package file.

### Snapshot Releases

Whenever you want to test a package in a consuming application before publishing a proper version for the wider public, we can create a snapshot release. These are special versions that take the form of `0.0.0-BRANCH_NAME-TIMESTAMP` e.g. `0.0.0-testing-snapshot-releases-20230226224821`. The branch name is also used as a dist-tag which points at the snapshot version e.g. `"@kode-frontend/prettier-config": "testing-snapshot-releases"`. The separate dist-tag ensures we don't touch the `latest` dist-tag which is the tag used to determine what version of a package gets installed whenever someone installs it via `pnpm install PACKAGE_NAME`.

To create a snapshot release we can use the manually dispatched 'Semantic Release' workflow. The sequence of operations is as follows:

1. Create a feature branch (e.g. `testing-snapshot-releases`) which contains changes to packages along with changeset files.

2. Manually dispatch the 'Snapshot Release' workflow and target it to run against the feature branch.

3.The workflow will run `changeset version` with the `--snapshot` argument to update changelog and package files using the version number `0.0.0-testing-snapshot-releases-TIMESTAMP`.

4.The `prerelease` command will build the project which ensures build files will be present for the upcoming publish.

5. The `changeset publish` command runs with the `--tag` argument set to the feature branch name and the `--no-git-tag` argument. Changesets will publish the version to the registry without creating / pushing a source control tag.
