import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Stats from "./components/Stats";
import BudgetAlert from "./components/BudgetAlert";
import "./App.css";

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState(() => {
    return Number(localStorage.getItem("budget")) || 50000;
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  function addExpense(expense) {
    setExpenses([{ ...expense, id: Date.now() }, ...expenses]);
  }

  function deleteExpense(id) {
    setExpenses(expenses.filter((e) => e.id !== id));
  }

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const remaining = budget - totalSpent;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#030712", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px" }}>
        <Header budget={budget} setBudget={setBudget} totalSpent={totalSpent} remaining={remaining} />
        <BudgetAlert totalSpent={totalSpent} budget={budget} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "24px" }}>
          <div>
            <AddExpense onAdd={addExpense} />
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          </div>
          <Stats expenses={expenses} budget={budget} totalSpent={totalSpent} />
        </div>
      </div>
    </div>
  );
}