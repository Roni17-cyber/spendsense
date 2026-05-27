import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const COLORS = ['#a855f7', '#ec4899', '#6366f1', '#14b8a6', '#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#f97316']

function ExpenseChart({ expenses }) {
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2))
  }))

  if (data.length === 0) {
    return null
  }

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 mt-6">
      <h2 className="text-xl font-bold text-white mb-5">Spending by Category</h2>
      <div className="flex justify-center">
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx={200}
            cy={150}
            innerRadius={70}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `$${value}`}
            contentStyle={{ background: '#1e1b4b', border: 'none', borderRadius: '12px', color: 'white' }}
          />
          <Legend formatter={(value) => <span style={{ color: 'white' }}>{value}</span>} />
        </PieChart>
      </div>
    </div>
  )
}

export default ExpenseChart