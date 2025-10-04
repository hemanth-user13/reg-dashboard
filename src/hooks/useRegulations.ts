import { useState, useCallback } from 'react';
import { Regulation, RegulationCategory, ActivityLog } from '../types/regulation';

const generateId = () => Math.random().toString(36).substring(2, 15);

const createSampleRegulations = (): Regulation[] => {
  const now = new Date();
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  return [
    {
      id: generateId(),
      title: 'GDPR Compliance Requirements',
      content: 'General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy. It addresses the transfer of personal data outside the EU and EEA areas. The GDPR aims primarily to give control to individuals over their personal data and to simplify the regulatory environment for international business by unifying the regulation within the EU. Organizations must implement appropriate technical and organizational measures to ensure data protection by design and by default.',
      category: 'personal',
      status: 'in-effect',
      isPinned: true,
      isRelevant: true,
      tags: ['privacy', 'data-protection', 'EU'],
      sortOrder: 0,
      createdAt: lastMonth,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'SOC 2 Type II Certification',
      content: 'SOC 2 Type II is an audit report that evaluates the design and operating effectiveness of controls at a service organization relevant to security, availability, processing integrity, confidentiality, and privacy. This certification is critical for demonstrating trustworthiness to customers and partners.',
      category: 'personal',
      status: 'in-effect',
      isPinned: false,
      isRelevant: true,
      tags: ['security', 'audit', 'compliance'],
      sortOrder: 1,
      createdAt: lastMonth,
      updatedAt: lastWeek,
    },
    {
      id: generateId(),
      title: 'California Consumer Privacy Act (CCPA)',
      content: 'The CCPA grants California residents expanded rights to know about the personal information that businesses collect about them and how it is used and shared. Businesses must provide notice of these rights and honor consumer requests to delete personal information, opt out of data sales, and access their personal information.',
      category: 'personal',
      status: 'in-effect',
      isPinned: false,
      isRelevant: true,
      tags: ['privacy', 'california', 'consumer-rights'],
      sortOrder: 2,
      createdAt: lastMonth,
      updatedAt: lastWeek,
    },
    {
      id: generateId(),
      title: 'Data Breach Notification Protocol',
      content: 'Organizations must notify affected individuals and relevant authorities within 72 hours of discovering a data breach. This includes detailed documentation of the breach scope, affected data types, and remediation measures taken.',
      category: 'personal',
      status: 'in-planning',
      isPinned: false,
      isRelevant: true,
      tags: ['security', 'incident-response', 'compliance'],
      sortOrder: 3,
      createdAt: lastWeek,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'PCI DSS 4.0 Compliance Standards',
      content: 'Payment Card Industry Data Security Standard (PCI DSS) version 4.0 provides requirements for organizations that handle branded credit cards. This includes maintaining secure networks, protecting cardholder data, maintaining vulnerability management programs, and implementing strong access control measures.',
      category: 'personal',
      status: 'partially-applicable',
      isPinned: false,
      isRelevant: true,
      tags: ['payment', 'security', 'compliance'],
      sortOrder: 4,
      createdAt: lastMonth,
      updatedAt: lastWeek,
    },
    {
      id: generateId(),
      title: 'Employee Background Check Requirements',
      content: 'Standard procedures for conducting background checks on new employees including identity verification, criminal history, employment history, and educational credential verification. All checks must be completed before onboarding.',
      category: 'personal',
      status: 'in-effect',
      isPinned: false,
      isRelevant: true,
      tags: ['HR', 'compliance', 'hiring'],
      sortOrder: 5,
      createdAt: lastMonth,
      updatedAt: lastWeek,
    },
    {
      id: generateId(),
      title: 'Remote Work Security Policy',
      content: 'Security requirements for remote workers including VPN usage, secure Wi-Fi connections, device encryption, screen locking policies, and physical security of work equipment. All remote devices must comply with endpoint security standards.',
      category: 'personal',
      status: 'in-effect',
      isPinned: false,
      isRelevant: true,
      tags: ['remote-work', 'security', 'policy'],
      sortOrder: 6,
      createdAt: lastMonth,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'API Security Best Practices',
      content: 'Guidelines for securing APIs including authentication, authorization, rate limiting, input validation, encryption in transit, and API key management. All public APIs must undergo security review before deployment.',
      category: 'personal',
      status: 'in-effect',
      isPinned: false,
      isRelevant: true,
      tags: ['API', 'security', 'development'],
      sortOrder: 7,
      createdAt: lastWeek,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'Third-Party Vendor Assessment',
      content: 'Framework for evaluating and monitoring third-party vendors handling sensitive data. Includes security questionnaires, annual audits, contract requirements, and ongoing risk assessment procedures.',
      category: 'personal',
      status: 'partially-applicable',
      isPinned: false,
      isRelevant: true,
      tags: ['vendor', 'risk', 'assessment'],
      sortOrder: 8,
      createdAt: lastMonth,
      updatedAt: lastWeek,
    },
    {
      id: generateId(),
      title: 'Password Policy and MFA Requirements',
      content: 'Comprehensive password requirements including minimum length, complexity, rotation schedules, and multi-factor authentication mandates. All users must enable MFA for accessing sensitive systems.',
      category: 'personal',
      status: 'in-effect',
      isPinned: false,
      isRelevant: true,
      tags: ['authentication', 'security', 'policy'],
      sortOrder: 9,
      createdAt: lastMonth,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'ISO 27001 Information Security',
      content: 'ISO 27001 is an international standard that provides requirements for establishing, implementing, maintaining and continually improving an information security management system (ISMS). The standard includes requirements for risk assessment and treatment designed to address information security risks.',
      category: 'relevant',
      status: 'in-effect',
      isPinned: true,
      isRelevant: true,
      tags: ['security', 'iso', 'international'],
      sortOrder: 0,
      createdAt: lastMonth,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'HIPAA Privacy Rule',
      content: 'The HIPAA Privacy Rule establishes national standards to protect individuals medical records and other personal health information and applies to health plans, health care clearinghouses, and health care providers. Covered entities must implement safeguards to ensure the confidentiality, integrity, and availability of all electronic protected health information.',
      category: 'relevant',
      status: 'in-effect',
      isPinned: false,
      isRelevant: true,
      tags: ['healthcare', 'privacy', 'PHI'],
      sortOrder: 1,
      createdAt: lastMonth,
      updatedAt: lastWeek,
    },
    {
      id: generateId(),
      title: 'NIST Cybersecurity Framework 2.0',
      content: 'The NIST Cybersecurity Framework provides guidance for organizations to manage and reduce cybersecurity risk. It consists of five core functions: Identify, Protect, Detect, Respond, and Recover. The framework is voluntary and provides a common language for understanding, managing, and expressing cybersecurity risk.',
      category: 'relevant',
      status: 'in-effect',
      isPinned: false,
      isRelevant: true,
      tags: ['cybersecurity', 'framework', 'NIST'],
      sortOrder: 2,
      createdAt: lastMonth,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'AI Governance Framework',
      content: 'Proposed framework for responsible artificial intelligence deployment covering ethical guidelines, bias mitigation, transparency requirements, and accountability measures. This framework aims to ensure AI systems are developed and deployed in a manner that respects human rights and democratic values.',
      category: 'relevant',
      status: 'in-planning',
      isPinned: false,
      isRelevant: true,
      tags: ['AI', 'ethics', 'governance'],
      sortOrder: 3,
      createdAt: lastWeek,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'Cloud Security Alliance Standards',
      content: 'The CSA provides best practices for secure cloud computing environments including identity and access management, data encryption, secure APIs, and compliance monitoring. These standards help organizations maintain security while leveraging cloud infrastructure.',
      category: 'relevant',
      status: 'in-effect',
      isPinned: false,
      isRelevant: true,
      tags: ['cloud', 'security', 'infrastructure'],
      sortOrder: 4,
      createdAt: lastMonth,
      updatedAt: lastWeek,
    },
    {
      id: generateId(),
      title: 'Zero Trust Architecture Implementation',
      content: 'Modern security approach that eliminates implicit trust and continuously validates every stage of digital interaction. Implementation includes identity verification, least privilege access, microsegmentation, and continuous monitoring across all network resources.',
      category: 'relevant',
      status: 'partially-applicable',
      isPinned: false,
      isRelevant: true,
      tags: ['security', 'architecture', 'zero-trust'],
      sortOrder: 5,
      createdAt: lastWeek,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'Environmental Data Reporting Standards',
      content: 'Regulations requiring disclosure of environmental impact data including carbon emissions, waste management, and sustainability initiatives. Organizations must report annually with third-party verification of metrics.',
      category: 'relevant',
      status: 'in-planning',
      isPinned: false,
      isRelevant: true,
      tags: ['environmental', 'reporting', 'ESG'],
      sortOrder: 6,
      createdAt: lastWeek,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'Cryptocurrency Compliance Framework',
      content: 'Proposed regulations for cryptocurrency transactions and digital asset management. Includes anti-money laundering requirements, customer due diligence, and transaction monitoring protocols.',
      category: 'relevant',
      status: 'in-planning',
      isPinned: false,
      isRelevant: true,
      tags: ['crypto', 'finance', 'AML'],
      sortOrder: 7,
      createdAt: lastWeek,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'Open Banking Standards',
      content: 'Technical and security standards for open banking APIs allowing third-party providers to access financial data. Includes strong customer authentication, consent management, and data minimization principles.',
      category: 'relevant',
      status: 'partially-applicable',
      isPinned: false,
      isRelevant: true,
      tags: ['banking', 'API', 'finance'],
      sortOrder: 8,
      createdAt: lastMonth,
      updatedAt: lastWeek,
    },
    {
      id: generateId(),
      title: 'Biometric Data Protection Regulation',
      content: 'Special protections for biometric data including facial recognition, fingerprints, and voice patterns. Requires explicit consent, secure storage with encryption, and strict access controls.',
      category: 'relevant',
      status: 'in-effect',
      isPinned: false,
      isRelevant: true,
      tags: ['biometric', 'privacy', 'data-protection'],
      sortOrder: 9,
      createdAt: lastMonth,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'Supply Chain Cybersecurity Standards',
      content: 'Requirements for securing supply chain including vendor risk management, software bill of materials, and third-party code review. Addresses software supply chain attacks and dependency vulnerabilities.',
      category: 'relevant',
      status: 'in-effect',
      isPinned: false,
      isRelevant: true,
      tags: ['supply-chain', 'security', 'risk'],
      sortOrder: 10,
      createdAt: lastWeek,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'Quantum Computing Readiness',
      content: 'Preparing for post-quantum cryptography including migration strategies for quantum-resistant algorithms. Organizations should begin assessing cryptographic inventory and planning transitions.',
      category: 'relevant',
      status: 'in-planning',
      isPinned: false,
      isRelevant: true,
      tags: ['quantum', 'cryptography', 'future'],
      sortOrder: 11,
      createdAt: lastWeek,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'Archived Company Policy 2019',
      content: 'This is an archived company policy from 2019 that is no longer in effect but kept for historical reference purposes. It covered previous data retention requirements that have since been superseded by newer regulations.',
      category: 'irrelevant',
      status: 'out-of-effect',
      isPinned: false,
      isRelevant: false,
      tags: ['archived', 'historical'],
      sortOrder: 0,
      createdAt: lastMonth,
      updatedAt: lastMonth,
    },
    {
      id: generateId(),
      title: 'Legacy Network Security Protocol',
      content: 'Outdated network security guidelines from 2018 that have been replaced by modern zero-trust architecture principles. Maintained for reference purposes only.',
      category: 'irrelevant',
      status: 'out-of-effect',
      isPinned: false,
      isRelevant: false,
      tags: ['archived', 'network', 'legacy'],
      sortOrder: 1,
      createdAt: lastMonth,
      updatedAt: lastMonth,
    },
    {
      id: generateId(),
      title: 'Deprecated Authentication Standards',
      content: 'Previous authentication requirements using basic password policies. These have been superseded by multi-factor authentication and passwordless authentication methods.',
      category: 'irrelevant',
      status: 'out-of-effect',
      isPinned: false,
      isRelevant: false,
      tags: ['archived', 'authentication', 'deprecated'],
      sortOrder: 2,
      createdAt: lastMonth,
      updatedAt: lastMonth,
    },
    {
      id: generateId(),
      title: 'Old Data Center Guidelines',
      content: 'Physical data center security and maintenance guidelines from on-premise infrastructure. No longer applicable due to full migration to cloud services.',
      category: 'irrelevant',
      status: 'out-of-effect',
      isPinned: false,
      isRelevant: false,
      tags: ['archived', 'datacenter', 'physical-security'],
      sortOrder: 3,
      createdAt: lastMonth,
      updatedAt: lastMonth,
    },
    {
      id: generateId(),
      title: 'Flash Player Security Policy',
      content: 'Security guidelines for Adobe Flash Player implementations. No longer relevant as Flash has reached end-of-life and is no longer supported.',
      category: 'irrelevant',
      status: 'out-of-effect',
      isPinned: false,
      isRelevant: false,
      tags: ['archived', 'flash', 'deprecated'],
      sortOrder: 4,
      createdAt: lastMonth,
      updatedAt: lastMonth,
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
    newValue?: string,
    note?: string
  ) => {
    const activity: ActivityLog = {
      id: generateId(),
      regulationId,
      action,
      oldValue,
      newValue,
      note,
      timestamp: new Date(),
    };
    setActivityLog(prev => [activity, ...prev]);
  }, []);

  const moveRegulation = useCallback((id: string, targetCategory: RegulationCategory, note?: string) => {
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
            moveNotes: note,
          };
        }
        if (r.category === targetCategory) {
          return { ...r, sortOrder: r.sortOrder + 1 };
        }
        return r;
      });

      addActivity(id, 'moved', oldCategory, targetCategory, note);
      return updated;
    });
  }, [addActivity]);

  const moveMultiple = useCallback((ids: string[], targetCategory: RegulationCategory, notes?: Map<string, string>) => {
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
          const note = notes?.get(r.id);
          addActivity(r.id, 'moved', oldCategory, targetCategory, note);
          return {
            ...r,
            category: targetCategory,
            sortOrder: validIds.indexOf(r.id),
            updatedAt: now,
            moveNotes: note,
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
