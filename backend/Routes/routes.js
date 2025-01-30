const express = require("express");
const {
  Register,
  Login,
  updateUser,
  deleteUsers,
  deleteUser,
  getUsers,
  getUser,
} = require("../Controllers/userController");

const authMiddleware = require("../Middleware/authMiddleware");

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
  getConversations,
  createConversation,
  getConversationByTwoUserIds,
} = require("../Controllers/conversationController");

const {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage
} = require("../Controllers/messageController");

const router = express.Router();

// Routes utilisateur
router.post("/register", Register);
router.post("/login", Login);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete", authMiddleware, deleteUsers);
router.delete("/delete/:id", authMiddleware, deleteUser);
router.get("/users", authMiddleware, getUsers);
router.get("/user/:id", authMiddleware, getUser);

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
router.get("/conversations", authMiddleware, getConversations);
router.post("/conversation", authMiddleware, createConversation);
router.get("/conversation/:senderId/:receiverId", authMiddleware, getConversationByTwoUserIds);

// Routes messages
router.get("/messages", authMiddleware, getAllMessages);
router.get("/message/:id", authMiddleware, getMessageById);
router.post("/message", authMiddleware, createMessage);
router.put("/message/:id", authMiddleware, updateMessage);
router.delete("/message/:id", authMiddleware, deleteMessage);

module.exports = router;
