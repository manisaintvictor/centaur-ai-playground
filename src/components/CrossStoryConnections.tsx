import React, { useState } from 'react';
import { 
  Network, History, Brain, TrendingUp, Database, 
  Clock, RefreshCw, Download, Upload, Trash2,
  ArrowRight, Layers, Zap, Target
} from 'lucide-react';
import { PersistentMemoryStore } from '../services/persistentMemoryStore';

interface CrossStoryConnectionsProps {
  connections: Array<{
    pattern: string;
    type: string;
    strength: number;
    connections: number;
    recentActivity: boolean;
  }>;
  memoryState: any;
}

const CrossStoryConnections: React.FC<CrossStoryConnectionsProps> = ({ 
  connections, 
  memoryState 
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const persistentStore = PersistentMemoryStore.getInstance();
  const sessionHistory = persistentStore.getSessionHistory();
  const stats = persistentStore.getMemoryStatistics();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recurring_entity': return <Target className="h-4 w-4" />;
      case 'behavioral_sequence': return <Layers className="h-4 w-4" />;
      case 'semantic_cluster': return <Brain className="h-4 w-4" />;
      case 'temporal_pattern': return <Clock className="h-4 w-4" />;
      case 'emotional_theme': return <Zap className="h-4 w-4" />;
      default: return <Network className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recurring_entity': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'behavioral_sequence': return 'bg-green-100 text-green-800 border-green-300';
      case 'semantic_cluster': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'temporal_pattern': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'emotional_theme': return 'bg-pink-100 text-pink-800 border-pink-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 0.8) return 'text-red-600 font-bold';
    if (strength >= 0.6) return 'text-orange-600 font-semibold';
    if (strength >= 0.4) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const handleClearMemory = () => {
    if (window.confirm('Are you sure you want to clear all memory history? This cannot be undone.')) {
      persistentStore.clearAllMemory();
      window.location.reload();
    }
  };

  const handleExportMemory = () => {
    const data = persistentStore.exportMemoryData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `centaur-ai-memory-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportMemory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (persistentStore.importMemoryData(content)) {
          alert('Memory data imported successfully!');
          window.location.reload();
        } else {
          alert('Failed to import memory data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Network className="h-6 w-6 text-cyan-600" />
          <h2 className="text-xl font-semibold text-gray-800">Cross-Story Memory Network</h2>
          <div className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
            {sessionHistory.length} stories processed
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClearMemory}
            className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear All Memories</span>
          </button>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm"
          >
            <History className="h-4 w-4" />
            <span>History ({sessionHistory.length})</span>
          </button>
          <button
            onClick={() => setShowStatistics(!showStatistics)}
            className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors text-sm"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Stats</span>
          </button>
        </div>
      </div>

      {memoryState?.crossStoryLinks && memoryState.crossStoryLinks.length > 0 && (
        <div className="mb-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
          <h3 className="font-semibold text-cyan-800 mb-3">Current Story Links</h3>
          <div className="space-y-2">
            {memoryState.crossStoryLinks.slice(0, 3).map((link: any, index: number) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span className="font-medium text-gray-800">{link.currentItem}</span>
                <ArrowRight className="h-3 w-3 text-gray-400" />
                <span className="text-gray-600">{link.linkedPattern}</span>
                <span className={`text-xs px-2 py-1 rounded ${getTypeColor(link.connectionType)}`}>
                  {link.connectionType.replace('_', ' ')}
                </span>
                <span className={`text-xs ${getStrengthColor(link.strength)}`}>
                  {(link.strength * 100).toFixed(0)}%
                </span>
              </div>
            ))}
            {memoryState.crossStoryLinks.length > 3 && (
              <p className="text-xs text-gray-500 pl-5">
                +{memoryState.crossStoryLinks.length - 3} more connections
              </p>
            )}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Persistent Memory Patterns</h3>
        
        {connections.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Database className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No cross-story patterns yet. Process more stories to build connections!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connections.slice(0, 6).map((connection, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(connection.type)}
                    <span className="font-medium text-gray-800">{connection.pattern}</span>
                    {connection.recentActivity && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <span className={`text-sm ${getStrengthColor(connection.strength)}`}>
                    {(connection.strength * 100).toFixed(0)}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className={`px-2 py-1 rounded border ${getTypeColor(connection.type)}`}>
                    {connection.type.replace('_', ' ')}
                  </span>
                  <span>{connection.connections} story connections</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showStatistics && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4 border">
          <h3 className="font-semibold mb-3">Memory Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalSessions}</div>
              <div className="text-xs text-gray-600">Total Stories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.totalPatterns}</div>
              <div className="text-xs text-gray-600">Active Patterns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.strongestConnections.length > 0 ? 
                  (stats.strongestConnections[0].strength * 100).toFixed(0) + '%' : '0%'}
              </div>
              <div className="text-xs text-gray-600">Strongest Link</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {stats.memoryGrowth.reduce((sum, day) => sum + day.sessions, 0)}
              </div>
              <div className="text-xs text-gray-600">Total Sessions</div>
            </div>
          </div>
          
          {stats.strongestConnections.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Strongest Connections</h4>
              <div className="space-y-1">
                {stats.strongestConnections.slice(0, 3).map((conn, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-700">{conn.pattern}</span>
                    <span className={getStrengthColor(conn.strength)}>
                      {(conn.strength * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showHistory && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4 border">
          <h3 className="font-semibold mb-3">Session History</h3>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {sessionHistory.slice(0, 10).map((session, index) => (
              <div key={session.id} className="bg-white rounded p-3 border">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm text-gray-800">{session.storyTitle}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(session.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  {session.storyText.substring(0, 80)}...
                </p>
              </div>
            ))}
            {sessionHistory.length > 10 && (
              <p className="text-xs text-gray-500 text-center">
                +{sessionHistory.length - 10} more sessions
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Memory persists across sessions • {sessionHistory.length} stories processed
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportMemory}
              className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
            >
              <Download className="h-3 w-3" />
              <span>Export</span>
            </button>
            <label className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm cursor-pointer">
              <Upload className="h-3 w-3" />
              <span>Import</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportMemory}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossStoryConnections;