import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { FileText, ExternalLink, Star, MessageSquare, BarChart2 } from 'lucide-react'

const TABS = [
  { key: 'recommendations', label: 'რეკომენდაციები', icon: Star, color: 'text-yellow-500' },
  { key: 'consulting', label: 'საკონსულტაციო საქმიანობა', icon: MessageSquare, color: 'text-blue-500' },
  { key: 'monitoring', label: 'განხორციელებული მონიტორინგის შედეგები', icon: BarChart2, color: 'text-emerald-500' },
]

export default function Useful() {
  const { useful, lang } = useApp()
  const [active, setActive] = useState('recommendations')
  const items = useful[active] || []

  return (
    <main className="min-h-screen">
      <div className="bg-gov-blue text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1 h-6 bg-gov-gold inline-block"></span>
            <span className="text-blue-200 text-sm">მთავარი › სასარგებლო ინფორმაცია</span>
          </div>
          <h1 className="text-3xl font-bold">სასარგებლო ინფორმაცია</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {TABS.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all border-2 text-left ${
                  active === tab.key
                    ? 'bg-gov-blue text-white border-gov-blue shadow-md'
                    : 'bg-white border-gov-gray-mid text-gov-blue-dark hover:border-gov-blue'
                }`}
              >
                <Icon size={16} className={active === tab.key ? 'text-white' : tab.color} />
                {tab.label}
              </button>
            )
          })}
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
