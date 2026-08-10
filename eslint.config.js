const angularEslint = require('angular-eslint');
const tseslint = require('typescript-eslint');
const unusedImports = require('eslint-plugin-unused-imports');

const tsRecommended = angularEslint.configs.tsRecommended;
const templateRecommended = angularEslint.configs.templateRecommended;
const templateAccessibility = angularEslint.configs.templateAccessibility;

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.angular/**',
      '**/coverage/**',
      'packages/lui/src/lib/components/icon/generated/**',
    ],
  },
  ...tsRecommended.map(c => ({ ...c, files: ['**/*.ts'] })),
  ...tseslint.configs.recommended.map(c => ({ ...c, files: ['**/*.ts'] })),
  {
    files: ['**/*.ts'],
    processor: angularEslint.processInlineTemplates,
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: ['app', 'ui'], style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: ['app', 'ui'], style: 'kebab-case' },
      ],
      // Angular 22 migration marks existing default-strategy components as Eager
      // to preserve their runtime behavior. Review and convert them to the new
      // OnPush default incrementally rather than blocking this compatibility release.
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  ...templateRecommended.map(c => ({ ...c, files: ['**/*.html'] })),
  ...templateAccessibility.map(c => ({ ...c, files: ['**/*.html'] })),
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
    },
  },
  {
    files: ['packages/lui/**/*.ts'],
    rules: {
      '@angular-eslint/no-output-native': 'off',
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'ui', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'ui', style: 'kebab-case' },
      ],
    },
  },
];
