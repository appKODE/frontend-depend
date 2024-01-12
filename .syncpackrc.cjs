/** @type {import("syncpack").RcFile} */
module.exports = {
  dependencyTypes: ['dev', 'peer', 'prod'],
  semverRange: '^',
  source: ['package.json', 'packages/*/package.json'],
  versionGroups: [
    {
      label:
        'Internal config packages should be pinned to "*" (meaning any version is acceptable)',
      packages: ['**'],
      dependencies: ['eslint-config-internal'],
      dependencyTypes: ['dev'],
      pinVersion: '*',
    },
  ],
  semverGroups: [
    {
      range: '~',
      dependencies: ['**'],
      packages: ['@myrepo/library'],
    },
  ],
}
