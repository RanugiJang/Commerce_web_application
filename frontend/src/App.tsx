import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminItems from "./pages/AdminItems";
import UserItems from "./pages/UserItems";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminItems />} />
        <Route path="/items" element={<UserItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
