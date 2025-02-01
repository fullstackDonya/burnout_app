

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8082/posts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des recettes", error);
      });
  }, []);

  // const handleAdd = () => {
  //   navigate("/post"); 
  // };

  const handleEdit = (id) => {
    navigate(`/edit_post/${id}`); 
  };
  const handleGet = (id) => {
    navigate(`/get_post/${id}`); 
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette recette ?")) {
      axios
        .delete(`http://localhost:8082/post/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Recette supprimée avec succès !");
         
          setPosts(posts.filter((post) => post._id !== id)); 
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de la recette", error);
        });
    }
  };

  return (
    <div>
      {/* creer un hero */}
      
  
      {/* <button className="add" onClick={handleAdd}>Ajouter une recette</button> */}
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <p><strong>Titre :</strong> {post.title}</p>
            {/* <p><strong>Prix :</strong> {post.price}</p> */}
            {/* <p><strong>Vendu :</strong> {post.isSold ? 'Oui' : 'Non'}</p> */}
            <p><strong>Date :</strong> {post.createdAt}</p>

            {/* Affichage des images si elles existent */}
            {post.images && post.images.length > 0 && (
              <div className="post-images">
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8082/uploads/${image}`} 
                    alt={`Image ${index + 1}`}
                    className="post-image"
                  />
                ))}
              </div>
            )}
            {/* <button className="update" onClick={() => handleGet(post._id)}>Afficher</button>

            <button className="update" onClick={() => handleEdit(post._id)}>Modifier</button>
            <button className="delete" onClick={() => handleDelete(post._id)}>Effacer</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
