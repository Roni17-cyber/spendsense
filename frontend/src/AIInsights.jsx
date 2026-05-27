import { useState } from 'react'

function AIInsights() {
  const [insight, setInsight] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const getInsights = async () => {
    setLoading(true)
    setInsight('')
    try {
      const res = await fetch('http://127.0.0.1:8001/insights')
      const data = await res.json()
      setInsight(data.insight)
    } catch (e) {
      setInsight('Error getting insights. Make sure backend is running!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setOpen(true); getInsights() }}
        className="fixed top-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl px-5 py-2 font-bold hover:opacity-90 transition z-50 shadow-lg"
      >
        ✨ AI Insights
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Side panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#1a1740] border-l border-white/20 z-50 p-6 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white font-bold text-lg">✨ AI Insights</h2>
          <button onClick={() => setOpen(false)} className="text-purple-300 hover:text-white text-xl">✕</button>
        </div>

        {loading && (
          <div className="text-purple-300 text-sm animate-pulse">Analyzing your spending...</div>
        )}

        {insight && !loading && (
          <div className="text-white text-sm whitespace-pre-line leading-relaxed">
            {insight}
          </div>
        )}
      </div>
    </>
  )
}

export default AIInsights