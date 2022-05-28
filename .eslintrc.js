/*
 * @Author: ztao
 * @Date: 2022-05-27 11:26:46
 * @LastEditTime: 2022-05-28 21:08:50
 * @Description:
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'prettier/prettier': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
