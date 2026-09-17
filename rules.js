// Collaborne overrides shared by the legacy and flat entry points.
module.exports = {
	baseRules: {
		'space-before-function-paren': 0,
		'import/export': 0,
		'no-void': [
			'error',
			{
				allowAsStatement: true,
			},
		],
		'require-await': 'off',
		'promise/always-return': 'warn',
		'promise/catch-or-return': [
			'warn',
			{
				allowFinally: true,
			},
		],
		'max-lines': [
			'error',
			{
				max: 300,
			},
		],
		'prettier/prettier': [
			'error',
			{
				useTabs: true,
			},
		],
	},
	typescriptRules: {
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
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
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
				// JSX functions use PascalCase.
				format: ['camelCase', 'PascalCase'],
			},
			{
				selector: 'variable',
				// React components use PascalCase.
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
				// API fields can use snake_case, e.g. property_values.
				format: ['camelCase', 'snake_case'],
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
	},
	javascriptRules: {
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
		camelcase: [
			'warn',
			{
				ignoreDestructuring: true,
			},
		],
	},
};
