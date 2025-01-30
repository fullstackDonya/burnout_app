import React, { useState, useEffect } from 'react';

const WebSocketChat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000'); // Connexion WebSocket
        setWs(socket);
        
        socket.onmessage = (event) => {
            console.log('Message reçu:', event.data);
            setMessages(prev => [...prev, event.data]); // Ajout des messages reçus
        };

        socket.onclose = () => {
            console.log('Déconnecté du WebSocket');
        };

        return () => socket.close();
    }, []);

    const sendMessage = () => {
        if (ws && message.trim()) {
            ws.send(message);
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Chat WebSocket</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Envoyer</button>
        </div>
    );
};

export default WebSocketChat;
