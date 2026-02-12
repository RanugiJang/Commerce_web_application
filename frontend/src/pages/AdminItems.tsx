import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createItem, deleteItem, getItems, type Item, updateItem } from "../api/itemsApi";

export default function AdminItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [rate, setRate] = useState<string>("");
  const [quantity, setQuantity] = useState(0);

  const load = async () => setItems(await getItems());

  useEffect(() => {
    load().catch(() => alert("Failed to load items"));
  }, []);

  const add = async () => {
    await createItem({ name, rate: Number(rate), quantity });
    setName("");
    setRate("");
    setQuantity(0);
    await load();
  };

  const edit = async (item: Item) => {
    const newName = prompt("New name", item.name) ?? item.name;
    const newRate = Number(prompt("New rate", String(item.rate)) ?? item.rate);
    const newQty = Number(prompt("New qty", String(item.quantity)) ?? item.quantity);

    await updateItem(item.id, { name: newName, rate: newRate, quantity: newQty });
    await load();
  };

  const remove = async (id: number) => {
    if (!confirm("Delete item?")) return;
    await deleteItem(id);
    await load();
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-emerald-100 via-green-100 to-teal-200">
        <div className="mx-auto w-full max-w-5xl">
          {/* Page header */}
          <div className="text-center mt-4 mb-6">
            <h2 className="m-0 text-4xl font-extrabold text-emerald-900 tracking-wide">
              Manage Items
            </h2>
            <p className="mt-2 text-sm text-emerald-900/60">
              Add, update, and delete items in your store
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 shadow-2xl shadow-emerald-500/20 p-6">
            {/* Form */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.3fr_1fr_0.9fr_auto] md:items-end">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold text-slate-700">
                  Item Name
                </label>
                <input
                  className="h-11 rounded-xl border border-emerald-200 bg-white/70 px-4 text-sm outline-none
                  focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Panadol"
                />
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold text-slate-700">
                  Price
                </label>
                <div className="h-11 flex overflow-hidden rounded-xl border border-emerald-200 bg-white/70">
                  <span className="flex items-center px-3 font-extrabold text-emerald-800 bg-emerald-500/15 border-r border-emerald-500/20">
                    Rs.
                  </span>
                  <input
                    className="flex-1 px-4 text-sm outline-none bg-transparent"
                    value={rate}
                    onChange={(e) => setRate(e.target.value.replace(/[^\d.]/g, ""))}
                    placeholder="Enter price"
                    type="text"
                    inputMode="decimal"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold text-slate-700">
                  Quantity
                </label>
                <input
                  className="h-11 rounded-xl border border-emerald-200 bg-white/70 px-4 text-sm outline-none
                  focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  value={quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setQuantity(value < 0 ? 0 : value);
                  }}
                  onBlur={() => {
                    if (quantity < 0) setQuantity(0);
                  }}
                  placeholder="Qty"
                  type="number"
                  min={0}
                  step={1}
                />
              </div>

              {/* Add button */}
              <button
                onClick={add}
                className="h-11 w-full md:w-auto rounded-xl px-6 text-white text-sm font-extrabold
                bg-gradient-to-r from-emerald-700 to-emerald-500
                shadow-lg shadow-emerald-500/40
                transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              >
                Add Item
              </button>
            </div>

            {/* Table */}
            <div className="mt-5 overflow-x-auto rounded-2xl border border-emerald-200/60 bg-white/70">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white/70">
                    <th className="px-4 py-3 text-left text-xs font-extrabold text-slate-600 border-b border-emerald-200/60">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-extrabold text-slate-600 border-b border-emerald-200/60">
                      Rate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-extrabold text-slate-600 border-b border-emerald-200/60">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-extrabold text-slate-600 border-b border-emerald-200/60">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-5 text-center text-sm text-slate-500">
                        No items yet. Add your first item above.
                      </td>
                    </tr>
                  ) : (
                    items.map((i) => (
                      <tr key={i.id} className="border-b border-emerald-200/30 last:border-b-0">
                        <td className="px-4 py-3 text-sm text-slate-900">
                          {i.name}
                        </td>

                        <td className="px-4 py-3 text-sm text-slate-900">
                          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold
                            bg-emerald-500/15 border border-emerald-500/20 text-emerald-900">
                            Rs. {i.rate}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-sm text-slate-900">
                          {i.quantity}
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => edit(i)}
                              className="h-9 rounded-xl px-4 text-xs font-extrabold
                                bg-white/80 border border-emerald-200 text-slate-900
                                hover:bg-white transition active:scale-[0.98]"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => remove(i.id)}
                              className="h-9 rounded-xl px-4 text-xs font-extrabold
                                bg-red-500/10 border border-red-500/25 text-red-700
                                hover:bg-red-500/15 transition active:scale-[0.98]"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
