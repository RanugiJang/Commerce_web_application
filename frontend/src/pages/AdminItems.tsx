import { useEffect, useState } from "react";
import { createItem, deleteItem, getItems, updateItem } from "../api/items";
import type { Item } from "../types/types";

export default function AdminItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [rate, setRate] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    setErr(null);
    try {
      const data = await getItems();
      setItems(data);
    } catch (e: any) {
      setErr(e?.response?.data ?? "Failed to load items");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async () => {
    setErr(null);
    try {
      await createItem({ name, rate, quantity });
      setName("");
      setRate(0);
      setQuantity(0);
      await load();
    } catch (e: any) {
      setErr(e?.response?.data ?? "Create failed");
    }
  };

  const onUpdate = async (it: Item) => {
    setErr(null);
    try {
      await updateItem(it.id, { name: it.name, rate: it.rate, quantity: it.quantity });
      await load();
    } catch (e: any) {
      setErr(e?.response?.data ?? "Update failed");
    }
  };

  const onDelete = async (id: number) => {
    setErr(null);
    try {
      await deleteItem(id);
      await load();
    } catch (e: any) {
      setErr(e?.response?.data ?? "Delete failed");
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel - Manage Items</h2>

      {err && <div className="mb-4 rounded bg-red-50 text-red-700 p-3 text-sm">{String(err)}</div>}

      <div className="bg-white rounded-xl shadow border p-4 mb-6">
        <h3 className="font-semibold mb-3">Add Item</h3>
        <div className="grid md:grid-cols-4 gap-3">
          <input className="border rounded-lg px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="border rounded-lg px-3 py-2" type="number" placeholder="Rate" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          <input className="border rounded-lg px-3 py-2" type="number" placeholder="Qty" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          <button onClick={onCreate} className="rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold">
            Create
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="grid grid-cols-4 font-semibold bg-slate-100 p-3">
          <div>Name</div><div>Rate</div><div>Qty</div><div>Actions</div>
        </div>

        {items.map((it) => (
          <div key={it.id} className="grid grid-cols-4 gap-2 p-3 border-t items-center">
            <input className="border rounded px-2 py-1" value={it.name}
              onChange={(e) => setItems(prev => prev.map(x => x.id === it.id ? { ...x, name: e.target.value } : x))}
            />
            <input className="border rounded px-2 py-1" type="number" value={it.rate}
              onChange={(e) => setItems(prev => prev.map(x => x.id === it.id ? { ...x, rate: Number(e.target.value) } : x))}
            />
            <input className="border rounded px-2 py-1" type="number" value={it.quantity}
              onChange={(e) => setItems(prev => prev.map(x => x.id === it.id ? { ...x, quantity: Number(e.target.value) } : x))}
            />
            <div className="flex gap-2">
              <button onClick={() => onUpdate(it)} className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white">Save</button>
              <button onClick={() => onDelete(it.id)} className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
