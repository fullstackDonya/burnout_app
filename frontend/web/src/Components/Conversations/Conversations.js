import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../../store/conversationSlice";

const Conversations = () => {
    const dispatch = useDispatch();
    const conversations = useSelector((state) => state.conversations.conversations);

    useEffect(() => {
        // Charger les conversations depuis l'API
        dispatch(fetchConversations());
    }, [dispatch]);

    return (
        <div>
            <h2>Conversations</h2>
            <div>
                {conversations.map((conversation) => (
                    <div key={conversation.id}>
                        <h3>{conversation.senders}</h3>
                        <p>{conversation.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Conversations;