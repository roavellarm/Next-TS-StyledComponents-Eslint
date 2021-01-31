# **Next + TS + styled-components + Eslint**

## **1. Start a next with typescript project**

1. Create a directory with yout project title and access it

```BASH
$ mkdir my-web-app && cd my-web-app
```

2. Initialize the `package.json` file

```BASH
$ yarn init -y
```

3. Add NextJS and React to dependencies

```BASH
$ yarn add next react react-dom
```

4. Add Typescript to dev-dependencies

```BASH
$ yarn add -D typescript @types/react @types/node
```

5. Add this scripts to your `package.json` file

```JSON
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  },
}
```

6. Create a `/pages` directory and the first page `index.tsx`

```BASH
$ mkdir pages && touch pages/index.tsx
```

7. Add the following content to `index.tsx`

```JS
export default function Landing() {
  return (
    <div>
      <h1>FIRST PAGE</h1>
    </div>
  )
}
```

8. Start server to load the application. NextJS will automatically generate the `tsconfig.json` and `next-env.d.ts` configuration files and the `.next` directory. After starting server you can access the app by going to http://localhost:3000 in your browser.

```BASH
$ yarn dev
```

## **2. Add styled-components to the project**

1. Add styled-components to dependencies.

```BASH
$ yarn add styled-components
```

2. Add styled-components types in dev dependencies

```BASH
$ yarn add -D @types/styled-components
```

3. Add babel plugin to dev dependencies

```BASH
$ yarn add -D babel-plugin-styled-components
```

4. Create a `.babelrc` file in the root of the project

```BASH
$ touch .babelrc
```

5. Add the following configuration to the `.babelrc` file

```JSON
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": false
      }
    ]
  ]
}
```

6. Create a `pages/_document.tsx` file

```BASH
$ touch pages/_document.tsx
```

7. Add the following content to `pages/_document.tsx`

```JS
import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
```

8. Let's add a global style and styled-components theme provider. Create a `pages/_app.tsx` file

```BASH
$ touch pages/_app.tsx
```

9. Copy the following example into `pages/_app.tsx` file

```JS
import { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
```

## **3. Add git to the project**

1. Let's start by adding `.gitignore` file to avoid pushing some files.

```BASH
$ touch .gitignore
```

2. Add this list to `.gitignore` file

```
/node_modules
/.pnp
.pnp.js

/coverage

/.next/
/out/

/build

.DS_Store
*.pem

npm-debug.log*
yarn-debug.log*
yarn-error.log*

.env.local
.env.development.local
.env.test.local
.env.production.local

.vercel
```

3. Initialize git

```BASH
$ git init
```

4. Add a remote repository

```BASH
$ git remote add origin git@github.com:<yourGitHubAccount>/<yourRepoTitle>.git
```

5. If you want to commit and push your content to github run:

```BASH
$ git add .
$ git commit -m "First commit"
$ git push -u origin master
```

## **4. Adding Eslint and Prettier to the project**

1. Add eslint and other packages to the dev dependencies

```BASH
$ yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react

# and also this
$ yarn add -D eslint-config-airbnb@latest eslint-plugin-import@latest eslint-plugin-jsx-a11y@latest eslint-plugin-react-hooks@latest
```

2. Create a `.eslintrc.json` file at the root of the project

```BASH
$ touch .eslintrc.json
```

3. Add the following configuration to `.eslintrc.json` file

```JSON
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["airbnb-base"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {}
}
```

4. Add prettier and some plugins to make it work with Eslint to dev depencencies

```BASH
$ yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

5. Let's update the `.eslintrc.json` file to integrate Prettier with eslint

```JSON
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["plugin:react/recommended", "airbnb", "prettier"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      "off",
      { "extensions": [".js", ".jsx", ".ts", ".tsx"] }
    ],
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/anchor-is-valid": "off"
  }
}
```

6. Let's create the `.prettierrc` file to add prettier configuration

```BASH
$ touch .prettierrc
```

7. Let's add the following configuration to `.prettierrc` file

```JSON
{
  "arrowParens": "always",
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80
}
```

8. Add the `lint` command to `scripts` in the `package.json` file

```JSON
{
  "scripts": {
    // ...
    "lint": "eslint './**/*.{js,ts,tsx}' --quiet"
  }
}
```
