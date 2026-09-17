const { baseRules, typescriptRules, javascriptRules } = require('./rules');
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
		'./standard.js',
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
	rules: baseRules,

	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],

			parserOptions: {
				project: hasTsConfig ? 'tsconfig.json' : undefined,
			},

			rules: { ...typescriptRules, ...tsConfigRules },
		},
		{
			files: ['**/*.js', '**/*.jsx'],

			settings: {
				'disable/plugins': ['@typescript-eslint'],
			},

			rules: javascriptRules,
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
