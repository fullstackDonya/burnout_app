const express = require("express");
const authMiddleware = require("../Middleware/authMiddleware");
const router = express.Router();
const {
  Register,
  Login,
  updateUser,
  deleteUsers,
  deleteUser,
  getUsers,
  getUser,
} = require("../Controllers/userController");

const {
  createMeeting,
  getMeetings,
  updateMeeting,
  deleteMeeting,
  getMeetingById,
  getMeetingsByUserId, 
} = require("../Controllers/meetingController");

const {
  getAllAppointments,
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment
} = require("../Controllers/appointmentController");

const {
  createConversation,
  getConversationById,
  getUserConversations,
  deleteConversation,
  getAllConversations
} = require("../Controllers/conversationController");

const {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
  sendMessage,
  getMessages

} = require("../Controllers/messageController");

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require("../Controllers/postController");



// Routes utilisateur
router.post("/register", Register);
router.post("/login", Login);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete", authMiddleware, deleteUsers);
router.delete("/delete/:id", authMiddleware, deleteUser);
router.get("/users", authMiddleware, getUsers);
router.get("/user/:id", authMiddleware, getUser);

// Routes posts
router.get("/posts", getAllPosts);
router.get("/post/:id", getPostById);
router.post("/post", createPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

// Routes réunions (meetings)
router.get("/meeting/user/:userId", authMiddleware, getMeetingsByUserId); 
router.post("/meeting", authMiddleware, createMeeting);
router.get("/meetings", authMiddleware, getMeetings); 
router.put("/meeting/:id", authMiddleware, updateMeeting); 
router.get("/meeting/:id", authMiddleware, getMeetingById); 
router.delete("/meeting/:id", authMiddleware, deleteMeeting); 

// Routes réunions (appoinments)
router.get("/appointments", authMiddleware, getAllAppointments);
router.post("/appointment", authMiddleware, createAppointment);
router.get("/appointment/:id", authMiddleware, getAppointment);
router.put("/appointment/:id", authMiddleware, updateAppointment);
router.delete("/appointment/:id", authMiddleware, deleteAppointment);

// Routes conversations
router.post("/conversations", authMiddleware, createConversation);
router.get("/conversations", authMiddleware, getAllConversations);
router.get("/conversations/:id", authMiddleware, getConversationById);
router.get("/conversations/user/:userId", authMiddleware, getUserConversations); // Route pour récupérer les conversations d'un utilisateur
router.delete("/conversations/:id", authMiddleware, deleteConversation);


// Routes messages
router.get("/messages", authMiddleware, getAllMessages);
router.get("/message/:id", authMiddleware, getMessageById);
router.post("/message", authMiddleware, createMessage);
router.put("/message/:id", authMiddleware, updateMessage);
router.delete("/message/:id", authMiddleware, deleteMessage);
router.post("/message/send", authMiddleware, sendMessage);
router.get("/message/:conversationId", authMiddleware, getMessages);

module.exports = router;
