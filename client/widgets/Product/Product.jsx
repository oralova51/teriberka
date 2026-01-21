import "./Product.css";
import BuyButton from "../BuyButton/BuyButton";

function Product({ product }) {
  const oldPrice = Math.round(product.price * 1.1);
  return (
    <div className="card" id="buy">
      <img src={product.image} className="img" />
      <h3 className="title">{product.title}</h3>
      <p className="product_description">Может слушать {product.description}</p>
      <p className="old_price">{oldPrice} ₽</p>
      <p className="price">{product.price}</p>
      <BuyButton className="btn" />
    </div>
  );
}

export default Product;
