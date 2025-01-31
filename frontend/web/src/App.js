import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; // Assurez-vous que le chemin est correct
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import AddMeeting from "./Components/Meeting/AddMeeting";
import EditMeeting from "./Components/Meeting/EditMeeting";
import GetMeeting from "./Components/Meeting/GetMeeting";
import Users from "./Components/Users/Users";
import AddUser from "./Components/Users/AddUser";
import UpdateUser from "./Components/Users/UpdateUser";
import Navbar from "./Components/Navbar/Navbar"; 
import Logout from "./Components/Logout/logout";
import Conversations from "./Components/Conversations/Conversations"; 
import Account from "./Components/Users/Account"; 
import Chat from "./Components/Conversations/Chat";

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
            <Route path="/" element={<Home />} />
            <Route path="/meeting" element={<AddMeeting />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add_user" element={<AddUser />} />
            <Route path="/edit_user/:id" element={<UpdateUser />} />
            <Route path="/edit_meeting/:id" element={<EditMeeting />} />
            <Route path="/get_meeting/:id" element={<GetMeeting />} />
            <Route path="/conversations" element={<Conversations />} />
            <Route path="/account" element={<Account />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;