import { useState } from "react";

const categories = ["Food", "Transport", "Shopping", "Entertainment", "Health", "Education", "Bills", "Other"];

export default function AddExpense({ onAdd }) {
  const [form, setForm] = useState({ title: "", amount: "", category: "Food", date: new Date().toISOString().split("T")[0] });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.amount) return;
    onAdd(form);
    setForm({ title: "", amount: "", category: "Food", date: new Date().toISOString().split("T")[0] });
  }

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "24px", marginBottom: "24px" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px", color: "white" }}>
        ➕ Add Expense
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="text"
          placeholder="Expense title..."
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          style={inputStyle}
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          style={{ ...inputStyle, cursor: "pointer" }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} style={{ background: "#1a1a2e" }}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          style={inputStyle}
        />
        <button
          type="submit"
          style={{ padding: "14px", borderRadius: "12px", background: "linear-gradient(135deg, #a855f7, #06b6d4)", border: "none", color: "white", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}