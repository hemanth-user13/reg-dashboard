import React, { useState } from 'react';
import { Regulation, RegulationCategory } from '../types/regulation';
import { X, Pin, Check, Tag, ArrowRight, Clock } from 'lucide-react';

interface RegulationModalProps {
  regulation: Regulation;
  onClose: () => void;
  onMove: (id: string, category: RegulationCategory) => void;
  onTogglePin: (id: string) => void;
  onToggleRelevant: (id: string) => void;
  onAddTag: (id: string, tag: string) => void;
  onRemoveTag: (id: string, tag: string) => void;
}

export const RegulationModal: React.FC<RegulationModalProps> = ({
  regulation,
  onClose,
  onMove,
  onTogglePin,
  onToggleRelevant,
  onAddTag,
  onRemoveTag,
}) => {
  const [newTag, setNewTag] = useState('');

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !regulation.tags.includes(newTag.trim())) {
      onAddTag(regulation.id, newTag.trim());
      setNewTag('');
    }
  };

  const categories: { value: RegulationCategory; label: string }[] = [
    { value: 'personal', label: 'Personal Regulations' },
    { value: 'relevant', label: 'Relevant Regulations' },
    { value: 'irrelevant', label: 'Irrelevant Regulations' },
  ];

  const availableCategories = categories.filter(c => c.value !== regulation.category);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full md:w-[500px] lg:w-[600px] h-full bg-white dark:bg-gray-900 shadow-2xl overflow-hidden flex flex-col animate-slide-in">
        <div className="px-6 py-4 border-b dark:border-gray-800 border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {regulation.isPinned && (
              <Pin className="w-4 h-4 text-yellow-500 dark:text-yellow-400 fill-current" />
            )}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Regulation Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {regulation.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Updated {formatDate(regulation.updatedAt)}</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Content
            </h4>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                {regulation.content}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Tags
            </h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {regulation.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300"
                >
                  {tag}
                  <button
                    onClick={() => onRemoveTag(regulation.id, tag)}
                    className="hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Add a tag..."
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Tag className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t dark:border-gray-800 border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Actions
            </h4>

            <button
              onClick={() => onTogglePin(regulation.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all
                ${regulation.isPinned
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750'
                }
              `}
            >
              <Pin className={`w-4 h-4 ${regulation.isPinned ? 'fill-current' : ''}`} />
              <span className="font-medium">
                {regulation.isPinned ? 'Unpin' : 'Pin to Top'}
              </span>
            </button>

            <button
              onClick={() => onToggleRelevant(regulation.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all
                ${regulation.isRelevant
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750'
                }
              `}
            >
              <Check className="w-4 h-4" />
              <span className="font-medium">
                {regulation.isRelevant ? 'Mark as Irrelevant' : 'Mark as Relevant'}
              </span>
            </button>

            {availableCategories.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Move to:
                </p>
                <div className="space-y-2">
                  {availableCategories.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => onMove(regulation.id, value)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all"
                    >
                      <span className="font-medium">{label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
