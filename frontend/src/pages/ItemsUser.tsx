import { useEffect, useState } from "react";
import { getItems, type Item } from "../api/itemsApi";
import Navbar from "../components/Navbar";

export default function ItemsUser() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    getItems().then(setItems).catch(() => alert("Failed to load items"));
  }, []);

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen px-5 py-8"
        style={{
          background:
            "radial-gradient(900px 400px at 20% 10%, rgba(34,197,94,0.16), transparent 60%), radial-gradient(900px 400px at 80% 20%, rgba(16,185,129,0.14), transparent 55%), #f7faf9",
        }}
      >
        <div className="mx-auto max-w-[1100px]">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="m-0 text-[40px] font-extrabold text-slate-900">
              Available Items
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Browse available products in our store
            </p>
          </div>

          {/* Items Grid */}
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
            {items.map((i) => (
              <div
                key={i.id}
                className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_10px_25px_rgba(0,0,0,0.06)] transition"
              >
                <h3 className="m-0 text-lg font-bold text-emerald-900">
                  {i.name}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm font-bold text-emerald-600">
                    Rs. {i.rate}
                  </span>

                  <span
                    className={`text-[13px] font-semibold ${
                      i.quantity > 0 ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {i.quantity > 0 ? `In Stock (${i.quantity})` : "Out of Stock"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {items.length === 0 && (
            <div className="mt-10 text-center text-slate-500">
              No items available.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
