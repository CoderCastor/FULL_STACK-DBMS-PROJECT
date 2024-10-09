import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ChooseUser from "./pages/ChooseUser";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/chooseuser" element={<ChooseUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
