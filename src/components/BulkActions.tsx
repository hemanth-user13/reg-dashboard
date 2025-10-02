import React from 'react';
import { RegulationCategory } from '../types/regulation';
import { MoveHorizontal, X } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  currentCategory?: RegulationCategory;
  onMove: (category: RegulationCategory) => void;
  onClear: () => void;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  currentCategory,
  onMove,
  onClear,
}) => {
  if (selectedCount === 0) return null;

  const categories: { value: RegulationCategory; label: string }[] = [
    { value: 'personal', label: 'Personal' },
    { value: 'relevant', label: 'Relevant' },
    { value: 'irrelevant', label: 'Irrelevant' },
  ];

  const availableCategories = categories.filter(c => c.value !== currentCategory);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-slide-up">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
            {selectedCount}
          </div>
          <span className="font-medium text-gray-900 dark:text-white">
            {selectedCount} selected
          </span>
        </div>

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />

        <div className="flex items-center gap-2">
          <MoveHorizontal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Move to:</span>
          {availableCategories.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onMove(value)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={onClear}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
        >
          <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};
