import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const QuestionnaireScreen = () => {
  const route = useRoute();
  const { category } = route.params;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/questions/${category}`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des questions:", error);
      }
    };

    fetchQuestions();
  }, [category]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Questionnaire de {category}</Text>
      <FlatList
        data={questions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.text}</Text>
            {item.options.map((option, index) => (
              <Button key={index} title={option} onPress={() => {}} />
            ))}
          </View>
        )}
      />
      <Button
        title="Soumettre"
        onPress={() => {
          // Ajoutez ici la logique pour soumettre les réponses
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F7FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#00695C',
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#424242',
  },
});

export default QuestionnaireScreen;