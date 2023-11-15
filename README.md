# Stock data API

A simple API to query stock data

- [x] Implement graphql resolver
- [x] Use typescript
- [x] Document the local deployment workflow
- [x] Environment should be reproducible on any machine by using docker
- [x] Utilizes Time Series Stock Data APIs (https://www.alphavantage.co/documentation/#time-series-data)
- [ ] mutate and store some information about the user’s stock preferences or portfolio in a database
- [ ] Can use whichever database, SQL, NoSQL, or any other kinds of database to store user’s portfolio (choices of tickers)

## Run the app

To run the server, you can choose one of the following way:

### Using docker-compose

- Make sure that docker is installed in local machine.

- Go to `docker-compose.yml` file, replace `${your-api-key}` with your API key

- Run `docker-compose up` to start the server

### Using yarn command

- Make sure that `node 20.*` is installed. You can run `nvm use` to get the right node version if you're using nvm as the node manager
- Create a `.env` file in the root directory with the following content:

```
API_KEY=YOUR_API_KEY
```

- If you want to debug incoming requests, set `DEBUG=true` in the `.env` file

- Run `yarn` to install dependencies
- Run `yarn start` to start the server or `yarn run start:dev` for live reloading

When the server starts at the first time, it can take few minutes because of database seeding.

### Call APIs

- After getting the server running, you can go to apollo studio under `http://localhost:3000/graphql` and test the GraphQL service.

## Implementation

### Folder Structure

- The project structure looks like this:

```sh
+-- graphql           # Configuration for graphql module (i.e. playground, schema file,...)
+-- middleware        # Nest.js middlewares
+-- stock             # Feature module for `Stock` domain entity.
```

- Most of the codes live in `src/stock` folder. The feature module has the following structure:

```sh
src/stock
|
+-- dto                                    # All data transfer objects for domain entity (graphql query arguments, graphql query response)
|
|---- +-- args                             # Graphql query arguments
|
|---- +-- responses                        # Graphql response
|
+-- entity                                 # Model entity. Business logics can be added to model entity if needed
|
+-- service                                # Use cases that interacts with domain entity.
|
|---- +-- stock_service.interface          # Define interface that can interact with stock domain entity
|
|---- +-- alphavantage.service.ts          # Implementation of the pre-defined interfaces. If we want to change API provider or change database provider, only those implementations should be changed. The business logic should stay the same.
```
