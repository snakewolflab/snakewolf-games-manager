import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import GameDetail from './pages/GameDetail';
import Search from './pages/Search';
import Settings from './pages/Settings';
import DeveloperPortal from './pages/DeveloperPortal';
import GoogleAnalyticsPortal from './pages/GoogleAnalyticsPortal';
import AdminPortal from './pages/AdminPortal';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1; /* コンテンツが少ない場合でもフッターを下に固定 */
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/game/:id" element={<GameDetail />} /> {/* 例: ゲームIDで詳細表示 */}
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/developer" element={<DeveloperPortal />} />
          <Route path="/google-analytics" element={<GoogleAnalyticsPortal />} />
          <Route path="/admin" element={<AdminPortal />} />
        </Routes>
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App;