const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true }, // Référence à la conversation
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Expéditeur du message
    content: { type: String, required: true }, // Contenu du message
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Liste des utilisateurs qui ont lu le message
}, { timestamps: true }); 

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
