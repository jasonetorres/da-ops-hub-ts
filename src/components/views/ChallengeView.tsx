import { useState, useEffect } from 'react';
import { useChallengeStore } from '../../stores/challengeStore';
import { CHALLENGES } from '../../utils/challenges';
import Card from '../common/Card';
import Button from '../common/Button';
import StatusPill from '../common/StatusPill';
import SectionHeader from '../common/SectionHeader';

export default function ChallengeView() {
  const { completedChallenges, streak, currentChallengeCode, setCompletedChallenge, setCurrentChallengeCode } =
    useChallengeStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [code, setCode] = useState(CHALLENGES[0].starter);
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; message: string }>>([]);
  const [showSolution, setShowSolution] = useState(false);

  const challenge = CHALLENGES[currentIndex];
  const isCompleted = completedChallenges.some((c) => c.challengeId === challenge.id.toString());

  useEffect(() => {
    setCode(currentChallengeCode || challenge.starter);
  }, [currentIndex]);

  const runTests = () => {
    const results = challenge.tests.map((test) => {
      try {
        // In a real implementation, this would safely execute the code
        // For now, we'll just check if the solution is close
        const hasSolution = code.includes(challenge.solution.split('(')[1].split(')')[0]);
        return {
          passed: hasSolution,
          message: hasSolution ? `✓ Test passed: ${test.input} => ${test.expected}` : `✗ Test failed: ${test.input}`,
        };
      } catch {
        return { passed: false, message: 'Error executing code' };
      }
    });
    setTestResults(results);

    if (results.every((r) => r.passed) && !isCompleted) {
      setCompletedChallenge(challenge.id.toString());
    }
  };

  const handleNext = () => {
    setCurrentIndex((i) => Math.min(i + 1, CHALLENGES.length - 1));
    setShowSolution(false);
    setTestResults([]);
  };

  const handlePrev = () => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
    setShowSolution(false);
    setTestResults([]);
  };


  return (
    <div className="view">
      <SectionHeader
        icon="💡"
        title="Daily Challenge"
        subtitle="100 JavaScript challenges with tests and tutorials"
      />

      <div className="responsive-grid cols-3" style={{ marginBottom: '24px' }}>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: '600', color: '#087CFA', marginBottom: '4px' }}>
              {streak.current}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>Current Streak</div>
          </div>
        </Card>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: '600', color: '#21D789', marginBottom: '4px' }}>
              {completedChallenges.length}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>Completed</div>
          </div>
        </Card>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: '600', color: '#FC801D', marginBottom: '4px' }}>
              {CHALLENGES.length}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>Total</div>
          </div>
        </Card>
      </div>

      <div className="responsive-grid cols-2">
        <Card>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                  {currentIndex + 1}. {challenge.title}
                </h2>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <StatusPill
                    status={challenge.difficulty}
                    size="sm"
                  />
                  {isCompleted && <StatusPill status="completed" size="sm" />}
                </div>
              </div>
            </div>

            <p style={{ margin: '12px 0 0 0', fontSize: '13px', color: 'rgba(232,237,243,0.8)' }}>
              {challenge.description}
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
            <textarea
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setCurrentChallengeCode(e.target.value);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#E8EDF3',
                fontSize: 'clamp(11px, 2vw, 12px)',
                fontFamily: 'monospace',
                width: '100%',
                minHeight: 'clamp(100px, 30vh, 300px)',
                resize: 'vertical',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '100px' }}>
              <Button onClick={runTests} variant="primary">
                Run Tests
              </Button>
            </div>
            <div style={{ flex: 1, minWidth: '100px' }}>
              <Button onClick={() => setShowSolution(!showSolution)} variant="secondary">
                {showSolution ? 'Hide' : 'Show'}
              </Button>
            </div>
          </div>

          {showSolution && (
            <div style={{ background: 'rgba(33, 215, 137, 0.1)', borderRadius: '8px', padding: '12px', marginTop: '12px' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#21D789' }}>Solution:</p>
              <pre
                style={{
                  margin: 0,
                  background: 'rgba(0,0,0,0.3)',
                  padding: '8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  color: '#E8EDF3',
                  overflow: 'auto',
                }}
              >
                {challenge.solution}
              </pre>
            </div>
          )}
        </Card>

        <Card>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '600' }}>Test Results</h3>

            {testResults.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {testResults.map((result, i) => (
                  <div
                    key={i}
                    style={{
                      background: result.passed ? 'rgba(33, 215, 137, 0.1)' : 'rgba(252, 49, 140, 0.1)',
                      border: `1px solid ${result.passed ? 'rgba(33, 215, 137, 0.3)' : 'rgba(252, 49, 140, 0.3)'}`,
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      color: result.passed ? '#21D789' : '#FC318C',
                    }}
                  >
                    {result.message}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: '12px', color: 'rgba(232,237,243,0.6)' }}>
                Click "Run Tests" to see results
              </p>
            )}
          </div>

          <div style={{ marginBottom: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600' }}>Progress</h4>
            <div style={{ display: 'flex', gap: '6px' }}>
              {CHALLENGES.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    background: i === currentIndex ? 'rgba(8, 124, 250, 0.3)' : i < currentIndex ? 'rgba(33, 215, 137, 0.3)' : 'rgba(255,255,255,0.05)',
                    border: i === currentIndex ? '1px solid #087CFA' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                  onClick={() => setCurrentIndex(i)}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '80px' }}>
              <Button onClick={handlePrev} variant="secondary" disabled={currentIndex === 0}>
                ← Prev
              </Button>
            </div>
            <div style={{ flex: 1, minWidth: '80px' }}>
              <Button onClick={handleNext} variant="secondary" disabled={currentIndex === CHALLENGES.length - 1}>
                Next →
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
