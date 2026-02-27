import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import {
  Shield, LogOut, Newspaper, RefreshCw, BookOpen,
  FileText, Scale, Info, Bell, Plus, Trash2, Edit3,
  Save, X, Eye, EyeOff, ChevronRight, AlertCircle
} from 'lucide-react'

// ——— Login Screen ———
function AdminLogin() {
  const { login } = useApp()
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (!login(pass)) {
        setError(true)
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-gov-gray-light flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-gov-blue p-8 text-white text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-gov-blue" />
          </div>
          <h1 className="text-2xl font-bold">ადმინ. პანელი</h1>
          <p className="text-blue-200 text-sm mt-1">ეფექტიანობის დეპარტამენტი</p>
        </div>
        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gov-blue-dark mb-2">პაროლი</label>
            <input
              type="password"
              value={pass}
              onChange={e => { setPass(e.target.value); setError(false) }}
              className={`w-full border-2 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gov-blue transition-colors ${error ? 'border-red-400 bg-red-50' : 'border-gov-gray-mid'}`}
              placeholder="შეიყვანეთ პაროლი"
              autoFocus
            />
            {error && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle size={12} /> არასწორი პაროლი
              </div>
            )}
            <p className="text-xs text-gray-400 mt-2">Demo: <code className="bg-gray-100 px-1 rounded">admin123</code></p>
          </div>
          <button
            type="submit"
            disabled={loading || !pass}
            className="w-full bg-gov-blue text-white py-3 rounded-lg font-bold hover:bg-gov-blue-dark transition-colors disabled:opacity-50"
          >
            {loading ? 'შესვლა...' : 'შესვლა'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ——— Reusable Document List Editor ———
function DocListEditor({ items, onAdd, onEdit, onDelete, title }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ title: '', doc: '', date: '' })

  const resetForm = () => { setForm({ title: '', doc: '', date: '' }); setAdding(false); setEditingId(null) }

  const handleAdd = () => {
    if (!form.title) return
    onAdd({ id: Date.now(), ...form, date: form.date || new Date().toISOString().slice(0, 10) })
    resetForm()
  }

  const handleEdit = () => {
    if (!form.title) return
    onEdit(editingId, form)
    resetForm()
  }

  const startEdit = (item) => {
    setEditingId(item.id)
    setForm({ title: item.title, doc: item.doc || '', date: item.date || '' })
    setAdding(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gov-blue-dark">{title}</h3>
        <button
          onClick={() => { setAdding(true); setEditingId(null); setForm({ title: '', doc: '', date: '' }) }}
          className="flex items-center gap-1 bg-gov-blue text-white px-3 py-1.5 rounded text-sm hover:bg-gov-blue-dark transition-colors"
        >
          <Plus size={14} /> დამატება
        </button>
      </div>

      {(adding || editingId !== null) && (
        <div className="bg-blue-50 border border-gov-blue rounded-lg p-4 mb-4">
          <h4 className="text-sm font-semibold text-gov-blue mb-3">{editingId ? 'რედაქტირება' : 'ახალი ჩანაწერი'}</h4>
          <div className="space-y-3">
            <input
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="სათაური *"
              className="w-full border border-gov-gray-mid rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gov-blue"
            />
            <input
              value={form.doc}
              onChange={e => setForm(f => ({ ...f, doc: e.target.value }))}
              placeholder="ბმული/URL"
              className="w-full border border-gov-gray-mid rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gov-blue"
            />
            <input
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              className="border border-gov-gray-mid rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gov-blue"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={editingId ? handleEdit : handleAdd}
              className="flex items-center gap-1 bg-emerald-600 text-white px-4 py-2 rounded text-sm hover:bg-emerald-700"
            >
              <Save size={14} /> შენახვა
            </button>
            <button onClick={resetForm} className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100">
              <X size={14} /> გაუქმება
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="bg-white border border-gov-gray-mid rounded-lg p-4 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gov-blue-dark text-sm truncate">{item.title}</div>
              {item.date && <div className="text-xs text-gray-400 mt-0.5">{item.date}</div>}
            </div>
            <div className="flex items-center gap-2 ml-3 flex-shrink-0">
              <button onClick={() => startEdit(item)} className="text-gov-blue hover:text-gov-blue-dark p-1.5 hover:bg-blue-50 rounded">
                <Edit3 size={14} />
              </button>
              <button onClick={() => onDelete(item.id)} className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-400 text-sm text-center py-6">ჩანაწერები არ მოიძებნა</p>}
      </div>
    </div>
  )
}

// ——— Section Components ———
function OverlaySection() {
  const { overlay, setOverlay } = useApp()
  const [text, setText] = useState(overlay.text)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-white border border-gov-gray-mid rounded-lg">
        <div>
          <div className="font-semibold text-gov-blue-dark">ფარდა შეტყობინება</div>
          <div className="text-xs text-gray-500 mt-0.5">ჩართვა/გამორთვა ყველა გვერდზე</div>
        </div>
        <button
          onClick={() => setOverlay(o => ({ ...o, enabled: !o.enabled }))}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
            overlay.enabled
              ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-400'
              : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
          }`}
        >
          {overlay.enabled ? <><Eye size={16} /> ჩართულია</> : <><EyeOff size={16} /> გამორთულია</>}
        </button>
      </div>

      <div className="p-4 bg-white border border-gov-gray-mid rounded-lg">
        <label className="block text-sm font-semibold text-gov-blue-dark mb-2">შეტყობინების ტექსტი</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          className="w-full border border-gov-gray-mid rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gov-blue"
        />
        <button
          onClick={() => setOverlay(o => ({ ...o, text }))}
          className="mt-2 flex items-center gap-1 bg-gov-blue text-white px-4 py-2 rounded text-sm hover:bg-gov-blue-dark"
        >
          <Save size={14} /> შენახვა
        </button>
      </div>
    </div>
  )
}

function NewsSection() {
  const { news, setNews } = useApp()
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ title: '', date: '', content: '' })

  const reset = () => { setForm({ title: '', date: '', content: '' }); setAdding(false); setEditingId(null) }

  const handleAdd = () => {
    if (!form.title) return
    setNews(prev => [{ id: Date.now(), ...form, date: form.date || new Date().toISOString().slice(0, 10) }, ...prev])
    reset()
  }

  const handleEdit = () => {
    if (!form.title) return
    setNews(prev => prev.map(n => n.id === editingId ? { ...n, ...form } : n))
    reset()
  }

  const startEdit = (item) => {
    setEditingId(item.id)
    setForm({ title: item.title, date: item.date, content: item.content })
    setAdding(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">{news.length} სიახლე</span>
        <button onClick={() => { setAdding(true); setEditingId(null); setForm({ title: '', date: '', content: '' }) }}
          className="flex items-center gap-1 bg-gov-blue text-white px-3 py-1.5 rounded text-sm hover:bg-gov-blue-dark">
          <Plus size={14} /> სიახლის დამატება
        </button>
      </div>

      {(adding || editingId !== null) && (
        <div className="bg-blue-50 border border-gov-blue rounded-lg p-4 mb-4">
          <div className="space-y-3">
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="სათაური *" className="w-full border border-gov-gray-mid rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gov-blue" />
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              className="border border-gov-gray-mid rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gov-blue" />
            <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              placeholder="ტექსტი" rows={4}
              className="w-full border border-gov-gray-mid rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gov-blue" />
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={editingId ? handleEdit : handleAdd}
              className="flex items-center gap-1 bg-emerald-600 text-white px-4 py-2 rounded text-sm hover:bg-emerald-700">
              <Save size={14} /> შენახვა
            </button>
            <button onClick={reset} className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100">
              <X size={14} /> გაუქმება
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
        {news.map(item => (
          <div key={item.id} className="bg-white border border-gov-gray-mid rounded-lg p-4 flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gov-blue-dark text-sm">{item.title}</div>
              <div className="text-xs text-gray-400 mt-0.5">{item.date}</div>
            </div>
            <div className="flex items-center gap-2 ml-3 flex-shrink-0">
              <button onClick={() => startEdit(item)} className="text-gov-blue hover:text-gov-blue-dark p-1.5 hover:bg-blue-50 rounded">
                <Edit3 size={14} />
              </button>
              <button onClick={() => setNews(prev => prev.filter(n => n.id !== item.id))}
                className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AboutSection() {
  const { about, setAbout } = useApp()
  const [text, setText] = useState(about.text)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setAbout(a => ({ ...a, text }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gov-gray-mid rounded-lg p-5">
        <label className="block text-sm font-semibold text-gov-blue-dark mb-3">დეპარტამენტის ტექსტი</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={10}
          className="w-full border border-gov-gray-mid rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gov-blue"
        />
        <button onClick={handleSave}
          className={`mt-3 flex items-center gap-1 px-4 py-2 rounded text-sm font-semibold transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-gov-blue text-white hover:bg-gov-blue-dark'}`}>
          <Save size={14} /> {saved ? 'შენახულია!' : 'შენახვა'}
        </button>
      </div>
    </div>
  )
}

// ——— Main Admin Dashboard ———
const ADMIN_SECTIONS = [
  { id: 'overlay', label: 'ფარდა შეტყობინება', icon: Bell },
  { id: 'news', label: 'სიახლე', icon: Newspaper },
  { id: 'about', label: 'დეპარტამენტის შესახებ', icon: Info },
  { id: 'reforms', label: 'რეფორმები', icon: RefreshCw },
  { id: 'useful', label: 'სასარგებლო ინფორმაცია', icon: BookOpen },
  { id: 'reports', label: 'საქმიანობის ანგარიში', icon: FileText },
  { id: 'legislation', label: 'კანონმდებლობა', icon: Scale },
]

function ReformsAdmin() {
  const { reforms, setReforms } = useApp()
  const [tab, setTab] = useState('implemented')
  const TABS = [
    { key: 'implemented', label: 'განხორციელებული' },
    { key: 'ongoing', label: 'მიმდინარე' },
    { key: 'planned', label: 'დაგეგმილი' },
  ]

  const handleAdd = (item) => setReforms(r => ({ ...r, [tab]: [...r[tab], item] }))
  const handleEdit = (id, data) => setReforms(r => ({ ...r, [tab]: r[tab].map(i => i.id === id ? { ...i, ...data } : i) }))
  const handleDelete = (id) => setReforms(r => ({ ...r, [tab]: r[tab].filter(i => i.id !== id) }))

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${tab === t.key ? 'bg-gov-blue text-white border-gov-blue' : 'border-gov-gray-mid text-gov-blue-dark hover:border-gov-blue'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <DocListEditor items={reforms[tab]} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} title="" />
    </div>
  )
}

