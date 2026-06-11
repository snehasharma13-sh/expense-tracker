import { useState } from "react";

export default function Header({ budget, setBudget, totalSpent, remaining }) {
  const [editing, setEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);
  const percent = Math.min((totalSpent / budget) * 100, 100);

  function saveBudget() {
    setBudget(Number(newBudget));
    setEditing(false);
  }

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", margin: 0, background: "linear-gradient(135deg, #a855f7, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            💰 Expense Tracker
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: "4px 0 0" }}>Track your spending smartly</p>
        </div>

        <div style={{ textAlign: "right" }}>
          {editing ? (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(168,85,247,0.5)", color: "white", width: "120px", fontSize: "14px" }}
              />
              <button onClick={saveBudget} style={{ padding: "8px 16px", borderRadius: "8px", background: "#a855f7", border: "none", color: "white", cursor: "pointer", fontWeight: "600" }}>
                Save
              </button>
            </div>
          ) : (
            <div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: "0 0 4px" }}>Monthly Budget</p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "22px", fontWeight: "700", color: "white" }}>₹{budget.toLocaleString()}</span>
                <button onClick={() => setEditing(true)} style={{ padding: "4px 10px", borderRadius: "6px", background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.3)", color: "#a855f7", cursor: "pointer", fontSize: "12px" }}>
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
        {[
          { label: "Total Budget", value: `₹${budget.toLocaleString()}`, color: "#a855f7" },
          { label: "Total Spent", value: `₹${totalSpent.toLocaleString()}`, color: "#f43f5e" },
          { label: "Remaining", value: `₹${remaining.toLocaleString()}`, color: remaining >= 0 ? "#22c55e" : "#f43f5e" },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: "0 0 4px" }}>{stat.label}</p>
            <p style={{ color: stat.color, fontSize: "20px", fontWeight: "700", margin: 0 }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>Budget Used</span>
          <span style={{ color: percent > 90 ? "#f43f5e" : "#a855f7", fontSize: "12px", fontWeight: "600" }}>{percent.toFixed(1)}%</span>
        </div>
        <div style={{ height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${percent}%`, background: percent > 90 ? "linear-gradient(90deg, #f43f5e, #fb923c)" : "linear-gradient(90deg, #a855f7, #06b6d4)", borderRadius: "999px", transition: "width 0.5s ease" }}></div>
        </div>
      </div>
    </div>
  );
}