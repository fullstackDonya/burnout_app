const Message = require("../Models/messageModel");
const Conversation = require("../Models/conversationModel");

// Envoyer un message
const sendMessage = async (conversationId, senderId, text, wss = null) => {
    try {
        if (!conversationId || !senderId || !text) {
            throw new Error("Tous les champs sont obligatoires.");
        }

        const message = new Message({
            conversation: conversationId,
            sender: senderId,
            content: text
        });

        const savedMessage = await message.save();

        // Diffuser le message en temps réel via WebSocket
        if (wss) {
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(savedMessage));
                }
            });
        }

        return savedMessage;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Récupérer tous les messages (⚠️ Généralement, ce n'est pas recommandé en production)
const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().populate("sender", "name");
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMessagesByConversationId = async (req, res) => {
    const { conversationId } = req.params;
  
    try {
      const conversation = await Conversation.findById(conversationId)
        .populate('senders', 'name')
        .populate('messages');
  
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation non trouvée' });
      }
  
      res.status(200).json(conversation.messages);  // Retourner les messages
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};


// Récupérer un seul message par ID
const getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: "Message introuvable." });
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer un nouveau message
const createMessage = async (req, res) => {
    try {
        const { conversation, sender, content } = req.body;

        if (!conversation || !sender || !content) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires." });
        }

        const newMessage = new Message(req.body);
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour un message
const updateMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: "Message introuvable." });
        }

        if (req.body.content) {
            message.content = req.body.content;
        }

        const updatedMessage = await message.save();
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un message
const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: "Message introuvable." });
        }

        await Message.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Message supprimé." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage,
    sendMessage,
    getMessagesByConversationId
};
