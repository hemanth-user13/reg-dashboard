import React, { useState } from 'react';
import { Regulation, RegulationCategory } from '../types/regulation';
import { RegulationRow } from './RegulationRow';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface RegulationCardProps {
  title: string;
  category: RegulationCategory;
  regulations: Regulation[];
  selectedIds: Set<string>;
  onRegulationClick: (regulation: Regulation) => void;
  onToggleSelection: (id: string) => void;
  onDragStart: (regulation: Regulation) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, category: RegulationCategory) => void;
  isDragOver: boolean;
}

export const RegulationCard: React.FC<RegulationCardProps> = ({
  title,
  category,
  regulations,
  selectedIds,
  onRegulationClick,
  onToggleSelection,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  isDragOver,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const pinnedRegulations = regulations
    .filter(r => r.isPinned)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const unpinnedRegulations = regulations
    .filter(r => !r.isPinned)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const sortedRegulations = [...pinnedRegulations, ...unpinnedRegulations];

  const filteredRegulations = sortedRegulations.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div
      className={`
        bg-white dark:bg-gray-900 rounded-lg shadow-lg border
        dark:border-gray-800 border-gray-200 overflow-hidden flex flex-col
        transition-all duration-200
        ${isDragOver ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-950' : ''}
      `}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, category)}
    >
      <div className="px-5 py-4 border-b dark:border-gray-800 border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              {regulations.length}
            </span>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            >
              {isCollapsed ? (
                <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search regulations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        )}
      </div>

      {!isCollapsed && (
        <>
          {isDragOver && (
            <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-b-2 border-blue-500 dark:border-blue-400">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300 text-center">
                Drop here to move to top
              </p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto max-h-[600px]">
            {filteredRegulations.length === 0 ? (
              <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                {searchQuery ? 'No matching regulations' : 'No regulations yet'}
              </div>
            ) : (
              filteredRegulations.map(regulation => (
                <RegulationRow
                  key={regulation.id}
                  regulation={regulation}
                  isSelected={selectedIds.has(regulation.id)}
                  onSelect={() => onToggleSelection(regulation.id)}
                  onClick={() => onRegulationClick(regulation)}
                  onDragStart={() => onDragStart(regulation)}
                  onDragEnd={onDragEnd}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};
