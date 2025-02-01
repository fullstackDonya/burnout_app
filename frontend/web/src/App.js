import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; // Assurez-vous que le chemin est correct
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import AddMeeting from "./Components/Meeting/AddMeeting";
import EditMeeting from "./Components/Meeting/EditMeeting";
import GetMeeting from "./Components/Meeting/GetMeeting";
import Users from "./Components/Users/Users";
import AddUser from "./Components/Users/AddUser";
import UpdateUser from "./Components/Users/UpdateUser";
import Navbar from "./Components/Navbar/Navbar"; 
import Logout from "./Components/Logout/logout";
import  ConversationPage from "./pages/ConversationPage"; 
import Account from "./Components/Users/Account"; 
import Chat from "./Components/Conversations/Chat";
import UserAppointments from "./Components/Appointments/UserAppointments";
import CreateAppointmentForm from "./Components/Appointments/CreateAppointmentForm";
import HomePage from "./pages/HomePage";
import Professional from "./Components/Pro/Professional";
import ContactPage from "./pages/ContactPage";
import Contact from "./Components/Contacts/CreateContactForm";
import CreateContactForm from "./Components/Contacts/CreateContactForm";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Navbar /> 
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/meeting" element={<AddMeeting />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add_user" element={<AddUser />} />
            <Route path="/edit_user/:id" element={<UpdateUser />} />
            <Route path="/edit_meeting/:id" element={<EditMeeting />} />
            <Route path="/get_meeting/:id" element={<GetMeeting />} />
            <Route path="/conversations" element={< ConversationPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/chat/:conversationId" element={<Chat />} />
            <Route path="/appointments" element={<UserAppointments />} />
            <Route path="/new_appointment" element={<CreateAppointmentForm />} />
            <Route path="/pro" element={<Professional />} />
            {/* <Route path="/contact" element={<ContactPage />} /> */}
            <Route path="/contact" element={<CreateContactForm />} />


          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;