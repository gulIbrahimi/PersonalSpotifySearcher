# Spotify Artist Search App

A React-based web application that allows users to search for artists and explore their albums and tracks using the Spotify Web API.

## Features

- Search for artists on Spotify
- View artist albums with cover art
- Browse tracks within each album
- Responsive grid layout for album display
- Interactive UI with search-as-you-type functionality

## Prerequisites

Before running this application, you need:

- Node.js (v14 or higher)
- npm or yarn package manager
- Spotify Developer Account
- Spotify API credentials (Client ID and Client Secret)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd spotify-search-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Spotify API credentials:
```env
REACT_APP_SPOTIFY_CLIENT_ID=your_client_id_here
REACT_APP_SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

4. Start the development server:
```bash
npm start
```

## Environment Variables

The following environment variables are required:

- `REACT_APP_SPOTIFY_CLIENT_ID`: Your Spotify API Client ID
- `REACT_APP_SPOTIFY_CLIENT_SECRET`: Your Spotify API Client Secret

You can obtain these credentials by creating an application in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).

## Dependencies

- React Bootstrap
- Bootstrap CSS
- React Hooks (useState, useEffect)
- Spotify Web API

## Usage

1. Enter an artist name in the search bar
2. Press Enter or click the Search button
3. Click on any album to view its tracks
4. Use the "Back to Albums" button to return to the album view

## API Integration

The app integrates with the following Spotify API endpoints:

- Authentication: `https://accounts.spotify.com/api/token`
- Artist Search: `https://api.spotify.com/v1/search`
- Album Retrieval: `https://api.spotify.com/v1/artists/{id}/albums`
- Track Listing: `https://api.spotify.com/v1/albums/{id}/tracks`

## Error Handling

The application includes error handling for:
- Missing API credentials
- Failed API requests
- No search results
- Missing album artwork (falls back to placeholder)

## Contributing

Feel free to submit issues and enhancement requests. Follow these steps to contribute:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Author

@gulIbrahimi
