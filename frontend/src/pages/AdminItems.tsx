import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createItem, deleteItem, getItems, type Item, updateItem } from "../api/itemsApi";

export default function AdminItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [rate, setRate] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const load = async () => setItems(await getItems());

  useEffect(() => {
    load().catch(() => alert("Failed to load items"));
  }, []);

  const add = async () => {
    await createItem({ name, rate, quantity });
    setName(""); setRate(0); setQuantity(0);
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
      <div style={{ maxWidth: 900, margin: "20px auto" }}>
        <h2>Admin Panel - Manage Items</h2>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name" />
          <input value={rate} onChange={(e) => setRate(Number(e.target.value))} placeholder="Rate" type="number" />
          <input value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} placeholder="Qty" type="number" />
          <button onClick={add}>Add Item</button>
        </div>

        <table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Name</th>
              <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Rate</th>
              <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Qty</th>
              <th style={{ borderBottom: "1px solid #ddd" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td style={{ padding: 8 }}>{i.name}</td>
                <td style={{ padding: 8 }}>{i.rate}</td>
                <td style={{ padding: 8 }}>{i.quantity}</td>
                <td style={{ padding: 8, display: "flex", gap: 8, justifyContent: "center" }}>
                  <button onClick={() => edit(i)}>Edit</button>
                  <button onClick={() => remove(i.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
