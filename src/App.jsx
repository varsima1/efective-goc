import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import { NewsListPage, NewsDetailPage } from './pages/News'
import Reforms from './pages/Reforms'
import Useful from './pages/Useful'
import { ReportsPage, LegislationPage } from './pages/ReportsLegislation'
import Admin from './pages/Admin'

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin panel - no header/footer */}
          <Route path="/admin" element={<Admin />} />

          {/* Public pages with layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/news" element={<Layout><NewsListPage /></Layout>} />
          <Route path="/news/:id" element={<Layout><NewsDetailPage /></Layout>} />
          <Route path="/reforms" element={<Layout><Reforms /></Layout>} />
          <Route path="/useful" element={<Layout><Useful /></Layout>} />
          <Route path="/reports" element={<Layout><ReportsPage /></Layout>} />
          <Route path="/legislation" element={<Layout><LegislationPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