function UsefulAdmin() {
  const { useful, setUseful } = useApp()
  const [tab, setTab] = useState('recommendations')
  const TABS = [
    { key: 'recommendations', label: 'რეკომენდაციები' },
    { key: 'consulting', label: 'კონსულტაცია' },
    { key: 'monitoring', label: 'მონიტორინგი' },
  ]

  const handleAdd = (item) => setUseful(u => ({ ...u, [tab]: [...u[tab], item] }))
  const handleEdit = (id, data) => setUseful(u => ({ ...u, [tab]: u[tab].map(i => i.id === id ? { ...i, ...data } : i) }))
  const handleDelete = (id) => setUseful(u => ({ ...u, [tab]: u[tab].filter(i => i.id !== id) }))

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${tab === t.key ? 'bg-gov-blue text-white border-gov-blue' : 'border-gov-gray-mid text-gov-blue-dark hover:border-gov-blue'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <DocListEditor items={useful[tab]} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} title="" />
    </div>
  )
}

function ReportsAdmin() {
  const { reports, setReports } = useApp()
  const years = Object.keys(reports).sort().reverse()
  const [activeYear, setActiveYear] = useState(years[0])
  const [newYear, setNewYear] = useState('')

  const handleAddYear = () => {
    if (newYear && !reports[newYear]) {
      setReports(r => ({ ...r, [newYear]: [] }))
      setActiveYear(newYear)
      setNewYear('')
    }
  }
  const handleAdd = (item) => setReports(r => ({ ...r, [activeYear]: [...r[activeYear], item] }))
  const handleEdit = (id, data) => setReports(r => ({ ...r, [activeYear]: r[activeYear].map(i => i.id === id ? { ...i, ...data } : i) }))
  const handleDelete = (id) => setReports(r => ({ ...r, [activeYear]: r[activeYear].filter(i => i.id !== id) }))

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {years.map(y => (
          <button key={y} onClick={() => setActiveYear(y)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${activeYear === y ? 'bg-gov-blue text-white border-gov-blue' : 'border-gov-gray-mid text-gov-blue-dark hover:border-gov-blue'}`}>
            {y} წელი
          </button>
        ))}
        <div className="flex gap-2">
          <input value={newYear} onChange={e => setNewYear(e.target.value)} placeholder="ახალი წელი"
            className="w-28 border border-gov-gray-mid rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gov-blue" />
          <button onClick={handleAddYear} className="flex items-center gap-1 bg-gov-blue text-white px-3 py-2 rounded text-sm hover:bg-gov-blue-dark">
            <Plus size={14} />
          </button>
        </div>
      </div>
      <DocListEditor items={reports[activeYear] || []} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} title="" />
    </div>
  )
}

function LegislationAdmin() {
  const { legislation, setLegislation } = useApp()
  const handleAdd = (item) => setLegislation(prev => [...prev, item])
  const handleEdit = (id, data) => setLegislation(prev => prev.map(i => i.id === id ? { ...i, ...data } : i))
  const handleDelete = (id) => setLegislation(prev => prev.filter(i => i.id !== id))

  return <DocListEditor items={legislation} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} title="" />
}

// ——— Admin Shell ———
export default function Admin() {
  const { isAdmin, logout } = useApp()
  const [activeSection, setActiveSection] = useState('overlay')

  if (!isAdmin) return <AdminLogin />

  const renderSection = () => {
    switch (activeSection) {
      case 'overlay': return <OverlaySection />
      case 'news': return <NewsSection />
      case 'about': return <AboutSection />
      case 'reforms': return <ReformsAdmin />
      case 'useful': return <UsefulAdmin />
      case 'reports': return <ReportsAdmin />
      case 'legislation': return <LegislationAdmin />
      default: return null
    }
  }

  const activeMeta = ADMIN_SECTIONS.find(s => s.id === activeSection)

  return (
    <div className="min-h-screen bg-gov-gray-light flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gov-blue-dark text-white flex-shrink-0 flex flex-col">
        <div className="p-5 border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gov-gold rounded flex items-center justify-center">
              <Shield size={18} className="text-gov-blue-dark" />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight">ადმინ. პანელი</div>
              <div className="text-xs text-blue-300 leading-tight">ეფექტიანობის დეპარტამენტი</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {ADMIN_SECTIONS.map(section => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-5 py-3 text-sm text-left transition-all ${
                  activeSection === section.id
                    ? 'bg-gov-blue text-white font-semibold border-r-4 border-gov-gold'
                    : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                }`}
              >
                <Icon size={16} />
                {section.label}
              </button>
            )
          })}
        </nav>

        <div className="p-5 border-t border-blue-700">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 text-blue-300 hover:text-white text-sm py-2 transition-colors"
          >
            <LogOut size={16} /> გამოსვლა
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b border-gov-gray-mid px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            {activeMeta && <activeMeta.icon size={20} className="text-gov-blue" />}
            <h1 className="text-xl font-bold text-gov-blue-dark">{activeMeta?.label}</h1>
          </div>
          <a href="/" target="_blank" className="flex items-center gap-1 text-gov-blue text-sm hover:underline font-semibold">
            <Eye size={14} /> საიტის ნახვა
          </a>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {renderSection()}
        </div>
      </main>
    </div>
  )
}
