import React from 'react';
import { Regulation } from '../types/regulation';
import { Pin, Check } from 'lucide-react';

interface RegulationRowProps {
  regulation: Regulation;
  isSelected: boolean;
  onSelect: () => void;
  onClick: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
}

export const RegulationRow: React.FC<RegulationRowProps> = ({
  regulation,
  isSelected,
  onSelect,
  onClick,
  onDragStart,
  onDragEnd,
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`
        group flex items-center gap-3 px-4 py-3 border-b cursor-pointer transition-all
        dark:border-gray-700 border-gray-200
        hover:bg-gray-50 dark:hover:bg-gray-800
        ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : ''}
      `}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelect}
        onClick={(e) => e.stopPropagation()}
        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
      />

      <div className="flex-1 min-w-0" onClick={onClick}>
        <div className="flex items-center gap-2 mb-1">
          {regulation.isPinned && (
            <Pin className="w-3.5 h-3.5 text-yellow-500 dark:text-yellow-400 fill-current" />
          )}
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {regulation.title}
          </h3>
        </div>

        {regulation.tags.length > 0 && (
          <div className="flex gap-1.5 mb-1 flex-wrap">
            {regulation.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        {regulation.isRelevant && (
          <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
        )}
        <span className="whitespace-nowrap">
          {formatDate(regulation.updatedAt)}
        </span>
      </div>
    </div>
  );
};
