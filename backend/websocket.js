const WebSocket = require('ws');

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connecté au WebSocket');

        ws.on('message', (message) => {
            console.log('Message reçu:', message);

            // Diffuser le message à tous les clients connectés
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', () => console.log('Client déconnecté'));
    });

    return wss;
}

module.exports = { setupWebSocket };