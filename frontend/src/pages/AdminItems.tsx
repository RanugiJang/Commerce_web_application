import { useEffect, useState } from "react";
import { http } from "../api/http";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

type Item = { id: number; name: string; rate: number; quantity: number };

export default function AdminItems() {
  const { email, logout } = useAuth();

  const [items, setItems] = useState<Item[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  // create form
  const [name, setName] = useState("");
  const [rate, setRate] = useState<string>(""); // keep as string so typing is smooth
  const [quantity, setQuantity] = useState<string>("");

  // edit mode
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editRate, setEditRate] = useState<string>("");
  const [editQty, setEditQty] = useState<string>("");

  const load = async () => {
    const res = await http.get("/api/Items");
    setItems(res.data);
  };

  useEffect(() => {
    (async () => {
      try {
        setErr(null);
        await load();
      } catch (ex: any) {
        setErr(ex?.response?.data ?? "Failed to load items");
      }
    })();
  }, []);

  const createItem = async () => {
    try {
      setErr(null);
      setMsg(null);

      const parsedRate = Number(rate);
      const parsedQty = Number(quantity);

      if (!name.trim()) return setErr("Name is required");
      if (Number.isNaN(parsedRate) || parsedRate <= 0) return setErr("Rate must be a valid number > 0");
      if (Number.isNaN(parsedQty) || parsedQty < 0) return setErr("Quantity must be a valid number >= 0");

      await http.post("/api/Items", {
        name: name.trim(),
        rate: parsedRate,
        quantity: parsedQty,
      });

      setName("");
      setRate("");
      setQuantity("");
      setMsg("Item created!");
      await load();
    } catch (ex: any) {
      setErr(ex?.response?.data ?? "Create failed");
    }
  };

  const startEdit = (it: Item) => {
    setEditingId(it.id);
    setEditName(it.name);
    setEditRate(String(it.rate));
    setEditQty(String(it.quantity));
    setMsg(null);
    setErr(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditRate("");
    setEditQty("");
  };

  const updateItem = async (id: number) => {
    try {
      setErr(null);
      setMsg(null);

      const parsedRate = Number(editRate);
      const parsedQty = Number(editQty);

      if (!editName.trim()) return setErr("Name is required");
      if (Number.isNaN(parsedRate) || parsedRate <= 0) return setErr("Rate must be a valid number > 0");
      if (Number.isNaN(parsedQty) || parsedQty < 0) return setErr("Quantity must be a valid number >= 0");

      // IMPORTANT: your backend PUT may expect Item model or Update DTO
      await http.put(`/api/Items/${id}`, {
        id,
        name: editName.trim(),
        rate: parsedRate,
        quantity: parsedQty,
      });

      setMsg("Item updated!");
      cancelEdit();
      await load();
    } catch (ex: any) {
      setErr(ex?.response?.data ?? "Update failed");
    }
  };

  const deleteItem = async (id: number) => {
    const ok = confirm("Delete this item?");
    if (!ok) return;

    try {
      setErr(null);
      setMsg(null);

      await http.delete(`/api/Items/${id}`);
      setMsg("Item deleted!");
      await load();
    } catch (ex: any) {
      setErr(ex?.response?.data ?? "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Admin Panel</h1>
            <p className="text-slate-400 text-sm mt-1">Admin: {email}</p>
          </div>

          <div className="flex gap-3">
            <Link className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-sm" to="/items">
              User View
            </Link>
            <button className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-sm" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        {(msg || err) && (
          <div className="mt-6 space-y-2">
            {msg && <div className="text-sm text-emerald-300 bg-emerald-950/40 border border-emerald-900 rounded-xl p-3">{msg}</div>}
            {err && <div className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-xl p-3">{String(err)}</div>}
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Create */}
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="font-semibold">Create Item</h2>

            <div className="mt-4 space-y-3">
              <input
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-emerald-500"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-emerald-500"
                placeholder="Rate (type manually)"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />

              <input
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-emerald-500"
                placeholder="Quantity"
                inputMode="numeric"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 font-medium py-2" onClick={createItem}>
                Add Item
              </button>
            </div>
          </div>

          {/* List + Edit + Delete */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="font-semibold">All Items</h2>

            <div className="mt-4 space-y-3">
              {items.map((it) => (
                <div key={it.id} className="border border-slate-800 rounded-2xl p-4">
                  {editingId === it.id ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-emerald-500"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Name"
                        />
                        <input
                          className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-emerald-500"
                          value={editRate}
                          onChange={(e) => setEditRate(e.target.value)}
                          placeholder="Rate"
                          inputMode="decimal"
                        />
                        <input
                          className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-emerald-500"
                          value={editQty}
                          onChange={(e) => setEditQty(e.target.value)}
                          placeholder="Quantity"
                          inputMode="numeric"
                        />
                      </div>

                      <div className="mt-3 flex gap-2">
                        <button
                          className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium"
                          onClick={() => updateItem(it.id)}
                        >
                          Save
                        </button>
                        <button
                          className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-sm"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-lg font-semibold">{it.name}</div>
                          <div className="text-sm text-slate-400 mt-1">Price: {it.rate} • Qty: {it.quantity}</div>
                          <div className="text-xs text-slate-500 mt-1">ID: {it.id}</div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            className="rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-2 text-sm"
                            onClick={() => startEdit(it)}
                          >
                            Edit
                          </button>
                          <button
                            className="rounded-xl bg-red-600 hover:bg-red-500 px-3 py-2 text-sm font-medium"
                            onClick={() => deleteItem(it.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {items.length === 0 && <div className="text-sm text-slate-400">No items yet.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
