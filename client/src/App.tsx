import MainPage from "./pages/MainPage/MainPage";
import SuccessPaymentPage from "./pages/SuccessPaymentPage/SuccessPaymentPage";
import { VirtualAssistantChatWidget } from "./widgets/VirtualAssistantChat";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/success" element={<SuccessPaymentPage />} />
      </Routes>
    </BrowserRouter>
    <VirtualAssistantChatWidget />
    </>
  );
}

export default App;
