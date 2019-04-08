# eVentually Backend

[eVentually](https://eventually-alpha.netlify.com) is a super Workflow events engine, that is designed to improve the events planning experience at [Monash University](https://monash.edu).

This was developed during [Hackamon 2019](https://monash.edu/students/hackamon).

You can also view our Pitch Deck [here](https://github.com/hackamon2019/pitch-deck)

## Stack

eVentually is super-powerful, we have 3 main components.

1. [**Frontend**](https://github.com/hackamon2019/frontend) - this is located here, and deployments are integrated into Netlify.
2. [**Backend**](https://github.com/hackamon2019/backend) - this is a GraphQL communicating between the Frontend and our Database (this is the **core** engine of eVentually)
3. Database - we're running on Mongo Cloud in Singapore (AWS) - and has 3 shards running.

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
