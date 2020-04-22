module.exports = {
    "env": {
        "browser": true,
        "commonjs": true
    },
    "extends": [
      "eslint:recommended",
      "node"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [2, "always"],
        "no-use-before-define": ["warn", { "functions": true, "classes": true }],
        "no-restricted-imports": ["warn"],
        "no-console": [1, { "allow": ["info", "error"] }],
        "padding-line-between-statements": [
            "error",
            {"blankLine": "always", "prev": ["const", "let", "var"], "next": "*"},
            {"blankLine": "any",    "prev": ["const", "let", "var"], "next": ["const", "let", "var"]},
            {"blankLine": "always", "prev": "*", "next": "return"},
            {"blankLine": "always", "prev": "directive", "next": "*" },
            {"blankLine": "any", "prev": "directive", "next": "directive"},
            {"blankLine": "always", "prev": "import", "next": "*" },
            {"blankLine": "any", "prev": "import", "next": "import"},
            {"blankLine": "any", "prev": ["const", "let", "var"], "next": "export" },
            {"blankLine": "any", "prev": "export", "next": "export"},
            {"blankLine": "always", "prev": "function", "next": "*" },
            {"blankLine": "always", "prev": "*", "next": "function" },
            {"blankLine": "always", "prev": "block-like", "next": "*" },
            {"blankLine": "always", "prev": "*", "next": "block-like" },
            {"blankLine": "always", "prev": "class", "next": "*" },
            {"blankLine": "always", "prev": "*", "next": "class" }
        ]
    }
}
