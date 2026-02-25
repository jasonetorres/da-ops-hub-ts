import { useState } from 'react';
import { useDataStore } from '../../stores/dataStore';
import SectionHeader from '../common/SectionHeader';
import Card from '../common/Card';

export default function DocumentsView() {
  const { documents } = useDataStore();
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);

  const typeEmoji: Record<string, string> = {
    'Plan': '📋',
    'Background': '📖',
    'Narrative': '📝',
    'Framework': '🎯',
  };

  return (
    <div className="view">
      <SectionHeader
        icon="📄"
        title="Strategic Documents"
        subtitle="Store and reference strategic plans, frameworks, and narratives"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {documents.map((doc: any) => {
          const isExpanded = expandedDoc === doc.id;

          return (
            <Card
              key={doc.id}
              onClick={() => setExpandedDoc(isExpanded ? null : doc.id)}
              className="cursor-pointer hover:bg-opacity-70 transition-all"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600', flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>{typeEmoji[doc.type] || '📄'}</span>
                    {doc.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '12px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        background: 'rgba(132, 204, 250, 0.2)',
                        color: '#087CFA',
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      {doc.type}
                    </span>
                    {doc.phase && doc.phase !== 'Overview' && (
                      <span
                        style={{
                          fontSize: '11px',
                          background: 'rgba(255,255,255,0.1)',
                          color: '#999',
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {doc.phase}
                      </span>
                    )}
                  </div>
                </div>

                {doc.tags && doc.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {doc.tags.slice(0, 3).map((tag: any) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '10px',
                          background: 'rgba(255,255,255,0.05)',
                          color: 'rgba(232,237,243,0.5)',
                          padding: '2px 6px',
                          borderRadius: '3px',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                    {doc.tags.length > 3 && (
                      <span style={{ fontSize: '10px', color: 'rgba(232,237,243,0.3)' }}>
                        +{doc.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                <div style={{ fontSize: '11px', color: 'rgba(232,237,243,0.4)' }}>
                  Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                </div>

                {isExpanded && (
                  <div
                    style={{
                      marginTop: '12px',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      fontSize: '12px',
                      color: 'rgba(232,237,243,0.7)',
                      lineHeight: '1.6',
                      maxHeight: '400px',
                      overflow: 'auto',
                    }}
                  >
                    {/* Simple markdown rendering */}
                    {doc.content.split('\n').map((line: any, idx: any) => {
                      if (line.startsWith('# ')) {
                        return (
                          <h2 key={idx} style={{ margin: '12px 0 8px 0', fontSize: '14px', fontWeight: '700' }}>
                            {line.substring(2)}
                          </h2>
                        );
                      }
                      if (line.startsWith('## ')) {
                        return (
                          <h3 key={idx} style={{ margin: '10px 0 6px 0', fontSize: '12px', fontWeight: '700' }}>
                            {line.substring(3)}
                          </h3>
                        );
                      }
                      if (line.startsWith('- ')) {
                        return (
                          <div key={idx} style={{ marginLeft: '12px', marginBottom: '4px' }}>
                            • {line.substring(2)}
                          </div>
                        );
                      }
                      if (line.trim() === '') {
                        return <div key={idx} style={{ height: '8px' }} />;
                      }
                      return (
                        <p key={idx} style={{ margin: '0 0 6px 0' }}>
                          {line}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
