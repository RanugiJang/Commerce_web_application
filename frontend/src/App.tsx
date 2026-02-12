import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import UserItems from "./pages/UserItems";
import AdminItems from "./pages/AdminItems";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/items" replace />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/items"
          element={
            <ProtectedRoute allow={["USER", "ADMIN"]}>
              <UserItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/items"
          element={
            <ProtectedRoute allow={["ADMIN"]}>
              <AdminItems />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
