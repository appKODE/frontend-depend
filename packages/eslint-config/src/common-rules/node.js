module.exports = {
  rules: {
    'handle-callback-err': 1, // enforces error handling in callbacks (off by default) (on by default in the node environment)
    'no-mixed-requires': 1, // disallow mixing regular variable and require declarations (off by default) (on by default in the node environment)
    'no-new-require': 1, // disallow use of new operator with the require function (off by default) (on by default in the node environment)
    'no-path-concat': 1, // disallow string concatenation with __dirname and __filename (off by default) (on by default in the node environment)
    'no-process-exit': 0, // disallow process.exit() (on by default in the node environment)
    'no-restricted-modules': 1, // restrict usage of specified node modules (off by default)
    'no-sync': 0, // disallow use of synchronous methods (off by default)
  },
}
