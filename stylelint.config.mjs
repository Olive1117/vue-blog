/** @type {import("stylelint").Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-recess-order',
  ],
  plugins: ['stylelint-order'],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'at-rule-no-unknown': null,
    'no-empty-source': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['apply', '@apply', 'unocss', 'screen', 'theme'],
      },
    ],
  },
}
