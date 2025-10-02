export type RegulationCategory = 'personal' | 'relevant' | 'irrelevant';

export interface Regulation {
  id: string;
  title: string;
  content: string;
  category: RegulationCategory;
  isPinned: boolean;
  isRelevant: boolean;
  tags: string[];
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityLog {
  id: string;
  regulationId: string;
  action: 'moved' | 'marked' | 'pinned' | 'tagged' | 'created' | 'updated';
  oldValue?: string;
  newValue?: string;
  timestamp: Date;
}

export interface CardConfig {
  id: RegulationCategory;
  title: string;
  color: string;
}
