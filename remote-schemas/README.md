### Remote schema: playlist

- Use `docker-compose up -d`
- Endpoint at http://localhost:8082/v1/graphql

Add dataset with
`psql postgres://postgres:mypassword@localhost:7432/postgres < chinook_remote.sql`

Go to console -> Data -> Track All, and Track All

Provides tables `playlist` and `playlist_track`. Add as remote schema to your first Hasura instance (at localhost:8080)
