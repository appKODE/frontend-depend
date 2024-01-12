// Variables
// These rules have to do with variable declarations.

module.exports = {
  rules: {
    'no-catch-shadow': 1, // disallow the catch clause parameter name being the same as a variable in the outer scope (off by default in the node environment)
    'no-delete-var': 1, // disallow deletion of variables
    'no-global-assign': 2, // disallow assignments to native objects or read-only global variables
    'no-label-var': 1, // disallow labels that share a name with a variable
    'no-shadow': 1, // disallow declaration of variables already declared in the outer scope
    'no-shadow-restricted-names': 1, // disallow shadowing of names such as arguments
    'no-undef': 2, // disallow use of undeclared variables unless mentioned in a /*global */ block
    'no-undefined': 0, // disallow use of undefined variable (off by default)
    'no-undef-init': 1, // disallow use of undefined when initializing variables
    'no-unused-vars': [
      1,
      { vars: 'all', args: 'none', ignoreRestSiblings: true },
    ], // disallow declaration of variables that are not used in the code
    'no-use-before-define': 0, // disallow use of variables before they are defined
  },
}
