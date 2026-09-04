import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PhoneFrame from '../components/PhoneFrame';
import BottomNav from '../components/BottomNav';
import MatchUserCard from '../components/MatchUserCard';
import LoadingState from '../components/LoadingState';
import { fetchMatches } from '../api/demand';
import type { MatchResult } from '../types';

export default function MatchResultPage() {
  const { id } = useParams<{ id: string }>();
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchMatches(Number(id))
      .then((data) => setMatches(data))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <PhoneFrame title="匹配结果">
      <div className="flex flex-col h-full">
        <div className="flex-1 px-5 py-6 pb-24">
          <div className="bg-blue-50 rounded-2xl p-4 mb-5">
            <h2 className="text-base font-bold text-gray-900 mb-1">正在为你寻找附近的技能方</h2>
            <p className="text-sm text-gray-600">
              找到 {matches.length} 位匹配人员
            </p>
          </div>

          {loading ? (
            <LoadingState text="匹配计算中..." />
          ) : matches.length === 0 ? (
            <div className="text-center py-12 text-gray-500">暂无匹配人员</div>
          ) : (
            <div className="space-y-4">
              {matches.map((match, index) => (
                <MatchUserCard key={match.userId} match={match} rank={index + 1} />
              ))}
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
