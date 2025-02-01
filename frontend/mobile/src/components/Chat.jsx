import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage } from '../../redux/slices/messageSlice';
import { selectUserId } from '../../redux/selectors';

const Chat = () => {
    const { conversationId } = useParams();
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages.messages[conversationId] || []);
    const userId = useSelector(selectUserId);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (conversationId) {
            dispatch(fetchMessages(conversationId));
        }
    }, [dispatch, conversationId]);

    const handleSendMessage = () => {
        if (message.trim()) {
            dispatch(sendMessage({ sender: userId, conversation: conversationId, content: message }));
            setMessage('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chat</Text>
            <ScrollView style={styles.messagesContainer}>
                {messages.map((msg, index) => (
                    <View
                        key={index}
                        style={[
                            styles.message,
                            msg.sender._id === userId ? styles.right : styles.left
                        ]}
                    >
                        <Text style={styles.messageContent}>
                            <Text style={styles.senderName}>{msg.sender?.name}:</Text> {msg.content}
                        </Text>
                    </View>
                ))}
            </ScrollView>
            <TextInput
                style={styles.input}
                value={message}
                onChangeText={(text) => setMessage(text)}
            />
            <Button title="Envoyer" onPress={handleSendMessage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    messagesContainer: {
        flex: 1,
        marginBottom: 10,
    },
    message: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    right: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    left: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
    },
    messageContent: {
        fontSize: 16,
    },
    senderName: {
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default Chat;