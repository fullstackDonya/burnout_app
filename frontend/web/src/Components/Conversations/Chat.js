import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage as sendMessageRedux, fetchMessages } from "../../store/messageSlice";
import { useParams } from "react-router-dom";
import { connectWebSocket, sendMessage as sendMessageWebSocket, disconnectWebSocket } from "../../utils/websocket";

const Chat = () => {
    const dispatch = useDispatch();
    const { conversationId } = useParams();
    const [messageText, setMessageText] = useState("");

    const messages = useSelector((state) => state.messages.messages);

    useEffect(() => {
        dispatch(fetchMessages(conversationId));
    }, [dispatch, conversationId]);

    const handleSendMessage = async () => {
        if (messageText.trim()) {
            await dispatch(sendMessageRedux({ conversationId, senderId: "USER_ID", content: messageText }));
            setMessageText("");
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg) => (
                    <p key={msg._id}><strong>{msg.sender?.name}:</strong> {msg.content}</p>
                ))}
            </div>
            <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;