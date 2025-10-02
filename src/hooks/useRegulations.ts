import { useState, useCallback } from 'react';
import { Regulation, RegulationCategory, ActivityLog } from '../types/regulation';

const generateId = () => Math.random().toString(36).substring(2, 15);

const createSampleRegulations = (): Regulation[] => {
  const now = new Date();
  return [
    {
      id: generateId(),
      title: 'GDPR Compliance Requirements',
      content: 'General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy. It addresses the transfer of personal data outside the EU and EEA areas. The GDPR aims primarily to give control to individuals over their personal data and to simplify the regulatory environment for international business by unifying the regulation within the EU.',
      category: 'personal',
      isPinned: true,
      isRelevant: true,
      tags: ['privacy', 'data-protection'],
      sortOrder: 0,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'SOC 2 Type II Certification',
      content: 'SOC 2 Type II is an audit report that evaluates the design and operating effectiveness of controls at a service organization relevant to security, availability, processing integrity, confidentiality, and privacy.',
      category: 'personal',
      isPinned: false,
      isRelevant: true,
      tags: ['security', 'audit'],
      sortOrder: 1,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'SOC 2 Type II Certification',
      content: 'SOC 2 Type II is an audit report that evaluates the design and operating effectiveness of controls at a service organization relevant to security, availability, processing integrity, confidentiality, and privacy.',
      category: 'personal',
      isPinned: false,
      isRelevant: true,
      tags: ['security', 'audit'],
      sortOrder: 1,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'ISO 27001 Information Security',
      content: 'ISO 27001 is an international standard that provides requirements for establishing, implementing, maintaining and continually improving an information security management system (ISMS).',
      category: 'relevant',
      isPinned: true,
      isRelevant: true,
      tags: ['security', 'iso'],
      sortOrder: 0,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'HIPAA Privacy Rule',
      content: 'The HIPAA Privacy Rule establishes national standards to protect individuals medical records and other personal health information and applies to health plans, health care clearinghouses, and health care providers.',
      category: 'relevant',
      isPinned: false,
      isRelevant: true,
      tags: ['healthcare', 'privacy'],
      sortOrder: 1,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'Archived Company Policy 2019',
      content: 'This is an archived company policy from 2019 that is no longer in effect but kept for historical reference purposes.',
      category: 'irrelevant',
      isPinned: false,
      isRelevant: false,
      tags: ['archived'],
      sortOrder: 0,
      createdAt: now,
      updatedAt: now,
    },
  ];
};

export const useRegulations = () => {
  const [regulations, setRegulations] = useState<Regulation[]>(createSampleRegulations());
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const addActivity = useCallback((
    regulationId: string,
    action: ActivityLog['action'],
    oldValue?: string,
    newValue?: string
  ) => {
    const activity: ActivityLog = {
      id: generateId(),
      regulationId,
      action,
      oldValue,
      newValue,
      timestamp: new Date(),
    };
    setActivityLog(prev => [activity, ...prev]);
  }, []);

  const moveRegulation = useCallback((id: string, targetCategory: RegulationCategory) => {
    setRegulations(prev => {
      const regulation = prev.find(r => r.id === id);
      if (!regulation || regulation.category === targetCategory) return prev;

      const oldCategory = regulation.category;
      const updated = prev.map(r => {
        if (r.id === id) {
          return {
            ...r,
            category: targetCategory,
            sortOrder: 0,
            updatedAt: new Date(),
          };
        }
        if (r.category === targetCategory) {
          return { ...r, sortOrder: r.sortOrder + 1 };
        }
        return r;
      });

      addActivity(id, 'moved', oldCategory, targetCategory);
      return updated;
    });
  }, [addActivity]);

  const moveMultiple = useCallback((ids: string[], targetCategory: RegulationCategory) => {
    setRegulations(prev => {
      const now = new Date();
      const validIds = ids.filter(id => {
        const reg = prev.find(r => r.id === id);
        return reg && reg.category !== targetCategory;
      });

      if (validIds.length === 0) return prev;

      const updated = prev.map(r => {
        if (validIds.includes(r.id)) {
          const oldCategory = r.category;
          addActivity(r.id, 'moved', oldCategory, targetCategory);
          return {
            ...r,
            category: targetCategory,
            sortOrder: validIds.indexOf(r.id),
            updatedAt: now,
          };
        }
        if (r.category === targetCategory) {
          return { ...r, sortOrder: r.sortOrder + validIds.length };
        }
        return r;
      });

      return updated;
    });
    setSelectedIds(new Set());
  }, [addActivity]);

  const togglePin = useCallback((id: string) => {
    setRegulations(prev => prev.map(r => {
      if (r.id === id) {
        const newPinned = !r.isPinned;
        addActivity(id, 'pinned', String(r.isPinned), String(newPinned));
        return { ...r, isPinned: newPinned, updatedAt: new Date() };
      }
      return r;
    }));
  }, [addActivity]);

  const toggleRelevant = useCallback((id: string) => {
    setRegulations(prev => prev.map(r => {
      if (r.id === id) {
        const newRelevant = !r.isRelevant;
        addActivity(id, 'marked', String(r.isRelevant), String(newRelevant));
        return { ...r, isRelevant: newRelevant, updatedAt: new Date() };
      }
      return r;
    }));
  }, [addActivity]);

  const addTag = useCallback((id: string, tag: string) => {
    setRegulations(prev => prev.map(r => {
      if (r.id === id && !r.tags.includes(tag)) {
        addActivity(id, 'tagged', '', tag);
        return { ...r, tags: [...r.tags, tag], updatedAt: new Date() };
      }
      return r;
    }));
  }, [addActivity]);

  const removeTag = useCallback((id: string, tag: string) => {
    setRegulations(prev => prev.map(r => {
      if (r.id === id) {
        addActivity(id, 'tagged', tag, '');
        return { ...r, tags: r.tags.filter(t => t !== tag), updatedAt: new Date() };
      }
      return r;
    }));
  }, [addActivity]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const undoLastAction = useCallback(() => {
    if (activityLog.length === 0) return;

    const lastAction = activityLog[0];

    if (lastAction.action === 'moved' && lastAction.oldValue) {
      moveRegulation(lastAction.regulationId, lastAction.oldValue as RegulationCategory);
    } else if (lastAction.action === 'pinned') {
      togglePin(lastAction.regulationId);
    } else if (lastAction.action === 'marked') {
      toggleRelevant(lastAction.regulationId);
    }

    setActivityLog(prev => prev.slice(1));
  }, [activityLog, moveRegulation, togglePin, toggleRelevant]);

  return {
    regulations,
    activityLog,
    selectedIds,
    moveRegulation,
    moveMultiple,
    togglePin,
    toggleRelevant,
    addTag,
    removeTag,
    toggleSelection,
    clearSelection,
    undoLastAction,
  };
};
