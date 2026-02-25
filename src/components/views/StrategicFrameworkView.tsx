import { useState } from 'react';
import { useDataStore } from '../../stores/dataStore';
import SectionHeader from '../common/SectionHeader';
import PillarCard from '../common/PillarCard';
import Card from '../common/Card';

export default function StrategicFrameworkView() {
  const { strategicPillars, okrs } = useDataStore();
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  const pillars = strategicPillars.sort((a: any, b: any) => b.weight - a.weight);

  return (
    <div className="view">
      <SectionHeader
        icon="🎯"
        title="Strategic Framework"
        subtitle="3 core pillars guiding all advocacy decisions"
      />

      {/* Introduction */}
      <Card>
        <div style={{ fontSize: '13px', color: 'rgba(232,237,243,0.7)', lineHeight: '1.6' }}>
          <p style={{ margin: '0 0 12px 0' }}>
            <strong>How we show up:</strong> Everything I do as a Developer Advocate flows through three core beliefs. They guide content decisions, community engagement, and product partnerships.
          </p>
          <p style={{ margin: 0 }}>
            These aren't nice-to-haves. They're the foundation for building trust with the most marketing-resistant audience on earth: developers.
          </p>
        </div>
      </Card>

      {/* Strategic Pillars Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          marginTop: '24px',
          marginBottom: '32px',
        }}
      >
        {pillars.map((pillar: any) => {
          const relatedOKRCount = okrs.filter((o: any) => o.linkedPillars.includes(pillar.id)).length;
          return (
            <div key={pillar.id}>
              <PillarCard
                name={pillar.name}
                description={pillar.description}
                tenets={pillar.keyTenets}
                color={pillar.color}
                weight={pillar.weight}
                expanded={expandedPillar === pillar.id}
                onToggleExpand={() =>
                  setExpandedPillar(expandedPillar === pillar.id ? null : pillar.id)
                }
              />
              {relatedOKRCount > 0 && (
                <div
                  style={{
                    fontSize: '12px',
                    color: 'rgba(132, 204, 250, 0.7)',
                    marginTop: '8px',
                    textAlign: 'center',
                  }}
                >
                  Linked to {relatedOKRCount} OKR{relatedOKRCount !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* How It Works */}
      <Card>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
          How These Pillars Work
        </h3>
        <div style={{ fontSize: '12px', color: 'rgba(232,237,243,0.7)', lineHeight: '1.6' }}>
          <p style={{ margin: '0 0 12px 0' }}>
            <strong>Authenticity Over Polish:</strong> Show up as a developer first. Use WebStorm daily. Share real findings, not marketing messages. Developers respect candor.
          </p>
          <p style={{ margin: '0 0 12px 0' }}>
            <strong>Data-Informed Advocacy:</strong> Every decision backed by evidence from real conversations. 47 Reddit comments + 12 YouTrack upvotes {">"} 1 intuition. Community signals inform content, product feedback, and strategy.
          </p>
          <p style={{ margin: 0 }}>
            <strong>Bridge Builder (Both Directions):</strong> Translate product to developers. Translate developers to product. Make the feedback loop work at scale through the Champion Program and structured reporting.
          </p>
        </div>
      </Card>

      {/* Phase Attribution */}
      <div style={{ marginTop: '24px', fontSize: '12px', color: 'rgba(232,237,243,0.5)' }}>
        <p style={{ margin: '0' }}>
          These pillars are established in the <strong>30-day Listen & Learn phase</strong> and remain constant throughout 60, 90, and beyond.
        </p>
      </div>
    </div>
  );
}
