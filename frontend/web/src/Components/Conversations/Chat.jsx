import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMessages, sendMessage } from '../../redux/slices/messageSlice';
import './css/Chat.css';

const Chat = () => {
    const { conversationId } = useParams();
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages.messages[conversationId] || []);
    const userId = useSelector((state) => state.auth.userId); // Assurez-vous que l'ID de l'utilisateur est récupéré depuis l'état Redux
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