function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 mt-6 text-center">
        <p className="text-purple-300">No expenses yet. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 mt-6">
      <h2 className="text-xl font-bold text-white mb-5">Your Expenses</h2>
      <div className="flex flex-col gap-3">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between bg-white/10 rounded-xl p-4 border border-white/10">
            <div>
              <p className="text-white font-semibold">{expense.note}</p>
              <p className="text-purple-300 text-sm">{expense.category} • {expense.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-white font-bold">${expense.amount}</p>
              <button
                onClick={() => onDelete(expense.id)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExpenseList