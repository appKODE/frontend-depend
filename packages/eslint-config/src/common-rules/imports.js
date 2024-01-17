module.exports = {
  plugins: ['perfectionist'],

  rules: {
    'perfectionist/sort-imports': [
      'warn',
      {
        groups: [
          'type',
          'react',
          ['builtin', 'external'],
          'fsd',
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'side-effect',
          'style',
          'object',
          'unknown',
        ],
        'custom-groups': {
          value: {
            react: ['react', 'react-dom/*', 'react-native', 'react-native/*'],
            fsd: [
              '@app/**',
              '@entities/**',
              '@pages/**',
              '@shared/**',
              '@widgets/**',
            ],
          },
          type: {
            react: ['react', 'react-dom/*', 'react-native', 'react-native/*'],
          },
        },
        'newlines-between': 'always',
      },
    ],
  },
}
