import React from 'react';
import { X, MessageCircle, MessageSquare, Users, Link2 } from 'lucide-react';

interface ShareModalProps {
  onClose: () => void;
  onShare: (channel: string) => void;
}

const channels = [
  { key: 'wechat', label: '微信', icon: MessageCircle },
  { key: 'dingtalk', label: '钉钉', icon: MessageSquare },
  { key: 'moments', label: '朋友圈', icon: Users },
  { key: 'copy', label: '复制链接', icon: Link2 },
];

export default function ShareModal({ onClose, onShare }: ShareModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full max-w-[390px] bg-white rounded-t-[30px] p-6 animate-in slide-in-from-bottom-10 duration-300">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-gray-900">分享名片</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <X size={22} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <button
                key={channel.key}
                onClick={() => onShare(channel.key)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Icon size={26} className="text-primary" />
                </div>
                <span className="text-xs text-gray-600">{channel.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
        >
          取消
        </button>
      </div>
    </div>
  );
}
