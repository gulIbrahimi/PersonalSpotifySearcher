import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Card, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import './App.css';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [artistID, setArtistID] = useState("");
  const [albums, setAlbums] = useState([]); // Added albums state

  useEffect(() => {
    if (!CLIENT_ID || !CLIENT_SECRET) {
      console.error("Missing CLIENT_ID or CLIENT_SECRET in environment variables.");
      return;
    }

    // API access token
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    fetch(`https://accounts.spotify.com/api/token`, authParameters)
      .then(result => result.json())
      .then(data => {
        setAccessToken(data.access_token);
        console.log("Access Token:", data.access_token);
      })
      .catch(error => console.error("Error fetching access token:", error));
  }, []);

  async function search() {
    console.log("Search for:", searchInput);

    if (!accessToken) {
      console.error("Access token is missing or invalid.");
      return;
    }

    try {
      // Get request using search to get the artist's ID
      const searchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      };

      // Get request with search input to grab the artist ID
      const artistResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=artist`,
        searchParameters
      );
      const artistData = await artistResponse.json();

      // Check if artist exists in the search results collection
      if (!artistData.artists || artistData.artists.items.length === 0) {
        console.log("No artist found.");
        return;
      }

      // Get the first artist's ID from the search results collection
      const artistID = artistData.artists.items[0].id;
      console.log("Artist ID:", artistID);
      setArtistID(artistID);

      // Get request with artist ID to grab all the albums of the artist
      const albumsResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`,
        searchParameters
      );
      const albumsData = await albumsResponse.json();

      // Check if albums exist in the search results collection
      if (!albumsData.items || albumsData.items.length === 0) {
        console.log("No albums found for this artist.");
        return;
      }

      // Set the albums state with the search results collection
      setAlbums(albumsData.items);
      
      // catch error if any of the albums is not found in the search results collection
    } catch (error) {
      console.error("Error during search:", error);
    }
  }

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search for artists"
            type="input"
            onKeyDown={event => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className="mx-2 row row-cols-4">
          {albums.map(album => (
            <Card key={album.id}>
              <Card.Img src={album.images[0]?.url || "default-placeholder.png"} />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
