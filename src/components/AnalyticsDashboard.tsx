import React from 'react';
import { Regulation } from '../types/regulation';
import { TrendingUp, BarChart3, PieChart, Calendar } from 'lucide-react';

interface AnalyticsDashboardProps {
  regulations: Regulation[];
  activityLog: any[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ regulations, activityLog }) => {
  const categoryStats = {
    personal: regulations.filter(r => r.category === 'personal').length,
    relevant: regulations.filter(r => r.category === 'relevant').length,
    irrelevant: regulations.filter(r => r.category === 'irrelevant').length,
  };

  const totalActive = categoryStats.personal + categoryStats.relevant;
  const personalPercentage = totalActive > 0 ? Math.round((categoryStats.personal / totalActive) * 100) : 0;
  const relevantPercentage = totalActive > 0 ? Math.round((categoryStats.relevant / totalActive) * 100) : 0;

  const recentActivity = activityLog.length;
  const movedToday = activityLog.filter(a => {
    const today = new Date();
    const activityDate = new Date(a.timestamp);
    return activityDate.toDateString() === today.toDateString();
  }).length;

  const topTags = regulations
    .flatMap(r => r.tags)
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const topTagsList = Object.entries(topTags)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Analytics Overview
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <PieChart className="w-4 h-4" />
            Category Distribution
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Personal</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {categoryStats.personal} ({personalPercentage}%)
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${personalPercentage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Relevant</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {categoryStats.relevant} ({relevantPercentage}%)
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 dark:bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${relevantPercentage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Irrelevant</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {categoryStats.irrelevant}
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gray-600 dark:bg-gray-500 rounded-full w-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <TrendingUp className="w-4 h-4" />
            Activity Insights
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">Today</span>
              </div>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{movedToday}</p>
              <p className="text-xs text-blue-700 dark:text-blue-300">Changes</p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-xs text-green-700 dark:text-green-300 font-medium">Total</span>
              </div>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">{recentActivity}</p>
              <p className="text-xs text-green-700 dark:text-green-300">Activities</p>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Top Tags</p>
            <div className="flex flex-wrap gap-2">
              {topTagsList.map(([tag, count]) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs"
                >
                  <span className="text-gray-900 dark:text-white font-medium">{tag}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">({count})</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Total Regulations: <span className="font-semibold text-gray-900 dark:text-white">{regulations.length}</span>
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            Active: <span className="font-semibold text-green-600 dark:text-green-400">{totalActive}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
