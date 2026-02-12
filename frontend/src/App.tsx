import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ItemsPage from "./pages/ItemsPage";
import AdminItemsPage from "./pages/AdminItems";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/items" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/items"
          element={
            <ProtectedRoute roles={["USER", "ADMIN"]}>
              <ItemsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/items"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminItemsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
