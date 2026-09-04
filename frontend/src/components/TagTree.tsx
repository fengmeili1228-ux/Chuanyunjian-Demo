import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { Tag } from '../types';

interface TagTreeProps {
  tags: Tag[];
  selectedIds: number[];
  onToggle: (tag: Tag) => void;
}

function buildTree(tags: Tag[]): Tag[] {
  const map = new Map<number, Tag>();
  const roots: Tag[] = [];

  tags.forEach((tag) => {
    map.set(tag.id, { ...tag, children: [] });
  });

  map.forEach((tag) => {
    if (tag.parentId === 0) {
      roots.push(tag);
    } else {
      const parent = map.get(tag.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(tag);
      }
    }
  });

  return roots;
}

function TagNode({
  tag,
  selectedIds,
  onToggle,
  expanded,
  onToggleExpand,
}: {
  tag: Tag;
  selectedIds: number[];
  onToggle: (tag: Tag) => void;
  expanded: Set<number>;
  onToggleExpand: (id: number) => void;
}) {
  const isSelected = selectedIds.includes(tag.id);
  const hasChildren = tag.children && tag.children.length > 0;
  const isExpanded = expanded.has(tag.id);

  return (
    <div className="select-none">
      <div className="flex items-center gap-1 py-1.5">
        {hasChildren ? (
          <button
            onClick={() => onToggleExpand(tag.id)}
            className="p-0.5 text-gray-400 hover:text-gray-600"
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <span className="w-5" />
        )}
        <button
          onClick={() => onToggle(tag)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            isSelected
              ? 'bg-primary text-white shadow-sm'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {tag.name}
        </button>
      </div>
      {hasChildren && isExpanded && (
        <div className="pl-6 border-l border-gray-100 ml-2.5">
          {tag.children!.map((child) => (
            <TagNode
              key={child.id}
              tag={child}
              selectedIds={selectedIds}
              onToggle={onToggle}
              expanded={expanded}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TagTree({ tags, selectedIds, onToggle }: TagTreeProps) {
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set(tags.map((t) => t.id)));
  const tree = useMemo(() => buildTree(tags), [tags]);

  const handleToggleExpand = (id: number) => {
    const next = new Set(expanded);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpanded(next);
  };

  return (
    <div className="space-y-1">
      {tree.map((tag) => (
        <TagNode
          key={tag.id}
          tag={tag}
          selectedIds={selectedIds}
          onToggle={onToggle}
          expanded={expanded}
          onToggleExpand={handleToggleExpand}
        />
      ))}
    </div>
  );
}
