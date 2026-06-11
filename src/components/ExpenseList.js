const categoryColors = {
  Food: "#f59e0b",
  Transport: "#06b6d4",
  Shopping: "#a855f7",
  Entertainment: "#f43f5e",
  Health: "#22c55e",
  Education: "#3b82f6",
  Bills: "#fb923c",
  Other: "#6b7280",
};

const categoryEmoji = {
  Food: "🍔",
  Transport: "🚗",
  Shopping: "🛍️",
  Entertainment: "🎮",
  Health: "💊",
  Education: "📚",
  Bills: "📄",
  Other: "📦",
};

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "40px", textAlign: "center" }}>
        <p style={{ fontSize: "40px", marginBottom: "12px" }}>💸</p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>No expenses yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "24px" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px", color: "white" }}>
        📋 Recent Expenses
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "400px", overflowY: "auto" }}>
        {expenses.map((expense) => (
          <div
            key={expense.id}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "14px 16px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${categoryColors[expense.category]}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                {categoryEmoji[expense.category]}
              </div>
              <div>
                <p style={{ color: "white", fontWeight: "600", margin: "0 0 2px", fontSize: "14px" }}>{expense.title}</p>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "11px", background: `${categoryColors[expense.category]}20`, color: categoryColors[expense.category] }}>
                    {expense.category}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>{expense.date}</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ color: "#f43f5e", fontWeight: "700", fontSize: "16px" }}>
                ₹{Number(expense.amount).toLocaleString()}
              </span>
              <button
                onClick={() => onDelete(expense.id)}
                style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.3)", color: "#f43f5e", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}