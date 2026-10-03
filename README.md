# eslint-config-collaborne

Shared Collaborne rules for JavaScript and TypeScript using ESLint 10's native
flat config format.

| Entry point                | Format                                | ESLint |
| -------------------------- | ------------------------------------- | ------ |
| `eslint-config-collaborne` | Factory returning flat config entries | 10     |

The package ships the Collaborne overrides and its Standard-style baseline
directly. It does not depend on `eslint-config-standard`, `eslint-plugin-import`,
or a legacy `.eslintrc` compatibility layer.

## Configuration

Use Node.js 22.13 or newer. Install the package and its peers:

```sh
npm install --save-dev eslint-config-collaborne eslint@^10 \
  @typescript-eslint/eslint-plugin@^8.70 @typescript-eslint/parser@^8.70 \
  eslint-plugin-import-x@^4.17 eslint-plugin-n@^18.2 \
  eslint-plugin-prettier@^5 eslint-plugin-promise@^7 prettier@^3
```

Create `eslint.config.mjs`:

```js
import createCollaborneConfig from 'eslint-config-collaborne';

export default [
	...createCollaborneConfig({
		tsconfigRootDir: import.meta.dirname,
		project: ['./tsconfig.json', './tsconfig.test.json'],
	}),
	{ ignores: ['build/**', 'build.test/**'] },
];
```

`tsconfigRootDir` defaults to the working directory. When `project` is omitted,
the factory uses `tsconfig.json` if it exists in that directory. Otherwise it
disables rules requiring type information. Pass `project: false` explicitly for
untyped projects. Keep project paths and build ignores in the consuming repo.

JavaScript uses core rules, TypeScript uses the recommended TypeScript rules plus
Collaborne overrides, and JSX/TSX enables JSX parsing. Declaration files allow
`any` and disable naming checks. Node globals and Standard's `document`,
`navigator`, and `window` globals are enabled; add other browser globals in
consumer overrides when needed.

Add repo-specific overrides after the shared entries, for example:

```js
{
  files: ['**/*.ts', '**/*.tsx'],
  rules: { '@typescript-eslint/naming-convention': 'off' },
}
```

## Formatting and linting

The config uses Prettier with tabs by default. Add a `.prettierrc` to choose
project conventions:

```json
{
	"singleQuote": true,
	"semi": true,
	"useTabs": true,
	"arrowParens": "avoid",
	"trailingComma": "all"
}
```

A typical lint script is:

```json
{
	"scripts": {
		"lint": "eslint 'src/**/*.{js,ts,tsx}'"
	}
}
```

Document repo-specific overrides and consider promoting broadly useful changes
into the shared rules.

## Verification and rollout

`npm run lint`, `npm test`, and `npx tsc --noEmit` validate the package with
ESLint 10.

The [carrot-ai example](examples/carrot-ai.eslint.config.mjs) preserves its project
paths and existing rule overrides without copying the shared rules. Replace
carrot-ai's `eslint.config.mjs` with this example after the release and add
`eslint-config-collaborne` as a development dependency.

The Standard baseline is distributed under its [MIT license](STANDARD-LICENSE).
