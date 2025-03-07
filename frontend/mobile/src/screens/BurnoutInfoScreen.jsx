import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BurnoutInfoScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Les Symptômes du Burnout</Text>
      <Text style={styles.paragraph}>
        Le burnout se caractérise par un épuisement émotionnel, une dépersonnalisation et une baisse de l'accomplissement personnel.
      </Text>
      <Text style={styles.subtitle}>Symptômes principaux :</Text>
      <Text style={styles.listItem}>• Fatigue extrême et épuisement constant</Text>
      <Text style={styles.listItem}>• Cynisme et détachement vis-à-vis du travail</Text>
      <Text style={styles.listItem}>• Baisse de performance et sentiment d'incompétence</Text>
      
      <Text style={styles.title}>Différence entre Burnout et Dépression</Text>
      <Text style={styles.paragraph}>
        Le burnout est lié au contexte professionnel et se manifeste principalement par une fatigue liée au travail, alors que la dépression est un trouble global affectant divers aspects de la vie quotidienne, avec des symptômes tels qu'une tristesse persistante et une perte d'intérêt pour les activités.
      </Text>
      <Button
        title="Faire un diagnostic"
        onPress={() => navigation.navigate('Diagnostic')}
      />
      <Button
        title="Prévention"
        onPress={() => navigation.navigate('Questionnaire', { category: 'prevention' })}
      />
      <Button
        title="Diagnostic"
        onPress={() => navigation.navigate('Questionnaire', { category: 'diagnostic' })}
      />
      <Button
        title="Récupération"
        onPress={() => navigation.navigate('Questionnaire', { category: 'recovery' })}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E0F7FA',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#00695C',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#00796B',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    color: '#424242',
    textAlign: 'justify',
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
    paddingLeft: 10,
    color: '#424242',
  },
});

export default BurnoutInfoScreen;