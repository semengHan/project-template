/* eslint-env node */
const isTsProject = fs.existsSync(
  path.join(process.cwd() || ".", "./tsconfig.json")
);
module.exports = {
  root: true,
  env: { browser: true, es2020: true, jest: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh", "react", "jest", "react-hooks", "prettier"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    "max-len": ["error", 150, 2], // 一行的字符不能超过150
    strict: ["error", "never"],
    "react/display-name": 0,
    "react/jsx-props-no-spreading": 0,
    "react/state-in-constructor": 0,
    "react/static-property-placement": 0,
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    "react/destructuring-assignment": "off",
    "react/jsx-filename-extension": "off", // 关闭 jsx 文件后缀检测 [1, { extensions: ['.js', '.jsx', '.tsx'] }]
    "react/no-array-index-key": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/require-default-props": 0,
    "react/jsx-fragments": 0,
    "react/jsx-wrap-multilines": 0,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/prop-types": 0,
    "react/forbid-prop-types": 0,
    "react/sort-comp": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-one-expression-per-line": 1, // 限制 jsx 每行一个表达式
    "react/function-component-definition": 0,
    "react/no-unstable-nested-components": ["warn", { allowAsProps: true }],
    "generator-star-spacing": 0,
    "func-names": 0,
    "function-paren-newline": 0,
    quotes: ["error", "single"], // 引号配置
    "jsx-quotes": ["error", "prefer-double"],
    "sort-imports": 0,
    semi: ["error", "always"],
    indent: 0, // 禁止缩进错误
    "no-tabs": "off", // 关闭不允许使用 no-tabs
    "no-console": 0,
    "no-underscore-dangle": 0, // 设置不冲突 underscore 库
    "no-return-assign": 0, // 函数可以没有返回值
    "arrow-body-style": [2, "as-needed"], // 箭头函数直接返回的时候不需要 大括号 {}
    "no-alert": 0,
    "no-plusplus": 0,
    "no-restricted-syntax": 0, // 允许使用 for in
    "guard-for-in": 0,
    "consistent-return": 0, // 不需要每次都有返回
    "prefer-rest-params": 0, // 允许使用 arguments
    "no-return-await": 0, // 允许返回 await
    "no-use-before-define": 0, // 不必在使用前定义 函数
    "no-trailing-spaces": 0, // 允许代码后面空白
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/no-static-element-interactions": 0, // 有一些 event 的时候，不需要 role 属性，不需要其他解释
    "jsx-a11y/click-events-have-key-events": 0,
    "lines-between-class-members": 0, // 类成员之间空行问题
    "import/no-extraneous-dependencies": 0, // 不区分是否在 despendencies
    "import/no-unresolved": 0, // 确保导入指向可以解析的文件/模块 by eslint-plugin-import
    "import/no-import-module-exports": 0,
    "react/jsx-closing-bracket-location": [0, "after-props"], // jsx > 紧跟着属性
    // 不区分是否是 无状态组件
    "import/extensions": [
      "off",
      "always",
      {
        js: "never",
        ts: "never",
        tsx: "never",
        vue: "never",
      },
    ],

    "class-methods-use-this": 0,
    "no-confusing-arrow": 0,
    "linebreak-style": 0,
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",
    "unicorn/prevent-abbreviations": "off",
    // Conflict with prettier
    "arrow-parens": 0,
    "object-curly-newline": 0,
    "implicit-arrow-linebreak": 0,
    "operator-linebreak": 0,
    "no-param-reassign": 2, // 设置是否可以重新改变参数的值
    "space-before-function-paren": 0,
    "react/self-closing-comp": 1,
    "react/jsx-key": 1,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: isTsProject
          ? [".js", ".jsx", ".ts", ".tsx", ".d.ts"]
          : [".js", ".jsx"],
      },
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx", ".d.ts"],
    },
    "import/extensions": [".js", ".mjs", ".jsx", ".ts", ".tsx", ".d.ts"],
    "import/external-module-folders": ["node_modules", "node_modules/@types"],
    polyfills: ["fetch", "Promise", "URL", "object-assign"],
  },
};
