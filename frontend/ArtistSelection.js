import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';

const ArtistSearchComponent = ({ accessToken, query }) => {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchArtists = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:5000/search_artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken, query }),
      });
      const data = await response.json();
      console.log("inside");
      setArtists(data.artists); // Assuming that data.artists is the array you want
    } catch (error) {
      console.error('Error searching for artists:', error);
      setError('Error searching for artists');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchArtists();
    }
  }, [query]);// Added accessToken as a dependency as well

  return (
    <View>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      <FlatList
        data={artists}
        renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.name}</Text>
              <Text>Genres: {item.genres ? item.genres.join(', ') : 'N/A'}</Text>
              <Text>Followers: {item.followers.total.toLocaleString()}</Text>
              {item.images.length > 0 && (
                <Image
                  source={{ uri: item.images[0].url }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  resizeMode="cover"
                />
              )}
            </View>
          )}          
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ArtistSearchComponent;
