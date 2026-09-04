import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  title?: string;
}

export default function PhoneFrame({ children, title }: PhoneFrameProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-[390px] h-[844px] bg-white rounded-[50px] shadow-phone overflow-hidden flex flex-col relative border-[8px] border-gray-900">
        {/* 顶部状态栏 */}
        <div className="h-12 bg-white flex items-center justify-between px-8 pt-2 z-10 shrink-0">
          <span className="text-sm font-semibold text-gray-900">9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal size={16} className="text-gray-900" />
            <Wifi size={16} className="text-gray-900" />
            <Battery size={18} className="text-gray-900" />
          </div>
        </div>

        {/* 页面标题 */}
        {title && (
          <div className="px-5 py-3 bg-white border-b border-gray-100 shrink-0">
            <h1 className="text-lg font-bold text-gray-900 text-center">{title}</h1>
          </div>
        )}

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
}
