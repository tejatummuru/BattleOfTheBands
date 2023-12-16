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
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Band from './band'; // Make sure the path is correct

const App = () => {
  const [selectedArtistName, setSelectedArtistName] = useState('');
  const [refreshBandKey, setRefreshBandKey] = useState(0); // Added for refreshing the Band component
  const sampleArtists = ["Artist 1", "Artist 2", "Artist 3", "Artist 4", "Artist 5", "Artist 6", "Artist 7"];

  const selectArtist = (artistName) => {
    setSelectedArtistName(artistName);
    setRefreshBandKey(prevKey => prevKey + 1);
    // Reset the selected artist name after adding them to the band
    setTimeout(() => {
        setSelectedArtistName('');
    }, 100);
};
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchInput: {
      height: 40,
      width: '80%',
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
    },
  });
  return (
    <View style={styles.container}>
      {sampleArtists.map(artistName => (
        <TouchableOpacity key={artistName} onPress={() => selectArtist(artistName)}>
          <Text>Add {artistName}</Text>
        </TouchableOpacity>
      ))}
      <Band selectedArtistName={selectedArtistName} />
    </View>
  );
};

export default App;
