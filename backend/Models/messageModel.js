const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    message: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);