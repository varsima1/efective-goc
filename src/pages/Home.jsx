import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  Info, Newspaper, RefreshCw, BookOpen,
  FileText, Scale, ChevronRight
} from 'lucide-react'

const SECTIONS = [
  {
    id: 'about',
    icon: Info,
    label: 'დეპარტამენტის შესახებ',
    labelEn: 'About the Department',
    desc: 'მისია, სტრუქტურა, ისტორია',
    descEn: 'Mission, structure, history',
    path: '/about',
    color: 'border-l-gov-blue',
    bg: 'from-blue-50 to-white',
    iconColor: 'text-gov-blue',
  },
  {
    id: 'news',
    icon: Newspaper,
    label: 'სიახლე',
    labelEn: 'News',
    desc: 'უახლესი სიახლეები და განცხადებები',
    descEn: 'Latest news and announcements',
    path: '/news',
    color: 'border-l-blue-500',
    bg: 'from-slate-50 to-white',
    iconColor: 'text-blue-500',
  },
  {
    id: 'reforms',
    icon: RefreshCw,
    label: 'რეფორმები',
    labelEn: 'Reforms',
    desc: 'განხორციელებული, მიმდინარე, დაგეგმილი',
    descEn: 'Implemented, ongoing, planned',
    path: '/reforms',
    color: 'border-l-emerald-600',
    bg: 'from-emerald-50 to-white',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'useful',
    icon: BookOpen,
    label: 'სასარგებლო ინფორმაცია',
    labelEn: 'Useful Information',
    desc: 'რეკომენდაციები, კონსულტაცია, მონიტორინგი',
    descEn: 'Recommendations, consulting, monitoring',
    path: '/useful',
    color: 'border-l-purple-600',
    bg: 'from-purple-50 to-white',
    iconColor: 'text-purple-600',
  },
  {
    id: 'reports',
    icon: FileText,
    label: 'საქმიანობის ანგარიში',
    labelEn: 'Activity Reports',
    desc: 'წლიური ანგარიშები და სტატისტიკა',
    descEn: 'Annual reports and statistics',
    path: '/reports',
    color: 'border-l-orange-500',
    bg: 'from-orange-50 to-white',
    iconColor: 'text-orange-500',
  },
  {
    id: 'legislation',
    icon: Scale,
    label: 'კანონმდებლობა',
    labelEn: 'Legislation',
    desc: 'სამართლებრივი ბაზა და დებულებები',
    descEn: 'Legal framework and regulations',
    path: '/legislation',
    color: 'border-l-red-600',
    bg: 'from-red-50 to-white',
    iconColor: 'text-red-600',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const { lang, news } = useApp()

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gov-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-8 bg-gov-gold"></div>
              <span className="text-blue-200 text-sm font-semibold uppercase tracking-widest">
                {lang === 'ka' ? 'საქართველოს მთავრობის ადმინისტრაცია' : 'Administration of the Government of Georgia'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {lang === 'ka'
                ? 'მთავრობის ეფექტიანობის დეპარტამენტი'
                : 'Department of Government Effectiveness'
              }
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
              {lang === 'ka'
                ? 'სახელმწიფო მმართველობის სისტემის ეფექტიანობის ამაღლება, გამჭვირვალე და მოქალაქეზე ორიენტირებული სახელმწიფო სერვისების უზრუნველყოფა.'
                : 'Enhancing the effectiveness of the public administration system, ensuring transparent and citizen-oriented state services.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-gov-blue-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-8">
          {[
            { value: '48', label: lang === 'ka' ? 'შეფასებული უწყება' : 'Evaluated Agencies' },
            { value: '15', label: lang === 'ka' ? 'მიმდინარე რეფორმა' : 'Ongoing Reforms' },
            { value: '2025', label: lang === 'ka' ? 'დაარსდა' : 'Founded' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-gov-gold font-bold text-2xl">{stat.value}</span>
              <span className="text-blue-200 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gov-blue-dark mb-8 flex items-center gap-3">
          <span className="w-1 h-7 bg-gov-gold inline-block"></span>
          {lang === 'ka' ? 'განყოფილებები' : 'Sections'}
        </h2>

        {/* 3x2 on desktop, 2x3 on tablet, 1x6 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SECTIONS.map(section => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => navigate(section.path)}
                className={`text-left bg-gradient-to-br ${section.bg} border ${section.color} border-l-4 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-200 group hover:-translate-y-0.5`}
              >
                <div className="flex items-start justify-between">
                  <Icon size={28} className={`${section.iconColor} mb-3`} />
                  <ChevronRight size={18} className="text-gray-400 group-hover:text-gov-blue group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-gov-blue-dark text-base mb-1">
                  {lang === 'ka' ? section.label : section.labelEn}
                </h3>
                <p className="text-gray-500 text-sm">
                  {lang === 'ka' ? section.desc : section.descEn}
                </p>
              </button>
            )
          })}
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="bg-gov-gray-light py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gov-blue-dark flex items-center gap-3">
              <span className="w-1 h-7 bg-gov-gold inline-block"></span>
              {lang === 'ka' ? 'სიახლეები' : 'News'}
            </h2>
            <button
              onClick={() => navigate('/news')}
              className="text-gov-blue text-sm font-semibold hover:underline flex items-center gap-1"
            >
              {lang === 'ka' ? 'ყველა სიახლე' : 'All News'}
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.slice(0, 3).map(item => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border-t-4 border-gov-blue cursor-pointer"
                onClick={() => navigate(`/news/${item.id}`)}
              >
                <div className="text-xs text-gov-blue font-semibold mb-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gov-gold rounded-full inline-block"></span>
                  {item.date}
                </div>
                <h3 className="font-bold text-gov-blue-dark mb-2 leading-snug line-clamp-2">{item.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-3">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
