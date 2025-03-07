// filepath: /src/screens/HomeScreen.jsx
import React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const navigation = useNavigation();

  const cards = [
    {
      id: 1,
      title: 'Prévention du Burnout',
      description: 'Des conseils et exercices pour prévenir le burnout et améliorer votre bien-être quotidien.',
      image: 'https://via.placeholder.com/300x150/81D4FA/ffffff?text=Prévention',
    },
    {
      id: 2,
      title: 'Techniques de Relaxation',
      description: 'Découvrez des techniques de méditation, de respiration et de relaxation pour diminuer le stress.',
      image: 'https://via.placeholder.com/300x150/A5D6A7/ffffff?text=Relaxation',
    },
    {
      id: 3,
      title: 'Exercices de Bien-être',
      description: 'Programme d’exercices simples pour retrouver énergie et équilibre.',
      image: 'https://via.placeholder.com/300x150/FFCC80/ffffff?text=Bien-être',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bien-être et Prévention du Burnout</Text>
      {cards.map((card) => (
        <TouchableOpacity
          key={card.id}
          style={styles.card}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image source={{ uri: card.image }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.infoButton} onPress={() => navigation.navigate('BurnoutInfo')}>
        <Text style={styles.infoButtonText}>En savoir plus sur le burnout</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button title="Aller au Profil" onPress={() => navigation.navigate('Profile')} color="#00796B" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00695C',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#616161',
  },
  infoButton: {
    backgroundColor: '#00796B',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  infoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
});

export default HomeScreen;
