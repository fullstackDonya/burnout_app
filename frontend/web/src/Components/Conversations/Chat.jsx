import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWebSocket, sendMessage } from '../../utils/websocket';
import { fetchMessages } from '../../store/messageSlice';

const Chat = ({ conversationId }) => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages[conversationId] || []);
    const [message, setMessage] = useState('');

    useEffect(() => {
        connectWebSocket();
        dispatch(fetchMessages(conversationId));
    }, [dispatch, conversationId]);

    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessage({ conversationId, senderId: "USER_ID", content: message });
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.sender?.name}:</strong> {msg.content}</p>
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