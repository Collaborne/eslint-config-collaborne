const { existsSync } = require('node:fs');
const { resolve } = require('node:path');

const { baseRules, typescriptRules, javascriptRules } = require('./rules');
const standard = require('./standard');

/** Create a native ESLint 9/10 config; resolve TS projects from the consumer. */
module.exports = function createCollaborneConfig({
	tsconfigRootDir = process.cwd(),
	project = existsSync(resolve(tsconfigRootDir, 'tsconfig.json'))
		? ['tsconfig.json']
		: false,
} = {}) {
	// Load modern peers only when using the flat entry point.
	const tsPlugin = require('@typescript-eslint/eslint-plugin');
	const tsParser = require('@typescript-eslint/parser');
	const prettierConfig = require('eslint-config-prettier');
	const { importX } = require('eslint-plugin-import-x');
	const nodePlugin = require('eslint-plugin-n');
	const prettierPlugin = require('eslint-plugin-prettier');
	const promisePlugin = require('eslint-plugin-promise');
	const { 'no-new-object': _removedRule, ...standardRules } = standard.rules;
	const modernTypescriptRules = Object.fromEntries(
		Object.entries(typescriptRules).filter(
			([name]) =>
				!name.startsWith('@typescript-eslint/') ||
				tsPlugin.rules[name.slice('@typescript-eslint/'.length)],
		),
	);

	return [
		{ ignores: ['**/.*'] },
		{
			files: ['**/*.{js,cjs,mjs,jsx,ts,tsx}'],
			languageOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				globals: {
					...nodePlugin.configs['flat/recommended-script'].languageOptions
						.globals,
					...standard.globals,
				},
			},
			plugins: {
				import: importX,
				n: nodePlugin,
				prettier: prettierPlugin,
				promise: promisePlugin,
			},
			rules: {
				...standardRules,
				'no-object-constructor': 'error',
				...promisePlugin.configs.recommended.rules,
				...baseRules,
				...prettierConfig.rules,
				'prettier/prettier': baseRules['prettier/prettier'],
			},
		},
		{
			files: ['**/*.{js,cjs,mjs,jsx}'],
			rules: javascriptRules,
		},
		{
			files: ['**/*.cjs'],
			languageOptions: { sourceType: 'commonjs' },
		},
		{
			files: ['**/*.ts', '**/*.tsx'],
			languageOptions: {
				parser: tsParser,
				parserOptions: {
					project,
					tsconfigRootDir,
					ecmaFeatures: { legacyDecorators: true, jsx: false },
				},
			},
			plugins: { '@typescript-eslint': tsPlugin },
			rules: {
				...tsPlugin.configs['eslint-recommended'].overrides[0].rules,
				...tsPlugin.configs.recommended.rules,
				...modernTypescriptRules,
				'@typescript-eslint/no-floating-promises': project
					? ['error', { ignoreVoid: true }]
					: 'off',
				'@typescript-eslint/await-thenable': project ? ['error'] : 'off',
			},
		},
		{
			files: ['**/*.d.ts'],
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/naming-convention': 'off',
			},
		},
		{
			files: ['**/*.jsx', '**/*.tsx'],
			languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
		},
	];
};
