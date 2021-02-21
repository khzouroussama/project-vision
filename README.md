# [Electron](https://www.electronjs.org) [Typescript](https://www.typescriptlang.org) [Sass](https://sass-lang.com) template.

This is my Electron - TypeScript - Sass template for [Create React App](https://github.com/facebook/create-react-app).

to use it paste this in your terminal

```sh
npx create-react-app my-app --template electron-node-react-sass-typescript

# or

yarn create react-app my-app --template electron-node-react-sass-typescript
```

For more information, please refer to:

- [Getting Started](https://create-react-app.dev/docs/getting-started) – How to create a new app.
- [User Guide](https://create-react-app.dev) – How to develop apps bootstrapped with Create React App.
<hr/>

## yarn (/yarn) Scripts

### In the project directory, you can run:

<br/>

### `yarn start`

Renders you app with electron

### `yarn build`

Builds your app. you'll be able to find an installer and a
localy installed version in the dist directory.

### `yarn release`

Releases your app.

### `yarn electron-start`

Starts the electron part of your app.

### `yarn electron-build`

Builds the electron part of your app.  
This is done using [electron-builder](https://www.npmjs.com/package/electron-builder)

### `yarn electron-release`

Releases the electron part of your app.  
This is also done using [electron-builder](https://www.npmjs.com/package/electron-builder)

### `yarn react-start`

Starts your react on [localhost (port 3000)](https://localhost:3000)  
and opens it in your default browser.  
The page will reload if you make edits.  
You will also see any lint errors in the console.

### `yarn react-build`

Builds the react part of your app.
The build is minified and the filenames include the hashes.  
If necessary, classnames and function names can be enabled for profiling purposes.  
See [this](https://create-react-app.dev/docs/production-build/) for more information

### `yarn react-serve`

Starts your react on [localhost (port 3000)](https://localhost:3000)  
**without** opening it in your default browser.  
The page will reload if you make edits.  
You will also see any lint errors in the console.

### `yarn test`

Runs the tests that you've built into react.  
See [this](https://create-react-app.dev/docs/running-tests/) for more information

### `yarn eject`

Ejects your CRA.  
Read [this](https://create-react-app.dev/docs/available-scripts/#npm-run-eject) before performing!

<hr/>
This is my first CRA template, hope you like it.
