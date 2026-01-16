import React, {useState} from "react";
import "./WelcomeBlock.css";
import BuyButton from "../BuyButton/BuyButton";

export default function WelcomeBlock() {
  const [showModal, setShowModal] = useState(false); // по умолчанию false

  console.log("showModal:", showModal);

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
      <BuyButton className="btn welcome_button" onClick={() => setShowModal((prev) => !prev)} />
      {showModal && <p className="modal_text">Модальное окно</p>}
      <img
        src="../../../public/noroot.png"
        className="welcome_img"
        alt="Здесь могли бы быть скалы Териберки, но у вас что-то с интернетом"
      />
    </div>
  );
}
