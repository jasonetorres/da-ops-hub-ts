import { useState } from 'react';
import { useDataStore } from '../../stores/dataStore';
import SectionHeader from '../common/SectionHeader';
import Card from '../common/Card';

export default function ToolsAndResourcesView() {
  const { resources, addResource, deleteResource } = useDataStore();
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleAddResource = () => {
    if (newTitle.trim() && newUrl.trim()) {
      const resource = {
        id: `res-${Date.now()}`,
        title: newTitle,
        url: newUrl,
        dateAdded: new Date().toISOString().split('T')[0],
      };
      addResource(resource);
      setNewTitle('');
      setNewUrl('');
      setShowForm(false);
    }
  };

  return (
    <div className="view">
      <SectionHeader
        icon="🔗"
        title="Tools & Resources"
        subtitle="Quick access to important links and resources"
      />

      {/* Add Resource Form */}
      <div style={{ marginBottom: '16px' }}>
        <Card>
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              style={{
                width: '100%',
                padding: '12px',
                background: '#087CFA',
                color: '#0D1117',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '13px',
              }}
            >
              + Add Resource
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="text"
                placeholder="Resource title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  color: '#E8EDF3',
                  fontSize: '13px',
                }}
              />
              <input
                type="text"
                placeholder="Resource URL"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                style={{
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  color: '#E8EDF3',
                  fontSize: '13px',
                }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleAddResource}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: '#21D789',
                    color: '#0D1117',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '12px',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#E8EDF3',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '12px',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Resources List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {resources.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', color: '#999' }}>
              <p style={{ fontSize: '13px', margin: 0 }}>No resources yet. Add one to get started!</p>
            </div>
          </Card>
        ) : (
          resources.map((resource: any) => (
            <Card key={resource.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      margin: '0 0 6px 0',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#E8EDF3',
                    }}
                  >
                    {resource.title}
                  </h3>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '12px',
                      color: '#087CFA',
                      textDecoration: 'none',
                      wordBreak: 'break-all',
                    }}
                    className="hover:underline"
                  >
                    {resource.url}
                  </a>
                  {resource.dateAdded && (
                    <p
                      style={{
                        fontSize: '11px',
                        color: '#666',
                        margin: '6px 0 0 0',
                      }}
                    >
                      Added: {resource.dateAdded}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => deleteResource(resource.id)}
                  style={{
                    marginLeft: '12px',
                    padding: '4px 8px',
                    background: 'rgba(252, 49, 140, 0.2)',
                    color: '#FC318C',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Delete
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
