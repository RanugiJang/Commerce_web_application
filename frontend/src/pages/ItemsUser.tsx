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
      <div style={{ maxWidth: 900, margin: "20px auto" }}>
        <h2>Available Items</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 16 }}>
          {items.map((i) => (
            <div key={i.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 10 }}>
              <h3>{i.name}</h3>
              <p>Rate: {i.rate}</p>
              <p>Qty: {i.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
