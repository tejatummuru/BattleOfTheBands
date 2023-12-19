// import React, { useState } from 'react';
// import { View, Text, Alert } from 'react-native';

// const Band = ({ accessToken }) => {
//   const initialBand = {
//     pop: null,
//     rock: null,
//     hipHop: null,
//     instrumental: null,
//     rAndB: null,
//     indie: null,
//     country: null,
//   };

//   const [band, setBand] = useState(initialBand);
//   const [totalPopularity, setTotalPopularity] = useState(20);
// //   const [accessToken, setAccessToken] = useState(''); // Set your access token here

//   const handleSelectArtist = async (query) => {
//     try {
//       // Fetch artist data
//       let response = await fetch('http://127.0.0.1:5000/search_artists', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ accessToken, query }),
//       });
//       const { artists } = await response.json();
//       const artist = artists[0]; // Assume you want the first artist from the response

//       // Check and update band
//       const primaryGenre = artist.genres[0]; // Assuming the first genre is the primary
//       const updatedBand = { ...band };

//       if (!band[primaryGenre]) {
//         updatedBand[primaryGenre] = artist;
//       } else {
//         // Try to fit the artist in another genre
//         const availableGenre = Object.keys(band).find(genre => !band[genre]);
//         if (availableGenre) {
//           updatedBand[availableGenre] = artist;
//         } else {
//           alert('All genre slots are filled. Please remove an artist to add a new one.');
//           return;
//         }
//       }

//       setBand(updatedBand);
//       updateBandPopularity(updatedBand, artist.id);
//     } catch (error) {
//       console.error('Error fetching artist:', error);
//     }
//   };

//   const updateBandPopularity = async (updatedBand) => {
//     let newPopularity = totalPopularity; // Base popularity
  
//     for (const genre in updatedBand) {
//       const artist = updatedBand[genre];
//       if (artist) {
//         // Fetch artist's albums
//         let response = await fetch('http://127.0.0.1:5000/artist_albums', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ accessToken, artistId: artist.id }),
//         });
//         const { albums } = await response.json();
  
//         let albumPopularityChange = 0;
//         let relevantAlbumCount = 0;
  
//         for (const album of albums) {
//           // Fetch album details
//           response = await fetch('http://127.0.0.1:5000/album_details', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ accessToken, albumId: album.id }),
//           });
//           const { albumDetails } = await response.json();
  
//           // Check if album's genre matches the artist's current genre
//           if (albumDetails.genres.includes(genre)) {
//             relevantAlbumCount++;
//             albumPopularityChange += calculatePopularityChange(artist.popularity, albumDetails.popularity);
//           }
//         }

//       }
//     }
  
//     setTotalPopularity(newPopularity);
//   };
  

//   const calculatePopularityChange = (artistPopularity, albumPopularity) => {
//     return albumPopularity - artistPopularity;
//   };

//   // Sample function to select an artist by name
//   const addArtist = (artistName) => {
//     handleSelectArtist(artistName);
//   };

//   return (
//     <View>
//       <Text>Total Band Popularity: {totalPopularity}</Text>
//       {Object.entries(band).map(([genre, artist]) => (
//         artist ? <Text key={genre}>{genre.toUpperCase()}: {artist.name}</Text> : null
//       ))}
//     </View>
//   );
// };

// export default Band;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import artistData from './artists_data.json'; // Path to your JSON file
import albumData from './albums_data.json'; // Path to your JSON file
import GenreCard from './genrecard';
import axios from 'axios';

