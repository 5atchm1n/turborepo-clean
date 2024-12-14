module.exports = {
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  extends: ["@repo/eslint-config/node.js"],
  root: true,
  env: {
    node: true,
    jest: true,
  },
};
