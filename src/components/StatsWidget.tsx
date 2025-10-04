import React from 'react';
import { Regulation } from '../types/regulation';
import { FileCheck, AlertCircle, Clock, XCircle } from 'lucide-react';

interface StatsWidgetProps {
  regulations: Regulation[];
}

export const StatsWidget: React.FC<StatsWidgetProps> = ({ regulations }) => {
  const stats = {
    inEffect: regulations.filter(r => r.status === 'in-effect').length,
    inPlanning: regulations.filter(r => r.status === 'in-planning').length,
    partiallyApplicable: regulations.filter(r => r.status === 'partially-applicable').length,
    outOfEffect: regulations.filter(r => r.status === 'out-of-effect').length,
    total: regulations.length,
  };

  const statItems = [
    {
      label: 'In Effect',
      value: stats.inEffect,
      icon: FileCheck,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      label: 'In Planning',
      value: stats.inPlanning,
      icon: Clock,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      label: 'Partially Applicable',
      value: stats.partiallyApplicable,
      icon: AlertCircle,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
      label: 'Out of Effect',
      value: stats.outOfEffect,
      icon: XCircle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
