const Conversation = require("../Models/conversationModel");
const Message = require("../Models/messageModel");

const getAllConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find();
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createConversation = async (req, res) => {
    try {
        const { senders, messages } = req.body;

        if (!senders || senders.length === 0) {
            return res.status(400).json({ message: "Senders are required" });
        }

        const conversation = new Conversation({ senders });
        await conversation.save();

        if (messages && messages.length > 0) {
            for (const msg of messages) {
                const message = new Message({
                    conversation: conversation._id,
                    sender: msg.sender,
                    content: msg.content,
                    createdAt: msg.timestamp
                });
                await message.save();
                conversation.messages.push(message._id);
            }
            await conversation.save();
        }

        res.status(201).json(conversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une conversation par ID
const getConversationById = async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id).populate("senders", "name").populate("messages");
        if (!conversation) {
            return res.status(404).json({ message: "Conversation introuvable." });
        }
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer toutes les conversations d'un utilisateur
const getUserConversations = async (req, res) => {
    console.log('====================================');
    console.log(req.user.id);
    console.log('====================================');
    try {

        // Utilisez req.user.id pour obtenir l'ID de l'utilisateur authentifié
        const conversations = await Conversation.find({ senders: req.user.id })

            .populate("senders", "name")
            .populate("messages");
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer une conversation et ses messages associés
const deleteConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id);
        if (!conversation) {
            return res.status(404).json({ message: "Conversation introuvable." });
        }

        await Message.deleteMany({ conversation: req.params.id });
        await Conversation.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: "Conversation supprimée." });
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