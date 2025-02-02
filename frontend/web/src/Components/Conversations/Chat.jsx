import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../../redux/slices/messageSlice';
import { connectWebSocket, sendMessage as sendWebSocketMessage } from '../../utils/websocket';
import './css/Chat.css';

const Chat = () => {
    const dispatch = useDispatch();
    const conversationId = useSelector((state) => state.conversations.selectedConversationId); // Récupérer l'ID de la conversation depuis le store Redux
    const messages = useSelector((state) => state.messages.messages[conversationId] || []);
    const userId = useSelector((state) => state.auth.userId); 
    const [message, setMessage] = useState('');
    console.log("User ID:", userId); 

    useEffect(() => {
        if (conversationId) {
            dispatch(fetchMessages(conversationId));
            connectWebSocket();
        }
    }, [dispatch, conversationId]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = { senderId: userId, conversationId: conversationId, content: message };
            console.log("Envoi du message :", newMessage); 
            sendWebSocketMessage(newMessage);
            setMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg) => (
                    <div key={msg._id} className={`message ${msg.sender === userId ? 'sent' : 'received'}`}>
                        <p>{msg.content}</p>
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tapez votre message..."
                />
                <button onClick={handleSendMessage}>Envoyer</button>
            </div>
        </div>
    );
};

export default Chat;