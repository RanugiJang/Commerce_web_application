import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import type { Item } from "../types/types";

export default function UserItems() {
  const [items, setItems] = useState<Item[]>([]);
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

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h2 className="text-xl font-bold mb-4">Available Items</h2>

      {err && <div className="mb-4 rounded bg-red-50 text-red-700 p-3 text-sm">{String(err)}</div>}

      <div className="grid md:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.id} className="bg-white rounded-xl shadow p-4 border">
            <div className="font-semibold text-lg">{it.name}</div>
            <div className="text-sm text-slate-600 mt-1">Rate: Rs. {it.rate}</div>
            <div className="text-sm text-slate-600">Qty: {it.quantity}</div>
          </div>
        ))}
      </div>

      {items.length === 0 && !err && (
        <div className="text-slate-600 mt-6">No items yet.</div>
      )}
    </div>
  );
}
