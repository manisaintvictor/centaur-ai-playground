import { Database, Clock, Layers, BookOpen, Zap, Network, Archive, Cpu } from 'lucide-react';

export interface MemoryEvent {
  id: string;
  timestamp: number;
  memoryType: string;
  action: 'store' | 'retrieve' | 'process' | 'associate' | 'consolidate';
  content: string;
  details: string;
  icon: React.ReactNode;
  color: string;
}

export interface MemoryState {
  shortTerm: string[];
  workingMemory: string[];
  longTerm: { [key: string]: string[] };
  episodic: Array<{ event: string; context: string; timestamp: number }>;
  semantic: { [key: string]: string[] };
  associative: Array<{ concept1: string; concept2: string; strength: number }>;
  procedural: string[];
  flash: string[];
}

export class MemoryProcessor {
  private events: MemoryEvent[] = [];
  private memoryState: MemoryState = {
    shortTerm: [],
    workingMemory: [],
    longTerm: {},
    episodic: [],
    semantic: {},
    associative: [],
    procedural: [],
    flash: []
  };
  private eventId = 0;

  async processStory(story: string): Promise<{ events: MemoryEvent[], finalState: MemoryState }> {
    this.events = [];
    this.memoryState = {
      shortTerm: [],
      workingMemory: [],
      longTerm: {},
      episodic: [],
      semantic: {},
      associative: [],
      procedural: [],
      flash: []
    };
    this.eventId = 0;

    // Step 1: Initial perception and short-term storage (0-500ms)
    await this.initialPerception(story);
    
    // Step 2: Working memory processing (500ms-2s)
    await this.workingMemoryProcessing(story);
    
    // Step 3: Semantic analysis and knowledge extraction (2s-4s)
    await this.semanticProcessing(story);
    
    // Step 4: Episodic memory formation (4s-6s)
    await this.episodicProcessing(story);
    
    // Step 5: Association formation (6s-8s)
    await this.associativeProcessing();
    
    // Step 6: Procedural memory updates (8s-10s)
    await this.proceduralProcessing(story);
    
    // Step 7: Memory consolidation (10s-12s)
    await this.memoryConsolidation();

    return {
      events: [...this.events],
      finalState: { ...this.memoryState }
    };
  }

  private addEvent(timestamp: number, memoryType: string, action: MemoryEvent['action'], content: string, details: string, icon: React.ReactNode, color: string) {
    this.events.push({
      id: (this.eventId++).toString(),
      timestamp,
      memoryType,
      action,
      content,
      details,
      icon,
      color
    });
  }

  private async initialPerception(story: string) {
    // Parse basic elements
    const sentences = story.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    for (let i = 0; i < Math.min(3, sentences.length); i++) {
      const sentence = sentences[i].trim();
      this.memoryState.shortTerm.push(sentence);
      this.addEvent(
        100 + i * 150,
        'Short-Term Memory',
        'store',
        `Initial perception: "${sentence.substring(0, 40)}..."`,
        'Raw sensory input captured in short-term buffer',
        <Clock className="h-4 w-4" />,
        'border-blue-500'
      );
    }
  }

  private async workingMemoryProcessing(story: string) {
    // Extract key entities and relationships
    const entities = this.extractEntities(story);
    const actions = this.extractActions(story);
    
    entities.forEach((entity, index) => {
      this.memoryState.workingMemory.push(entity);
      this.addEvent(
        800 + index * 200,
        'Working Memory',
        'process',
        `Processing entity: ${entity}`,
        'Active manipulation and analysis of perceived information',
        <Cpu className="h-4 w-4" />,
        'border-green-500'
      );
    });

    actions.forEach((action, index) => {
      this.memoryState.workingMemory.push(action);
      this.addEvent(
        1200 + index * 200,
        'Working Memory', 
        'process',
        `Processing action: ${action}`,
        'Analyzing behavioral patterns and sequences',
        <Cpu className="h-4 w-4" />,
        'border-green-500'
      );
    });
  }

  private async semanticProcessing(story: string) {
    // Extract concepts and categorize knowledge
    const concepts = this.extractConcepts(story);
    
    concepts.forEach((concept, index) => {
      const category = this.categorizeKnowledge(concept);
      if (!this.memoryState.semantic[category]) {
        this.memoryState.semantic[category] = [];
      }
      this.memoryState.semantic[category].push(concept);
      
      this.addEvent(
        2000 + index * 300,
        'Semantic Memory',
        'store',
        `Storing knowledge: ${concept} → ${category}`,
        'Integrating factual information into knowledge base',
        <BookOpen className="h-4 w-4" />,
        'border-indigo-500'
      );
    });
  }

  private async episodicProcessing(story: string) {
    // Create episodic memories with temporal and contextual information
    const episodes = this.extractEpisodes(story);
    
    episodes.forEach((episode, index) => {
      this.memoryState.episodic.push({
        event: episode.event,
        context: episode.context,
        timestamp: Date.now()
      });
      
      this.addEvent(
        4000 + index * 400,
        'Episodic Memory',
        'store',
        `Encoding episode: ${episode.event}`,
        `Context: ${episode.context}`,
        <Archive className="h-4 w-4" />,
        'border-orange-500'
      );
    });
  }

  private async associativeProcessing() {
    // Form associations between concepts
    const workingItems = this.memoryState.workingMemory;
    const semanticConcepts = Object.values(this.memoryState.semantic).flat();
    
    for (let i = 0; i < workingItems.length; i++) {
      for (let j = 0; j < semanticConcepts.length; j++) {
        const strength = this.calculateAssociationStrength(workingItems[i], semanticConcepts[j]);
        if (strength > 0.3) {
          this.memoryState.associative.push({
            concept1: workingItems[i],
            concept2: semanticConcepts[j],
            strength
          });
          
          this.addEvent(
            6000 + (i * semanticConcepts.length + j) * 200,
            'Associative Memory',
            'associate',
            `Linking: ${workingItems[i]} ↔ ${semanticConcepts[j]}`,
            `Association strength: ${strength.toFixed(2)}`,
            <Network className="h-4 w-4" />,
            'border-teal-500'
          );
        }
      }
    }
  }

