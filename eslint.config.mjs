import eslint from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import stylistic from '@stylistic/eslint-plugin';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  eslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    commaDangle: 'never'
  }),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'semi': ['error'],
      'no-extra-semi': ['error'],
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/attribute-hyphenation': ['error'],
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style']
        }
      ],
      'vue/attributes-order': ['warn', {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'EVENTS',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'CONTENT'
        ],
        alphabetical: false
      }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: false
      }],
      'vue/html-self-closing': ['error', {
        html: {
          normal: 'never', void: 'always'
        }
      }],
      'vue/html-indent': ['error', 2, {
        alignAttributesVertically: false
      }],
      'vue/html-closing-bracket-newline': ['error', {
        multiline: 'never'
      }],
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^_+'
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 3
        },
        multiline: {
          max: 1
        }
      }]
    }
  }
]);
