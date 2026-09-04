import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';
import type { Tag } from '../types';

interface SortableTagListProps {
  tags: Tag[];
  onReorder: (tags: Tag[]) => void;
  onRemove: (id: number) => void;
}

function SortableItem({ tag, index, onRemove }: { tag: Tag; index: number; onRemove: (id: number) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: tag.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-3 py-2.5 shadow-sm"
    >
      <button {...attributes} {...listeners} className="text-gray-400 hover:text-gray-600 cursor-grab">
        <GripVertical size={18} />
      </button>
      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
        {index + 1}
      </span>
      <span className="flex-1 text-sm font-medium text-gray-800">{tag.name}</span>
      <button
        onClick={() => onRemove(tag.id)}
        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default function SortableTagList({ tags, onReorder, onRemove }: SortableTagListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tags.findIndex((t) => t.id === Number(active.id));
      const newIndex = tags.findIndex((t) => t.id === Number(over.id));
      onReorder(arrayMove(tags, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tags.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {tags.map((tag, index) => (
            <SortableItem key={tag.id} tag={tag} index={index} onRemove={onRemove} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
