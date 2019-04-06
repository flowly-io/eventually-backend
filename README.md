# eVentually backend

> Hackamon 2019

### Develop locally

Ensure you have a `.env` in the **root** directory with the required variables.

```
// Install dependencies
yarn

// Start watcher
yarn develop
```

This will start the `babel` compiler in watch mode, which will restart when you save a `.js` file.
_NOTE_: the server will NOT restart when you save a `.graphql` file.

### Build and run

```
// Install dependencies
yarn

// Create a build
yarn build

// Start the server
yarn start
```
