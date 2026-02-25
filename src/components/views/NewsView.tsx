import { useState, useEffect } from 'react';
import { useAppStore } from '../../stores/appStore';
import Card from '../common/Card';
import SectionHeader from '../common/SectionHeader';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  score: number;
  time: string;
}

export default function NewsView() {
  const { newsSource, setNewsSource } = useAppStore();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const sources = ['hackernews', 'devto', 'lobsters', 'reddit'];

  const sourceEmojis: Record<string, string> = {
    hackernews: '🔥',
    devto: '👨‍💻',
    lobsters: '🦞',
    reddit: '🤖',
  };

  // Mock news data for demo
  const mockNews: Record<string, NewsItem[]> = {
    hackernews: [
      {
        id: '1',
        title: 'WebStorm 2024.3: AI-Powered Development Enhancements',
        source: 'hackernews',
        url: 'https://news.ycombinator.com',
        score: 234,
        time: '2 hours ago',
      },
      {
        id: '2',
        title: 'TypeScript 5.4: New Type System Improvements',
        source: 'hackernews',
        url: 'https://news.ycombinator.com',
        score: 189,
        time: '4 hours ago',
      },
    ],
    devto: [
      {
        id: '3',
        title: 'Building React Apps with TypeScript Best Practices',
        source: 'devto',
        url: 'https://dev.to',
        score: 45,
        time: '3 hours ago',
      },
      {
        id: '4',
        title: 'State Management in Modern React Applications',
        source: 'devto',
        url: 'https://dev.to',
        score: 38,
        time: '5 hours ago',
      },
    ],
    lobsters: [
      {
        id: '5',
        title: 'Rust WebAssembly for Performance-Critical Web Apps',
        source: 'lobsters',
        url: 'https://lobsters.computer',
        score: 52,
        time: '1 hour ago',
      },
      {
        id: '6',
        title: 'Functional Programming Patterns in JavaScript',
        source: 'lobsters',
        url: 'https://lobsters.computer',
        score: 41,
        time: '6 hours ago',
      },
    ],
    reddit: [
      {
        id: '7',
        title: 'Help: Debugging React Performance Issues',
        source: 'reddit',
        url: 'https://reddit.com/r/javascript',
        score: 156,
        time: '1 hour ago',
      },
      {
        id: '8',
        title: 'Discussion: Future of Web Development in 2025',
        source: 'reddit',
        url: 'https://reddit.com/r/webdev',
        score: 234,
        time: '3 hours ago',
      },
    ],
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNews(mockNews[newsSource] || []);
      setLoading(false);
    }, 500);
  }, [newsSource]);

  return (
    <div className="view">
      <SectionHeader icon="📰" title="Dev News" subtitle="Real-time news from HN, Dev.to, Lobsters, Reddit" />

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {sources.map((source) => (
          <button
            key={source}
            onClick={() => setNewsSource(source)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: newsSource === source ? '1px solid #087CFA' : '1px solid rgba(255,255,255,0.1)',
              background: newsSource === source ? 'rgba(8, 124, 250, 0.15)' : 'transparent',
              color: newsSource === source ? '#087CFA' : '#999',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
          >
            {sourceEmojis[source]} {source}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>Loading news...</div>
      ) : news.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {news.map((item) => (
            <Card key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '600', color: '#E8EDF3' }}>
                      {item.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>
                      <span>{item.time}</span>
                      <span>👍 {item.score}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '20px', marginLeft: '12px' }}>{sourceEmojis[item.source]}</span>
                </div>
              </a>
            </Card>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>No news found for this source</div>
      )}
    </div>
  );
}
