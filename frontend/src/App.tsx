import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CardPage from './pages/CardPage';
import DemandCreatePage from './pages/DemandCreatePage';
import MatchResultPage from './pages/MatchResultPage';
import ShareCardPage from './pages/ShareCardPage';
import PhoneFrame from './components/PhoneFrame';
import BottomNav from './components/BottomNav';

function MatchesPlaceholder() {
  return (
    <PhoneFrame title="匹配">
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center text-gray-500 pb-24">
          <p className="mb-4">还没有匹配记录</p>
          <p className="text-sm">请先发布一个需求，系统会为你自动匹配附近的技能方</p>
        </div>
        <BottomNav />
      </div>
    </PhoneFrame>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route path="/demand/create" element={<DemandCreatePage />} />
        <Route path="/demand/:id/matches" element={<MatchResultPage />} />
        <Route path="/share/card/:id" element={<ShareCardPage />} />
        <Route path="/matches" element={<MatchesPlaceholder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
