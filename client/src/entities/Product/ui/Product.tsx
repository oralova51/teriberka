import "./Product.css";
import BuyButton from "@/features/payment/ui/BuyButton/BuyButton";
import type { Product } from "../model/model";

type ProductProps = {
  product: Product;
  products: Product[];
};

function Product({ product, products }: ProductProps) {
  const oldPrice = Math.round(product.price * 1.1);

  return (
    <div className="card" id="buy">
      <img src={product.image} className="img" alt={product.title} />
      <h3 className="title">{product.title}</h3>
      <p className="product_description">Может слушать {product.description}</p>
      <p className="old_price">{oldPrice} ₽</p>
      <p className="price">{product.price} ₽</p>
      <BuyButton
        className="btn"
        products={products}
        defaultProduct={product}
      />
    </div>
  );
}

export default Product;
