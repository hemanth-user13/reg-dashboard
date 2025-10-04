export type RegulationCategory = 'personal' | 'relevant' | 'irrelevant';
export type RegulationStatus = 'in-effect' | 'in-planning' | 'partially-applicable' | 'out-of-effect';

export interface Regulation {
  id: string;
  title: string;
  content: string;
  category: RegulationCategory;
  status: RegulationStatus;
  isPinned: boolean;
  isRelevant: boolean;
  tags: string[];
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  moveNotes?: string;
}

export interface ActivityLog {
  id: string;
  regulationId: string;
  action: 'moved' | 'marked' | 'pinned' | 'tagged' | 'created' | 'updated';
  oldValue?: string;
  newValue?: string;
  note?: string;
  timestamp: Date;
}

export interface CardConfig {
  id: RegulationCategory;
  title: string;
  color: string;
}
