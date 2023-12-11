import React, { useState } from 'react';

const Band = () => {
  const initialBand = {
    pop: null,
    rock: null,
    hipHop: null,
    instrumental: null,
    rAndB: null,
    indie: null,
    country: null,
  };

  const [band, setBand] = useState(initialBand);
  const [totalPopularity, setTotalPopularity] = useState(20);
  const [accessToken, setAccessToken] = useState(''); // Set your access token here

  const handleSelectArtist = async (query) => {
    try {
      // Fetch artist data
      let response = await fetch('http://127.0.0.1:5000/search_artists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken, query }),
      });
      const { artists } = await response.json();
      const artist = artists[0]; // Assume you want the first artist from the response

      // Check and update band
      const primaryGenre = artist.genres[0]; // Assuming the first genre is the primary
      const updatedBand = { ...band };

      if (!band[primaryGenre]) {
        updatedBand[primaryGenre] = artist;
      } else {
        // Try to fit the artist in another genre
        const availableGenre = Object.keys(band).find(genre => !band[genre]);
        if (availableGenre) {
          updatedBand[availableGenre] = artist;
        } else {
          alert('All genre slots are filled. Please remove an artist to add a new one.');
          return;
        }
      }

      setBand(updatedBand);
      updateBandPopularity(updatedBand, artist.id);
    } catch (error) {
      console.error('Error fetching artist:', error);
    }
  };

  const updateBandPopularity = async (updatedBand) => {
    let newPopularity = totalPopularity; // Base popularity
  
    for (const genre in updatedBand) {
      const artist = updatedBand[genre];
      if (artist) {
        // Fetch artist's albums
        let response = await fetch('http://127.0.0.1:5000/artist_albums', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken, artistId: artist.id }),
        });
        const { albums } = await response.json();
  
        let albumPopularityChange = 0;
        let relevantAlbumCount = 0;
  
        for (const album of albums) {
          // Fetch album details
          response = await fetch('http://127.0.0.1:5000/album_details', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken, albumId: album.id }),
          });
          const { albumDetails } = await response.json();
  
          // Check if album's genre matches the artist's current genre
          if (albumDetails.genres.includes(genre)) {
            relevantAlbumCount++;
            albumPopularityChange += calculatePopularityChange(artist.popularity, albumDetails.popularity);
          }
        }

      }
    }
  
    setTotalPopularity(newPopularity);
  };
  

  const calculatePopularityChange = (artistPopularity, albumPopularity) => {
    return albumPopularity - artistPopularity;
  };

  // Sample function to select an artist by name
  const addArtist = (artistName) => {
    handleSelectArtist(artistName);
  };

  return (
    <div>
      <p>Total Band Popularity: {totalPopularity}</p>
      {Object.entries(band).map(([genre, artist]) => (
        artist ? <p key={genre}>{genre.toUpperCase()}: {artist.name}</p> : null
      ))}
    </div>
  );
};

export default Band;
