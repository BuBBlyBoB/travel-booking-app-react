import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const CountryDesc = ({ 
    country,
    city,
    description,
    img,
    long, 
    lat 
}) => {
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/@${lat},${long},8z`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.country}>
      <Image source={{ uri: img }} style={styles.image} />
      <Text style={styles.title}>{country}, {city}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={openGoogleMaps}>
        <Text style={styles.buttonText}>View on Google Maps</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  country: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  image: {
    width: 200,
    height: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    marginTop: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CountryDesc;
