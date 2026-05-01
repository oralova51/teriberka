import MainPage from "./pages/MainPage/MainPage";
import SuccessPaymentPage from "./pages/SuccessPaymentPage/SuccessPaymentPage";
import { VirtualAssistantChatWidget } from "./widgets/VirtualAssistantChat";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";

function AppContent() {
  const location = useLocation();
  const shouldShowAssistant = location.pathname !== "/success";

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/success" element={<SuccessPaymentPage />} />
      </Routes>
      {shouldShowAssistant && <VirtualAssistantChatWidget />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
