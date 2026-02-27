import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Champion,
  Content,
  Signal,
  Milestone,
  Intel,
  StrategicPillar,
  ContentPillar,
  WeeklyTask,
  OKR,
  KeyResult,
  StrategicDocument,
  Resource,
  Phase,
} from '../types/domain';
import {
  SEED_CHAMPIONS,
  SEED_CONTENT,
  SEED_SIGNALS,
  SEED_MILESTONES,
  SEED_INTEL,
  SEED_STRATEGIC_PILLARS,
  SEED_CONTENT_PILLARS,
  SEED_WEEKLY_TASKS,
  SEED_OKRS,
  SEED_DOCUMENTS,
  SEED_RESOURCES,
} from '../utils/seedData';

interface DataStore {
  // Champions
  champions: Champion[];
  addChampion: (champion: Champion) => void;
  updateChampion: (id: string, updates: Partial<Champion>) => void;
  deleteChampion: (id: string) => void;

  // Content
  content: Content[];
  addContent: (item: Content) => void;
  updateContent: (id: string, updates: Partial<Content>) => void;
  deleteContent: (id: string) => void;

  // Signals
  signals: Signal[];
  addSignal: (signal: Signal) => void;
  updateSignal: (id: string, updates: Partial<Signal>) => void;
  deleteSignal: (id: string) => void;
  markSignalReported: (id: string) => void;

  // Milestones
  milestones: Milestone[];
  updateMilestoneStatus: (id: string, status: 'Not Started' | 'In Progress' | 'Completed') => void;

  // Intel
  intel: Intel[];
  updateIntel: (id: string, updates: Partial<Intel>) => void;

  // Strategic Planning: Pillars
  strategicPillars: StrategicPillar[];
  addStrategicPillar: (pillar: StrategicPillar) => void;
  updateStrategicPillar: (id: string, updates: Partial<StrategicPillar>) => void;
  deleteStrategicPillar: (id: string) => void;

  // Strategic Planning: Content Pillars
  contentPillars: ContentPillar[];
  addContentPillar: (pillar: ContentPillar) => void;
  updateContentPillar: (id: string, updates: Partial<ContentPillar>) => void;

  // Strategic Planning: Weekly Tasks
  weeklyTasks: WeeklyTask[];
  addWeeklyTask: (task: WeeklyTask) => void;
  updateWeeklyTask: (id: string, updates: Partial<WeeklyTask>) => void;
  completeWeeklyTask: (id: string) => void;
  resetAllWeeklyTasks: () => void;
  getTasksForPhaseAndWeek: (phase: Phase, week: number) => WeeklyTask[];

  // Strategic Planning: OKRs
  okrs: OKR[];
  addOKR: (okr: OKR) => void;
  updateOKR: (id: string, updates: Partial<OKR>) => void;
  updateKeyResult: (okrId: string, krId: string, updates: Partial<KeyResult>) => void;
  getOKRProgress: (okrId: string) => number; // 0-100
  getPhaseProgress: (phase: Phase) => number; // 0-100

  // Strategic Planning: Documents
  documents: StrategicDocument[];
  addDocument: (doc: StrategicDocument) => void;
  updateDocument: (id: string, updates: Partial<StrategicDocument>) => void;
  deleteDocument: (id: string) => void;

