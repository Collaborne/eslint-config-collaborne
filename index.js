const { existsSync } = require('fs');
const { resolve: resolvePath } = require('path');

// Some typescript rules require a configuration to exist
const tsConfigPath = resolvePath('tsconfig.json');
const hasTsConfig = existsSync(tsConfigPath);

const tsConfigRules = {
	'@typescript-eslint/no-floating-promises': hasTsConfig
		? ['error', { ignoreVoid: true }]
		: 'off',
	'@typescript-eslint/await-thenable': hasTsConfig ? ['error'] : 'off',
};

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'standard',
		'plugin:promise/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	env: {
		node: true,
	},
	parserOptions: {
		ecmaVersion: 2020,
		ecmaFeatures: {
			legacyDecorators: true,
			jsx: false,
		},
	},
	plugins: ['import', '@typescript-eslint', 'disable', 'promise'],
	processor: 'disable/disable',
	rules: {
		'space-before-function-paren': 0,
		'import/export': 0,
		'no-void': ['error', { allowAsStatement: true }],
		'require-await': 'off',
		'promise/always-return': 'warn',
		'promise/catch-or-return': ['warn', { allowFinally: true }],
		'max-lines': ['error', { max: 300 }],
	},

	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],

			parserOptions: {
				project: hasTsConfig ? 'tsconfig.json' : undefined,
			},

			rules: {
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/no-empty-interface': 'off',
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': [
					'error',
					{
						argsIgnorePattern: '^_',
						varsIgnorePattern: '^_',
						ignoreRestSiblings: true,
					},
				],
				'no-use-before-define': 'off',
				'@typescript-eslint/no-use-before-define': ['error'],
				'no-useless-constructor': 'off',
				'@typescript-eslint/no-useless-constructor': ['error'],

				'@typescript-eslint/restrict-template-expressions': 'off',
				'@typescript-eslint/require-await': 'off',

				camelcase: 'off',
				curly: ['error'],
				'no-cond-assign': ['error'],
				'no-constant-binary-expression': ['error'],
				'no-fallthrough': ['error'],
				'no-invalid-regexp': ['error'],
				'no-nested-ternary': ['error'],
				'no-self-assign': ['error'],
				'no-template-curly-in-string': ['error'],
				'require-atomic-updates': ['error'],
				'import/order': [
					'error',
					{
						'newlines-between': 'always',
						alphabetize: { order: 'asc', caseInsensitive: true },
					},
				],
				'use-isnan': ['error'],
				'valid-typeof': ['error'],
				'@typescript-eslint/naming-convention': [
					'warn',
					{
						selector: 'default',
						format: ['camelCase'],
					},

					{
						selector: 'function',
						// JSX functions are in PascalCase
						format: ['camelCase', 'PascalCase'],
					},
					{
						selector: 'variable',
						// React Components are in PascalCase
						format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
						leadingUnderscore: 'allow',
					},
					{
						selector: 'parameter',
						format: ['camelCase'],
						leadingUnderscore: 'allow',
					},

					{
						selector: ['variable', 'parameter'],
						modifiers: ['unused'],
						leadingUnderscore: 'require',
						format: null,
					},

					{
						selector: 'memberLike',
						modifiers: ['private'],
						format: ['camelCase'],
						// Support underscores in property names
						leadingUnderscore: 'allow',
						trailingUnderscore: 'allow',
					},

					{
						selector: 'typeLike',
						format: ['PascalCase'],
					},

					{
						selector: 'variable',
						modifiers: ['destructured'],
						format: null,
					},
					{
						selector: 'objectLiteralProperty',
						format: null,
					},
				],

				...tsConfigRules,
			},
		},
		{
			files: ['**/*.js', '**/*.jsx'],

			settings: {
				'disable/plugins': ['@typescript-eslint'],
			},

			rules: {
				'no-unused-vars': [
					'error',
					{
						argsIgnorePattern: '^_',
						varsIgnorePattern: '^_',
						ignoreRestSiblings: true,
					},
				],
				'no-use-before-define': 'error',
				'no-useless-constructor': 'error',
				camelcase: ['warn', { ignoreDestructuring: true }],
			},
		},
		{
			files: ['**/*.d.ts'],

			rules: {
				camelcase: 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/naming-convention': 'off',
			},
		},
		{
			files: ['**/*.jsx', '**/*.tsx'],

			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},

			env: {
				node: false,
			},
		},
	],
};
