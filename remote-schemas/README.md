### Remote schema: playlist

- Use `docker-compose up -d`
- Endpoint at http://localhost:8082/v1/graphql

Add dataset with
`psql postgres://postgres:mypassword@localhost:7432/postgres < chinook_remote.sql`

Go to console -> Data -> Track All, and Track All

Provides tables `playlist` and `playlist_track`.

### Add remote schema to orginal Hasura instance

In the console for your first Hasura instance (localhost:8080), add as remote schema to your first Hasura instance with `http://localhost:8082/v1/graphql` (use name playlistsService)

_Note_:

For macOS use `host.docker.internal` instead of `localhost` for local Hasura endpoints!

Backup option:
`https://op-workshop-remote-schema-6923.herokuapp.com/v1/graphql`

### Add a remote relationship to track

In the console, go to Data -> Tables -> track and go to the Relationships tab. Choose Add a Remote Relationship.

Name: remotePlaylistServer
Remote Schema: playlistsService
Configuration: playlist_track -> playlist -> playlist_tracks

And save!

Now go to the Graphiql interface and try the following (no data yet so will respond with empty array):

```
query getPlaylist {
  track_by_pk(track_id: 10) {
    remotePlaylistServer {
      playlist {
        name
        playlist_id
        playlist_tracks {
          track_id
        }
      }
    }
  }
}
```
