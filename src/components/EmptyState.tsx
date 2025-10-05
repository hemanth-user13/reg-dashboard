import React from 'react';
import { FileText, Inbox } from 'lucide-react';

interface EmptyStateProps {
  category: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ category }) => {
  const messages = {
    personal: {
      title: 'No personal regulations yet',
      description: 'Drag regulations here that directly apply to your organization',
      icon: FileText,
    },
    relevant: {
      title: 'No relevant regulations yet',
      description: 'Add regulations that may be indirectly applicable',
      icon: FileText,
    },
    irrelevant: {
      title: 'No irrelevant regulations',
      description: 'Move outdated or non-applicable regulations here',
      icon: Inbox,
    },
  };

  const message = messages[category as keyof typeof messages];
  const Icon = message?.icon || FileText;

  return (
    <div className="py-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
        <Icon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {message?.title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {message?.description}
      </p>
    </div>
  );
};
