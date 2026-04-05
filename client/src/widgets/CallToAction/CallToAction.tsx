import BuyButton from "../BuyButton/BuyButton";
import "./CallToAction.css";

export default function CallToAction({ products }) {
  return (
    <div className="cta">
      <h2>Приобретите аудиогид прямо сейчас</h2>
      <h3>всего за 490 рублей!</h3>
      <BuyButton className="btn cta_button" products={products} />
    </div>
  );
}
