import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react'

export default function Footer() {
  const { lang } = useApp()

  return (
    <footer className="bg-gov-blue-dark text-white mt-16">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & Mission */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 40 40" className="w-8 h-8">
                  <rect width="40" height="40" fill="#1a4480" rx="2"/>
                  <rect x="8" y="10" width="6" height="20" fill="#ffbe2e"/>
                  <rect x="17" y="14" width="6" height="16" fill="#ffbe2e"/>
                  <rect x="26" y="8" width="6" height="22" fill="#ffbe2e"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-sm">ეფექტიანობის დეპარტამენტი</div>
                <div className="text-xs text-blue-300">საქართველოს მთავრობის ადმინისტრაცია</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              სახელმწიფო მმართველობის სისტემის ეფექტიანობის ამაღლება და გამჭვირვალე, მოქალაქეზე ორიენტირებული სახელმწიფოს მშენებლობა.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gov-gold mb-4 text-sm uppercase tracking-wide">
              {lang === 'ka' ? 'სწრაფი ბმულები' : 'Quick Links'}
            </h4>
            <div className="space-y-2">
              {[
                { label: 'დეპარტამენტის შესახებ', path: '/about' },
                { label: 'სიახლეები', path: '/news' },
                { label: 'რეფორმები', path: '/reforms' },
                { label: 'სასარგებლო ინფორმაცია', path: '/useful' },
                { label: 'საქმიანობის ანგარიში', path: '/reports' },
                { label: 'კანონმდებლობა', path: '/legislation' },
              ].map(link => (
                <div key={link.path}>
                  <Link to={link.path} className="text-blue-200 hover:text-gov-gold text-sm transition-colors">
                    › {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gov-gold mb-4 text-sm uppercase tracking-wide">
              {lang === 'ka' ? 'საკონტაქტო ინფორმაცია' : 'Contact Information'}
            </h4>
            <div className="space-y-3 text-sm text-blue-200">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-gov-gold mt-0.5 flex-shrink-0" />
                <span>თბილისი, ინგოროყვის ქ. №7, 0134</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gov-gold flex-shrink-0" />
                <span>+995 32 2 382 182</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gov-gold flex-shrink-0" />
                <a href="mailto:info@gov.ge" className="hover:text-gov-gold transition-colors">info@gov.ge</a>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink size={16} className="text-gov-gold flex-shrink-0" />
                <a href="https://www.gov.ge" target="_blank" rel="noreferrer" className="hover:text-gov-gold transition-colors">www.gov.ge</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-blue-300">
          <span>© {new Date().getFullYear()} ეფექტიანობის დეპარტამენტი. ყველა უფლება დაცულია.</span>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">კონფიდენციალურობის პოლიტიკა</span>
            <span className="hover:text-white cursor-pointer">გამოყენების წესები</span>
            <span className="hover:text-white cursor-pointer">მისაწვდომობა</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
