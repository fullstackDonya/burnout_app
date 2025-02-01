import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Login from '../components/Login';

const LoginScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Login />
            <Button
                title="Register"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
});

export default LoginScreen;