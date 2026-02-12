import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { clearAuth } from "../auth/index";
import { useNavigate } from "react-router-dom";

type Item = {
  id: number;
  name: string;
  rate: number;
  quantity: number;
};

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const nav = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await api.get("/api/Items");
      setItems(res.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        clearAuth();
        nav("/login");
      } else {
        setError("Failed to load items");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const logout = () => {
    clearAuth();
    nav("/login");
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Available Items</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-lg p-4"
          >
            <h2 className="text-lg font-semibold">
              {item.name}
            </h2>

            <p className="text-gray-600 mt-2">
              Price: Rs. {item.rate}
            </p>

            <p className="text-gray-600">
              Available: {item.quantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
