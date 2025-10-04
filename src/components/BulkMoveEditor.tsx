import React, { useState } from 'react';
import { Regulation, RegulationCategory } from '../types/regulation';
import { X, Check, ArrowRight } from 'lucide-react';

interface RegulationNote {
  regulationId: string;
  note: string;
}

interface BulkMoveEditorProps {
  regulations: Regulation[];
  targetCategory: RegulationCategory;
  onConfirm: (notes: Map<string, string>) => void;
  onCancel: () => void;
}

export const BulkMoveEditor: React.FC<BulkMoveEditorProps> = ({
  regulations,
  targetCategory,
  onConfirm,
  onCancel,
}) => {
  const [notes, setNotes] = useState<Map<string, string>>(new Map());

  const getCategoryLabel = (category: RegulationCategory) => {
    switch (category) {
      case 'personal': return 'Personal Regulations';
      case 'relevant': return 'Relevant Regulations';
      case 'irrelevant': return 'Irrelevant Regulations';
    }
  };

  const updateNote = (regulationId: string, note: string) => {
    setNotes(prev => new Map(prev).set(regulationId, note));
  };

  const handleConfirm = () => {
    onConfirm(notes);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] border border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Confirm Bulk Move
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Moving {regulations.length} regulation{regulations.length !== 1 ? 's' : ''} to {getCategoryLabel(targetCategory)}
              </p>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            {regulations.map((regulation) => (
              <div
                key={regulation.id}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {regulation.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="px-2 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded text-gray-600 dark:text-gray-400">
                        {getCategoryLabel(regulation.category)}
                      </span>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700 rounded text-blue-700 dark:text-blue-300 font-medium">
                        {getCategoryLabel(targetCategory)}
                      </span>
                    </div>
                  </div>
                </div>

                <textarea
                  value={notes.get(regulation.id) || ''}
                  onChange={(e) => updateNote(regulation.id, e.target.value)}
                  placeholder="Add a note for this regulation (optional)..."
                  rows={2}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between rounded-b-xl flex-shrink-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You can add optional notes to track your reasoning
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              <Check className="w-4 h-4" />
              Move {regulations.length} Regulation{regulations.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
