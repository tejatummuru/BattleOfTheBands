// GenreCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import PixelBorder from './pixelborder';
import { generateRandomPinks } from './helper';


const GenreCard = ({ genre, artist, onRemoveArtist }) => {
  // Function to get the image URL or a placeholder if not available
  const randomPinkShades = generateRandomPinks(40);
  const getImageUrl = () => {
    if (artist && artist.images && artist.images.length > 0) {
      return { uri: artist.images[0].url };
    }
    // Return a placeholder or a local image if no artist image is available
    return require('./path-to-your-placeholder-image.png');
  };

  return (
    <View style={styles.cardContainer}>
      {/* Top border */}
      <View style={styles.pixelRow}>
        {randomPinkShades.map((color, index) => (
          <View key={`top-${index}`} style={[styles.pixel, { backgroundColor: color }]} />
        ))}
      </View>

      {/* Side borders and content */}
      <View style={styles.contentRow}>
        {/* Left border */}
        <View style={styles.pixelColumn}>
          {randomPinkShades.map((color, index) => (
            <View key={`left-${index}`} style={[styles.pixel, { backgroundColor: color }]} />
          ))}
        </View>
        <View style={styles.card}>
        <Text style={styles.genre}>{genre.toUpperCase()}</Text>
        {artist ? (
          <>
            <TouchableOpacity onPress={() => onRemoveArtist(artist.id)}>
            <Image source={getImageUrl()} style={styles.image} />
          </TouchableOpacity>
            <Text style={styles.artistName}>{artist.name}</Text>
          </>
        ) : (
          <Text style={styles.noArtist}>No Artist Selected</Text>
        )}
      </View>
        {/* Right border */}
        <View style={styles.pixelColumn}>
          {randomPinkShades.map((color, index) => (
            <View key={`right-${index}`} style={[styles.pixel, { backgroundColor: color }]} />
          ))}
        </View>
      </View>

      {/* Bottom border */}
      <View style={styles.pixelRow}>
        {randomPinkShades.map((color, index) => (
          <View key={`bottom-${index}`} style={[styles.pixel, { backgroundColor: color }]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pixelRow: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
  },
  pixelColumn: {
    flexDirection: 'column',
  },
  pixel: {
    width: 4,
    height: 4,
    flexGrow: 1,
  },
  image: {
    width: '100%', // Make the image responsive
    height: 'auto', // Maintain aspect ratio
    aspectRatio: 1, // Aspect ratio of the image, change as needed
    // Other styles...
  },
  card: {
    flex: 1, // This will allow the card to grow to fill the space
    flexBasis: 'auto', // This will set the base size of the card to be automatic
    flexGrow: 1,
    flexShrink: 1,
    minWidth: '250px',
    maxWidth: '45%', // Adjust this value to control when the cards wrap
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    alignItems: 'center',
    margin: 4,
    backgroundColor: 'white',
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