  // Tools & Resources
  resources: Resource[];
  addResource: (resource: Resource) => void;
  updateResource: (id: string, updates: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
}

export const useDataStore = create<DataStore>()(
  persist(
    (set) => ({
      // Champions
      champions: SEED_CHAMPIONS,
      addChampion: (champion) =>
        set((state) => ({ champions: [...state.champions, champion] })),
      updateChampion: (id, updates) =>
        set((state) => ({
          champions: state.champions.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),
      deleteChampion: (id) =>
        set((state) => ({
          champions: state.champions.filter((c) => c.id !== id),
        })),

      // Content
      content: SEED_CONTENT,
      addContent: (item) =>
        set((state) => ({ content: [...state.content, item] })),
      updateContent: (id, updates) =>
        set((state) => ({
          content: state.content.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),
      deleteContent: (id) =>
        set((state) => ({
          content: state.content.filter((c) => c.id !== id),
        })),

      // Signals
      signals: SEED_SIGNALS,
      addSignal: (signal) =>
        set((state) => ({ signals: [...state.signals, signal] })),
      updateSignal: (id, updates) =>
        set((state) => ({
          signals: state.signals.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),
      deleteSignal: (id) =>
        set((state) => ({
          signals: state.signals.filter((s) => s.id !== id),
        })),
      markSignalReported: (id) =>
        set((state) => ({
          signals: state.signals.map((s) =>
            s.id === id ? { ...s, reported: true } : s
          ),
        })),

      // Milestones
      milestones: SEED_MILESTONES,
      updateMilestoneStatus: (id, status) =>
        set((state) => ({
          milestones: state.milestones.map((m) =>
            m.id === id ? { ...m, status } : m
          ),
        })),

      // Intel
      intel: SEED_INTEL,
      updateIntel: (id, updates) =>
        set((state) => ({
          intel: state.intel.map((i) =>
            i.id === id ? { ...i, ...updates } : i
          ),
        })),

      // Strategic Planning: Pillars
      strategicPillars: SEED_STRATEGIC_PILLARS,
      addStrategicPillar: (pillar) =>
        set((state) => ({ strategicPillars: [...state.strategicPillars, pillar] })),
      updateStrategicPillar: (id, updates) =>
        set((state) => ({
          strategicPillars: state.strategicPillars.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      deleteStrategicPillar: (id) =>
        set((state) => ({
          strategicPillars: state.strategicPillars.filter((p) => p.id !== id),
        })),

      // Strategic Planning: Content Pillars
      contentPillars: SEED_CONTENT_PILLARS,
      addContentPillar: (pillar) =>
        set((state) => ({ contentPillars: [...state.contentPillars, pillar] })),
      updateContentPillar: (id, updates) =>
        set((state) => ({
          contentPillars: state.contentPillars.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      // Strategic Planning: Weekly Tasks
      weeklyTasks: SEED_WEEKLY_TASKS,
      addWeeklyTask: (task) =>
        set((state) => ({ weeklyTasks: [...state.weeklyTasks, task] })),
      updateWeeklyTask: (id, updates) =>
        set((state) => ({
          weeklyTasks: state.weeklyTasks.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
      completeWeeklyTask: (id) =>
        set((state) => ({
          weeklyTasks: state.weeklyTasks.map((t) =>
            t.id === id ? { ...t, status: t.status === 'Completed' ? 'In Progress' : 'Completed' } : t
          ),
        })),
      resetAllWeeklyTasks: () =>
        set((state) => ({
          weeklyTasks: state.weeklyTasks.map((t) => ({ ...t, status: 'In Progress' })),
        })),
      getTasksForPhaseAndWeek: (phase: Phase, week: number): WeeklyTask[] => {
        const state = useDataStore.getState();
        return state.weeklyTasks.filter((t: WeeklyTask) => t.phase === phase && t.week === week);
      },

      // Strategic Planning: OKRs
      okrs: SEED_OKRS,
      addOKR: (okr: OKR) =>
        set((state) => ({ okrs: [...state.okrs, okr] })),
      updateOKR: (id: string, updates: Partial<OKR>) =>
        set((state) => ({
          okrs: state.okrs.map((o: OKR) =>
            o.id === id ? { ...o, ...updates } : o
          ),
        })),
      updateKeyResult: (okrId: string, krId: string, updates: Partial<KeyResult>) =>
        set((state) => ({
          okrs: state.okrs.map((o: OKR) =>
            o.id === okrId
              ? {
                  ...o,
                  keyResults: o.keyResults.map((kr: KeyResult) =>
                    kr.id === krId ? { ...kr, ...updates } : kr
                  ),
                }
              : o
          ),
        })),
      getOKRProgress: (okrId: string): number => {
        const state = useDataStore.getState();
        const okr = state.okrs.find((o: OKR) => o.id === okrId);
        if (!okr || okr.keyResults.length === 0) return 0;
        const completedKRs = okr.keyResults.filter(
          (kr: KeyResult) => kr.current >= kr.target || kr.status === 'Completed'
        ).length;
        return Math.round((completedKRs / okr.keyResults.length) * 100);
      },
      getPhaseProgress: (phase: Phase): number => {
        const state = useDataStore.getState();
        const phaseTasks = state.weeklyTasks.filter((t: WeeklyTask) => t.phase === phase);
        const phaseOKRs = state.okrs.filter((o: OKR) => o.phase === phase);

        if (phaseTasks.length === 0 && phaseOKRs.length === 0) return 0;

        const taskProgress =
          phaseTasks.length > 0
            ? (phaseTasks.filter((t: WeeklyTask) => t.status === 'Completed').length / phaseTasks.length) * 100
            : 0;

        const okrProgress =
          phaseOKRs.length > 0
            ? phaseOKRs.reduce((sum: number, okr: OKR) => sum + state.getOKRProgress(okr.id), 0) /
              phaseOKRs.length
            : 0;

        return Math.round((taskProgress + okrProgress) / 2);
      },

      // Strategic Planning: Documents
      documents: SEED_DOCUMENTS,
      addDocument: (doc: StrategicDocument) =>
        set((state) => ({ documents: [...state.documents, doc] })),
      updateDocument: (id: string, updates: Partial<StrategicDocument>) =>
        set((state) => ({
          documents: state.documents.map((d) =>
            d.id === id ? { ...d, ...updates } : d
          ),
        })),
      deleteDocument: (id: string) =>
        set((state) => ({
          documents: state.documents.filter((d) => d.id !== id),
        })),

      // Tools & Resources
      resources: SEED_RESOURCES,
      addResource: (resource: Resource) =>
        set((state) => ({ resources: [...state.resources, resource] })),
      updateResource: (id: string, updates: Partial<Resource>) =>
        set((state) => ({
          resources: state.resources.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        })),
      deleteResource: (id: string) =>
        set((state) => ({
          resources: state.resources.filter((r) => r.id !== id),
        })),
    }),
    {
      name: 'da-ops-hub-data',
    }
  )
);
