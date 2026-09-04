import React from 'react';
import { Home, UserCircle, PlusCircle, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/card', label: '我的名片', icon: UserCircle },
  { path: '/demand/create', label: '发布需求', icon: PlusCircle },
  { path: '/matches', label: '匹配', icon: Search },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-white border-t border-gray-100 px-2 py-2 pb-5 flex justify-around items-center shrink-0">
      {navItems.map((item) => {
        const active = location.pathname === item.path;
        const Icon = item.icon;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
              active ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <Icon size={22} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
