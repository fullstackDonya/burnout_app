import store from "../store/store";
import { addMessageToConversation } from "../store/conversationSlice";

const WS_URL = "ws://localhost:8082"; 
let socket;

export const connectWebSocket = () => {
  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("WebSocket connecté");
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("Nouveau message reçu :", message);
    store.dispatch(addMessageToConversation(message));
  };

  socket.onclose = () => {
    console.log("WebSocket déconnecté");
  };

  socket.onerror = (error) => {
    console.error("⚠️ WebSocket erreur :", error);
  };
};

export const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error("WebSocket n'est pas connecté");
  }
};