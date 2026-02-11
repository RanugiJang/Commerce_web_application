import axios from "axios";
import { useState } from "react";

function AdminItems() {
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");

  const token = localStorage.getItem("token");

  const addItem = async () => {
    try {
      await axios.post(
        "http://localhost:5048/api/Items",
        {
          name,
          rate: Number(rate),
          quantity: Number(quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Item Added");
    } catch (err) {
      alert("Only Admin can add items");
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>Admin Panel</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <br /><br />

      <input placeholder="Rate" onChange={(e) => setRate(e.target.value)} />
      <br /><br />

      <input placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
      <br /><br />

      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default AdminItems;
