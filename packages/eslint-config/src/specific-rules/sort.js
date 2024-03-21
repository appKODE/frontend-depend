module.exports = {
  plugins: ['perfectionist'],

  rules: {
    'react/jsx-boolean-value': 'warn',
    'perfectionist/sort-array-includes': [
      'warn',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'perfectionist/sort-interfaces': [
      'warn',
      {
        type: 'natural',
        order: 'asc',
        groups: ['id', 'unknown', 'predicate', 'callback'],
        'custom-groups': {
          id: 'id',
          predicate: 'is[A-Z]*',
          callback: 'on[A-Z]*',
        },
      },
    ],
    'perfectionist/sort-object-types': [
      'warn',
      {
        type: 'natural',
        order: 'asc',
        groups: ['id', 'unknown', 'predicate', 'callback'],
        'custom-groups': {
          id: 'id',
          predicate: 'is[A-Z]*',
          callback: 'on[A-Z]*',
        },
      },
    ],
    'perfectionist/sort-jsx-props': [
      'warn',
      {
        type: 'natural',
        order: 'asc',
        groups: ['key', 'id', 'shorthand', 'unknown', 'predicate', 'callback'],
        'custom-groups': {
          key: 'key',
          id: 'id',
          predicate: 'is[A-Z]*',
          callback: 'on[A-Z]*',
        },
      },
    ],
    // 'perfectionist/sort-maps': [
    //   'warn',
    //   {
    //     type: 'natural',
    //     order: 'asc',
    //   },
    // ],
    'perfectionist/sort-enums': [
      'warn',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'perfectionist/sort-named-exports': [
      'warn',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'perfectionist/sort-named-imports': [
      'warn',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'perfectionist/sort-objects': [
      'warn',
      {
        type: 'natural',
        order: 'asc',
        groups: ['id', 'unknown', 'predicate', 'callback'],
        'custom-groups': {
          id: 'id',
          predicate: 'is[A-Z]*',
          callback: 'on[A-Z]*',
        },
      },
    ],
    'perfectionist/sort-union-types': [
      'warn',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
  },
}
