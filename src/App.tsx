
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Index from '@/pages/Index'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Markets from '@/pages/Markets'
import GetStarted from '@/pages/GetStarted'
import Learn from '@/pages/Learn'
import NewsDetail from '@/pages/NewsDetail'
import Stocks from '@/pages/Stocks'
import NotFound from '@/pages/NotFound'
import Notifications from '@/pages/Notifications'
import Portfolio from '@/pages/Portfolio'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/stocks/:symbol" element={<Stocks />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
