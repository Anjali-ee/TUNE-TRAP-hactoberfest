const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const axios = require("axios");

const clientId = "095f52b37bb74208b6d73d6a06e88206";
const clientSecret = "59f6a9c5bf5a4f91ac1a7ccb3df9a425";
const artistId = "2CIMQHirSU0MQqyYHq0eOx";

const getAccessToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    null,
    {
      params: {
        grant_type: "client_credentials",
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
    }
  );
  return response.data.access_token;
};

app.get("/getArtistDetails/:artistId", async (req, res) => {
  const artistId = req.params.artistId;

  try {
    const artistDetails = await fetchArtistDetails(artistId);
    res.json(artistDetails);
  } catch (error) {
    res
      .status(500)
      .json({ error: { message: "Error fetching artist details" } });
  }
});

const fetchArtistDetails = async (artistId) => {
  const accessToken = await getAccessToken();

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
