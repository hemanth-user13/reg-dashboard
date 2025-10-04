import React from 'react';
import { RegulationStatus } from '../types/regulation';
import { FileCheck, Clock, AlertCircle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: RegulationStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'in-effect':
        return {
          label: 'In Effect',
          icon: FileCheck,
          className: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
        };
      case 'in-planning':
        return {
          label: 'In Planning',
          icon: Clock,
          className: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
        };
      case 'partially-applicable':
        return {
          label: 'Partially Applicable',
          icon: AlertCircle,
          className: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
        };
      case 'out-of-effect':
        return {
          label: 'Out of Effect',
          icon: XCircle,
          className: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};
