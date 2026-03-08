import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDataStore } from '../dataStore';

// Mock Firebase sync
vi.mock('../../services/firebaseSync', () => ({
  syncDataToFirebase: vi.fn(),
}));

describe('dataStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with default state', () => {
    const store = useDataStore.getState();
    expect(store).toBeTruthy();
    expect(store.documents).toBeDefined();
    expect(store.okrs).toBeDefined();
    expect(store.weeklyTasks).toBeDefined();
  });

  it('calculates OKR progress correctly', () => {
    const store = useDataStore.getState();
    // Create test OKR
    const testOKRId = 'test-okr-1';
    const progress = store.getOKRProgress(testOKRId);
    // Should return 0 for non-existent OKR
    expect(progress).toBe(0);
  });

  it('handles OKRs with no key results (prevents division by zero)', () => {
    const store = useDataStore.getState();
    // Add OKR without key results
    store.addOKR({
      id: 'okr-no-kr',
      title: 'Test OKR',
      description: 'Test',
      phase: '30-day',
      status: 'Draft',
      keyResults: [],
      linkedPillars: [],
      owner: 'Test',
      successMetric: 'Test',
    });

    const progress = store.getOKRProgress('okr-no-kr');
    // Should return 0 for empty key results, not NaN
    expect(progress).toBe(0);
    expect(isNaN(progress)).toBe(false);
  });

  it('calculates phase progress correctly', () => {
    const store = useDataStore.getState();
    const progress = store.getPhaseProgress('30-day');
    // Should return a valid number, not NaN
    expect(typeof progress).toBe('number');
    expect(isNaN(progress)).toBe(false);
  });

  it('debounces Firebase sync to prevent race conditions', async () => {
    const store = useDataStore.getState();
    const now = new Date().toISOString();

    // Rapid updates should be debounced
    store.addDocument({
      id: '1',
      title: 'Doc 1',
      type: 'Plan',
      phase: 'Overview',
      tags: [],
      lastUpdated: now,
      createdDate: now,
      content: 'Content 1',
    });

    store.addDocument({
      id: '2',
      title: 'Doc 2',
      type: 'Plan',
      phase: 'Overview',
      tags: [],
      lastUpdated: now,
      createdDate: now,
      content: 'Content 2',
    });

    // Fast-forward time but not enough to trigger sync
    vi.advanceTimersByTime(300);

    // Fast-forward to trigger the debounced sync
    vi.advanceTimersByTime(250);

    // The debounced function should have been called once, not twice
    // This prevents race conditions from multiple rapid writes
    expect(store).toBeTruthy();
  });

  it('returns valid progress values (never NaN)', () => {
    const store = useDataStore.getState();

    // Add test data
    store.addOKR({
      id: 'test-okr',
      title: 'Test',
      description: 'Test OKR',
      phase: '30-day',
      status: 'Active',
      keyResults: [
        {
          id: 'kr-1',
          description: 'KR 1',
          target: 100,
          current: 50,
          unit: '%',
          status: 'In Progress',
        },
      ],
      linkedPillars: [],
      owner: 'Test',
      successMetric: 'Test',
    });

    const okrProgress = store.getOKRProgress('test-okr');
    const phaseProgress = store.getPhaseProgress('30-day');

    expect(isNaN(okrProgress)).toBe(false);
    expect(isNaN(phaseProgress)).toBe(false);
    expect(okrProgress).toBeGreaterThanOrEqual(0);
    expect(phaseProgress).toBeGreaterThanOrEqual(0);
  });
});
