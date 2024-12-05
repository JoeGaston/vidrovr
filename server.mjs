
//! Env requirements
import cors from "cors"; //dumb browser things
import express from "express";
import fetch from "node-fetch";
import 'dotenv/config'
const app = express();
app.use(cors()); // Enable CORS for all requests

const apiKey = process.env.API_KEY
const baseUrl = "https://api.vidrovr.com/v2";
const searchCriteria = "DRAGADOS" //evergreen, 

//need list of all IDs in library. V2 feature would use another API to call with a saved search or some other criteria that assembles this information on the front end.
const assetIds = [
  "37d08e8f-d40c-4f78-97d4-e5f943b0d79e",
  "52aa96f2-ebf0-4929-bedf-77c87106a0d3",
  "8871277b-f69d-4193-9b1e-1845e2572c1b",
  "ad59f46d-2473-4464-9bb3-b3cabeb08c84",
  "5c126e9a-e1a7-4a4e-a597-952735c3ecf0",
  "31392a2c-2170-4775-9e58-2063f4f85c4d",
  "53d29f2e-0ea2-41fc-bca2-7d322f8cef1f",
  "3a9ceb6d-4ab9-44c7-9a52-cebc71942d9f",
  "f37a38aa-349c-4846-8730-be72188bddb5",
  "1144347b-8d6a-4a90-a5f1-cb359f41126f",
  "bae93776-51d8-40c7-8ea8-0af336b9b80b",
  "982f54fb-36d2-4d84-81ec-cfab76fae285",
];

//list of coords. the ones assigned to "DRAGADOS" IDs will plot, others wont
const hardcodedCoordinates = { 
  "37d08e8f-d40c-4f78-97d4-e5f943b0d79e": [5.842684, 118.118009],
  "52aa96f2-ebf0-4929-bedf-77c87106a0d3": [6.90431, 122.077103],
  "8871277b-f69d-4193-9b1e-1845e2572c1b": [7.077663, 125.617532],
  "ad59f46d-2473-4464-9bb3-b3cabeb08c84": [14.612561, 120.987366],
  "5c126e9a-e1a7-4a4e-a597-952735c3ecf0": [9.740693, 118.730844],
  "31392a2c-2170-4775-9e58-2063f4f85c4d": [1.481348, 124.844969],
  "53d29f2e-0ea2-41fc-bca2-7d322f8cef1f": [6.90431, 122.077103],
  "3a9ceb6d-4ab9-44c7-9a52-cebc71942d9f": [14.612561, 120.987366],
  "f37a38aa-349c-4846-8730-be72188bddb5": [13.75391, 121.0439],
  "1144347b-8d6a-4a90-a5f1-cb359f41126f": [7.077663, 125.617532],
  "bae93776-51d8-40c7-8ea8-0af336b9b80b": [6.90431, 122.077103],
  "982f54fb-36d2-4d84-81ec-cfab76fae285": [7.077663, 125.617532],
};

app.get("/batch-data", async (req, res) => {
  try {
    const features = []; //empty array for geojson objs

    // Fetch data for all asset IDs
    const fetchPromises = assetIds.map(async (id) => {
      try {
        const response = await fetch(`${baseUrl}/metadata/${id}/ocr`, {
          method: "GET",
          headers: { "x-api-key": apiKey },
        });

        const jsonData = await response.json();
        const textValue = jsonData.data?.[0]?.text || "No text available"; //Need the text returned so I can use conditional later
        let coordinates = hardcodedCoordinates[id];


        // I really only want the ones with DRAGADOS. V2 feature would be to allow user to pick word in front end
        if (textValue === searchCriteria && coordinates) {
          // This was silly, but the issue stumped me for 2 days....
          coordinates = [coordinates[1], coordinates[0]];

          //need to add the data to the geojson obj
          features.push({
            type: "Feature",
            properties: { id, text: textValue },
            geometry: { type: "Point", coordinates },
          });
        }
      } catch (error) {
        console.error(`Error fetching data for ID ${id}:`, error.message);
      }
    });

    await Promise.all(fetchPromises); // 

    res.json({
      type: "FeatureCollection",
      features,
    });
  } catch (error) {
    console.error("Error generating GeoJSON:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));
