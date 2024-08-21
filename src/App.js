import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import Chattroom from "./page/Chattroom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Define the route for the login page */}
          <Route path="/" element={<LoginPage />} />

          {/* Define the route for the chatroom */}
          <Route path="/chatroom" element={<Chattroom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
