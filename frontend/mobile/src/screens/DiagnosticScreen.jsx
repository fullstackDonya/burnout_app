import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DiagnosticScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnostic de Burnout</Text>
      <Text style={styles.paragraph}>
        Répondez aux questions suivantes pour évaluer votre risque de burnout.
      </Text>
      {/* Ajoutez ici les questions de diagnostic */}
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
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    color: '#424242',
    textAlign: 'justify',
  },
});

export default DiagnosticScreen;