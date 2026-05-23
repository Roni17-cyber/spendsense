import { useState, useEffect } from 'react'
import ExpenseForm from './ExpenseForm'

function App() {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/expenses')
      .then(res => res.json())
      .then(data => setExpenses(data))
  }, [])

  const handleAdd = async (expense) => {
    const res = await fetch('http://127.0.0.1:8000/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense)
    })
    const newExpense = await res.json()
    setExpenses([newExpense.expense, ...expenses])
  }

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">SpendSense 💸</h1>
          <p className="text-purple-300 mt-1">Your AI powered finance tracker</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
            <p className="text-purple-300 text-sm">Total Spent</p>
            <p className="text-white text-2xl font-bold mt-1">${totalSpent.toFixed(2)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
            <p className="text-purple-300 text-sm">This Month</p>
            <p className="text-white text-2xl font-bold mt-1">${totalSpent.toFixed(2)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
            <p className="text-purple-300 text-sm">Expenses</p>
            <p className="text-white text-2xl font-bold mt-1">{expenses.length}</p>
          </div>
        </div>

        {/* Form */}
        <ExpenseForm onAdd={handleAdd} />

      </div>
    </div>
  )
}

export default App