const WebSocket = require('ws');
const Message = require('./Models/messageModel'); 
const Conversation = require('./Models/conversationModel');

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connecté au WebSocket');

        ws.on('message', async (message) => {
            console.log('Message reçu:', message);

            // Parse the received message
            const parsedMessage = JSON.parse(message);

            // Save the message to the database
            const newMessage = new Message({
                conversation: parsedMessage.conversationId,
                sender: parsedMessage.senderId,
                content: parsedMessage.content,
                createdAt: new Date()
            });

            try {
                await newMessage.save();

                // Diffuser le message à tous les clients connectés
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(newMessage));
                    }
                });
            } catch (error) {
                console.error('Erreur lors de l\'enregistrement du message:', error);
            }
        });

        ws.on('close', () => console.log('Client déconnecté'));
    });

    return wss;
}

module.exports = { setupWebSocket };