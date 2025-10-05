import React, { useState } from 'react';
import { Regulation, RegulationCategory, CardConfig } from '../types/regulation';
import { useRegulations } from '../hooks/useRegulations';
import { RegulationCard } from './RegulationCard';
import { RegulationModal } from './RegulationModal';
import { BulkActions } from './BulkActions';
import { ActivityLog } from './ActivityLog';
import { StatsWidget } from './StatsWidget';
import { MoveEditor } from './MoveEditor';
import { BulkMoveEditor } from './BulkMoveEditor';
import { GlobalSearch } from './GlobalSearch';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { OnboardingTour } from './OnboardingTour';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { QuickActions } from './QuickActions';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Activity, Download, BarChart3 } from 'lucide-react';

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
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [moveEditorData, setMoveEditorData] = useState<{ regulation: Regulation; targetCategory: RegulationCategory } | null>(null);
  const [bulkMoveEditorData, setBulkMoveEditorData] = useState<{ regulations: Regulation[]; targetCategory: RegulationCategory } | null>(null);

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
      setMoveEditorData({ regulation: draggedRegulation, targetCategory: category });
    }
    setDragOverCategory(null);
    setDraggedRegulation(null);
  };

  const handleBulkMove = (targetCategory: RegulationCategory) => {
    const regsToMove = regulations.filter(r => selectedIds.has(r.id));
    setBulkMoveEditorData({ regulations: regsToMove, targetCategory });
  };

  const handleMove = (id: string, category: RegulationCategory) => {
    const regulation = regulations.find(r => r.id === id);
    if (regulation) {
      setMoveEditorData({ regulation, targetCategory: category });
    }
  };

  const handleMoveConfirm = (note: string) => {
    if (moveEditorData) {
      moveRegulation(moveEditorData.regulation.id, moveEditorData.targetCategory, note);
      setMoveEditorData(null);
      setSelectedRegulation(null);
    }
  };

  const handleBulkMoveConfirm = (notes: Map<string, string>) => {
    if (bulkMoveEditorData) {
      moveMultiple(
        bulkMoveEditorData.regulations.map(r => r.id),
        bulkMoveEditorData.targetCategory,
        notes
      );
      setBulkMoveEditorData(null);
    }
  };

  const exportToCSV = () => {
    const headers = ['Title', 'Category', 'Status', 'Tags', 'Updated'];
    const rows = regulations.map(r => [
      r.title,
      r.category,
      r.status,
      r.tags.join('; '),
      r.updatedAt.toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `regulations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
            <GlobalSearch regulations={regulations} onSelect={setSelectedRegulation} />

            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className={`
                hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all
                ${showAnalytics
                  ? 'bg-blue-600 dark:bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }
              `}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden xl:inline">Analytics</span>
            </button>

            <KeyboardShortcuts />

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

        <StatsWidget regulations={regulations} />

        {showAnalytics && (
          <div className="mt-6 mb-6">
            <AnalyticsDashboard regulations={regulations} activityLog={activityLog} />
          </div>
        )}

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

      {moveEditorData && (
        <MoveEditor
          regulation={moveEditorData.regulation}
          targetCategory={moveEditorData.targetCategory}
          onConfirm={handleMoveConfirm}
          onCancel={() => setMoveEditorData(null)}
        />
      )}

      {bulkMoveEditorData && (
        <BulkMoveEditor
          regulations={bulkMoveEditorData.regulations}
          targetCategory={bulkMoveEditorData.targetCategory}
          onConfirm={handleBulkMoveConfirm}
          onCancel={() => setBulkMoveEditorData(null)}
        />
      )}

      <OnboardingTour onComplete={() => {}} />

      <QuickActions
        onExport={exportToCSV}
        onShowAnalytics={() => setShowAnalytics(!showAnalytics)}
        onShowActivity={() => setShowActivityLog(!showActivityLog)}
        activityCount={activityLog.length}
      />

      <BulkActions
        selectedCount={selectedIds.size}
        onMove={handleBulkMove}
        onClear={clearSelection}
      />
    </div>
  );
};
