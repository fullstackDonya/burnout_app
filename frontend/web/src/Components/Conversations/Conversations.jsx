import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations, createConversation } from "../../redux/conversationSlice";
import { connectWebSocket, sendMessage } from "../../utils/websocket";
import { redirect } from "react-router-dom";

const Conversations = () => {
    const dispatch = useDispatch();
    const conversations = useSelector((state) => state.conversations.conversations);
    const userId = useSelector((state) => state.auth.userId); 
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (userId) {
            // Charger les conversations depuis l'API
            dispatch(fetchConversations(userId));
            connectWebSocket();
        }
    }, [dispatch, userId]);

    const handleStartConversation = () => {
        const senders = [userId];
        dispatch(createConversation(senders));
        
    };

    const handleSendMessage = (conversationId) => {
        if (message.trim() === "") return;
        sendMessage(conversationId, message);
        setMessage("");
    };

    return (
        <div>
            <h2>Conversations</h2>
            <button onClick={handleStartConversation}>Commencer une nouvelle conversation</button>
            <ul>
                {conversations.map((conversation) => (
                    <li key={conversation._id}>
                        <h3>Conversation avec {conversation.senders.map(sender => sender.name).join(", ")}</h3>
                        <ul>
                            {conversation.messages.map((msg) => (
                                <li key={msg._id}>{msg.content}</li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tapez votre message"
                        />
                        <button onClick={() => handleSendMessage(conversation._id)}>Envoyer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Conversations;