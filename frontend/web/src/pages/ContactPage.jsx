import React from "react";
import CreateContactForm from "../Components/Contacts/CreateContactForm";
import "./css/contact.css";
const ContactPage = () => {
  return (
    <section className="contact-page">
      <div className="contact-header">
        <h1>Besoin d’aide ? Parlons-en.</h1>
        <p>
          Le burnout peut toucher tout le monde. Si vous ressentez du stress, de 
          l’épuisement ou simplement des doutes, n’hésitez pas à contacter un 
          professionnel. Psychologues, thérapeutes, médecins, infirmiers et 
          coachs en gestion du stress sont là pour vous accompagner.
        </p>
        <p>
          Que ce soit pour de la prévention, des conseils ou un accompagnement 
          personnalisé, nous sommes à votre écoute. Posez vos questions, exprimez 
          vos inquiétudes et laissez-nous vous guider vers le bien-être.
        </p>
      </div>
      <CreateContactForm />
    </section>
  );
};

export default ContactPage;
