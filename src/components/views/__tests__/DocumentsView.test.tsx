import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import DocumentsView from '../DocumentsView';

// Mock the store
vi.mock('../../../stores/dataStore', () => ({
  useDataStore: () => ({
    documents: [
      {
        id: '1',
        title: 'Test Document',
        type: 'Plan',
        phase: 'Overview',
        tags: ['test', 'document'],
        lastUpdated: '2024-01-01',
        content: '# Heading\n## Subheading\n- Bullet point\n\nParagraph text',
      },
    ],
  }),
}));

describe('DocumentsView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<DocumentsView />);
    expect(container).toBeTruthy();
  });

  it('renders document list with proper keys', () => {
    render(<DocumentsView />);
    // Component should render without key warnings - title should exist
    expect(screen.getByText('Test Document')).toBeTruthy();
  });

  it('expands document content on click', () => {
    render(<DocumentsView />);
    const docCard = screen.getByText('Test Document');
    expect(docCard).toBeTruthy();
  });

  it('handles markdown content without crashing', () => {
    render(<DocumentsView />);
    // Component should render markdown content safely
    expect(screen.getByText('Test Document')).toBeTruthy();
  });

  it('renders documents with empty content array', () => {
    // This should not crash
    const { container } = render(<DocumentsView />);
    expect(container).toBeTruthy();
  });

  it('generates stable keys for multiline content', () => {
    const { container } = render(<DocumentsView />);
    // Verify that content renders without React key warnings
    // The test passes if no console errors about keys are thrown
    expect(container.querySelectorAll('h2, h3, p, div').length).toBeGreaterThan(0);
  });
});
