const config = {
  rules: {
    "functional/functional-parameters": "error",
    "functional/immutable-data": "error",
    "functional/no-class": "error",
    "functional/no-conditional-statement": "error",
    "functional/no-expression-statement": "error",
    "functional/no-let": "error",
    "functional/no-loop-statement": "error",
    "functional/no-promise-reject": "error",
    "functional/no-this-expression": "error",
    "functional/no-throw-statement": "error",
    "functional/no-try-statement": "error"
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "functional/no-method-signature": "error",
        "functional/no-mixed-interface": "error",
        "functional/prefer-readonly-type": "error",
        "functional/prefer-type-literal": "error",
        "functional/no-return-void": "error"
      }
    }
  ]
};

export default config;
