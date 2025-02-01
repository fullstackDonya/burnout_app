import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchConversations, createConversation } from "../../redux/slices/conversationSlice";
import { fetchMessages } from "../../redux/slices/messageSlice"; // Importer la fonction pour récupérer les messages
import { selectConversations, selectUserId, selectUsers } from "../../redux/selectors";

const Conversations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const conversations = useSelector(selectConversations);
  const users = useSelector(selectUsers);
  const userId = useSelector(selectUserId);
  const [selectedUsers, setSelectedUsers] = useState([userId]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchConversations());
    }
  }, [dispatch, userId]);
  console.log("🔹 userId depuis Redux dans Conversations.js:", selectedUsers);

  const handleUserSelection = (id) => {
    if (id === userId) return;
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const handleStartConversation = async () => {
    if (selectedUsers.length < 2) {
      alert("Sélectionnez au moins un autre utilisateur !");
      return;
    }

    dispatch(createConversation({ senders: selectedUsers }))
      .then((response) => {
        if (!response.payload || !response.payload._id) {
          console.error("Erreur : ID de la conversation non trouvé");
          return;
        }
        navigate(`/chat/${response.payload._id}`);
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la conversation", error);
      });
  };

  const handleOpenConversation = (conversationId) => {
    dispatch(fetchMessages(conversationId)); // Charger les messages avant d'afficher la conversation
    navigate(`/chat/${conversationId}`);
  };

  return (
    <div>
      <h2>Conversations</h2>
      
      <h3>Sélectionner des utilisateurs</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <input
              type="checkbox"
              checked={selectedUsers.includes(user._id)}
              onChange={() => handleUserSelection(user._id)}
              disabled={user._id === userId}
            />
            {user.name} {user._id === userId && "(Vous)"}
          </li>
        ))}
      </ul>

      <button onClick={handleStartConversation} disabled={selectedUsers.length < 2}>
        Commencer une nouvelle conversation
      </button>

      <h3>Conversations existantes</h3>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation._id} onClick={() => handleOpenConversation(conversation._id)}>
            <h3>Conversation avec {conversation.senders.map(sender => sender.name).join(", ")}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conversations;
