import React, { useState } from 'react';
import Header from './components/Header';
import StoryInput from './components/StoryInput';
import MemoryTimeline from './components/MemoryTimeline';
import MemoryStateViewer from './components/MemoryStateViewer';
import MemoryTestingLab from './components/MemoryTestingLab';
import CrossStoryConnections from './components/CrossStoryConnections';
import AttributionSection from './components/AttributionSection';
import ImplementationDatabase from './components/ImplementationDatabase';
import { EnhancedMemoryProcessor, MemoryEvent, MemoryState } from './services/enhancedMemoryProcessor';
import { Play, RefreshCw, Clock } from 'lucide-react';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [memoryEvents, setMemoryEvents] = useState<MemoryEvent[]>([]);
  const [memoryState, setMemoryState] = useState<MemoryState>({
    shortTerm: [],
    workingMemory: [],
    longTerm: {},
    episodic: [],
    semantic: {},
    associative: [],
    procedural: [],
    flash: []
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [timelineRunning, setTimelineRunning] = useState(false);
  const [storyProcessed, setStoryProcessed] = useState(false);
  const [crossStoryConnections, setCrossStoryConnections] = useState<any[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const memoryProcessor = new EnhancedMemoryProcessor();

  const handleSubmitStory = async (story: string) => {
    setIsProcessing(true);
    setCurrentTime(0);
    setTimelineRunning(false);
    
    try {
      const { events, finalState, sessionId, crossStoryConnections } = await memoryProcessor.processStory(story);
      setMemoryEvents(events);
      setMemoryState(finalState);
      setCrossStoryConnections(crossStoryConnections);
      setCurrentSessionId(sessionId);
      setStoryProcessed(true);
      
      // Start timeline animation
      setTimelineRunning(true);
      let startTime = Date.now();
      const updateTimeline = () => {
        const elapsed = Date.now() - startTime;
        setCurrentTime(elapsed);
        
        if (elapsed < 12000) { // 12 seconds total
          requestAnimationFrame(updateTimeline);
        } else {
          setTimelineRunning(false);
        }
      };
      updateTimeline();
      
    } catch (error) {
      console.error('Error processing story:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetTimeline = () => {
    setCurrentTime(0);
    setTimelineRunning(false);
  };

  const playTimeline = () => {
    if (memoryEvents.length === 0) return;
    
    setTimelineRunning(true);
    let startTime = Date.now();
    const updateTimeline = () => {
      const elapsed = Date.now() - startTime;
      setCurrentTime(elapsed);
      
      if (elapsed < 12000) {
        requestAnimationFrame(updateTimeline);
      } else {
        setTimelineRunning(false);
      }
    };
    updateTimeline();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Prominent Instructions Section */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border-2 border-blue-200">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">🧠 How to Use the Memory Testing Platform</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 border border-blue-300 shadow-sm">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Generate or Write a Story</h3>
              </div>
              <p className="text-gray-600 text-center">
                Use the <strong>"Generate & Test"</strong> button below for instant demonstration, 
                or write your own story to see how AI processes personal narratives.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-purple-300 shadow-sm">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Watch Memory Processing</h3>
              </div>
              <p className="text-gray-600 text-center">
                Observe real-time memory formation across <strong>8 memory types</strong>: 
                Short-term, Working, Semantic, Episodic, Associative, Procedural, Flash & Long-term.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-green-300 shadow-sm">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Test Memory Capabilities</h3>
              </div>
              <p className="text-gray-600 text-center">
                Use the <strong>Interactive Testing Lab</strong> to probe different memory systems 
                and validate how AI understands and retains your story.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-4 border border-yellow-300">
            <p className="text-gray-800 text-center font-medium">
              💡 <strong>Quick Start:</strong> Click "Generate & Test" in the story input box below for an immediate demonstration!
            </p>
          </div>
        </div>

        {/* Story Input - Always Visible */}
        <div className="mb-8">
          <StoryInput onSubmitStory={handleSubmitStory} isProcessing={isProcessing} />
        </div>

        {/* Memory Visualization - Only show after story is processed */}
        {storyProcessed && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🧠 Memory Processing Results</h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div>
                <MemoryTimeline events={memoryEvents} currentTime={currentTime} />
              </div>
              
              <div>
                <MemoryStateViewer memoryState={memoryState} />
              </div>
            </div>
            
            {/* Timeline Controls */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Timeline Controls</span>
                </h3>
                <div className="text-sm text-gray-600">
                  {Math.floor(currentTime / 1000)}s / 12s
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={playTimeline}
                  disabled={timelineRunning}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Play className="h-4 w-4" />
                  <span>{timelineRunning ? 'Playing...' : 'Replay'}</span>
                </button>
                <button
                  onClick={resetTimeline}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (currentTime / 12000) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Cross-Story Connections - Always show but emphasize when story is processed */}
        <div className="mb-8">
          <CrossStoryConnections 
            connections={crossStoryConnections} 
            memoryState={memoryState}
          />
        </div>

        {/* Memory Testing Lab */}
        <div className="mb-8">
          <MemoryTestingLab memoryState={memoryState} storyProcessed={storyProcessed} />
        </div>

        {/* Attribution Section */}
        <div className="mb-8">
          <AttributionSection />
        </div>

        {/* Implementation Database */}
        <div className="mb-8">
          <ImplementationDatabase />
        </div>

        {/* About Section */}
        <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6">About Centaur AI Memory Architecture</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-purple-300">Human-AI Collaboration</h4>
              <p className="text-gray-300">
                This laboratory demonstrates how Centaur AI processes information through 
                interconnected memory systems, modeling human cognitive architectures.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-purple-300">Multi-Modal Memory</h4>
              <p className="text-gray-300">
                Watch as information flows between short-term, working, semantic, episodic, 
                associative, procedural, and flash memory systems in real-time.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-purple-300">Research & Development</h4>
                <p className="text-gray-300 text-sm">
                  Developed by <span className="text-white font-medium">Bionic Butterfly</span> research lab
                </p>
                <p className="text-gray-300 text-sm">
                  Under the direction of <span className="text-white font-medium">Dr. Mani Saint-Victor, MD, CH</span>
                </p>
              </div>
              <div className="text-right">
                <h4 className="text-lg font-semibold mb-2 text-purple-300">Open Source Foundation</h4>
                <p className="text-gray-300 text-sm">
                  Built on the open source <span className="text-white font-medium">Centaur AI</span> framework
                </p>
                <p className="text-gray-300 text-sm">
                  Advancing human-AI collaborative intelligence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;