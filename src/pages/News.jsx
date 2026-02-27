import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

const PAGE_SIZE = 8

export function NewsListPage() {
  const { news, lang } = useApp()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(news.length / PAGE_SIZE)
  const paged = news.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <main className="min-h-screen">
      <div className="bg-gov-blue text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1 h-6 bg-gov-gold inline-block"></span>
            <span className="text-blue-200 text-sm">{lang === 'ka' ? 'მთავარი' : 'Home'} › {lang === 'ka' ? 'სიახლე' : 'News'}</span>
          </div>
          <h1 className="text-3xl font-bold">{lang === 'ka' ? 'სიახლე' : 'News'}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {paged.map(item => (
            <button
              key={item.id}
              onClick={() => navigate(`/news/${item.id}`)}
              className="text-left bg-white border border-gov-gray-mid rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all p-5"
            >
              <div className="flex items-center gap-1 text-xs text-gov-blue font-semibold mb-2">
                <Calendar size={12} />
                {item.date}
              </div>
              <h3 className="font-bold text-gov-blue-dark text-sm leading-snug mb-2 line-clamp-3">{item.title}</h3>
              <p className="text-gray-500 text-xs line-clamp-3">{item.content}</p>
            </button>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-2 border border-gov-gray-mid rounded text-sm hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronLeft size={16} /> {lang === 'ka' ? 'წინა' : 'Prev'}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded text-sm font-semibold border transition-colors ${p === page
                  ? 'bg-gov-blue text-white border-gov-blue'
                  : 'border-gov-gray-mid hover:bg-gray-100 text-gov-blue-dark'}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-2 border border-gov-gray-mid rounded text-sm hover:bg-gray-100 disabled:opacity-40"
            >
              {lang === 'ka' ? 'შემდეგი' : 'Next'} <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export function NewsDetailPage() {
  const { id } = useParams()
  const { news, lang } = useApp()
  const navigate = useNavigate()
  const item = news.find(n => n.id === parseInt(id))

  if (!item) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <p className="text-gray-500">სტატია ვერ მოიძებნა</p>
      <button onClick={() => navigate('/news')} className="mt-4 text-gov-blue hover:underline">სიახლეებზე დაბრუნება</button>
    </div>
  )

  return (
    <main className="min-h-screen">
      <div className="bg-gov-blue text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1 h-6 bg-gov-gold inline-block"></span>
            <button onClick={() => navigate('/news')} className="text-blue-200 text-sm hover:text-white">{lang === 'ka' ? 'სიახლე' : 'News'}</button>
            <span className="text-blue-200">›</span>
            <span className="text-white text-sm line-clamp-1">{item.title}</span>
          </div>
          <h1 className="text-3xl font-bold max-w-3xl">{item.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 text-sm text-gov-blue font-semibold mb-6">
          <Calendar size={14} /> {item.date}
        </div>
        <div className="prose max-w-none">
          <p className="text-gray-700 text-base leading-relaxed">{item.content}</p>
        </div>
        <button
          onClick={() => navigate('/news')}
          className="mt-10 flex items-center gap-2 text-gov-blue hover:underline font-semibold"
        >
          <ChevronLeft size={16} /> {lang === 'ka' ? 'სიახლეებზე დაბრუნება' : 'Back to News'}
        </button>
      </div>
    </main>
  )
}
