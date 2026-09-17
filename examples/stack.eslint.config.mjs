import createCollaborneConfig from 'eslint-config-collaborne/flat';

export default [
	...createCollaborneConfig({
		tsconfigRootDir: import.meta.dirname,
		project: ['./tsconfig.json', './tsconfig.test.json'],
	}),
	{ ignores: ['build/**', 'build.test/**'] },
	{
		files: ['**/*.ts', '**/*.tsx'],
		linterOptions: { reportUnusedDisableDirectives: 'off' },
		rules: {
			'@typescript-eslint/naming-convention': 'off',
			curly: ['error', 'multi-line'],
		},
	},
];
