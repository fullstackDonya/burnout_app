import React from "react";
import Professional from "./../Components/Pro/Professional";
import "./css/ProPage.css";
import Presentation from "../Components/Pro/Presentation";
const ProPage = () => {
  return (
    <div className="pro-page">
      <h1>Bienvenue sur la page des professionnels</h1>
      <div className="pro-content">
        <Presentation />
        <Professional />
      </div>
    </div>
  );
};

export default ProPage;
