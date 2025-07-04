import React, { useState } from 'react';
import { Database, Clock, Layers, BookOpen, Zap, Network, Archive, Cpu, Brain, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';

interface MemoryState {
  shortTerm: string[];
  workingMemory: string[];
  longTerm: { [key: string]: string[] };
  episodic: Array<{ event: string; context: string; timestamp: number }>;
  semantic: { [key: string]: string[] };
  associative: Array<{ concept1: string; concept2: string; strength: number }>;
  procedural: string[];
  flash: string[];
}

interface MemoryStateViewerProps {
  memoryState: MemoryState;
}

const MemoryStateViewer: React.FC<MemoryStateViewerProps> = ({ memoryState }) => {
  const [expandedSection, setExpandedSection] = useState<string>('shortTerm');
  const [copiedSection, setCopiedSection] = useState<string>('');

  const memoryTypes = [
    {
      name: 'Short-Term',
      key: 'shortTerm',
      icon: <Clock className="h-4 w-4" />,
      color: 'border-blue-300 bg-blue-50',
      description: 'Active for 15-30 seconds'
    },
    {
      name: 'Working',
      key: 'workingMemory', 
      icon: <Cpu className="h-4 w-4" />,
      color: 'border-green-300 bg-green-50',
      description: 'Current processing'
    },
    {
      name: 'Flash',
      key: 'flash',
      icon: <Zap className="h-4 w-4" />,
      color: 'border-yellow-300 bg-yellow-50',
      description: 'Rapid access cache'
    },
    {
      name: 'Procedural',
      key: 'procedural',
      icon: <Layers className="h-4 w-4" />,
      color: 'border-red-300 bg-red-50',
      description: 'Learned skills & processes'
    }
  ];

  const handleSectionToggle = (sectionKey: string) => {
    setExpandedSection(expandedSection === sectionKey ? '' : sectionKey);
  };

  const handleCopyData = async (sectionKey: string, data: any) => {
    try {
      const formattedData = JSON.stringify(data, null, 2);
      await navigator.clipboard.writeText(formattedData);
      setCopiedSection(sectionKey);
      setTimeout(() => setCopiedSection(''), 2000);
    } catch (error) {
      console.error('Failed to copy data:', error);
    }
  };

  const renderSimpleMemory = (items: string[], maxItems = 3) => {
    const displayItems = items.slice(-maxItems);
    return (
      <div className="space-y-1">
        {displayItems.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Empty</p>
        ) : (
          displayItems.map((item, index) => (
            <div key={index} className="text-xs bg-white bg-opacity-70 rounded px-2 py-1">
              {item}
            </div>
          ))
        )}
        {items.length > maxItems && (
          <p className="text-xs text-gray-500">+{items.length - maxItems} more</p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="h-6 w-6 text-gray-700" />
        <h2 className="text-xl font-semibold text-gray-800">Memory State</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {memoryTypes.map((type) => (
          <div key={type.key} className={`rounded-lg border-2 ${type.color} transition-all duration-200`}>
            <button
              onClick={() => handleSectionToggle(type.key)}
              className="w-full p-4 text-left hover:bg-black hover:bg-opacity-5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {type.icon}
                  <h3 className="font-semibold text-sm">{type.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyData(type.key, memoryState[type.key as keyof MemoryState]);
                    }}
                    className="p-1 hover:bg-black hover:bg-opacity-10 rounded"
                  >
                    {copiedSection === type.key ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                  {expandedSection === type.key ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-1">{type.description}</p>
            </button>
            {expandedSection === type.key && (
              <div className="px-4 pb-4 border-t border-black border-opacity-10 mt-2 pt-2">
                {renderSimpleMemory(memoryState[type.key as keyof MemoryState] as string[])}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {/* Semantic Knowledge */}
        <div className="rounded-lg border-2 border-indigo-300 bg-indigo-50 transition-all duration-200">
          <button
            onClick={() => handleSectionToggle('semantic')}
            className="w-full p-4 text-left hover:bg-black hover:bg-opacity-5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <h3 className="font-semibold text-sm">Semantic Knowledge</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyData('semantic', memoryState.semantic);
                  }}
                  className="p-1 hover:bg-black hover:bg-opacity-10 rounded"
                >
                  {copiedSection === 'semantic' ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
                {expandedSection === 'semantic' ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </div>
          </button>
          {expandedSection === 'semantic' && (
            <div className="px-4 pb-4 border-t border-black border-opacity-10 pt-2">
              <div className="space-y-1">
                {Object.keys(memoryState.semantic).length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No knowledge stored</p>
                ) : (
                  Object.entries(memoryState.semantic).map(([category, items]) => (
                    <div key={category} className="text-xs bg-white bg-opacity-70 rounded px-2 py-1">
                      <span className="font-medium">{category}:</span> {items.join(', ')}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Episodic Memories */}
        <div className="rounded-lg border-2 border-orange-300 bg-orange-50 transition-all duration-200">
          <button
            onClick={() => handleSectionToggle('episodic')}
            className="w-full p-4 text-left hover:bg-black hover:bg-opacity-5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Archive className="h-4 w-4" />
                <h3 className="font-semibold text-sm">Episodic Memories</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyData('episodic', memoryState.episodic);
                  }}
                  className="p-1 hover:bg-black hover:bg-opacity-10 rounded"
                >
                  {copiedSection === 'episodic' ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
                {expandedSection === 'episodic' ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </div>
          </button>
          {expandedSection === 'episodic' && (
            <div className="px-4 pb-4 border-t border-black border-opacity-10 pt-2">
              <div className="space-y-1">
                {memoryState.episodic.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No episodes stored</p>
                ) : (
                  memoryState.episodic.slice(-3).map((episode, index) => (
                    <div key={index} className="text-xs bg-white bg-opacity-70 rounded px-2 py-1">
                      <div className="font-medium">{episode.event}</div>
                      <div className="text-gray-600">{episode.context}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Associations */}
        <div className="rounded-lg border-2 border-teal-300 bg-teal-50 transition-all duration-200">
          <button
            onClick={() => handleSectionToggle('associative')}
            className="w-full p-4 text-left hover:bg-black hover:bg-opacity-5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Network className="h-4 w-4" />
                <h3 className="font-semibold text-sm">Associations</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyData('associative', memoryState.associative);
                  }}
                  className="p-1 hover:bg-black hover:bg-opacity-10 rounded"
                >
                  {copiedSection === 'associative' ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
                {expandedSection === 'associative' ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </div>
          </button>
          {expandedSection === 'associative' && (
            <div className="px-4 pb-4 border-t border-black border-opacity-10 pt-2">
              <div className="space-y-1">
                {memoryState.associative.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No associations formed</p>
                ) : (
                  memoryState.associative.slice(-3).map((assoc, index) => (
                    <div key={index} className="text-xs bg-white bg-opacity-70 rounded px-2 py-1">
                      <span className="font-medium">{assoc.concept1}</span> ↔ <span className="font-medium">{assoc.concept2}</span>
                      <span className="text-gray-600"> (strength: {assoc.strength.toFixed(1)})</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryStateViewer;