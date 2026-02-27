import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { FileText, ExternalLink } from 'lucide-react'

export function ReportsPage() {
  const { reports } = useApp()
  const years = Object.keys(reports).sort().reverse()
  const [activeYear, setActiveYear] = useState(years[0])
  const items = reports[activeYear] || []

  return (
    <main className="min-h-screen">
      <div className="bg-gov-blue text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1 h-6 bg-gov-gold inline-block"></span>
            <span className="text-blue-200 text-sm">მთავარი › საქმიანობის ანგარიში</span>
          </div>
          <h1 className="text-3xl font-bold">საქმიანობის ანგარიში</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex gap-3 mb-8">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-6 py-3 rounded-lg font-bold text-sm border-2 transition-all ${
                activeYear === year
                  ? 'bg-gov-blue text-white border-gov-blue shadow-md'
                  : 'bg-white border-gov-gray-mid text-gov-blue-dark hover:border-gov-blue'
              }`}
            >
              {year} წლის ანგარიში
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white border border-gov-gray-mid rounded-lg p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <FileText size={18} className="text-gov-blue mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gov-blue-dark">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.date}</div>
                </div>
              </div>
              {item.doc && item.doc !== '#' && (
                <a href={item.doc} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1 text-gov-blue hover:underline text-sm ml-4 flex-shrink-0">
                  <ExternalLink size={14} /> ნახვა
                </a>
              )}
            </div>
          ))}
          {items.length === 0 && <div className="text-center text-gray-400 py-16">ჩანაწერები არ მოიძებნა</div>}
        </div>
      </div>
    </main>
  )
}

export function LegislationPage() {
  const { legislation } = useApp()

  return (
    <main className="min-h-screen">
      <div className="bg-gov-blue text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1 h-6 bg-gov-gold inline-block"></span>
            <span className="text-blue-200 text-sm">მთავარი › კანონმდებლობა</span>
          </div>
          <h1 className="text-3xl font-bold">კანონმდებლობა</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="space-y-4">
          {legislation.map((item, i) => (
            <div key={item.id} className="bg-white border border-gov-gray-mid rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gov-blue text-white rounded flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gov-blue-dark leading-relaxed">{item.title}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-gray-500">{item.date}</span>
                    {item.doc && item.doc !== '#' && (
                      <a href={item.doc} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 text-gov-blue hover:underline text-sm">
                        <ExternalLink size={14} /> დოკუმენტის ნახვა
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
