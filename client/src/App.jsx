import MainPage from "./pages/MainPage/MainPage";
import { VirtualAssistantChatWidget } from "./widgets/VirtualAssistantChat";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
    <VirtualAssistantChatWidget />
    </>
  );
}

export default App;
