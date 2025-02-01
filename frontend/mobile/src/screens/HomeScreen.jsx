// filepath: /Users/donyab/Desktop/Stack_mern_typescript/frontend/mobile/src/screens/HomeScreen.jsx
import React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const cards = [
    {
      id: 1,
      title: 'Card 1',
      description: 'This is the description for card 1.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'Card 2',
      description: 'This is the description for card 2.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: 'Card 3',
      description: 'This is the description for card 3.',
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      {cards.map((card) => (
        <TouchableOpacity key={card.id} style={styles.card} onPress={() => navigation.navigate('Profile')}>
          <Image source={{ uri: card.image }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;