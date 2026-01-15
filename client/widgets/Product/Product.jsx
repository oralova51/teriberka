import './Product.css';

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
        <button variant="primary">Купить</button>
    </div>
  );
}

export default Product;