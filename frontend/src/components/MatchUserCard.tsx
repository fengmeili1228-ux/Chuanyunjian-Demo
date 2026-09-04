import React from 'react';
import { MapPin, Clock, Award, Zap } from 'lucide-react';
import type { MatchResult } from '../types';

interface MatchUserCardProps {
  match: MatchResult;
  rank: number;
}

export default function MatchUserCard({ match, rank }: MatchUserCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-400 text-white flex items-center justify-center text-lg font-bold">
            {match.name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-gray-900">{match.name}</div>
            <div className="text-xs text-gray-500 mt-0.5">
              {match.tags.join(' · ')}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-xs text-gray-400">#{rank}</div>
          <div className="text-sm font-bold text-primary">{match.matchScore}%</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 mb-3">
        <div className="flex items-center gap-1.5">
          <MapPin size={13} className="text-gray-400" />
          <span>{match.distance} km</span>
        </div>
        <div className="flex items-center gap-1.5">
          {match.online ? (
            <>
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>在线</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-gray-300" />
              <span>离线</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={13} className="text-gray-400" />
          <span>平均 {match.responseMinutes} 分钟响应</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Award size={13} className="text-gray-400" />
          <span>信用分 {match.creditScore}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full"
            style={{ width: `${Math.min(match.matchScore, 100)}%` }}
          />
        </div>
        <Zap size={14} className="text-yellow-500" />
      </div>
    </div>
  );
}
