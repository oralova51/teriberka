import Product from "../../widgets/Product/Product";
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

export default function MainPage() {

  return (
    <div className="main-page">
      <MyNavbar />
      <WelcomeBlock />
      <Description />
      <Parts />
      <Instructions />
      <CallToAction />
      <Feedback />
      <CardList />
      <Team />
      <Disclaimer />
      <Footer />
    </div>
  );
}
