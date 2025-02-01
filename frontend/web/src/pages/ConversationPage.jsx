import React from 'react';
import ConnectedUsers from '../Components/Users/ConnectedUsers';
import Conversation from '../Components/Conversations/Conversations';
import './css/conversation.css';

const ConversationPage = () => {
    return (
        <div className="conversation-page">
            <div className="connected-users-section">
                <div className="section-container">
                    <h1 className="section-title">Connected Users</h1>
                    <ConnectedUsers />
                </div>
            </div>
            <div className="conversation-section">
                <div className="section-container">
                    <h1 className="section-title">Conversations</h1>
                    <Conversation />
                </div>
            </div>
        </div>
    );
};

export default ConversationPage;