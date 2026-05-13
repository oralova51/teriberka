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
import type { Product } from "@/entities/Product/model/model";

export default function MainPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function getProducts() {
      try {
        const { data } = await axiosInstance.get<Product[]>("/product");
        const list = Array.isArray(data) ? data : [];
        if (!cancelled) {
          setProducts(list);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(error);
        }
      }
    }

    void getProducts();
    return () => {
      cancelled = true;
    };
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
