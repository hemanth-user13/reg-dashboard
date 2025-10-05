import React, { useState } from 'react';
import { Zap, Download, BarChart3, Activity, RefreshCw } from 'lucide-react';

interface QuickActionsProps {
  onExport: () => void;
  onShowAnalytics: () => void;
  onShowActivity: () => void;
  activityCount: number;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onExport,
  onShowAnalytics,
  onShowActivity,
  activityCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl p-2 space-y-1 min-w-[200px] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            onClick={() => {
              onShowAnalytics();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
          >
            <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              View Analytics
            </span>
          </button>

          <button
            onClick={() => {
              onShowActivity();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
          >
            <Activity className="w-4 h-4 text-green-600 dark:text-green-400" />
            <div className="flex-1 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Activity Log
              </span>
              {activityCount > 0 && (
                <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                  {activityCount}
                </span>
              )}
            </div>
          </button>

          <button
            onClick={() => {
              onExport();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
          >
            <Download className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Export Data
            </span>
          </button>

          <div className="h-px bg-gray-200 dark:bg-gray-800 my-1" />

          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
          >
            <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Refresh
            </span>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200
          ${isOpen
            ? 'bg-gray-900 dark:bg-gray-100 rotate-45'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 hover:scale-110'
          }
        `}
      >
        <Zap className={`w-6 h-6 ${isOpen ? 'text-white dark:text-gray-900' : 'text-white'}`} />
      </button>
    </div>
  );
};
