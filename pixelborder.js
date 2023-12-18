// PixelBorder.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Pixel = ({ color }) => (
  <View style={[styles.pixel, { backgroundColor: color }]} />
);

const PixelBorder = ({ colors, orientation, pixelSize }) => {
    const isHorizontal = orientation === 'horizontal';
    const containerStyle = isHorizontal ? styles.pixelsRow : styles.pixelsColumn;
    const pixelStyle = { width: pixelSize, height: pixelSize };
  
    const pixels = colors.map((color, index) => (
      <View key={index} style={[styles.pixel, { backgroundColor: color, ...pixelStyle }]} />
    ));
  
    return (
      <View style={containerStyle}>
        {pixels}
      </View>
    );
  };
  

const styles = StyleSheet.create({
  pixelsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  pixelsColumn: {
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  pixel: {
    width: 2,
    height: 2,
  },
});

export default PixelBorder;
