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
import { View, Text, TouchableOpacity } from 'react-native';
import artistData from './artists_data.json'; // Path to your JSON file
import albumData from './albums_data.json'; // Path to your JSON file

const Band = ({ selectedArtistName }) => {
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
        "pop", "cantopop", "indie-pop", "k-pop", "mandopop", "pop-film", "power-pop", "synth-pop", "j-pop", "j-idol"
    ],
    "rock": [
        "alt-rock", "alternative", "british", "emo", "grunge", "hard-rock", "indie", "j-rock", "psych-rock", "punk", 
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
        "indie", "singer-songwriter", "songwriter", "acoustic", "folk", "garage", "lo-fi", "new-age"
    ],
    "country": [
        "country", "americana", "bluegrass", "honky-tonk", "southern-rock", "cowpunk"
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

  const mapGenreToCategory = (genres) => {
    for (const genre of genres) {
      for (const category in genreMapping) {
        if (genreMapping[category].includes(genre.toLowerCase())) { // Lowercase comparison
          return category;
        }
      }
    }
    return "world"; // Default category if no match
  };
  const handleRemoveArtist = (artistId, genre) => {
    console.log(`Removing artist with ID: ${artistId} from ${genre}`);
    setBand(prevBand => {
        // Filter out the artist from the specific genre
        const updatedGenreArtists = prevBand[genre].filter(artist => artist.id !== artistId);
        // Update the band without the removed artist
        const updatedBand = { ...prevBand, [genre]: updatedGenreArtists };
        console.log('Band state after removal:', updatedBand);

        // Recalculate the band popularity
        updateBandPopularity(updatedBand);

        return updatedBand;
    });
};
    const handleSelectArtist = (artistName) => {
        console.log('Current band state before update:', band);
        const artistNameLower = artistName.toLowerCase();
        const artist = artistData.artists.find(a => a.name.toLowerCase() === artistNameLower);
    
        if (!artist) {
            console.log('Artist not found');
            return;
        }
    
        // Try to fit the artist into one of their genres
        for (const genre of artist.genres) {
            const mappedGenre = mapGenreToCategory([genre]);
            if (!band[mappedGenre].length) {
                console.log(`Adding ${artist.name} to ${mappedGenre}`);
                setBand(prevBand => {
                    const updatedBand = {
                        ...prevBand,
                        [mappedGenre]: [...prevBand[mappedGenre], artist]
                    };
    
                    // Update band popularity after setting the new band state
                    updateBandPopularity(updatedBand, artist, mappedGenre);
    
                    return updatedBand;
                });
                return; // Exit after adding artist
            }
        }
    
        console.log(`${artist.name} rocks in the genres ${artist.genres.join(', ')}, and we already have members in the band for those.`);
    };
    

useEffect(() => {
    console.log(`useEffect called with name: ${selectedArtistName}`);
    if (selectedArtistName) {
        handleSelectArtist(selectedArtistName);
    }
}, [selectedArtistName]);// Ensure that this effect runs only when selectedArtistName changes  
const updateBandPopularity = (updatedBand) => {
    let newBandPopularity = 20; // Base popularity

    console.log("Starting Band Popularity Recalculation");

    // Loop through each genre in the band
    for (const genre in updatedBand) {
      updatedBand[genre].forEach(artist => {
        // Filter artist's albums by the mapped genre
        const artistAlbums = albumData.albums.filter(album =>
          album.artists.some(a => a.id === artist.id) && 
          album.genres.some(albumGenre => mapGenreToCategory([albumGenre]) === genre)
        );

        console.log(`Calculating popularity change for ${artist.name} in ${genre} genre:`);

        artistAlbums.forEach(album => {
          // Calculate the change in popularity for each album
          const albumPopularityChange = (album.popularity - artist.popularity) / artist.popularity;
          console.log(`Album: ${album.name}, Album Popularity: ${album.popularity}, Artist Popularity: ${artist.popularity}, Popularity Change: ${albumPopularityChange.toFixed(4)}`);
          newBandPopularity += albumPopularityChange;
        });

        if (artistAlbums.length === 0) {
          console.log(`No albums found for ${artist.name} in ${genre} genre.`);
        }
      });
    }

    console.log(`New Band Popularity: ${newBandPopularity.toFixed(2)}`);
    setBandPopularity(newBandPopularity);
};

  


  
return (
    <View>
        <Text>Total Band Popularity: {bandPopularity.toFixed(2)}</Text>
        {Object.entries(band).map(([genre, artists]) => (
            <View key={genre}>
                <Text>{`${genre.toUpperCase()}:`}</Text>
                {artists.map((artist, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>{artist.name}</Text>
                        <TouchableOpacity onPress={() => handleRemoveArtist(artist.id, genre)}>
                            <Text style={{ marginLeft: 10, color: 'red' }}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        ))}
    </View>
);
};

export default Band;
