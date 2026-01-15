import Product from "../../widgets/Product/Product";
import MyNavbar from "../../widgets/Navigation/Navigation";
import WelcomeBlock from "../../widgets/WelcomeBlock/WelcomeBlock";
import Description from "../../widgets/Description/Description";
import Parts from "../../widgets/Parts/Parts";
import CardList from "../../widgets/CardList/CardList";

export default function MainPage() {

  return (
    <div className="main-page">
      <MyNavbar></MyNavbar>
      <WelcomeBlock></WelcomeBlock>
      <Description></Description>
      <Parts></Parts>
      <CardList></CardList>
    </div>
  );
}
