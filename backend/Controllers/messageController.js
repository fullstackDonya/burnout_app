const Message = require("../Models/messageModel");
const Conversation = require("../Models/conversationModel");

const sendMessage = async (req, res) => {
  try {
      const { conversationId, content } = req.body;
      const senderId = req.user._id;  // Assurez-vous que l'utilisateur est authentifié

      console.log("Sender ID:", senderId); // Ajoute ce log

      if (!conversationId || !senderId || !content) {
          return res.status(400).json({ message: "Tous les champs sont obligatoires." });
      }

      const message = new Message({
          conversation: conversationId,
          sender: senderId,
          content
      });

      const savedMessage = await message.save();

      await Conversation.findByIdAndUpdate(conversationId, {
          $push: { messages: savedMessage._id }
      });

      res.status(201).json(savedMessage);
  } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      res.status(500).json({ message: error.message });
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
const createMessage  = async (req, res) => {
    try {
        const { sender, conversation, content} = req.body;
    
     
        if (!sender || !conversation || !content) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires." });
        }
      
          const message = new Message({ sender, conversation, content });
          await message.save();
      
          // Renvoie la message créée
          res.status(201).json(message);
        } catch (error) {
          console.error("Erreur serveur :", error);
          res.status(500).json({ message: error.message });
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
