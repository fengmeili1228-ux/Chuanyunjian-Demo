import React from 'react';
import { MapPin, Star, Award } from 'lucide-react';
import type { Card as CardType } from '../types';

interface BusinessCardProps {
  card: CardType;
}

export default function BusinessCard({ card }: BusinessCardProps) {
  return (
    <div className="bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{card.name}</h2>
            <p className="text-blue-100 text-sm mt-1">{card.coreTag || '技能达人'}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
            {card.name.charAt(0)}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {card.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-sm ml-2">信用分 {card.creditScore}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-blue-100">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{card.address}</span>
          </div>
          <div className="flex items-center gap-1">
            <Award size={14} />
            <span>平台认证</span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/20 text-sm text-blue-50">
          「可为你提供专业{card.coreTag || '技能'}服务」
        </div>
      </div>
    </div>
  );
}
