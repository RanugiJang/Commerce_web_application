import { useEffect, useMemo, useState } from "react";
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

  const styles = useMemo(() => {
    const pageBg =
      "radial-gradient(900px 400px at 20% 10%, rgba(34,197,94,0.16), transparent 60%), radial-gradient(900px 400px at 80% 20%, rgba(16,185,129,0.14), transparent 55%), #f7faf9";

    return {
      page: {
        minHeight: "100vh",
        background: pageBg,
        padding: "22px 16px 60px",
      } as React.CSSProperties,

      container: {
        maxWidth: 980,
        margin: "0 auto",
      } as React.CSSProperties,

      headerRow: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
        marginTop: 14,
      } as React.CSSProperties,

      title: {
        margin: 0,
        fontSize: 26,
        fontWeight: 900,
        color: "#0f172a",
        letterSpacing: 0.2,
      } as React.CSSProperties,

      subtitle: {
        margin: "6px 0 0",
        fontSize: 13,
        color: "#64748b",
      } as React.CSSProperties,

      card: {
        marginTop: 16,
        background: "#fff",
        borderRadius: 16,
        padding: 18,
        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.06)",
      } as React.CSSProperties,

      formRow: {
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr 0.9fr auto",
        gap: 12,
        alignItems: "end",
      } as React.CSSProperties,

      field: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
      } as React.CSSProperties,

      label: {
        fontSize: 12,
        fontWeight: 800,
        color: "#334155",
      } as React.CSSProperties,

      input: {
        height: 44,
        padding: "0 12px",
        borderRadius: 10,
        border: "1px solid #e2e8f0",
        outline: "none",
        fontSize: 14,
        color: "#0f172a",
        background: "#fff",
      } as React.CSSProperties,

      currencyWrap: {
        height: 44,
        display: "flex",
        alignItems: "center",
        border: "1px solid #e2e8f0",
        borderRadius: 10,
        overflow: "hidden",
        background: "#fff",
      } as React.CSSProperties,

      currencyPrefix: {
        padding: "0 12px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "rgba(34,197,94,0.10)",
        color: "#166534",
        fontWeight: 900,
        borderRight: "1px solid rgba(34,197,94,0.20)",
      } as React.CSSProperties,

      currencyInput: {
        flex: 1,
        height: "100%",
        padding: "0 12px",
        border: "none",
        outline: "none",
        fontSize: 14,
        color: "#0f172a",
      } as React.CSSProperties,

      addBtn: {
        height: 44,
        padding: "0 18px",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        fontWeight: 900,
        fontSize: 14,
        color: "white",
        background: "linear-gradient(90deg, #16a34a, #22c55e)",
        boxShadow: "0 10px 18px rgba(34,197,94,0.25)",
        whiteSpace: "nowrap",
      } as React.CSSProperties,

      tableWrap: {
        marginTop: 14,
        overflowX: "auto",
        borderRadius: 14,
        border: "1px solid #e2e8f0",
      } as React.CSSProperties,

      table: {
        width: "100%",
        borderCollapse: "collapse",
        background: "#fff",
      } as React.CSSProperties,

      th: {
        textAlign: "left",
        fontSize: 12,
        color: "#475569",
        fontWeight: 900,
        background: "#f8fafc",
        padding: "12px 12px",
        borderBottom: "1px solid #e2e8f0",
        letterSpacing: 0.3,
      } as React.CSSProperties,

      td: {
        padding: "12px 12px",
        borderBottom: "1px solid #eef2f7",
        color: "#0f172a",
        fontSize: 14,
      } as React.CSSProperties,

      pill: {
        display: "inline-flex",
        padding: "4px 10px",
        borderRadius: 999,
        background: "rgba(34,197,94,0.10)",
        border: "1px solid rgba(34,197,94,0.18)",
        color: "#166534",
        fontWeight: 800,
        fontSize: 12,
      } as React.CSSProperties,

      actions: {
        display: "flex",
        gap: 8,
        justifyContent: "flex-end",
      } as React.CSSProperties,

      btnGhost: {
        height: 36,
        padding: "0 12px",
        borderRadius: 10,
        border: "1px solid #e2e8f0",
        background: "#fff",
        cursor: "pointer",
        fontWeight: 800,
        color: "#0f172a",
      } as React.CSSProperties,

      btnDanger: {
        height: 36,
        padding: "0 12px",
        borderRadius: 10,
        border: "1px solid rgba(239,68,68,0.25)",
        background: "rgba(239,68,68,0.08)",
        cursor: "pointer",
        fontWeight: 900,
        color: "#b91c1c",
      } as React.CSSProperties,

      empty: {
        padding: 18,
        textAlign: "center",
        color: "#64748b",
      } as React.CSSProperties,

      // responsive: stack form on small screens
      formRowMobile: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 12,
        alignItems: "end",
      } as React.CSSProperties,
    };
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 720;

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.container}>
          <center>
            <div style={{ textAlign: "center", marginTop: 20, marginBottom: 10 }}>
  <h2
    style={{
      margin: 0,
      fontSize: 28,
      fontWeight: 900,
      color: "#0f172a",
      letterSpacing: 0.5
    }}
  >
    Admin Panel
  </h2>

  <p
    style={{
      marginTop: 8,
      fontSize: 14,
      color: "#64748b"
    }}
  >
    Add, update, and delete items in your store
  </p>
</div>

          </center>
          <div style={styles.headerRow}>

          </div>

          <div style={styles.card}>
            {/* Form */}
            <div style={isMobile ? styles.formRowMobile : styles.formRow}>
              <div style={styles.field}>
                <label style={styles.label}>Item Name</label>
                <input
                  style={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Panadol"
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Price</label>
                <div style={styles.currencyWrap}>
                  <span style={styles.currencyPrefix}>Rs.</span>
                  <input
                    style={styles.currencyInput}
                    value={rate}
                    onChange={(e) => setRate(e.target.value.replace(/[^\d.]/g, ""))}
                    placeholder="Enter price"
                    type="text"
                    inputMode="decimal"
                  />
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Quantity</label>
                <input
                  style={styles.input}
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

              <button style={styles.addBtn} onClick={add}>
                Add Item
              </button>
            </div>

            {/* Table */}
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Rate</th>
                    <th style={styles.th}>Qty</th>
                    <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td style={styles.empty} colSpan={4}>
                        No items yet. Add your first item above.
                      </td>
                    </tr>
                  ) : (
                    items.map((i) => (
                      <tr key={i.id}>
                        <td style={styles.td}>{i.name}</td>
                        <td style={styles.td}>
                          <span style={styles.pill}>Rs. {i.rate}</span>
                        </td>
                        <td style={styles.td}>{i.quantity}</td>
                        <td style={{ ...styles.td, paddingRight: 10 }}>
                          <div style={styles.actions}>
                            <button style={styles.btnGhost} onClick={() => edit(i)}>
                              Edit
                            </button>
                            <button style={styles.btnDanger} onClick={() => remove(i.id)}>
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
