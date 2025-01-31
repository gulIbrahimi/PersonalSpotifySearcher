import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Card, Container, FormControl, InputGroup, ListGroup, Row } from 'react-bootstrap';
import './App.css';

// Author: @gulIbrahimi
// Spotify API credentials retrieved from environment variables
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

function App() {
  // Hooks for managing input, tokens, albums, selected album, and tracks
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);

  // Fetch Spotify access token on componnt mount
  useEffect(() => {
    if (!CLIENT_ID || !CLIENT_SECRET) {
      console.error("Missing CLIENT_ID or CLIENT_SECRET in environment variables.");
      return;
    }

    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    fetch(`https://accounts.spotify.com/api/token`, authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
      .catch(error => console.error("Error getting token:", error));
  }, []);

  // Search for artists and their albums
  async function search() {
    if (!accessToken) {
      console.error("Access token not found.");
      return;
    }

    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    };

    try {
      // Fetch artist data based on search input
      const artistResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=artist`,
        searchParameters
      );
      const artistData = await artistResponse.json();

      // If no artist is found
      if (!artistData.artists || artistData.artists.items.length === 0) {
        console.log("No artist found.");
        return;
      }

      // First matching artist ID
      const artistID = artistData.artists.items[0].id;

      // Fetch albums for the found artist
      const albumsResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US`,
        searchParameters
      );
      const albumsData = await albumsResponse.json();

      setAlbums(albumsData.items);
    } catch (error) {
      console.error("Error during search:", error);
    }
  }

  // Fetch and display tracks for a selected album
  async function fetchAlbumTracks(albumID) {
    const trackParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    };

    try {
      const tracksResponse = await fetch(
        `https://api.spotify.com/v1/albums/${albumID}/tracks`,
        trackParameters
      );
      const tracksData = await tracksResponse.json();

      setTracks(tracksData.items);
      setSelectedAlbum(albumID);
    } catch (error) {
      console.error("Error getting tracks:", error);
    }
  }

  return (
    <div className="App">
      {/* Search bar input and button */}
      <Container>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Artists Name"
            type="input"
            onKeyDown={event => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>
      </Container>

      {selectedAlbum ? (
        <Container>
          <Button onClick={() => setSelectedAlbum(null)}>Albums List</Button>
          {/* Display list of tracks */}
          <ListGroup>
            {tracks.map(track => (
              <ListGroup.Item key={track.id}>{track.name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Container>
      ) : (
        <Container>
          <Row className="mx-2 row row-cols-4">
            {albums.map(album => (
              <Card key={album.id} onClick={() => fetchAlbumTracks(album.id)}>
                <Card.Img src={album.images[0]?.url || 'default.png'} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default App;

/* === The End === */