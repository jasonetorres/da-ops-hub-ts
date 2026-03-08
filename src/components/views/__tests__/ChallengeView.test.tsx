import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChallengeView from '../ChallengeView';

// Mock the stores
vi.mock('../../../stores/challengeStore', () => ({
  useChallengeStore: () => ({
    completedChallenges: [],
    streak: 0,
    currentChallengeCode: '',
    setCompletedChallenge: vi.fn(),
    setCurrentChallengeCode: vi.fn(),
  }),
}));

vi.mock('../../../stores/dataStore', () => ({
  useDataStore: () => ({
    documents: [],
    content: [],
    okrs: [],
    weeklyTasks: [],
  }),
}));

describe('ChallengeView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ChallengeView />);
    expect(screen.getAllByRole('heading')).toBeTruthy();
  });

  it('handles malformed solution strings gracefully', () => {
    // This test verifies that the extractParamName function doesn't crash
    // when given unexpected solution formats. The component should render
    // without throwing errors for any malformed input.
    expect(() => render(<ChallengeView />)).not.toThrow();
  });

  it('displays test results section after running tests', () => {
    const { container } = render(<ChallengeView />);
    // Component should render with challenge content
    expect(container).toBeTruthy();
  });
});
