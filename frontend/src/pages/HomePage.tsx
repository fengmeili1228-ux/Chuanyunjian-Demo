import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import PhoneFrame from '../components/PhoneFrame';
import BottomNav from '../components/BottomNav';
import TagSelector from '../components/TagSelector';
import SortableTagList from '../components/SortableTagList';
import LoadingState from '../components/LoadingState';
import { fetchTags } from '../api/tag';
import { createUser } from '../api/user';
import { createCard } from '../api/card';
import { recommendTagsByProfession } from '../mock/recommendTags';
import type { Tag } from '../types';

export default function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [recommended, setRecommended] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTags()
      .then((data) => setTags(data))
      .finally(() => setLoading(false));
  }, []);

  const handleRecommend = () => {
    if (!profession.trim()) return;
    const recs = recommendTagsByProfession(profession);
    setRecommended(recs);

    const recTagIds = recs
      .map((r) => tags.find((t) => t.name === r))
      .filter(Boolean) as Tag[];

    setSelectedTags((prev) => {
      const existingIds = new Set(prev.map((t) => t.id));
      const additions = recTagIds.filter((t) => !existingIds.has(t.id));
      return [...prev, ...additions];
    });
  };

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) => {
      const exists = prev.find((t) => t.id === tag.id);
      if (exists) {
        return prev.filter((t) => t.id !== tag.id);
      }
      return [...prev, tag];
    });
  };

  const removeTag = (id: number) => {
    setSelectedTags((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCreateCard = async () => {
    if (!name.trim() || selectedTags.length === 0) return;
    setSubmitting(true);
    try {
      const userRes = await createUser({
        name: name.trim(),
        longitude: 113.9304,
        latitude: 22.5333,
        onlineStatus: 1,
        creditScore: 92,
        avgResponseMinutes: 5,
      });
      const userId = userRes.id;

      const tagIds = selectedTags.map((t) => t.id);
      const cardRes = await createCard({
        userId,
        coreTagId: tagIds[0],
        tagIds,
      });

      localStorage.setItem('currentCardId', String(cardRes.id));
      localStorage.setItem('currentUserId', String(userId));
      navigate(`/card/${cardRes.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full">
        <div className="flex-1 px-5 py-6 pb-24">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">让你的技能被看见</h1>
            <p className="text-sm text-gray-500">标签即名片，分享你的专业能力</p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">姓名</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如：张三"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">职业 / 技能</label>
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="例如：汽车维修"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </div>
            <button
              onClick={handleRecommend}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-50 text-primary font-medium text-sm hover:bg-blue-100 transition-colors"
            >
              <Sparkles size={16} />
              智能推荐标签
            </button>
          </div>

          {loading ? (
            <LoadingState text="加载标签中..." />
          ) : (
            <>
              <TagSelector
                tags={tags}
                selectedIds={selectedTags.map((t) => t.id)}
                recommended={recommended}
                onToggle={toggleTag}
              />

              {selectedTags.length > 0 && (
                <div className="mt-6">
                  <div className="text-sm font-semibold text-gray-800 mb-3">我的技能标签（拖拽排序）</div>
                  <SortableTagList
                    tags={selectedTags}
                    onReorder={setSelectedTags}
                    onRemove={removeTag}
                  />
                </div>
              )}

              <button
                onClick={handleCreateCard}
                disabled={!name.trim() || selectedTags.length === 0 || submitting}
                className="mt-6 w-full py-3.5 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? '生成中...' : '生成我的名片'}
                <ArrowRight size={18} />
              </button>
            </>
          )}
        </div>
        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
