import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import LoginAdmin from "./pages/LoginAdmin";
import LoginUser from "./pages/LoginUser";
import ItemsUser from "./pages/ItemsUser";
import AdminItems from "./pages/AdminItems";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/user" element={<LoginUser />} />
      <Route path="/login/admin" element={<LoginAdmin />} />

      <Route element={<ProtectedRoute allow="USER" />}>
        <Route path="/user" element={<ItemsUser />} />
      </Route>

      <Route element={<ProtectedRoute allow="ADMIN" />}>
        <Route path="/admin" element={<AdminItems />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
