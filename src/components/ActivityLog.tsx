import React from 'react';
import { ActivityLog as ActivityLogType } from '../types/regulation';
import { Clock, ArrowRight, Pin, Check, Tag, Plus, Undo } from 'lucide-react';

interface ActivityLogProps {
  activities: ActivityLogType[];
  onUndo: () => void;
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ activities, onUndo }) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getActionIcon = (action: ActivityLogType['action']) => {
    switch (action) {
      case 'moved':
        return <ArrowRight className="w-3.5 h-3.5" />;
      case 'pinned':
        return <Pin className="w-3.5 h-3.5" />;
      case 'marked':
        return <Check className="w-3.5 h-3.5" />;
      case 'tagged':
        return <Tag className="w-3.5 h-3.5" />;
      default:
        return <Plus className="w-3.5 h-3.5" />;
    }
  };

  const getActionText = (activity: ActivityLogType) => {
    switch (activity.action) {
      case 'moved':
        return `Moved from ${activity.oldValue} to ${activity.newValue}`;
      case 'pinned':
        return activity.newValue === 'true' ? 'Pinned' : 'Unpinned';
      case 'marked':
        return activity.newValue === 'true' ? 'Marked as relevant' : 'Marked as irrelevant';
      case 'tagged':
        return activity.newValue ? `Added tag "${activity.newValue}"` : `Removed tag "${activity.oldValue}"`;
      default:
        return 'Updated';
    }
  };

  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Recent Activity
        </h3>
        {activities.length > 0 && (
          <button
            onClick={onUndo}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <Undo className="w-3.5 h-3.5" />
            Undo
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {activities.slice(0, 10).map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="mt-0.5 p-1.5 bg-white dark:bg-gray-900 rounded-md text-gray-600 dark:text-gray-400">
              {getActionIcon(activity.action)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">
                {getActionText(activity)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {formatDate(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
