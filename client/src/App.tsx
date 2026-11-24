import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'
import Contacts from './pages/Contacts'
import Deals from './pages/Deals'
import Tasks from './pages/Tasks'
import Companies from './pages/Companies'
import CompanyDetail from './pages/CompanyDetail'

function App() {

  return (
    <div>
      <NavBar />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:id" element={<CompanyDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
