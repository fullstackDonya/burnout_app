import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/meeting" element={<AddMeeting />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add_user" element={<AddUser />} />
          <Route path="/edit_user/:id" element={<UpdateUser />} />
          <Route path="/edit_meeting/:id" element={<EditMeeting />} />
          <Route path="/get_meeting/:id" element={<GetMeeting />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
