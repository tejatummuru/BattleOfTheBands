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

import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import Band from './band';
import artistData from './artists_data.json'; // Import your artist data

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [bandKey, setBandKey] = useState(0);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search for Artists"
      />
      {searchQuery.length > 0 && (
        <ScrollView style={styles.resultsContainer}>
          {filteredArtists.map((artist) => (
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
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
});

export default App;


