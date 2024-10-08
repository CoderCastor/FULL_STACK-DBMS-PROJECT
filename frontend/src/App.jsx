import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ChooseUser from "./pages/ChooseUser";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/chooseuser" element={<ChooseUser />} />
          <Route path="/login/admin" element={<Welcome />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
