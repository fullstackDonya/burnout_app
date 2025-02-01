import React from "react";
import Posts from "../Components/Posts/Posts";
import Professional from "../Components/Pro/ProfessionalProfessional";
import "./css/ProPage.css";
const ProPage = () => {
  return (
    <div className="pro-page">
      <h1>Bienvenue sur la page des professionnels</h1>
      <div className="pro-content">
        <Posts />
        <Professional />
      </div>
    </div>
  );
};

export default ProPage;
