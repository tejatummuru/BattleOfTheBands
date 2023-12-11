import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as Random from 'expo-random';
import ArtistSearchComponent from './frontend/ArtistSelection';

// You must replace 'yourapp' with your actual scheme from app.json
const redirectUri = AuthSession.makeRedirectUri({
  useProxy: true,
  scheme: 'BattleOfTheBands',
});

const spotifyConfig = {
  clientId: 'c935d06a336246adb4f76634e07b3079',
  scopes: ['user-read-private', 'user-read-email', 'playlist-read-private', 'playlist-read-collaborative'],
};

export default function App() {
  const [accessToken, setAccessToken] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle the authentication process
  const handleSpotifyLogin = async () => {
    // Generate a random string for the code verifier
    const codeVerifier = Random.getRandomBytes(64).toString('base64');
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyConfig.clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(spotifyConfig.scopes.join(' '))}&response_type=code&code_challenge_method=S256&code_challenge=${codeVerifier}`;
    const response = await AuthSession.startAsync({ authUrl });

    if (response.type === 'success') {
      const code = response.params.code;
      // Exchange the code for an access token
      // You'll need to do this step from your server, not directly from the app
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for Artists"
      />
      <Button title="Login with Spotify" onPress={handleSpotifyLogin} />
      <ArtistSearchComponent accessToken={accessToken} searchQuery={searchQuery} />
    </View>
  );
}

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
