import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const categoryColors: Record<string, string> = {
  Food: "#f59e0b",
  Transport: "#06b6d4",
  Shopping: "#a855f7",
  Entertainment: "#f43f5e",
  Health: "#22c55e",
  Education: "#3b82f6",
  Bills: "#fb923c",
  Other: "#6b7280",
};
type Expense = {
  category: string;
  amount: number;
  date: string;
};

type StatsProps = {
  expenses: Expense[];
  budget: number;
  totalSpent: number;
};
export default function Stats({ expenses, budget, totalSpent }: StatsProps) {
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
   }, {} as Record<string, number>);

  const months: Record<string, number> = {};
  expenses.forEach((e) => {
    const month = e.date.slice(0, 7);
    months[month] = (months[month] || 0) + Number(e.amount);
  });

  const sortedMonths = Object.keys(months).sort().slice(-6);

  const doughnutData = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      data: Object.values(categoryTotals),
      backgroundColor: Object.keys(categoryTotals).map((c) => categoryColors[c] || "#6b7280"),
      borderWidth: 0,
    }],
  };

  const barData = {
    labels: sortedMonths,
    datasets: [{
      label: "Monthly Spending",
      data: sortedMonths.map((m) => months[m]),
      backgroundColor: "rgba(168,85,247,0.6)",
      borderRadius: 8,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "rgba(255,255,255,0.6)", font: { size: 12 } } },
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      x: { ticks: { color: "rgba(255,255,255,0.4)" }, grid: { color: "rgba(255,255,255,0.05)" } },
      y: { ticks: { color: "rgba(255,255,255,0.4)" }, grid: { color: "rgba(255,255,255,0.05)" } },
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Doughnut chart */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px", color: "white" }}>
          🍩 Spending by Category
        </h2>
        {expenses.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "40px 0" }}>Add expenses to see chart</p>
        ) : (
          <Doughnut data={doughnutData} options={chartOptions} />
        )}
      </div>

      {/* Bar chart */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px", color: "white" }}>
          📊 Monthly Spending
        </h2>
        {expenses.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "40px 0" }}>Add expenses to see chart</p>
        ) : (
          <Bar data={barData} options={barOptions} />
        )}
      </div>

    </div>
  );
}