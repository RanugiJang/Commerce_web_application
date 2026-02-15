import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import LoginAdmin from "./pages/LoginAdmin";
import LoginUser from "./pages/LoginUser";
import ItemsUser from "./pages/ItemsUser";
import AdminItems from "./pages/AdminItems";


export default function App() { //Main App component that defines the routes for the application, it uses React Router to define the routes for the login pages and the protected routes for admin and user items. The ProtectedRoute component is used to protect the routes based on the user's role, it checks if the user is authenticated and has the required role before allowing access to the route.
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
