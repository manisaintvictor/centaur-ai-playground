import React, { useState } from 'react';
import { 
  Brain, Search, Zap, Clock, Database, BookOpen, 
  Network, Archive, Layers, Target, RefreshCw, 
  ArrowRight, CheckCircle, XCircle, Copy, Play
} from 'lucide-react';

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

interface TestResult {
  test: string;
  query: string;
  result: any;
  success: boolean;
  explanation: string;
  memoryType: string;
}

interface MemoryTestingLabProps {
  memoryState: MemoryState;
  storyProcessed: boolean;
}

const MemoryTestingLab: React.FC<MemoryTestingLabProps> = ({ memoryState, storyProcessed }) => {
  const [selectedTest, setSelectedTest] = useState<string>('');
  const [testQuery, setTestQuery] = useState<string>('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTest, setIsRunningTest] = useState(false);

  const memoryTests = [
    {
      id: 'shortterm-capacity',
      name: 'Short-Term Capacity',
      description: 'Test the 7±2 item limit',
      icon: <Clock className="h-6 w-6" />,
      color: 'bg-blue-50 border-blue-300 hover:bg-blue-100',
      quickTest: 'Show me what\'s in short-term memory right now'
    },
    {
      id: 'working-manipulation',
      name: 'Working Memory',
      description: 'Test active processing',
      icon: <Target className="h-6 w-6" />,
      color: 'bg-green-50 border-green-300 hover:bg-green-100',
      quickTest: 'Show me what\'s being actively processed'
    },
    {
      id: 'semantic-retrieval',
      name: 'Semantic Knowledge',
      description: 'Test factual knowledge',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-indigo-50 border-indigo-300 hover:bg-indigo-100',
      quickTest: 'Ask me anything about coffee culture'
    },
    {
      id: 'episodic-context',
      name: 'Episodic Memory',
      description: 'Test experience recall',
      icon: <Archive className="h-6 w-6" />,
      color: 'bg-orange-50 border-orange-300 hover:bg-orange-100',
      quickTest: 'Tell me about the coffee shop visit'
    },
    {
      id: 'associative-links',
      name: 'Associative Network',
      description: 'Test concept connections',
      icon: <Network className="h-6 w-6" />,
      color: 'bg-teal-50 border-teal-300 hover:bg-teal-100',
      quickTest: 'Show me all connections to "coffee"'
    },
    {
      id: 'procedural-execution',
      name: 'Procedural Knowledge',
      description: 'Test learned behaviors',
      icon: <Layers className="h-6 w-6" />,
      color: 'bg-red-50 border-red-300 hover:bg-red-100',
      quickTest: 'Walk me through the coffee shop routine'
    },
    {
      id: 'flash-access',
      name: 'Flash Memory',
      description: 'Test rapid access cache',
      icon: <Zap className="h-6 w-6" />,
      color: 'bg-yellow-50 border-yellow-300 hover:bg-yellow-100',
      quickTest: 'Show me the rapid access cache'
    },
    {
      id: 'memory-interaction',
      name: 'Cross-Memory Integration',
      description: 'Test system cooperation',
      icon: <Brain className="h-6 w-6" />,
      color: 'bg-purple-50 border-purple-300 hover:bg-purple-100',
      quickTest: 'Show memory systems working together'
    }
  ];

  const runMemoryTest = async (testId: string, query: string) => {
    setIsRunningTest(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let result: TestResult;

    switch (testId) {
      case 'shortterm-capacity':
        result = testShortTermMemory(query);
        break;
      case 'working-manipulation':
        result = testWorkingMemory(query);
        break;
      case 'semantic-retrieval':
        result = testSemanticMemory(query);
        break;
      case 'episodic-context':
        result = testEpisodicMemory(query);
        break;
      case 'associative-links':
        result = testAssociativeMemory(query);
        break;
      case 'procedural-execution':
        result = testProceduralMemory(query);
        break;
      case 'flash-access':
        result = testFlashMemory(query);
        break;
      case 'memory-interaction':
        result = testMemoryInteraction(query);
        break;
      default:
        result = {
          test: testId,
          query,
          result: 'Unknown test type',
          success: false,
          explanation: 'Test not implemented',
          memoryType: 'unknown'
        };
    }

    setTestResults(prev => [result, ...prev]);
    setIsRunningTest(false);
  };

  const copyTestCode = async (result: TestResult) => {
    const testCode = `// Centaur AI Memory Test
// Test: ${result.test}
// Query: ${result.query}
// Memory Type: ${result.memoryType}

const memoryTest = {
  test: "${result.test}",
  query: "${result.query}",
  memoryType: "${result.memoryType}",
  result: ${JSON.stringify(result.result, null, 2)},
  success: ${result.success},
  explanation: "${result.explanation}"
};

// To run this test:
// 1. Submit a story to the Centaur AI playground
// 2. Use the memory testing lab
// 3. Execute the query: "${result.query}"

console.log('Memory Test Result:', memoryTest);`;

    try {
      await navigator.clipboard.writeText(testCode);
      alert('Test code copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy test code:', error);
    }
  };

  const testShortTermMemory = (query: string): TestResult => {
    const items = memoryState.shortTerm;
    
    if (query.includes('capacity') || query.includes('hold')) {
      return {
        test: 'Short-Term Capacity',
        query,
        result: `Current: ${items.length} items | Theoretical limit: 7±2 items`,
        success: items.length <= 9,
        explanation: `Short-term memory can typically hold 7±2 items. Current load: ${items.length} items. ${items.length <= 9 ? 'Within normal capacity.' : 'Approaching overload - items will be dropped or moved to working memory.'}`,
        memoryType: 'Short-Term'
      };
    }
    
    return {
      test: 'Short-Term Contents',
      query,
      result: items.length > 0 ? items : ['Memory buffer empty - items decay after 15-30 seconds'],
      success: true,
      explanation: `Short-term memory contains ${items.length} active items. These represent the most recent sensory inputs that haven't yet been processed or moved to other memory systems.`,
      memoryType: 'Short-Term'
    };
  };

  const testWorkingMemory = (query: string): TestResult => {
    const items = memoryState.workingMemory;
    
    return {
      test: 'Working Memory Processing',
      query,
      result: items,
      success: items.length > 0,
      explanation: `Working memory is actively processing ${items.length} entities. These items are being manipulated, analyzed, and prepared for storage in long-term memory systems.`,
      memoryType: 'Working'
    };
  };

  const testSemanticMemory = (query: string): TestResult => {
    const categories = Object.keys(memoryState.semantic);
    const allConcepts = Object.values(memoryState.semantic).flat();
    
    if (query.includes('coffee')) {
      const coffeeRelated = allConcepts.filter(concept => 
        concept.toLowerCase().includes('coffee') || concept.toLowerCase().includes('routine')
      );
      
      return {
        test: 'Semantic Knowledge - Coffee',
        query,
        result: coffeeRelated,
        success: coffeeRelated.length > 0,
        explanation: `Found ${coffeeRelated.length} coffee-related concepts. Semantic memory organizes factual knowledge about coffee culture, preparation methods, and social rituals.`,
        memoryType: 'Semantic'
      };
    }

    return {
      test: 'Semantic Memory',
      query,
      result: `${allConcepts.length} concepts across ${categories.length} categories`,
      success: true,
      explanation: 'Semantic memory stores factual knowledge and concepts.',
      memoryType: 'Semantic'
    };
  };

  const testEpisodicMemory = (query: string): TestResult => {
    const episodes = memoryState.episodic;
    
    const coffeeEpisode = episodes.find(ep => 
      ep.event.toLowerCase().includes('coffee')
    );
    
    return {
      test: 'Episodic Reconstruction',
      query,
      result: coffeeEpisode || episodes.slice(-2) || 'No episodes found',
      success: episodes.length > 0,
      explanation: `Episodic memory reconstructs personal experiences with rich contextual details including time, place, emotions, and sensory information.`,
      memoryType: 'Episodic'
    };
  };

  const testAssociativeMemory = (query: string): TestResult => {
    const associations = memoryState.associative;
    
    if (query.includes('coffee')) {
      const coffeeAssocs = associations.filter(assoc => 
        assoc.concept1.toLowerCase().includes('coffee') || 
        assoc.concept2.toLowerCase().includes('coffee')
      );
      
      return {
        test: 'Coffee Associations',
        query,
        result: coffeeAssocs.map(a => `${a.concept1} ↔ ${a.concept2} (${a.strength.toFixed(2)})`),
        success: coffeeAssocs.length > 0,
        explanation: `Found ${coffeeAssocs.length} associations involving coffee. Strength values indicate how likely one concept will trigger recall of another.`,
        memoryType: 'Associative'
      };
    }

    return {
      test: 'Associative Memory',
      query,
      result: `${associations.length} concept associations formed`,
      success: associations.length > 0,
      explanation: 'Associative memory creates links between related concepts.',
      memoryType: 'Associative'
    };
  };

  const testProceduralMemory = (query: string): TestResult => {
    const procedures = memoryState.procedural;
    
    const coffeeRoutine = procedures.find(proc => 
      proc.toLowerCase().includes('coffee')
    );
    
    return {
      test: 'Coffee Shop Routine',
      query,
      result: coffeeRoutine ? 
        `Procedure: ${coffeeRoutine} | Steps: Enter → Order → Wait → Sit → Work` : 
        procedures,
      success: procedures.length > 0,
      explanation: `Procedural memory encodes behavioral sequences that can be executed automatically without conscious effort.`,
      memoryType: 'Procedural'
    };
  };

  const testFlashMemory = (query: string): TestResult => {
    const flashItems = memoryState.flash;
    
    return {
      test: 'Flash Memory Cache',
      query,
      result: flashItems,
      success: flashItems.length > 0,
      explanation: `Flash memory provides rapid access to ${flashItems.length} recently used items. This cache enables quick retrieval without full memory search.`,
      memoryType: 'Flash'
    };
  };

  const testMemoryInteraction = (query: string): TestResult => {
    const interactions = [];
    
    // Check semantic-episodic interaction
    const semanticConcepts = Object.values(memoryState.semantic).flat();
    const episodicEvents = memoryState.episodic.map(ep => ep.event);
    const overlap = semanticConcepts.filter(concept => 
      episodicEvents.some(event => 
        event.toLowerCase().includes(concept.toLowerCase())
      )
    );
    
    if (overlap.length > 0) {
      interactions.push(`Semantic-Episodic overlap: ${overlap.length} shared concepts`);
    }

    const workingFlashOverlap = memoryState.workingMemory.filter(item =>
      memoryState.flash.includes(item)
    );
    
    if (workingFlashOverlap.length > 0) {
      interactions.push(`Working-Flash interaction: ${workingFlashOverlap.length} items in both systems`);
    }

    return {
      test: 'Memory System Integration',
      query,
      result: interactions,
      success: interactions.length > 0,
      explanation: `Found ${interactions.length} active interactions between memory systems. This integration enables complex cognitive behaviors like reasoning, planning, and learning.`,
      memoryType: 'Integration'
    };
  };

  if (!storyProcessed) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Brain className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-800">🧠 Interactive Memory Testing Lab</h2>
        </div>
        
        <div className="mb-6">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-300 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-purple-800 mb-2">Ready to Test Memory Systems! 🚀</h3>
            <p className="text-purple-700 mb-4">
              Submit a story above to unlock the interactive memory testing buttons below. 
              Each button will test a different aspect of how AI processes and stores information.
            </p>
            <div className="bg-white bg-opacity-50 rounded p-3">
              <p className="text-sm text-purple-600 font-medium">
                💡 Tip: Click "Generate & Test" in the story input above for instant results!
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {memoryTests.map((test) => (
              <div 
                key={test.id}
                className={`p-6 rounded-lg border-2 transition-all duration-200 opacity-60 ${test.color}`}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-white bg-opacity-50">
                    {test.icon}
                  </div>
                  <h3 className="font-semibold text-sm">{test.name}</h3>
                  <p className="text-xs text-gray-600">{test.description}</p>
                  <div className="mt-2 px-3 py-1 bg-gray-200 text-gray-500 rounded text-xs font-medium">
                    Submit Story First
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">🧠 Interactive Memory Testing Lab</h2>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          Ready to Test!
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-center">🎯 Click Any Memory Type to Test It!</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {memoryTests.map((test) => (
            <button
              key={test.id}
              onClick={() => runMemoryTest(test.id, test.quickTest)}
              disabled={isRunningTest}
              className={`p-6 rounded-lg border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform ${test.color}`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 rounded-full bg-white shadow-sm">
                  {test.icon}
                </div>
                <h3 className="font-semibold text-sm">{test.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{test.description}</p>
                <div className="flex items-center space-x-1 text-xs font-medium text-purple-600">
                  <Play className="h-3 w-3" />
                  <span>Quick Test</span>
                </div>
                <div className="text-xs text-gray-500 italic">
                  "{test.quickTest.substring(0, 25)}..."
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Query Section */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-3">🔍 Custom Memory Query</h3>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ask anything about the memory systems... (e.g., 'Show me semantic knowledge about work')"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
            disabled={isRunningTest}
          />
          <button
            onClick={() => runMemoryTest('memory-interaction', testQuery)}
            disabled={!testQuery.trim() || isRunningTest}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isRunningTest ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Test'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center space-x-2">
          <Search className="h-5 w-5" />
          <span>Test Results</span>
          {testResults.length > 0 && (
            <span className="text-sm text-gray-500">({testResults.length} tests completed)</span>
          )}
        </h3>
        
        {testResults.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Target className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>Click any memory type button above to start testing! 🧠</p>
            <p className="text-sm mt-2">Each test will show you how the AI processes different types of information.</p>
          </div>
        ) : (
          testResults.map((result, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {result.success ? 
                    <CheckCircle className="h-5 w-5 text-green-500" /> : 
                    <XCircle className="h-5 w-5 text-red-500" />
                  }
                  <span className="font-semibold">{result.test}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {result.memoryType}
                  </span>
                  <button
                    onClick={() => copyTestCode(result)}
                    className="flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors"
                  >
                    <Copy className="h-3 w-3" />
                    <span>Copy Code</span>
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2"><strong>Query:</strong> {result.query}</p>
              
              <div className="bg-white rounded p-3 mb-2">
                <p className="text-sm font-medium text-gray-800 mb-1">Result:</p>
                {Array.isArray(result.result) ? (
                  <ul className="text-sm text-gray-700 space-y-1">
                    {result.result.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-gray-400">•</span>
                        <span>{typeof item === 'object' ? JSON.stringify(item) : item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-700">{
                    typeof result.result === 'object' ? 
                    JSON.stringify(result.result, null, 2) : 
                    result.result
                  }</p>
                )}
              </div>
              
              <p className="text-xs text-gray-600"><strong>Explanation:</strong> {result.explanation}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MemoryTestingLab;