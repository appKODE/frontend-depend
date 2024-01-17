// Best Practices
// These are rules designed to prevent you from making mistakes. They either prescribe a better way of doing something or help you avoid footguns.

module.exports = {
  rules: {
    /**
     * Legacy (compatibility with JSHint and JSLint)
     */

    'max-depth': 0, // specify the maximum depth that blocks can be nested (off by default)
    'max-len': 0, // specify the maximum length of a line in your program (off by default)
    'max-params': 0, // limits the number of parameters that can be used in the function declaration. (off by default)
    'max-statements': 0, // specify the maximum number of statement allowed in a function (off by default)
    'no-bitwise': 1, // disallow use of bitwise operators (off by default)
    'no-plusplus': 0, // disallow use of unary operators, ++ and -- (off by default)

    'block-scoped-var': 0, // treat var statements as if they were block scoped (off by default)
    complexity: 0, // specify the maximum cyclomatic complexity allowed in a program (off by default)
    'consistent-return': 0, // require return statements to either always or never specify values
    curly: 1, // specify curly brace conventions for all control statements
    'default-case': 0, // require default case in switch statements (off by default)
    'dot-notation': 1, // encourages use of dot notation whenever possible
    eqeqeq: [1, 'allow-null'], // require the use of === and !==
    'guard-for-in': 0, // make sure for-in loops have an if statement (off by default)
    'no-alert': 1, // disallow the use of alert, confirm, and prompt
    'no-caller': 1, // disallow use of arguments.caller or arguments.callee
    'no-div-regex': 1, // disallow division operators explicitly at beginning of regular expression (off by default)
    'no-else-return': 0, // disallow else after a return in an if (off by default)
    'no-eq-null': 0, // disallow comparisons to null without a type-checking operator (off by default)
    'no-eval': 2, // disallow use of eval()
    'no-extend-native': 1, // disallow adding to native types
    'no-extra-bind': 1, // disallow unnecessary function binding
    'no-fallthrough': 1, // disallow fallthrough of case statements
    'no-floating-decimal': 1, // disallow the use of leading or trailing decimal points in numeric literals (off by default)
    'no-implied-eval': 1, // disallow use of eval()-like methods
    'no-labels': 1, // disallow use of labeled statements
    'no-iterator': 1, // disallow usage of __iterator__ property
    'no-lone-blocks': 1, // disallow unnecessary nested blocks
    'no-loop-func': 0, // disallow creation of functions within loops
    'no-multi-str': 0, // disallow use of multiline strings
    'no-native-reassign': 0, // disallow reassignments of native objects
    'no-new': 1, // disallow use of new operator when not part of the assignment or comparison
    'no-new-func': 2, // disallow use of new operator for Function object
    'no-new-wrappers': 1, // disallows creating new instances of String,Number, and Boolean
    'no-octal': 1, // disallow use of octal literals
    'no-octal-escape': 1, // disallow use of octal escape sequences in string literals, such as var foo = "Copyright \251";
    'no-proto': 1, // disallow usage of __proto__ property
    'no-redeclare': 0, // disallow declaring the same variable more then once
    'no-return-assign': 1, // disallow use of assignment in return statement
    'no-script-url': 1, // disallow use of javascript: urls.
    'no-self-compare': 1, // disallow comparisons where both sides are exactly the same (off by default)
    'no-sequences': 1, // disallow use of comma operator
    'no-unused-expressions': 0, // disallow usage of expressions in statement position
    'no-useless-escape': 1, // disallow escapes that don't have any effect in literals
    'no-void': 1, // disallow use of void operator (off by default)
    'no-warning-comments': 0, // disallow usage of configurable warning terms in comments": 1,                        // e.g. TODO or FIXME (off by default)
    'no-with': 1, // disallow use of the with statement
    radix: 1, // require use of the second argument for parseInt() (off by default)
    'semi-spacing': 1, // require a space after a semi-colon
    'vars-on-top': 0, // requires to declare all vars on top of their containing scope (off by default)
    'wrap-iife': 0, // require immediate function invocation to be wrapped in parentheses (off by default)
    yoda: 1, // require or disallow Yoda conditions
  },
}
