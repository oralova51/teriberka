import { useState, useEffect } from "react";
import MyNavbar from "../../widgets/Navigation/Navigation";
import WelcomeBlock from "../../widgets/WelcomeBlock/WelcomeBlock";
import Description from "../../widgets/Description/Description";
import Parts from "../../widgets/Parts/Parts";
import CardList from "../../widgets/CardList/CardList";
import Instructions from "../../widgets/Instructions/Instructions";
import Feedback from "../../widgets/Feedback/Feedback";
import CallToAction from "../../widgets/CallToAction/CallToAction";
import Team from "../../widgets/Team/Team";
import Disclaimer from "../../widgets/Disclaimer/Disclaimer";
import Footer from "../../widgets/Footer/Footer";
import { axiosInstance } from "../../shared/lib/axiosInstance";

export default function MainPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        // const response = await axiosInstance(import.meta.env.VITE_API + "/product");
        // const data = await response.json();
        // if (response.ok) setProducts(data);
        const data = await axiosInstance.get("/product");
        setProducts(data.data);
        console.log('........',data);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);
  

  return (
    <div className="main-page">
      <MyNavbar />
      <WelcomeBlock products={products}/>
      <Description />
      <Parts />
      <Instructions />
      <CallToAction products={products} />
      <Feedback />
      <CardList products={products} />
      <Team />
      <Disclaimer />
      <Footer />
    </div>
  );
}
