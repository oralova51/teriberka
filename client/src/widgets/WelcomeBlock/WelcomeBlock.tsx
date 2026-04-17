import "./WelcomeBlock.css";
import BuyButton from "../../features/payment/ui/BuyButton/BuyButton";

export default function WelcomeBlock({ products }) {
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
      <BuyButton products={products} className="btn welcome_button" />
      <img
        src="/noroot.png"
        className="welcome_img"
        alt="Здесь могли бы быть скалы Териберки, но у вас что-то с интернетом"
      />
    </div>
  );
}
