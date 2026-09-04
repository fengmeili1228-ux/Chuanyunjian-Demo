import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Star, Award } from 'lucide-react';
import LoadingState from '../components/LoadingState';
import { fetchCard } from '../api/card';
import type { Card as CardType } from '../types';

function setMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

export default function ShareCardPage() {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<CardType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchCard(Number(id))
      .then((data) => setCard(data))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!card) return;
    const title = `${card.name}｜${card.coreTag}专家`;
    const description = card.tags.join(' · ');
    document.title = title;
    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);
    setMetaProperty('og:image', 'https://via.placeholder.com/1200x630/3B82F6/FFFFFF?text=Chuanyunjian');
  }, [card]);

  if (loading) return <LoadingState />;
  if (!card) return <div className="p-8 text-center text-gray-500">名片不存在</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden mb-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{card.name}</h2>
                  <p className="text-blue-100 text-sm mt-1">{card.coreTag}专家</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                  {card.name.charAt(0)}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {card.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium">
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
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            打开「穿云箭」小程序查看更多技能名片
          </p>
        </div>
      </div>
  );
}
