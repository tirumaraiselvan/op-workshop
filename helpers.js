const GET_TRACK = `
    query getTrack($track_id: Int!) {
        track_by_pk(track_id: $track_id) {
            album {
                artist {
                    name
                }
            }
            bytes
            composer
            genre_id
            milliseconds
            name
            track_id
        }
    }
`;

// execute the tracks_by_pk query in Hasura
const fetchTrack = async (track_id: number, reqHeaders: any) => {
  const fetchResponse = await fetch(GRAPHQL_ENDPOINT_URL, {
    method: "POST",
    headers: {
      ...reqHeaders,
      "x-hasura-admin-secret": ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: GET_TRACK,
      variables: {
        track_id,
      },
    }),
  });
  return await fetchResponse.json();
};

// execute the musixmatch REST API request for (partial) lyrics
const fetchLyrics = async ({ artist, name }) => {
  const url = `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=json
    &q_track=${name}
    &q_artist=${artist}
    &apikey=${MUSIX_KEY}`;
  const fetchResponse = await fetch(url);
  return await fetchResponse.json();
};
