// filepath: /Users/donyab/Desktop/Stack_mern_typescript/frontend/mobile/src/screens/ProfileScreen.jsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login');
      }
    };

    checkAuth();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;