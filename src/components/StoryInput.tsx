import React, { useState } from 'react';
import { Send, FileText, Sparkles, Shuffle, Zap } from 'lucide-react';

interface StoryInputProps {
  onSubmitStory: (story: string) => void;
  isProcessing: boolean;
}

const StoryInput: React.FC<StoryInputProps> = ({ onSubmitStory, isProcessing }) => {
  const [story, setStory] = useState('');
  const [generatedCount, setGeneratedCount] = useState(0);
  
  const storyTemplates = [
    // Story 1: Multi-Memory Coffee Experience
    `Dr. Sarah Chen entered the bustling Maple Street Coffee at 8:15 AM, immediately recognizing the rich aroma of Ethiopian single-origin beans being ground. She automatically followed her usual routine: scan for seating, check phone for messages, approach counter. The barista Marcus smiled and started preparing her regular order before she spoke - a complex oat milk cortado with an extra shot and a dash of cinnamon. While waiting, she processed three new emails, calculated her remaining budget for the month ($347), and noticed the tempo of the jazz music matched her heartbeat (around 72 BPM). Sitting at table 7 by the window, she opened her laptop and began typing the quarterly sales report, but paused when she heard someone mention "neural networks" - immediately connecting it to her PhD research on artificial intelligence from Stanford. The familiar sequence of opening coffee, adjusting screen brightness, and launching Excel triggered a flow state where her fingers moved automatically across the keyboard.`,
    
    // Story 2: Multi-Sensory Study Marathon
    `Psychology student Emma Martinez arrived at the Rothschild Library at exactly 7:58 AM, her backpack containing 47 highlighters organized by color theory principles. She climbed 3 flights to reach the graduate study area, counting each step (42 total) - a habit developed to manage anxiety. At her reserved table #23, she spread out materials for tomorrow's Cognitive Development exam, immediately recalling Professor Kim's warning: "Piaget's stages appear in 73% of my questions." Her phone displayed 847 unread emails and a text from roommate Sofia about splitting the $89 grocery bill. As she reviewed notes on object permanence, the sound of pages turning triggered memories of her grandmother reading bedtime stories in Spanish. She automatically began her study routine: outline main points, create visual mind maps, test recall every 25 minutes using the Pomodoro Technique she learned last semester.`,
    
    // Story 3: Complex Culinary Memory Web
    `Chef David Rodriguez began recreating his late grandmother's authentic Sicilian lasagna, consulting her handwritten recipe card (dated 1987) with instructions in broken English and Italian phrases. He measured 2 cups ricotta, 1 pound ground beef, and precisely 6 fresh basil leaves while simultaneously calculating cooking times: sauce simmer (120 minutes), pasta boil (8 minutes), oven bake (45 minutes at 375°F). The scent of sautéing garlic triggered vivid memories of being 7 years old, standing on a wooden step-stool in Nonna's Brooklyn kitchen, learning that "soffritto" meant more than just cooking onions. His muscle memory automatically diced onions in precise 1/4-inch cubes - a knife technique mastered through 15 years of professional cooking. When his sister Teresa called asking to bring her boyfriend Marco, David's brain instantly categorized this as "family dinner protocol" and began adjusting portion calculations: 6 people instead of 4, requiring 1.5x ingredients. The familiar rhythm of layering pasta, sauce, cheese, repeat became meditative, connecting him to three generations of family tradition.`,
    
    // Story 4: Urban Transit Memory Network
    `Marketing executive Julia Patel bolted from her 14th-floor apartment at 7:47 AM, immediately calculating she had exactly 23 minutes to reach her 8:10 presentation. She tapped her MetroCard (remaining balance: $47.25) while navigating through exactly 127 steps to the subway platform - a count she'd memorized over 3 years of daily commutes. On the crowded B train, she found seat 12C next to an elderly gentleman reading "El Diario" newspaper, triggering memories of her late grandfather Ramesh explaining immigration struggles in three languages: Hindi, English, and Spanish. Her brain automatically processed the familiar station sequence: 42nd Street (3 minutes), Union Square (7 minutes), while simultaneously reviewing her presentation slides in sequential order. At Union Square, she noticed a new mural featuring geometric patterns that reminded her of traditional Indian rangoli designs from childhood Diwali celebrations. The rhythmic clacking of subway wheels (approximately 4/4 time signature) synchronized with her breathing exercises - a stress management technique learned from her yoga instructor Maria.`,
    
    // Story 5: Literary Memory Labyrinth
    `Software engineer Alex Kim ducked into "Chapters & Verses" bookstore during a sudden Thursday downpour, his phone showing 73% battery and 4:23 PM. The space overwhelmed his senses: vanilla candles burning at precisely 3 locations, approximately 10,000 books creating a maze of floor-to-ceiling knowledge. Owner Martha, recognizing his previous visits, approached with paint-stained fingers and recommended "The Time Traveler's Wife" - triggering Alex's memory of his Computer Science thesis on temporal algorithms. In the sci-fi section, he discovered a first-edition "Neuromancer" by William Gibson ($45 - remarkably underpriced given its $200 market value). His brain automatically catalogued book locations: fantasy (aisle 3), mystery (aisle 7), technical manuals (back corner). The orange tabby cat "Hemingway" claimed his lap for exactly 47 minutes while he browsed, triggering childhood memories of reading with his sister before she moved to Tokyo. He left with three books totaling $62.50, his systematic browsing pattern (fiction→non-fiction→technical) now permanently stored as a behavioral sequence.`,
    
    // Story 6: Precision Fitness Memory System
    `Personal trainer Maria Santos entered FitLife Gym at 5:58 AM, her Fitbit showing 147 BPM resting heart rate and 6,847 steps already logged. She initiated her precisely-timed routine: 12-minute treadmill warm-up at 6.2 MPH, followed by strength training in exact sequence - squats (3 sets, 12 reps, 135 lbs), deadlifts (3 sets, 8 reps, 155 lbs), bench press (3 sets, 10 reps, 95 lbs). Her body automatically adjusted breathing patterns: inhale on negative motion, exhale on positive - a technique mastered through 4 years of powerlifting. Observing newcomer James struggling with squat form, she recalled her own beginner mistakes from 2019 and provided corrective guidance: "feet shoulder-width apart, core engaged, knees track over toes." Her muscle memory seamlessly executed proper demonstration while her brain simultaneously calculated his ideal starting weight (probably 95 lbs based on his frame). The familiar post-workout endorphin rush triggered anticipation for her 9 AM client presentation on metabolic conditioning, connecting her physical training expertise to professional knowledge of exercise physiology and biomechanics.`
  ];

  const generateStory = () => {
    const randomIndex = Math.floor(Math.random() * storyTemplates.length);
    const selectedStory = storyTemplates[randomIndex];
    setStory(selectedStory);
    setGeneratedCount(prev => prev + 1);
  };

  const handleAutoProcess = () => {
    generateStory();
    // Auto-submit after a short delay to show the story was generated
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * storyTemplates.length);
      const selectedStory = storyTemplates[randomIndex];
      onSubmitStory(selectedStory);
    }, 500);
  };

  const handleSubmit = () => {
    if (story.trim()) {
      onSubmitStory(story.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <FileText className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">Story Input</h2>
      </div>
      
      <p className="text-gray-600 mb-4">
        Submit a story or narrative to see how the Centaur AI memory systems process, store, and interconnect different types of information over time.
      </p>
      
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 mb-4 border border-purple-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold mb-1">🧠 Cross-Story Memory Builder</h3>
              <p className="text-purple-100 text-sm">As you add stories, they build connections and demonstrate memory working together</p>
              {generatedCount > 0 && (
                <p className="text-purple-200 text-xs mt-1">Generated {generatedCount} stories building memory network</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-purple-200 text-xs">Use buttons below to generate stories</p>
            </div>
          </div>
        </div>
        
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Enter a story or narrative here... Include details about people, places, times, emotions, and actions to see how different memory systems process this information."
          className="w-full h-32 p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
          disabled={isProcessing}
        />
        
        <div className="flex space-x-3">
          <button
            onClick={generateStory}
            disabled={isProcessing}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Shuffle className="h-4 w-4" />
            <span>Generate</span>
          </button>
          
          <button
            onClick={handleAutoProcess}
            disabled={isProcessing}
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            <Zap className="h-4 w-4" />
            <span>Generate & Test</span>
          </button>
          
          <button
            onClick={() => setStory(storyTemplates[0])}
            disabled={isProcessing}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Sparkles className="h-4 w-4" />
            <span>Use Sample</span>
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!story.trim() || isProcessing}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Send className="h-4 w-4" />
            <span>{isProcessing ? 'Processing...' : 'Process Story'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryInput;