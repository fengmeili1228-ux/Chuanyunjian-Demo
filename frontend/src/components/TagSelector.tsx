import React from 'react';
import { Sparkles } from 'lucide-react';
import TagTree from './TagTree';
import type { Tag } from '../types';

interface TagSelectorProps {
  tags: Tag[];
  selectedIds: number[];
  recommended: string[];
  onToggle: (tag: Tag) => void;
}

export default function TagSelector({ tags, selectedIds, recommended, onToggle }: TagSelectorProps) {
  const recommendedTags = recommended
    .map((name) => tags.find((t) => t.name === name))
    .filter(Boolean) as Tag[];

  return (
    <div className="space-y-5">
      {recommendedTags.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-3">
            <Sparkles size={16} className="text-yellow-500" />
            <span>智能推荐标签</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendedTags.map((tag) => {
              const selected = selectedIds.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  onClick={() => onToggle(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selected
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-blue-50 text-primary border border-blue-100 hover:bg-blue-100'
                  }`}
                >
                  {tag.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <div className="text-sm font-semibold text-gray-800 mb-3">全部标签</div>
        <div className="bg-gray-50 rounded-2xl p-4">
          <TagTree tags={tags} selectedIds={selectedIds} onToggle={onToggle} />
        </div>
      </div>
    </div>
  );
}
