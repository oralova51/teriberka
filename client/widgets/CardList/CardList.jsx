import Product from "../Product/Product";
import "./CardList.css";

export default function CardList( {products} ) {

  return (
    <>
      <div className="cardList">
        {products.map((obj) => (
          <Product key={obj.id} product={obj} />
        ))}
      </div>
    </>
  );
}
