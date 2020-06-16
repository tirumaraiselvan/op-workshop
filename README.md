# optum-workshop

### Setup

#### 0. Azure functions

Install Azure functions development tools (v3) by following the applicable instructions for your machine:
https://github.com/Azure/azure-functions-core-tools

In the `functions` directory, use the following commands to set up:
`func init`

- Select node
- Select TypeScript

`func new`

- Select HTTP Trigger
- Name: trackWithLyrics

`npm i`
`npm run start`

_Note_: You may need to change your version of Node to a compatible versiion; recommend something like 12.14.1

Check out http://localhost:7071/api/trackWithLyrics!

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

Go to console -> Data -> Track All, and Track All

Check out the Graphiql playground!

#### 3. Create an Action to add lyrics to tracks

Back to `/functions/trackWithLyrics`:

`yarn add node-fetch`

_musixmatch keys:_
If your birthday is an ODD number, use key #1:
425562b56053fc2e4644aa2d3a30c5aa

If your birthday is an EVEN number, use key #2:
f1b8c4da8747b1fc66fa2217aa2e76c0

#### 4. Add a remote schema for playlists

See /remote-schemas

#### 5. Intro to authorization (and authentication)

Exploring the 'x-hasura-MMMMMM' headers and Permissions tabs

For more, see our in-depth tutorial:
https://hasura.io/learn/graphql/hasura-auth-slack/introduction/

#### END. Sign up for our virtual conference!

https://hasura.io/events/hasura-con-2020/
