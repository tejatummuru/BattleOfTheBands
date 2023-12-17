// GenreCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const GenreCard = ({ genre, artist }) => {
  // Function to get the image URL or a placeholder if not available
  const getImageUrl = () => {
    if (artist && artist.images && artist.images.length > 0) {
      return { uri: artist.images[0].url };
    }
    // Return a placeholder or a local image if no artist image is available
    return require('./path-to-your-placeholder-image.png');
  };

  return (
    <View style={styles.card}>
      <Text style={styles.genre}>{genre.toUpperCase()}</Text>
      {artist ? (
        <>
          <Image source={getImageUrl()} style={styles.image} />
          <Text style={styles.artistName}>{artist.name}</Text>
        </>
      ) : (
        <Text style={styles.noArtist}>No Artist Selected</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android shadow
    padding: 10,
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'white', // for shadow to take effect
  },
  genre: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  artistName: {
    marginTop: 5,
  },
  noArtist: {
    color: 'grey',
  },
});

export default GenreCard;
