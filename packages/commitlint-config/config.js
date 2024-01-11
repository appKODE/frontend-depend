module.exports = {
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'header-max-length': [2, 'always', 128],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],

    // Available commit scopes
    'type-enum': [
      2,
      'always',
      [
        /**
         * A new feature */
        'feat',

        /**
         * A bug fix */
        'fix',

        /**
         * Documentation only changes (Readme, Changelog, etc.) */
        'docs',

        /**
         * Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) */
        'style',

        /**
         * Code Refactoring ¯\_(ツ)_/¯ */
        'refactor',

        /**
         * A code change that improves performance */
        'perf',

        /**
         * Adding missing tests or correcting existing tests */
        'test',

        /**
         * Changes that affect the build system or external dependencies (example scopes: tsconfig, yarn, npm, etc.) */
        'build',

        /**
         * Changes to our CI configuration (example scopes: GitLab-CI, Travis-CI, CircleCI, etc.) */
        'ci',

        /**
         * Other changes that don't modify src or test files */
        'chore',
      ],
    ],
  },
}
