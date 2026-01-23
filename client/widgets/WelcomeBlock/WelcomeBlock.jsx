import React, {useState} from "react";
import "./WelcomeBlock.css";
import BuyButton from "../BuyButton/BuyButton";

export default function WelcomeBlock( {products}) {
  const [showModal, setShowModal] = useState(false); 
  return (
    <div className="welcome_block">
      <img
        src="/Vector.png"
        className="polar_lights"
        alt="Сияние"
      />
      <h1 className="welcome_text">
        <span className="welcome_small">Аудиогид</span>
        <br />
        Териберка в ваших ушах
      </h1>
      <BuyButton products={products} className="btn welcome_button" onClick={() => setShowModal((prev) => !prev)} />
      {showModal && <p className="modal_text">Модальное окно</p>}
      <img
        src="/noroot.png"
        className="welcome_img"
        alt="Здесь могли бы быть скалы Териберки, но у вас что-то с интернетом"
      />
    </div>
  );
}
