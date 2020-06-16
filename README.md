# optum-workshop

### Setup

#### 0. Azure functions

Install Azure functions development tools (v3) by following the applicable instructions for your machine:
https://github.com/Azure/azure-functions-core-tools

In the `functions` directory, use the following commands to set up:
`func init .`

- Select node
- Select TypeScript

`func new`

- Select HTTP Trigger
- Name: fullTrack

`npm i`
`npm start`

#### 1. Hasura GraphQL Engine

Back to the root directory, `docker-compose.yaml` provisions a PostgreSQL (v12) container and a Hasura GraphQL Engine Core (v1.3.0-beta.1)

Use `docker-compose up -d` and access the Hasura Console at `http://localhost:8080/console` to begin!

You will need the admin secret "adminsecret" (or whatever secret you choose in the docker-compose file).

Notice that there aren't any tables or data yet!

#### 2. Load dataset

`chinook-limited.sql` is a subset of the Chinook dataset, taking only the following tables:

- album
- artist
- genre
- media_type
- track

You can see a rough visualization of the tables [here](https://cdn.sqlitetutorial.net/wp-content/uploads/2018/03/sqlite-sample-database-diagram-color.pdf)

Add the dataset:

`psql postgres://postgres:mypassword@localhost:6432/postgres < chinook-limited.sql`

Refresh the console and see the changes
