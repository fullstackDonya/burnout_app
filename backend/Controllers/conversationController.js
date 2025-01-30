const Conversation = require("../Models/conversationModel");
const Message = require("../Models/messageModel");

const createConversation = async (req, res) => {
    try {
        const { sender, content } = req.body;

        if (!sender || !content) {
            return res.status(400).json({ message: "Sender and content are required" });
        }

        const conversation = new Conversation({ sender, content });
        await conversation.save();

        res.status(201).json(conversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createConversation };



// Récupérer une conversation par ID
const getConversationById = async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id).populate("senders", "name");
        if (!conversation) {
            return res.status(404).json({ message: "Conversation introuvable." });
        }
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find();
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Récupérer toutes les conversations d'un utilisateur
const getUserConversations = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "L'ID de l'utilisateur est requis." });
        }

        const conversations = await Conversation.find({ senders: userId })
            .populate("senders", "name");

        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer une conversation et ses messages associés
const deleteConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ message: "Conversation introuvable." });
        }

        // Supprimer tous les messages liés
        await Message.deleteMany({ conversation: conversationId });

        // Supprimer la conversation
        await Conversation.deleteOne({ _id: conversationId });

        res.status(200).json({ message: "Conversation supprimée avec succès." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createConversation,
    getConversationById,
    getUserConversations,
    deleteConversation,
    getAllConversations
};
