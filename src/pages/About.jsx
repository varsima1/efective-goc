import React from 'react'
import { useApp } from '../context/AppContext'

export default function About() {
  const { about, lang } = useApp()

  return (
    <main className="min-h-screen">
      <div className="bg-gov-blue text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1 h-6 bg-gov-gold inline-block"></span>
            <span className="text-blue-200 text-sm">{lang === 'ka' ? 'მთავარი' : 'Home'} › {lang === 'ka' ? 'დეპარტამენტის შესახებ' : 'About'}</span>
          </div>
          <h1 className="text-3xl font-bold">{lang === 'ka' ? 'დეპარტამენტის შესახებ' : 'About the Department'}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gov-gray-mid p-8">
              <h2 className="text-xl font-bold text-gov-blue-dark mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gov-gold inline-block"></span>
                {lang === 'ka' ? 'ჩვენ შესახებ' : 'About Us'}
              </h2>
              {about.text.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-gov-blue text-white rounded-lg p-6">
              <h3 className="font-bold text-gov-gold mb-3 text-sm uppercase tracking-wide">მისია</h3>
              <p className="text-blue-100 text-sm leading-relaxed">სახელმწიფო მმართველობის სისტემის ეფექტიანობის ამაღლება, მონიტორინგი და ანალიზი.</p>
            </div>
            <div className="bg-white border border-gov-gray-mid rounded-lg p-6">
              <h3 className="font-bold text-gov-blue-dark mb-3 text-sm uppercase tracking-wide">ხელმძღვანელობა</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gov-gray-light rounded-full flex items-center justify-center text-gov-blue font-bold text-sm">ლ</div>
                  <div>
                    <div className="font-semibold text-gov-blue-dark text-sm">დეპარტამენტის უფროსი</div>
                    <div className="text-gray-500 text-xs">ეფექტიანობის დეპარტამენტი</div>
                  </div>
                </div>
              </div>
            </div>
            {about.photos.length > 0 && (
              <div className="bg-white border border-gov-gray-mid rounded-lg p-4">
                <h3 className="font-bold text-gov-blue-dark mb-3 text-sm">ფოტოები</h3>
                <div className="grid grid-cols-2 gap-2">
                  {about.photos.map((photo, i) => (
                    <img key={i} src={photo} alt="" className="w-full h-24 object-cover rounded" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
