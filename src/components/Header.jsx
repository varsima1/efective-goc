import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Globe, Menu, X, Shield } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'მთავარი', labelEn: 'Home', path: '/' },
  { label: 'დეპარტამენტის შესახებ', labelEn: 'About', path: '/about' },
  { label: 'სიახლე', labelEn: 'News', path: '/news' },
  { label: 'რეფორმები', labelEn: 'Reforms', path: '/reforms' },
  { label: 'სასარგებლო ინფორმაცია', labelEn: 'Useful Info', path: '/useful' },
  { label: 'საქმიანობის ანგარიში', labelEn: 'Reports', path: '/reports' },
  { label: 'კანონმდებლობა', labelEn: 'Legislation', path: '/legislation' },
]

export default function Header() {
  const { lang, setLang, isAdmin, overlay } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Official Gov Banner */}
      <div className="gov-banner py-1">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-blue-900 font-semibold">🇬🇪</span>
            <span>საქართველოს მთავრობის ოფიციალური ვებ-გვერდი</span>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link to="/admin" className="text-xs text-gov-blue hover:underline font-semibold flex items-center gap-1">
                <Shield size={12} /> ადმინ. პანელი
              </Link>
            )}
            <button
              onClick={() => setLang(lang === 'ka' ? 'en' : 'ka')}
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gov-blue transition-colors"
            >
              <Globe size={12} />
              {lang === 'ka' ? 'EN' : 'ქართ'}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay Banner */}
      {overlay.enabled && (
        <div className="overlay-banner bg-gov-gold text-gov-blue-dark text-sm font-semibold py-2 px-4 text-center">
          ⚠️ {overlay.text}
        </div>
      )}

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gov-blue-dark shadow-lg' : 'bg-gov-blue'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-8 h-8">
                  <rect width="40" height="40" fill="#1a4480" rx="2"/>
                  <rect x="8" y="10" width="6" height="20" fill="#ffbe2e"/>
                  <rect x="17" y="14" width="6" height="16" fill="#ffbe2e"/>
                  <rect x="26" y="8" width="6" height="22" fill="#ffbe2e"/>
                </svg>
              </div>
              <div className="text-white">
                <div className="font-bold text-sm leading-tight">
                  {lang === 'ka' ? 'ეფექტიანობის დეპარტამენტი' : 'Effectiveness Department'}
                </div>
                <div className="text-xs text-blue-200 leading-tight">
                  {lang === 'ka' ? 'საქართველოს მთავრობის ადმინისტრაცია' : 'Administration of the Government of Georgia'}
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.slice(1).map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-white hover:bg-gov-blue-dark hover:text-gov-gold px-3 py-2 rounded text-xs font-semibold transition-all duration-200"
                >
                  {lang === 'ka' ? item.label : item.labelEn}
                </Link>
              ))}
              <Link
                to="/admin"
                className="ml-3 flex items-center gap-1 bg-gov-gold text-gov-blue-dark px-3 py-1.5 rounded text-xs font-bold hover:bg-yellow-300 transition-colors"
              >
                <Shield size={12} />
                Admin
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="lg:hidden pb-4 border-t border-blue-700">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="block text-white hover:bg-gov-blue-dark px-4 py-3 text-sm font-semibold border-b border-blue-700"
                >
                  {lang === 'ka' ? item.label : item.labelEn}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-gov-gold px-4 py-3 text-sm font-bold"
              >
                <Shield size={14} /> Admin Panel
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
