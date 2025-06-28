// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import GameDetail from './pages/GameDetail';
import Search from './pages/Search';
import Settings from './pages/Settings';
import DeveloperPortal from './pages/DeveloperPortal';
import AnalyticsPortal from './pages/AnalyticsPortal';
import AdminPortal from './pages/AdminPortal';
import AccountManager from './pages/AccountManager';
import UserEdit from './pages/UserEdit';
import GameManager from './pages/GameManager';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/game/:id" element={<GameDetail />} />
      <Route path="/search" element={<Search />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/developer" element={<DeveloperPortal />} />
      <Route path="/analytics" element={<AnalyticsPortal />} />
      <Route path='/admin' element={<AccountManager />} />
      <Route path='/admin/user/:uid' element={<UserEdit />} />
      <Route path='/game/manager' element={<GameManager />} />
    </Routes>
  );
}

export default App;
