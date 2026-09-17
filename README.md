# eslint-config-collaborne

Shared Collaborne rules for JavaScript and TypeScript. The package supports both
legacy `.eslintrc` configs and native flat configs, so repositories can migrate
independently.

| Entry point                     | Format                                | ESLint   |
| ------------------------------- | ------------------------------------- | -------- |
| `eslint-config-collaborne`      | Legacy config object                  | 8        |
| `eslint-config-collaborne/flat` | Factory returning flat config entries | 9 and 10 |

The root entry remains backward compatible. Modern plugins are loaded only when
the flat factory is called. The Collaborne overrides in `rules.js` and the
Standard 17 baseline in `standard.js` are shared by both formats. The baseline is
included here because upstream `eslint-config-standard@17` requires ESLint 8 and
older plugins. The flat entry uses native plugin objects and has no legacy
compatibility processor.

## Flat config (ESLint 9 and 10)

Use Node.js 22.13 or newer with ESLint 10. Install the modern peers:

```sh
npm install --save-dev eslint-config-collaborne@^5.7.0 eslint@^10 \
  @typescript-eslint/eslint-plugin@^8.70 @typescript-eslint/parser@^8.70 \
  eslint-plugin-import-x@^4.17 eslint-plugin-n@^17 \
  eslint-plugin-prettier@^5 eslint-plugin-promise@^7 prettier@^3
```

Create `eslint.config.mjs`:

```js
import createCollaborneConfig from 'eslint-config-collaborne/flat';

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
`any` and disable naming checks. Node globals and Standard's `document`, `navigator`, and `window` globals are enabled; add any other browser globals in consumer overrides when needed. The legacy `eslint-plugin-disable` processor is
not used by flat configs; use ordinary `eslint-disable` comments and overrides.

Add repo-specific overrides after the shared entries, for example:

```js
{
  files: ['**/*.ts', '**/*.tsx'],
  rules: { '@typescript-eslint/naming-convention': 'off' },
}
```

## Legacy config (ESLint 8)

Existing `extends: "collaborne"` configs continue to work. Install legacy peers:

```sh
npm install --save-dev eslint-config-collaborne eslint@^8.57 \
  @typescript-eslint/eslint-plugin@^8 @typescript-eslint/parser@^8 \
  eslint-plugin-disable@^2 eslint-plugin-import@^2 eslint-plugin-n@^17 \
  eslint-plugin-prettier@^5 \
  eslint-plugin-promise@^7 prettier@^3
```

Create `.eslintrc.json`:

```json
{
	"extends": "collaborne"
}
```

Legacy-only and flat-only plugins are optional npm peers because only one entry
point is used in a consuming repo. Install the plugins listed for your format.
Older supported TypeScript plugins and Prettier versions remain valid for legacy
consumers; the commands above show the versions used in compatibility tests.

## Formatting and linting

Both formats use Prettier for formatting, with tabs by default. Add a
`.prettierrc` to choose project conventions:

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

`npm run lint`, `npm test`, and `npx tsc --noEmit` validate the package. Compatibility
tests exercise ESLint 8's legacy loader and native ESLint 9/10 flat loaders,
including typed rules, untyped projects, declarations, JavaScript, and TSX.

Release version 5.7.0 before changing registry dependencies in consuming repos.
Repositories still using `.eslintrc` can upgrade without switching formats;
modern repositories import the `/flat` factory.

The [carrot-ai example](examples/carrot-ai.eslint.config.mjs) preserves its project
paths and existing rule overrides without copying the shared rules. Replace
carrot-ai's `eslint.config.mjs` with this example after the release and add
`eslint-config-collaborne@^5.7.0` as a development dependency.

The Standard baseline is distributed under its [MIT license](STANDARD-LICENSE).
