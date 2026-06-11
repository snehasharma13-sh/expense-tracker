export default function BudgetAlert({ totalSpent, budget }) {
  const percent = (totalSpent / budget) * 100;

  if (percent < 80) return null;

  const isExceeded = percent >= 100;

  return (
    <div style={{
      marginTop: "16px",
      padding: "16px 24px",
      borderRadius: "16px",
      background: isExceeded ? "rgba(244,63,94,0.1)" : "rgba(251,146,60,0.1)",
      border: isExceeded ? "1px solid rgba(244,63,94,0.4)" : "1px solid rgba(251,146,60,0.4)",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    }}>
      <span style={{ fontSize: "24px" }}>{isExceeded ? "🚨" : "⚠️"}</span>
      <div>
        <p style={{ color: isExceeded ? "#f43f5e" : "#fb923c", fontWeight: "700", margin: "0 0 4px", fontSize: "15px" }}>
          {isExceeded ? "Budget Exceeded!" : "Budget Warning!"}
        </p>
        <p style={{ color: "rgba(255,255,255,0.5)", margin: 0, fontSize: "13px" }}>
          {isExceeded
            ? `You have exceeded your budget by ₹${(totalSpent - budget).toLocaleString()}`
            : `You have used ${percent.toFixed(1)}% of your budget. Only ₹${(budget - totalSpent).toLocaleString()} remaining!`}
        </p>
      </div>
    </div>
  );
}