import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { connectWebSocket } from '../../utils/websocket';
import { fetchMessages, sendMessage } from '../../redux/slices/messageSlice';
import { selectUserId } from '../../redux/selectors';
import './Chat.css';

const Chat = () => {
    const { conversationId } = useParams();
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages.messages[conversationId] || []);
    const userId = useSelector(selectUserId);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (conversationId) {
            connectWebSocket();
            dispatch(fetchMessages(conversationId));
        }
    }, [dispatch, conversationId]);

    console.log("🔹 userId dans Chat.js:", userId); // Vérifie si userId est bien défini

    const handleSendMessage = () => {
        console.log("🔹 Envoi du message:", { conversationId, userId, message });
        if (message.trim()) {
            dispatch(sendMessage({ sender: userId, conversation: conversationId, content: message }));
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender._id === userId ? 'right' : 'left'}`}
                    >
                        <div className="message-content">
                            <strong>{msg.sender?.name}:</strong> {msg.content}
                        </div>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Envoyer</button>
        </div>
    );
};


export default Chat;