  private async proceduralProcessing(story: string) {
    // Extract and store procedural knowledge
    const procedures = this.extractProcedures(story);
    
    procedures.forEach((procedure, index) => {
      this.memoryState.procedural.push(procedure);
      this.addEvent(
        8000 + index * 300,
        'Procedural Memory',
        'store',
        `Learning procedure: ${procedure}`,
        'Encoding behavioral sequence for future execution',
        <Layers className="h-4 w-4" />,
        'border-red-500'
      );
    });
  }

  private async memoryConsolidation() {
    // Move items from working memory to long-term storage
    this.memoryState.workingMemory.forEach((item, index) => {
      const category = 'general';
      if (!this.memoryState.longTerm[category]) {
        this.memoryState.longTerm[category] = [];
      }
      this.memoryState.longTerm[category].push(item);
      
      // Add to flash memory for quick access
      this.memoryState.flash.unshift(item);
      if (this.memoryState.flash.length > 5) {
        this.memoryState.flash.pop();
      }
      
      this.addEvent(
        10000 + index * 200,
        'Long-Term Memory',
        'consolidate',
        `Consolidating: ${item}`,
        'Transfer from working to long-term storage',
        <Database className="h-4 w-4" />,
        'border-purple-500'
      );
    });

    // Clear short-term memory (natural decay)
    this.addEvent(
      11000,
      'Short-Term Memory',
      'process',
      'Memory decay process',
      'Short-term memories naturally fade after 30 seconds',
      <Clock className="h-4 w-4" />,
      'border-blue-500'
    );
    this.memoryState.shortTerm = [];
  }

  private extractEntities(story: string): string[] {
    const commonNames = ['sarah', 'marcus', 'mother'];
    const places = ['coffee shop', 'maple street', 'corner table'];
    const objects = ['laptop', 'latte', 'report', 'flowers'];
    
    const entities = [];
    const lowerStory = story.toLowerCase();
    
    [...commonNames, ...places, ...objects].forEach(entity => {
      if (lowerStory.includes(entity)) {
        entities.push(entity);
      }
    });
    
    return entities;
  }

  private extractActions(story: string): string[] {
    const actionWords = ['walked', 'remembered', 'noticed', 'sat', 'opened', 'typing', 'work'];
    const actions = [];
    const lowerStory = story.toLowerCase();
    
    actionWords.forEach(action => {
      if (lowerStory.includes(action)) {
        actions.push(action);
      }
    });
    
    return actions;
  }

  private extractConcepts(story: string): string[] {
    const concepts = ['coffee', 'morning routine', 'work habits', 'family relationships', 'environment preferences'];
    const found = [];
    const lowerStory = story.toLowerCase();
    
    if (lowerStory.includes('coffee') || lowerStory.includes('latte')) found.push('coffee');
    if (lowerStory.includes('morning') || lowerStory.includes('tuesday')) found.push('morning routine');
    if (lowerStory.includes('work') || lowerStory.includes('report')) found.push('work habits');
    if (lowerStory.includes('mother') || lowerStory.includes('birthday')) found.push('family relationships');
    if (lowerStory.includes('table') || lowerStory.includes('sunlight')) found.push('environment preferences');
    
    return found;
  }

  private extractEpisodes(story: string): Array<{ event: string; context: string }> {
    return [
      {
        event: 'Coffee shop visit',
        context: 'Tuesday morning, routine behavior, familiar environment'
      },
      {
        event: 'Work session',
        context: 'Productive environment, quarterly report deadline'
      },
      {
        event: 'Personal reminder',
        context: 'Mother\'s birthday planning, emotional connection'
      }
    ];
  }

  private extractProcedures(story: string): string[] {
    const procedures = [];
    const lowerStory = story.toLowerCase();
    
    if (lowerStory.includes('walked to') && lowerStory.includes('coffee')) {
      procedures.push('coffee shop routine');
    }
    if (lowerStory.includes('sat') && lowerStory.includes('table')) {
      procedures.push('workspace setup');
    }
    if (lowerStory.includes('opened') && lowerStory.includes('laptop')) {
      procedures.push('work initiation sequence');
    }
    
    return procedures;
  }

  private categorizeKnowledge(concept: string): string {
    if (concept.includes('coffee') || concept.includes('routine')) return 'habits';
    if (concept.includes('work') || concept.includes('report')) return 'professional';
    if (concept.includes('family') || concept.includes('relationships')) return 'personal';
    if (concept.includes('environment') || concept.includes('preferences')) return 'environmental';
    return 'general';
  }

  private calculateAssociationStrength(concept1: string, concept2: string): number {
    // Simple heuristic for association strength
    const commonWords = concept1.split(' ').filter(word => 
      concept2.split(' ').includes(word)
    );
    
    if (commonWords.length > 0) return 0.8;
    
    // Semantic relationships
    const relationships = [
      ['coffee', 'morning routine'],
      ['work habits', 'professional'],
      ['family relationships', 'personal']
    ];
    
    for (const [a, b] of relationships) {
      if ((concept1.includes(a) && concept2.includes(b)) || 
          (concept1.includes(b) && concept2.includes(a))) {
        return 0.6;
      }
    }
    
    return Math.random() * 0.4; // Random weak associations
  }
}