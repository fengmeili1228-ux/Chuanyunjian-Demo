import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, PartyPopper, CheckCircle2, Trophy, TrendingUp, Star } from 'lucide-react';
import PhoneFrame from '../components/PhoneFrame';
import BottomNav from '../components/BottomNav';
import BusinessCard from '../components/BusinessCard';
import ProgressBar from '../components/ProgressBar';
import ShareModal from '../components/ShareModal';
import LoadingState from '../components/LoadingState';
import { fetchCard, shareCard } from '../api/card';
import type { Card as CardType } from '../types';

export default function CardPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [card, setCard] = useState<CardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const cardId = id || localStorage.getItem('currentCardId');
    if (!cardId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchCard(Number(cardId))
      .then((data) => setCard(data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = async (channel: string) => {
    if (!card) return;
    try {
      const updated = await shareCard(card.id);
      setCard(updated);
      setShowShare(false);
    } catch (e) {
      alert('分享失败');
    }
  };

  return (
    <PhoneFrame title="我的名片">
      <div className="flex flex-col h-full">
        <div className="flex-1 px-5 py-6 pb-24">
          {loading ? (
            <LoadingState />
          ) : !card ? (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">还没有名片，先去创建一个吧</p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium"
              >
                去创建
              </button>
            </div>
          ) : (
            <>
              <BusinessCard card={card} />

              <div className="mt-6 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">首次派发</h3>
                  {card.unlocked ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                      已解锁
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                      进行中
                    </span>
                  )}
                </div>

                <ProgressBar current={card.shareCount} total={card.shareLimit} />

                {!card.unlocked ? (
                  <p className="text-sm text-gray-600 mt-3">
                    已转发 {card.shareCount} / {card.shareLimit} 人，再转发{' '}
                    {card.shareLimit - card.shareCount} 人解锁优先匹配权
                  </p>
                ) : (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2 text-green-700 font-bold">
                      <PartyPopper size={18} />
                      <span>🎉 首次派发完成</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-green-500" />
                        <span>优先匹配权</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-green-500" />
                        <span>更多需求曝光</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={16} className="text-green-500" />
                        <span>平台优先推荐</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowShare(true)}
                  className="mt-5 w-full py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 size={18} />
                  分享我的名片
                </button>
              </div>
            </>
          )}
        </div>
        <BottomNav />
      </div>

      {showShare && card && <ShareModal onClose={() => setShowShare(false)} onShare={handleShare} />}
    </PhoneFrame>
  );
}
