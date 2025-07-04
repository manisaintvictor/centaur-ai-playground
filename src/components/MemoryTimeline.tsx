import React, { useState, useEffect } from 'react';
import { Clock, Brain, Zap, Database, Network, Archive, BookOpen, Layers } from 'lucide-react';

interface MemoryEvent {
  id: string;
  timestamp: number;
  memoryType: string;
  action: 'store' | 'retrieve' | 'process' | 'associate' | 'consolidate';
  content: string;
  details: string;
  icon: React.ReactNode;
  color: string;
}

interface MemoryTimelineProps {
  events: MemoryEvent[];
  currentTime: number;
}

const MemoryTimeline: React.FC<MemoryTimelineProps> = ({ events, currentTime }) => {
  const [visibleEvents, setVisibleEvents] = useState<MemoryEvent[]>([]);

  useEffect(() => {
    const filtered = events.filter(event => event.timestamp <= currentTime);
    setVisibleEvents(filtered);
  }, [events, currentTime]);

  const getActionColor = (action: string) => {
    switch (action) {
      case 'store': return 'bg-green-100 text-green-800 border-green-300';
      case 'retrieve': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'process': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'associate': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'consolidate': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="h-6 w-6 text-gray-700" />
        <h2 className="text-xl font-semibold text-gray-800">Memory Processing Timeline</h2>
        <div className="ml-auto text-sm text-gray-600">
          Time: {Math.floor(currentTime / 1000)}s
        </div>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {visibleEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No memory events yet. Submit a story to begin processing.</p>
          </div>
        ) : (
          visibleEvents.map((event, index) => (
            <div key={event.id} className="relative">
              {index < visibleEvents.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${event.color} bg-opacity-20 border-2 border-opacity-30`}>
                  {event.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{event.memoryType}</h4>
                    <span className={`px-2 py-1 rounded text-xs border ${getActionColor(event.action)}`}>
                      {event.action}
                    </span>
                    {event.crossStoryConnection && (
                      <span className="px-2 py-1 bg-cyan-100 text-cyan-800 border border-cyan-300 rounded text-xs">
                        Cross-Story
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      +{Math.floor((event.timestamp) / 1000)}s
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{event.content}</p>
                  <p className="text-xs text-gray-500">{event.details}</p>
                  {event.crossStoryConnection && (
                    <div className="mt-1 text-xs bg-cyan-50 rounded p-2 border border-cyan-200">
                      <span className="font-medium text-cyan-800">Pattern:</span> {event.crossStoryConnection.pattern} 
                      <span className="text-cyan-600 ml-2">
                        (seen {event.crossStoryConnection.previousOccurrences}x, strength: {(event.crossStoryConnection.strength * 100).toFixed(0)}%)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MemoryTimeline;