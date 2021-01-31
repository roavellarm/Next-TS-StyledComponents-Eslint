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
$ git remote add origin git@github.com:<yourGitUser>/<yourRepoTitle>.git
```
