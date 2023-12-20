// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Button, TextInput, TouchableOpacity, Text } from 'react-native';
// import * as AuthSession from 'expo-auth-session';
// import * as Random from 'expo-random';
// import ArtistSearchComponent from './frontend/ArtistSelection';
// import Band from './band'; // Assuming Band.js is in the same directory

// // You must replace 'yourapp' with your actual scheme from app.json
// const redirectUri = AuthSession.makeRedirectUri({
//   useProxy: true,
//   scheme: 'BattleOfTheBands',
// });

// const spotifyConfig = {
//   clientId: 'c935d06a336246adb4f76634e07b3079',
//   scopes: ['user-read-private', 'user-read-email', 'playlist-read-private', 'playlist-read-collaborative'],
// };

// export default function App() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const sampleArtists = ["Gracie Abrams", "Maisie Peters", "Travis Scott", "Taylor Swift", "Sarah Kinsley", "Ed Sheeran", "Conan Gray"];
//   const [accessToken, setAccessToken] = useState('BQDElCm5DsYOD80X0HBKkViUPzo8WNsZyU47ZmwP9VGyR3fiji620kBdp3dAfgxnWAxhOZlteM1i4Or3yox0IVpwF-qK2fNxP9z7eL7shb6fs_niMYU');
//   const [selectedArtistName, setSelectedArtistName] = useState('');
//   const selectArtist = (artistName) => {
//     setSelectedArtistName(artistName);
//   };
//   // Function to handle the authentication process
//   const handleSpotifyLogin = async () => {
//     // Generate a random string for the code verifier
//     const codeVerifier = Random.getRandomBytes(64).toString('base64');
//     const authUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyConfig.clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(spotifyConfig.scopes.join(' '))}&response_type=code&code_challenge_method=S256&code_challenge=${codeVerifier}`;
//     const response = await AuthSession.startAsync({ authUrl });

//     if (response.type === 'success') {
//       const code = response.params.code;
//       // Exchange the code for an access token
//       // You'll need to do this step from your server, not directly from the app
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//         placeholder="Search for Artists"
//       />
//       <Button title="Login with Spotify" onPress={handleSpotifyLogin} />
//       <View style={styles.container}>
//       {/* ... existing components ... */}
//       <Band selectedArtistName={selectedArtistName} accessToken={accessToken} />
//       <View>
//         {sampleArtists.map(artistName => (
//           <TouchableOpacity key={artistName} onPress={() => selectArtist(artistName)}>
//             <Text>Add {artistName}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//       <ArtistSearchComponent accessToken={accessToken} searchQuery={searchQuery} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   searchInput: {
//     height: 40,
//     width: '80%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     padding: 10,
//   },
// });

import React, { useState, useEffect} from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import Band from './band';
import artistData from './artists_data.json'; // Import your artist data
import PixelFlower from './flower';
import Guitar from './guitar';
import * as Font from 'expo-font';
import axios from 'axios';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [bandKey, setBandKey] = useState(0);
  const [searchResults, setSearchResults] = useState([]); // New state to hold search results

  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (text.length > 0) {
      try {
        // Spotify API endpoint for searching artists
        const endpoint = `https://api.spotify.com/v1/search`;
        const response = await axios.get(endpoint, { // The response is defined here inside the try block
          headers: {
            'Authorization': `Bearer ${'BQCCONZELfPaQW1xIWJl1lsHoGOBwCooDIrC-0Av-ADs2kxgeImFBq4OEkoIjGPqq3Vs9286n8elTeVs01csnHy2Gk7cVEiDzcIoB4Ygwj_JJ6y8uMc'}`
          },
          params: {
            q: text,
            type: 'artist',
            limit: 10
          }
        });
        
        // Use response here, inside the same block
        const artists = response.data.artists.items;
        console.log(artists);
        setSearchResults(artists); // Update the state with the fetched artists
      } catch (error) {
        console.error('Error fetching artists:', error);
        setSearchResults([]); // Clear results on error
      }
    } else {
      setSearchResults([]); // Clear results when text is cleared
    }
  };

  // const handleSearch = (text) => {
  //   setSearchQuery(text);
  // };
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Moonstar': require('./assets/fonts/Moonstar.ttf'), // Update the path to where your font file is located
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }
  const handleSelectArtist = (artist) => {
    setSelectedArtist(artist);
    setSearchQuery(''); // Clear search input
    // Increment key to force refresh Band component with new artist
    setBandKey(prevKey => prevKey + 1);
  };

  // Filter the artist data based on the search query
  const filteredArtists = artistData.artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const renderFlowersRow = () => {
    return Array.from({ length: 5 }).map((_, index) => <PixelFlower key={index} />);
  };

  return (
    
    <View style={styles.container}>
      {/* Add header with title and guitar */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Battle of the Bands</Text>
        <View style={styles.guitarContainer}>
        <Guitar />
        </View>
      </View>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search for Artists"
      />
      {searchQuery.length > 0 && (
      <ScrollView style={styles.resultsContainer}>
        {searchResults.map((artist) => ( // Use searchResults to render the list
          <TouchableOpacity key={artist.id} onPress={() => handleSelectArtist(artist)}>
            <Text style={styles.artistItem}>{artist.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )}
      {/* Pass the selectedArtist and key to the Band component */}
      <Band
      selectedArtist={selectedArtist}
      setSelectedArtist={setSelectedArtist} // Pass the setter to Band
    />
      {/* <View style={styles.flowersRow}>
        {renderFlowersRow()}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 10, // Reduced padding
    paddingBottom: 10, // Reduced padding
    marginBottom: 0,
  },
  headerText: {
    fontSize: 45,
    alignSelf: 'center',
    fontFamily: 'Moonstar',
  },
  container: {
    flex: 1,
    paddingTop: 20, // Reduced padding
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#FFEFFB',
    position: 'relative',
  },
  searchInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
  },
  resultsContainer: {
    marginTop: 10,
    width: '80%',
    maxHeight: 200,
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
  },
  artistItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  flowersRow: {
    position: 'absolute',
    bottom: 0, // Align to the bottom
    left: 0,
    right: 0,
    flexDirection: 'row', // Display flowers in a row
    justifyContent: 'space-evenly', // Evenly space the flowers
    // Make sure the height of this row is enough to contain the flowers without overlapping
    height: 20,/* height of your flowers, e.g., 100 */ 
  },
  guitarContainer: {
    width: 200,  // Adjust the width as needed
    height: 200,   // Adjust the height as needed
    alignItems: 'center', // Center children components
    justifyContent: 'center', // Center children components
    // any other styles you need for positioning and sizing
    marginLeft: 80,
    marginTop: 100,
    flex: 0,
  },
});

export default App;


