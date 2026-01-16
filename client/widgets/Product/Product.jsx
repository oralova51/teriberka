import './Product.css';
import BuyButton from "../BuyButton/BuyButton";

function Product({ product }) {
  return (
    <div className='card'>
      <img src={product.image} className='img'/>
        <h3 className="title">{product.title}</h3> 
        <p className= "description">
          {product.description}
        </p>
        <p>
          {product.price}
        </p>
        <BuyButton className="btn"/>
    </div>
  );
}

export default Product;