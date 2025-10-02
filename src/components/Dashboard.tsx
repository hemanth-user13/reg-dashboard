import React, { useState } from 'react';
import { Regulation, RegulationCategory, CardConfig } from '../types/regulation';
import { useRegulations } from '../hooks/useRegulations';
import { RegulationCard } from './RegulationCard';
import { RegulationModal } from './RegulationModal';
import { BulkActions } from './BulkActions';
import { ActivityLog } from './ActivityLog';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Activity } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const {
    regulations,
    activityLog,
    selectedIds,
    moveRegulation,
    moveMultiple,
    togglePin,
    toggleRelevant,
    addTag,
    removeTag,
    toggleSelection,
    clearSelection,
    undoLastAction,
  } = useRegulations();

  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const [draggedRegulation, setDraggedRegulation] = useState<Regulation | null>(null);
  const [dragOverCategory, setDragOverCategory] = useState<RegulationCategory | null>(null);
  const [showActivityLog, setShowActivityLog] = useState(false);

  const cardConfigs: CardConfig[] = [
    { id: 'personal', title: 'Personal Regulations', color: 'blue' },
    { id: 'relevant', title: 'Relevant Regulations', color: 'green' },
    { id: 'irrelevant', title: 'Irrelevant Regulations', color: 'gray' },
  ];

  const getRegulationsByCategory = (category: RegulationCategory) => {
    return regulations.filter(r => r.category === category);
  };

  const handleDragStart = (regulation: Regulation) => {
    setDraggedRegulation(regulation);
  };

  const handleDragEnd = () => {
    setDraggedRegulation(null);
    setDragOverCategory(null);
  };

  const handleDragOver = (e: React.DragEvent, category: RegulationCategory) => {
    e.preventDefault();
    if (draggedRegulation && draggedRegulation.category !== category) {
      setDragOverCategory(category);
    }
  };

  const handleDrop = (e: React.DragEvent, category: RegulationCategory) => {
    e.preventDefault();
    if (draggedRegulation && draggedRegulation.category !== category) {
      moveRegulation(draggedRegulation.id, category);
    }
    setDragOverCategory(null);
    setDraggedRegulation(null);
  };

  const handleBulkMove = (targetCategory: RegulationCategory) => {
    moveMultiple(Array.from(selectedIds), targetCategory);
  };

  const handleMove = (id: string, category: RegulationCategory) => {
    moveRegulation(id, category);
    setSelectedRegulation(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Regulation Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Organize and track your regulatory compliance documents
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowActivityLog(!showActivityLog)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all
                ${showActivityLog
                  ? 'bg-blue-600 dark:bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }
              `}
            >
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Activity</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {showActivityLog && (
          <div className="mb-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-6">
            <ActivityLog activities={activityLog} onUndo={undoLastAction} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {cardConfigs.slice(0, 2).map(config => (
            <RegulationCard
              key={config.id}
              title={config.title}
              category={config.id}
              regulations={getRegulationsByCategory(config.id)}
              selectedIds={selectedIds}
              onRegulationClick={setSelectedRegulation}
              onToggleSelection={toggleSelection}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, config.id)}
              onDrop={handleDrop}
              isDragOver={dragOverCategory === config.id}
            />
          ))}
        </div>

        <div className="grid grid-cols-1">
          <RegulationCard
            key={cardConfigs[2].id}
            title={cardConfigs[2].title}
            category={cardConfigs[2].id}
            regulations={getRegulationsByCategory(cardConfigs[2].id)}
            selectedIds={selectedIds}
            onRegulationClick={setSelectedRegulation}
            onToggleSelection={toggleSelection}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, cardConfigs[2].id)}
            onDrop={handleDrop}
            isDragOver={dragOverCategory === cardConfigs[2].id}
          />
        </div>
      </div>

      {selectedRegulation && (
        <RegulationModal
          regulation={selectedRegulation}
          onClose={() => setSelectedRegulation(null)}
          onMove={handleMove}
          onTogglePin={togglePin}
          onToggleRelevant={toggleRelevant}
          onAddTag={addTag}
          onRemoveTag={removeTag}
        />
      )}

      <BulkActions
        selectedCount={selectedIds.size}
        onMove={handleBulkMove}
        onClear={clearSelection}
      />
    </div>
  );
};
