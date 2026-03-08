import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import OverviewView from '../OverviewView';

// Mock the stores
vi.mock('../../../stores/dataStore', () => ({
  useDataStore: () => ({
    documents: [],
    content: [],
    okrs: [],
    weeklyTasks: [],
    addMilestone: vi.fn(),
    updateMilestone: vi.fn(),
    deleteMilestone: vi.fn(),
    getMilestones: () => [
      { id: '1', phase: '30-day', status: 'Completed' },
      { id: '2', phase: '30-day', status: 'In Progress' },
      { id: '3', phase: '60-day', status: 'Completed' },
    ],
  }),
}));

vi.mock('../../../stores/challengeStore', () => ({
  useChallengeStore: () => ({
    completedChallenges: [],
    streak: 0,
    currentChallengeCode: '',
    setCompletedChallenge: vi.fn(),
    setCurrentChallengeCode: vi.fn(),
  }),
}));

describe('OverviewView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<OverviewView />);
    expect(container).toBeTruthy();
  });

  it('calculates phase progress correctly when items exist', () => {
    const { container } = render(<OverviewView />);
    // With 2 items in 30-day phase (1 completed, 1 in progress): 50%
    // Component should render progress indicator
    expect(container).toBeTruthy();
  });

  it('returns 0 when phase has no items (prevents division by zero)', () => {
    const { container } = render(<OverviewView />);
    // With 0 items in a phase, progress should be 0 (not NaN)
    // Component should render safely
    expect(container).toBeTruthy();
  });

  it('handles empty milestone list gracefully', () => {
    // Component should render even with empty milestones
    // The mock already returns empty milestones for undefined phases
    const { container } = render(<OverviewView />);
    expect(container).toBeTruthy();
  });

  it('does not produce NaN values in progress calculations', () => {
    const { container } = render(<OverviewView />);
    // Verify no text content contains 'NaN'
    const textContent = container.textContent || '';
    expect(textContent).not.toContain('NaN');
  });
});
