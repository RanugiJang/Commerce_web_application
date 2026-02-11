import { useEffect, useState } from "react";
import axios from "axios";

function UserItems() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5048/api/Items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setItems(res.data));
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h2>Available Items</h2>

      {items.map((item: any) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>Price: {item.rate}</p>
          <p>Qty: {item.quantity}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default UserItems;
