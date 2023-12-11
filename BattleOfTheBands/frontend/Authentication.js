import React from 'react';
import { authorize } from 'react-native-app-auth';
import { View, Button } from 'react-native';

const AuthScreen = () => {
    const spotifyAuthConfig = {
        clientId: 'c935d06a336246adb4f76634e07b3079',
        clientSecret: '6b2cc395c58a40ce881cc138a97a5fe0', // Note: In production, you should not hardcode the secret in your app.
        redirectUrl: 'http://localhost:8000/callback',
        scopes: ['streaming', 'playlist-read-private', 'user-read-email', 'user-read-private'], // Define your scopes here
        serviceConfiguration: {
          authorizationEndpoint: 'https://accounts.spotify.com/authorize',
          tokenEndpoint: 'https://accounts.spotify.com/api/token',
        },
    };

  const handleAuth = async () => {
    try {
      const authState = await authorize(spotifyAuthConfig);
      // Handle the returned authState, save it securely
      console.log(authState);
    } catch (error) {
      console.error('Failed to log in', error);
    }
  };

  return (
    <View>
      <Button title="Log in with Spotify" onPress={handleAuth} />
    </View>
  );
};

export default AuthScreen;
