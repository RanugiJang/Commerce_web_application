import { useEffect, useState } from "react";
import { http } from "../api/http";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

type Item = { id: number; name: string; rate: number; quantity: number };

export default function ItemsUser() {
  const { email, role, logout } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setErr(null);
        const res = await http.get("/api/Items");
        setItems(res.data);
      } catch (ex: any) {
        setErr(ex?.response?.data ?? "Failed to load items");
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Items</h1>
            <p className="text-slate-400 text-sm mt-1">Logged in as {email} ({role})</p>
          </div>

          <div className="flex gap-3">
            {role === "ADMIN" && (
              <Link className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium" to="/admin/items">
                Admin Panel
              </Link>
            )}
            <button className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-sm" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        {err && <div className="mt-6 text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-xl p-3">{String(err)}</div>}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <div key={it.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="text-lg font-semibold">{it.name}</div>
              <div className="mt-2 text-sm text-slate-300">Price: <span className="font-medium">{it.rate}</span></div>
              <div className="text-sm text-slate-300">Qty: <span className="font-medium">{it.quantity}</span></div>
            </div>
          ))}
        </div>

        {items.length === 0 && !err && (
          <div className="mt-10 text-slate-400 text-sm">No items yet. Ask admin to add items.</div>
        )}
      </div>
    </div>
  );
}
