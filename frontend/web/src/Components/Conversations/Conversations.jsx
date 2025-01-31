import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations, createConversation } from "../../store/conversationSlice";
import { connectWebSocket, sendMessage } from "../../utils/websocket";

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
        const senders = [userId]; // Ajouter l'utilisateur connecté comme participant
        dispatch(createConversation(senders))
            .then(response => {
                alert("Conversation commencée avec succès !");
            })
            .catch(error => {
                console.error("Erreur lors de la création de la conversation", error);
            });
    };

    const handleSendMessage = (conversationId) => {
        if (message.trim()) {
            sendMessage({ conversationId, senderId: userId, content: message });
            setMessage("");
        }
    };

    return (
        <div>
            <h2>Conversations</h2>
            <button onClick={handleStartConversation}>Commencer une nouvelle conversation</button>
            <div>
                {conversations.map((conversation) => (
                    <div key={conversation._id}>
                        <h3>Participants: {conversation.senders.map(sender => sender.name).join(', ')}</h3>
                        <div>
                            {conversation.messages.map((msg, index) => (
                                <p key={index}><strong>{msg.sender?.name}:</strong> {msg.content}</p>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Envoyer un message"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage(conversation._id);
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Conversations;