import React, { useState } from 'react';
import { Tag as TagIcon, DollarSign, Clock, MapPin } from 'lucide-react';
import type { Tag } from '../types';

interface DemandFormProps {
  tags: Tag[];
  userTags: string[];
  onSubmit: (data: {
    title: string;
    tagIds: number[];
    budget: number;
    urgency: string;
    longitude: number;
    latitude: number;
    address: string;
  }) => void;
  loading: boolean;
}

export default function DemandForm({ tags, userTags, onSubmit, loading }: DemandFormProps) {
  const [title, setTitle] = useState('汽车无法启动，需要上门维修');
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [budget, setBudget] = useState<number>(300);
  const [urgency, setUrgency] = useState('urgent');
  const [address, setAddress] = useState('深圳市南山区');

  const recommendedTags = tags.filter((t) => userTags.includes(t.name));

  const toggleTag = (id: number) => {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      tagIds: selectedTagIds,
      budget,
      urgency,
      longitude: 113.9304,
      latitude: 22.5333,
      address,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-2">
          <TagIcon size={16} className="text-primary" />
          需求标题
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
          placeholder="例如：汽车无法启动，需要上门维修"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-2">
          <TagIcon size={16} className="text-primary" />
          需求标签
        </label>
        <div className="flex flex-wrap gap-2">
          {recommendedTags.map((tag) => {
            const selected = selectedTagIds.includes(tag.id);
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selected
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag.name}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-2">
          <DollarSign size={16} className="text-primary" />
          预算（元）
        </label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-2">
          <Clock size={16} className="text-primary" />
          时效
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: 'normal', label: '普通' },
            { key: 'urgent', label: '紧急' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setUrgency(item.key)}
              className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                urgency === item.key
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-2">
          <MapPin size={16} className="text-primary" />
          位置
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading || selectedTagIds.length === 0}
        className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '发布中...' : '立即发布'}
      </button>
    </form>
  );
}
