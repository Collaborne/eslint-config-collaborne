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
				'@typescript-eslint/naming-convention': [
					'warn',
					{
						selector: 'default',
						format: ['camelCase'],
					},

					{
						selector: 'variable',
						format: ['camelCase', 'UPPER_CASE'],
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
