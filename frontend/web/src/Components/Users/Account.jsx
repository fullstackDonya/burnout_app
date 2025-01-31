import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Account = () => {
  const [user, setUser] = useState(null);
  const userId = useSelector((state) => state.auth.userId); // Récupérer l'ID de l'utilisateur connecté depuis l'état Redux
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/user/${userId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur", error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h2>Mon Compte</h2>
      <p>Nom d'utilisateur: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Ajoutez d'autres informations utilisateur ici */}
    </div>
  );
};

export default Account;