import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneFrame from '../components/PhoneFrame';
import BottomNav from '../components/BottomNav';
import DemandForm from '../components/DemandForm';
import LoadingState from '../components/LoadingState';
import { fetchTags } from '../api/tag';
import { fetchCard } from '../api/card';
import { createDemand } from '../api/demand';
import type { Tag } from '../types';

export default function DemandCreatePage() {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>([]);
  const [userTags, setUserTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [tagData] = await Promise.all([fetchTags()]);
        setTags(tagData);

        const cardId = localStorage.getItem('currentCardId');
        if (cardId) {
          const card = await fetchCard(Number(cardId));
          setUserTags(card.tags);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSubmit = async (data: {
    title: string;
    tagIds: number[];
    budget: number;
    urgency: string;
    longitude: number;
    latitude: number;
    address: string;
  }) => {
    const userId = localStorage.getItem('currentUserId');
    if (!userId) {
      alert('请先创建名片');
      return;
    }
    setSubmitting(true);
    try {
      const res = await createDemand({ ...data, userId: Number(userId) });
      navigate(`/demand/${res.id}/matches`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PhoneFrame title="发布即时需求">
      <div className="flex flex-col h-full">
        <div className="flex-1 px-5 py-6 pb-24">
          {loading ? (
            <LoadingState />
          ) : (
            <DemandForm tags={tags} userTags={userTags} onSubmit={handleSubmit} loading={submitting} />
          )}
        </div>
        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
