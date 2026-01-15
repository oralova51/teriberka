import React from "react";
import "./WelcomeBlock.css";
import { Button } from "bootstrap";

export default function WelcomeBlock() {
  function redirect() {
    
  }
  
  return (
    <div className="welcome_block">
      <img
        src="../../../public/Vector.png"
        className="polar_lights"
        alt="Сияние"
      />
      <h1 className="welcome_text">
        <span className="welcome_small">Аудиогид</span>
        <br />
        Териберка в ваших ушах
      </h1>
      <button className="welcome_button" onClick={redirect}>Начать путешествие</button>
      <img
        src="../../../public/noroot.png"
        className="welcome_img"
        alt="Здесь могли бы быть скалы Териберки, но у вас что-то с интернетом"
      />
    </div>
  );
}