const Band = ({ selectedArtist, setSelectedArtist }) => {
    const initialBand = {
        pop: [],
        rock: [],
        hipHop: [],
        instrumental: [],
        rAndB: [],
        indie: [],
        country: [],
        world: [], // And so on for other genres...
      };

  const genreMapping = {
    "pop": [
        "pop", "cantopop", "k-pop", "mandopop", "pop-film", "power-pop", "synth-pop", "j-pop", "j-idol"
    ],
    "rock": [
        "alt-rock", "alternative", "british", "emo", "grunge", "hard-rock", "j-rock", "psych-rock", "punk", 
        "punk-rock", "rock", "rock-n-roll", "rockabilly", "black-metal", "death-metal", "metal", "metal-misc", "metalcore",
        "goth", "heavy-metal", "hardcore", "post-dubstep"
    ],
    "hipHop": [
        "hip-hop", "club", "rap"
    ],
    "instrumental": [
        "ambient", "classical", "instrumental", "jazz", "piano", "soundtracks", "bossanova", "children", "chill", 
        "dance", "breakbeat", "chicago-house", "dancehall", "deep-house", "detroit-techno", "disney", "drum-and-bass",
        "dub", "dubstep", "edm", "electro", "electronic", "house", "idm", "minimal-techno", "techno", "trance", 
        "trip-hop", "swedish", "opera"
    ],
    "rAndB": [
        "r-n-b", "soul", "disco", "blues", "funk", "groove", "motown", "gospel"
    ],
    "indie": [
        "indie", "singer-songwriter", "songwriter", "acoustic", "folk", "garage", "lo-fi", "new-age", "indie-pop"
    ],
    "country": [
        "country", "americana", "bluegrass", "honky-tonk", "southern-rock", "cowpunk", "contemporary country"
    ],
    "world": [
        "afrobeat", "brazil", "latin", "reggae", "reggaeton", "salsa", "samba", "world-music", "african", 
        "caribbean", "celtic", "flamenco", "indian", "latin-jazz", "middle-eastern", "tango", "anime", "comedy", 
        "happy", "holidays", "kids", "malay", "movies", "mpb", "pagode", "party", "philippines-opm", "sertanejo",
        "show-tunes", "ska", "summer"
    ]
    };

  const [band, setBand] = useState(initialBand);
  const [bandPopularity, setBandPopularity] = useState(20);
  const [albums, setAlbums] = useState([]);
  const accessToken = 'BQC402KXoLOPl0iIzUePFfGXJNQdYgYxF-od1oPKSNdEDEBe9-t6F47TmDgFxUTwm5M64FlK831J7aYUeN5-U9cCXQyPz3rPGIjejUyhGBXS9ggfXNw'; 
  const [genreOccupiedMessage, setGenreOccupiedMessage] = useState('');

 const areAllGenresFilled = () => {
    return Object.values(band).every(genre => genre.length > 0);
 };

 const mapGenreToCategory = (genres) => {
  console.log(genres);
  for (const genre of genres) {
    console.log(genre);
    for (const category in genreMapping) {
      if (genreMapping[category].includes(genre.toLowerCase())) { 
        return category;
      }

      // Check if any subgenre within a category includes a part of the Spotify genre
      for (const subgenre of genreMapping[category]) {
        if (genre.toLowerCase().includes(subgenre)) {
          return category;
        }
      }
    }
  }
};

const handleRemoveArtist = (artistId, genre) => {
  setGenreOccupiedMessage(' ');
  console.log(`Removing artist with ID: ${artistId} from ${genre}`);
  if (areAllGenresFilled()) {
    setGenreOccupiedMessage('All genres are filled. No more artists can be added.');
      return;
  }
  setBand(prevBand => {
    // Filter out the artist from the specific genre
    const updatedGenreArtists = prevBand[genre].filter(artist => artist.id !== artistId);
    // Update the band without the removed artist
    const updatedBand = { ...prevBand, [genre]: updatedGenreArtists };
    console.log('Band state after removal:', updatedBand);

    // Recalculate the band popularity with the updated band
    updateBandPopularity(updatedBand);

    return updatedBand;
  });
};

// const handleSelectArtist = async (artist) => {
//   if (!artist) {
//     console.log('Artist not found');
//     return;
//   }
//   if (areAllGenresFilled()) {
//     console.log("All genres are filled. No more artists can be added.");
//     return;
//   }
  
//   // Assuming you have a state variable for albums and accessToke

//   let genreAdded = false;

//   for (const genre of artist.genres) {
//     const mappedGenre = mapGenreToCategory([genre]);
//     console.log(mappedGenre);

//     if (!band[mappedGenre].length) {
//       console.log(`Adding ${artist.name} to ${mappedGenre}`);
//       setBand(prevBand => {
//         const updatedBand = {
//           ...prevBand,
//           [mappedGenre]: [...prevBand[mappedGenre], artist]
//         };
//         // Update band popularity after setting the new band state
//         updateBandPopularity(updatedBand, mappedGenre);
//         return updatedBand;
//       });
//       genreAdded = true;
//       break; // Exit after adding artist to the first available genre
//     }
//   }
//   if (genreAdded) {
//     try {
//       const fetchedAlbums = await fetchArtistAlbums(artist.id, accessToken);
//       console.log('Fetched Albums:', fetchedAlbums); // Debug log
//       if (Array.isArray(fetchedAlbums)) {
//         setAlbums(fetchedAlbums); 
//         updateBandPopularity(fetchedAlbums, artist); 
//       } else {
//         console.error('fetchedAlbums is not an array', fetchedAlbums);
//       }
//     } catch (error) {
//       console.error('Error fetching albums:', error);
//     }
//   } else {
//     setGenreOccupiedMessage(`${artist.name} rocks in the genres ${artist.genres.join(', ')}, but the ${mappedGenre} genre is already occupied in the band.`);
//   } 
//   setSelectedArtist(artist);
// };

const handleSelectArtist = async (artist) => {
  setGenreOccupiedMessage('');
  if (!artist) {
    console.log('Artist not found');
    return;
  }
  if (areAllGenresFilled()) {
    setGenreOccupiedMessage('All genres are filled. No more artists can be added.');
    return;
  }
  
  // Assuming you have a state variable for albums and accessToke

  let genreAdded = false;

  for (const genre of artist.genres) {
    const mappedGenre = mapGenreToCategory([genre]);
    console.log(mappedGenre);
    if (!band[mappedGenre].length) {
      console.log(`Adding ${artist.name} to ${mappedGenre}`);
      setBand(prevBand => {
        const updatedBand = {
          ...prevBand,
          [mappedGenre]: [...prevBand[mappedGenre], artist]
        };
        // Update band popularity after setting the new band state
        updateBandPopularity(updatedBand, mappedGenre);
        return updatedBand;
      });
      genreAdded = true;
      break; // Exit after adding artist to the first available genre
    }
  }
  if (genreAdded) {
    try {
      const fetchedAlbums = await fetchArtistAlbums(artist.id, accessToken);
      console.log('Fetched Albums:', fetchedAlbums); // Debug log
      if (Array.isArray(fetchedAlbums)) {
        setAlbums(fetchedAlbums); 
        updateBandPopularity(fetchedAlbums, artist); 
      } else {
        console.error('fetchedAlbums is not an array', fetchedAlbums);
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  } else {
    setGenreOccupiedMessage(`${artist.name} rocks in the genre(s) ${artist.genres.join(', ')}, but all their genre(s) are already occupied in the band.`);
  }
  setSelectedArtist(artist);
};


useEffect(() => {
    if (selectedArtist) {
        handleSelectArtist(selectedArtist);
    }
}, [selectedArtist]);
      
const fetchArtistAlbums = async (artistId, accessToken) => {
  try {
    const endpoint = `https://api.spotify.com/v1/artists/${artistId}/albums`;
    const response = await axios.get(endpoint, {
      headers: {
        'Authorization': `Bearer BQC402KXoLOPl0iIzUePFfGXJNQdYgYxF-od1oPKSNdEDEBe9-t6F47TmDgFxUTwm5M64FlK831J7aYUeN5-U9cCXQyPz3rPGIjejUyhGBXS9ggfXNw`
      },
      params: {
        include_groups: 'album,single',
        limit: 20
      }
    });
    console.log('Response Data:', response.data.items); // Debug log
    return response.data.items;
    } catch (error) {
    console.error('Error fetching albums:', error);
    return []; // Return an empty array in case of an error
  }
};

const updateBandPopularity = async (updatedBand, mappedGenre) => {
  let newBandPopularity = 20; // Start with a base popularity

  for (const genre in updatedBand) {
    for (const artist of updatedBand[genre]) {
      // Fetch albums for the artist
      const artistAlbums = await fetchArtistAlbums(artist.id);

      for (const album of artistAlbums) {
        const albumDetail = await fetchAlbumDetails(album.id, accessToken);

        // Check if the album's genre is different from the artist's current genre
        if (!albumDetail.genres.some(genre => genre === mappedGenre)) {
          const albumPopularityChange = (albumDetail.popularity - artist.popularity) / artist.popularity;
          newBandPopularity += albumPopularityChange;
        }
      }
    }
  }

  setBandPopularity(newBandPopularity);
};



const fetchAlbumDetails = async (albumId, accessToken) => {
  const endpoint = `https://api.spotify.com/v1/albums/${albumId}`;
  const response = await axios.get(endpoint, {
    headers: {
      'Authorization': `Bearer BQC402KXoLOPl0iIzUePFfGXJNQdYgYxF-od1oPKSNdEDEBe9-t6F47TmDgFxUTwm5M64FlK831J7aYUeN5-U9cCXQyPz3rPGIjejUyhGBXS9ggfXNw`
    }
  });
  return response.data; // This will return detailed album data including popularity
};

return (
  <View style={styles.bandContainer}>
    <Text style={styles.popularityText}>Total Band Popularity: {bandPopularity.toFixed(2)}</Text>
    {genreOccupiedMessage && <Text style={styles.messageText}>{genreOccupiedMessage}</Text>}
    <View style={styles.cardsContainer}>
      {Object.entries(band).map(([genre, artists]) => (
        <GenreCard 
          key={genre} 
          genre={genre} 
          artist={artists[0] || null}
          onRemoveArtist={() => handleRemoveArtist(artists[0]?.id, genre)} // Pass the artist ID and genre for removal
        />
      ))}
    </View>
  </View>
);
};
const styles = StyleSheet.create({
  messageText: {
    textAlign: 'center',
    color: 'red', // Adjust the color as needed
    margin: 10,
  },
    bandContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start', // Align items to the start of the screen
    },
    popularityText: {
      textAlign: 'center',
      margin: 10,
      fontSize: 20,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 0, // Add padding to account for the width of the pixel borders if needed
      },
  });
export default Band;
