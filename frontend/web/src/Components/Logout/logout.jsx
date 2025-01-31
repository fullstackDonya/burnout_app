import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import { logout } from "../../redux/slices/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  return (
    <button onClick={handleLogout}>Se déconnecter</button>
  );
};

export default Logout;