import { useState, useEffect } from "react";
import Product from "../Product/Product";
import "./CardList.css";

export default function CardList() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const response = await fetch(import.meta.env.VITE_API + "/product");
      const data = await response.json();
      if (response.ok) setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

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
