import { useState } from 'react'

function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState('')
  const handleSubmit = () => {
    if (!amount || !note || !date) {
      alert('Please fill in all fields!')
      return
    }
    onAdd({ amount: parseFloat(amount), note, category, date })
    setAmount('')
    setNote('')
    setDate('')
  }

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
      <h2 className="text-xl font-bold text-white mb-5">Add New Expense</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
        />
        <input
          type="text"
          placeholder="Note (e.g. Chipotle lunch)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-purple-400"
        >
          <option value="Food">🍔 Food</option>
          <option value="Transport">🚗 Transport</option>
          <option value="Housing">🏠 Housing</option>
          <option value="Entertainment">🎬 Entertainment</option>
          <option value="Shopping">🛍️ Shopping</option>
          <option value="Health">💊 Health</option>
          <option value="Education">📚 Education</option>
          <option value="Utilities">💡 Utilities</option>
          <option value="Other">📦 Other</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-purple-400"
        />
        <button 
  onClick={handleSubmit}
  className="col-span-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-3 font-bold hover:opacity-90 transition">
  + Add Expense
</button>
      </div>
    </div>
  )
}

export default ExpenseForm