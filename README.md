# eslint-config-collaborne [![Build Status](https://travis-ci.org/Collaborne/eslint-config-collaborne.svg?branch=master)](https://travis-ci.org/Collaborne/eslint-config-collaborne) [![Greenkeeper badge](https://badges.greenkeeper.io/Collaborne/eslint-config-collaborne.svg)](https://greenkeeper.io/)

ES lint configuration for Collaborne projects

## Usage

 1. Install dependencies

    ```sh
    npm install --save-dev \
        eslint-config-collaborne \
        eslint@7 \
        eslint-plugin-disable@2 \
        eslint-plugin-import@2 \
        eslint-plugin-node@11 \
        eslint-plugin-prettier@3 \
        eslint-plugin-promise@4 \
        prettier@2
    ```

 2. Add `.prettierrc` (configuration for prettier)

    ```json
    {
      "singleQuote": true,
      "jsxSingleQuote": false,
      "semi": true,
      "tabWidth": 2,
      "useTabs": true,
      "bracketSpacing": true,
      "jsxBracketSameLine": false,
      "arrowParens": "avoid",
      "trailingComma": "all"
    }
    ```

 3. Add `.eslintignore`

    ```text
    node_modules
    ```

 4. Add `.eslintrc.json`

    ```json
    {
      "extends": "collaborne",
    }
    ```

 5. Add linting scripts in `package.json`

    ```jsonc
    {
      // ...
      "scripts": {
        // ...
        "lint": "npm run lint:ts",
        "lint:ts": "eslint --report-unused-disable-directives $(node -p 'require("./tsconfig.json").include.map(include => `'\${include}.\{js,ts,tsx\}'`).join(" ")')"
        // ...
      }
      // ...
    }
    ```

    _Note: This requires that `tsconfig.json` contains a `include` property, which should only directories, and in the format `dir/**/*`._

## Additional configuration

* Always use `overrides` to configure additional rules
* Try to document the reason for a override configuration in the commit message for traceability, and consider reporting the rule here as a future addition with the rationale
