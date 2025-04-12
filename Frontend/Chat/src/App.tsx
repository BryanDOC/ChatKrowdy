
import './App.css'
import Login from './components/Login'
import Page from './Page'
import { Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    <>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Page />} />
    </Routes>
    </>
  )
}

export default App
