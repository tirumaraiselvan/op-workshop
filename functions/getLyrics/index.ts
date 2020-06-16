import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import fetch from "node-fetch";

const GRAPHQL_ENDPOINT_URL = "http://localhost:8080/v1/graphql";
const MUSIX_KEY: string = "425562b56053fc2e4644aa2d3a30c5aa";
// f1b8c4da8747b1fc66fa2217aa2e76c0
const ADMIN_SECRET: string = "adminsecret";

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

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  // Example of incoming req.body:
  // {
  //     session_variables: { 'x-hasura-role': 'admin' },
  //     input: { track_id: 10 },
  //     action: { name: 'getLyrics' }
  // }

  try {
    const { track_id } = req.body.input;
    const { data: trackData, errors: trackErrors } = await fetchTrack(
      track_id,
      req.headers
    );

    if (trackErrors) {
      // Example of possible errors:
      // [{
      //     extensions: { path: '$', code: 'access-denied' },
      //     message: 'x-hasura-admin-secret/x-hasura-access-key required, but not found'
      // }]
      throw new Error(trackErrors[0].message);
    }

    const { album, ...trackDetails } = trackData.track_by_pk;

    const { message } = await fetchLyrics({
      artist: album.artist.name,
      name: trackDetails.name,
    });
    const lyrics = message.body.lyrics.lyrics_body || "missing lyrics";

    context.res = {
      headers: { "Content-Type": "application/json" },
      body: {
        ...trackDetails,
        lyrics,
      },
    };
  } catch (err) {
    context.res = {
      status: 400,
      body: {
        code: "bad request",
        message: err.message || "Something went wrong",
      },
    };
  }
};

export default httpTrigger;
