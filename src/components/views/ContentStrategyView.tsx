import { useState } from 'react';
import { useDataStore } from '../../stores/dataStore';
import SectionHeader from '../common/SectionHeader';
import PillarCard from '../common/PillarCard';
import Card from '../common/Card';

export default function ContentStrategyView() {
  const { contentPillars } = useDataStore();
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  return (
    <div className="view">
      <SectionHeader
        icon="📚"
        title="Content Strategy"
        subtitle="4 narrative pillars that guide all content creation"
      />

      <Card>
        <p style={{ margin: 0, fontSize: '12px', color: 'rgba(232,237,243,0.7)', lineHeight: '1.6' }}>
          Every piece of content maps to one of four strategic pillars. These aren't categories—they're narratives we own in the market. Each pillar has specific content ideas scheduled across the 30·60·90 phases.
        </p>
      </Card>

      {/* Content Pillars Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          marginTop: '24px',
          marginBottom: '32px',
        }}
      >
        {contentPillars.map((pillar: any) => {
          const allIdeas = Object.values(pillar.phaseIdeas).flat();
          return (
            <PillarCard
              key={pillar.id}
              name={pillar.name}
              description={pillar.description}
              ideas={allIdeas}
              metrics={pillar.successMetrics}
              expanded={expandedPillar === pillar.id}
              onToggleExpand={() =>
                setExpandedPillar(expandedPillar === pillar.id ? null : pillar.id)
              }
            />
          );
        })}
      </div>

      {/* Content Calendar by Phase */}
      <h3 style={{ margin: '24px 0 16px 0', fontSize: '14px', fontWeight: '600' }}>
        Content Calendar by Phase
      </h3>

      {['30-day', '60-day', '90-day'].map((phase: any) => {
        const phaseIdeas = contentPillars
          .flatMap((p: any) => (p.phaseIdeas[phase as '30-day' | '60-day' | '90-day'] || []).map((idea: any) => ({ ...idea, pillarName: p.name })))
          .sort((a: any, b: any) => a.week - b.week);

        if (phaseIdeas.length === 0) return null;

        return (
          <div key={phase} style={{ marginBottom: '24px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: '600', color: phase === '30-day' ? '#087CFA' : phase === '60-day' ? '#FC801D' : '#FC318C' }}>
              {phase.toUpperCase()} PHASE
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {phaseIdeas.map((idea: any) => {
                const weekNum = phase === '30-day' ? idea.week : phase === '60-day' ? 4 + idea.week : 8 + idea.week;
                return (
                  <Card key={idea.id}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '6px' }}>
                        <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '600', flex: 1 }}>
                          {idea.title}
                        </h5>
                        <span style={{ fontSize: '11px', background: 'rgba(132, 204, 250, 0.2)', color: '#087CFA', padding: '2px 6px', borderRadius: '4px', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                          Week {weekNum}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 6px 0', fontSize: '11px', color: 'rgba(232,237,243,0.6)' }}>
                        {idea.description}
                      </p>
                      <div style={{ fontSize: '10px', color: 'rgba(232,237,243,0.5)' }}>
                        Pillar: <strong>{idea.pillarName}</strong>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
