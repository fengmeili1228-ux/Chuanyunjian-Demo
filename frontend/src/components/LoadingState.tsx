import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  text?: string;
}

export default function LoadingState({ text = '加载中...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <Loader2 size={32} className="animate-spin mb-2" />
      <span className="text-sm">{text}</span>
    </div>
  );
}
