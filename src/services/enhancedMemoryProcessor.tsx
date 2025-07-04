import { Database, Clock, Layers, BookOpen, Zap, Network, Archive, Cpu } from 'lucide-react';
import { PersistentMemoryStore, CrossStoryPattern } from './persistentMemoryStore';

export interface MemoryEvent {
  id: string;
  timestamp: number;
  memoryType: string;
  action: 'store' | 'retrieve' | 'process' | 'associate' | 'consolidate' | 'cross_reference';
  content: string;
  details: string;
  icon: React.ReactNode;
  color: string;
  crossStoryConnection?: {
    pattern: string;
    previousOccurrences: number;
    strength: number;
  };
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
  crossStoryLinks: Array<{
    currentItem: string;
    linkedPattern: string;
    connectionType: string;
    strength: number;
  }>;
}

export class EnhancedMemoryProcessor {
  private events: MemoryEvent[] = [];
  private memoryState: MemoryState = {
    shortTerm: [],
    workingMemory: [],
    longTerm: {},
    episodic: [],
    semantic: {},
    associative: [],
    procedural: [],
    flash: [],
    crossStoryLinks: []
  };
  private eventId = 0;
  private persistentStore: PersistentMemoryStore;

  constructor() {
    this.persistentStore = PersistentMemoryStore.getInstance();
  }

  async processStory(story: string): Promise<{ 
    events: MemoryEvent[], 
    finalState: MemoryState,
    sessionId: string,
    crossStoryConnections: any[]
  }> {
    this.events = [];
    this.memoryState = {
      shortTerm: [],
      workingMemory: [],
      longTerm: {},
      episodic: [],
      semantic: {},
      associative: [],
      procedural: [],
      flash: [],
      crossStoryLinks: []
    };
    this.eventId = 0;

    // Get existing knowledge to inform processing
    const existingKnowledge = this.persistentStore.getExistingKnowledge();
    
    // Add cross-reference event if we have existing knowledge
    if (existingKnowledge.allSessions.length > 0) {
      this.addEvent(
        50,
        'Cross-Story Memory',
        'cross_reference',
        `Accessing ${existingKnowledge.allSessions.length} previous memory sessions`,
        `Loading patterns, entities, and knowledge from past experiences`,
        <Network className="h-4 w-4" />,
        'border-cyan-500'
      );
    }

    // Enhanced processing steps with cross-story awareness
    await this.initialPerceptionWithHistory(story, existingKnowledge);
    await this.workingMemoryWithPatternRecognition(story, existingKnowledge);
    await this.semanticProcessingWithKnowledgeIntegration(story, existingKnowledge);
    await this.episodicProcessingWithContextualLinking(story, existingKnowledge);
    await this.associativeProcessingWithCrossStoryLinks(existingKnowledge);
    await this.proceduralProcessingWithBehavioralPatterns(story, existingKnowledge);
    await this.memoryConsolidationWithPersistence(story);

    // Save this session to persistent storage
    const sessionId = this.persistentStore.addMemorySession(story, this.memoryState);
    
    // Get updated cross-story connections
    const crossStoryConnections = this.persistentStore.getCrossStoryConnections(sessionId);

    return {
      events: [...this.events],
      finalState: { ...this.memoryState },
      sessionId,
      crossStoryConnections
    };
  }

  private addEvent(
    timestamp: number, 
    memoryType: string, 
    action: MemoryEvent['action'], 
    content: string, 
    details: string, 
    icon: React.ReactNode, 
    color: string,
    crossStoryConnection?: MemoryEvent['crossStoryConnection']
  ) {
    this.events.push({
      id: (this.eventId++).toString(),
      timestamp,
      memoryType,
      action,
      content,
      details,
      icon,
      color,
      crossStoryConnection
    });
  }

  private async initialPerceptionWithHistory(story: string, existingKnowledge: any) {
    const sentences = story.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    for (let i = 0; i < Math.min(3, sentences.length); i++) {
      const sentence = sentences[i].trim();
      this.memoryState.shortTerm.push(sentence);
      
      // Check if this perception connects to previous stories
      const recognizedPatterns = this.findRecognizedPatterns(sentence, existingKnowledge);
      
      this.addEvent(
        100 + i * 150,
        'Short-Term Memory',
        'store',
        `Initial perception: "${sentence.substring(0, 40)}..."`,
        recognizedPatterns.length > 0 
          ? `Raw input captured. Recognized ${recognizedPatterns.length} familiar patterns.`
          : 'Raw sensory input captured in short-term buffer',
        <Clock className="h-4 w-4" />,
        'border-blue-500',
        recognizedPatterns.length > 0 ? {
          pattern: recognizedPatterns[0].pattern,
          previousOccurrences: recognizedPatterns[0].occurrences.length,
          strength: recognizedPatterns[0].strength
        } : undefined
      );
    }
  }

  private findRecognizedPatterns(text: string, existingKnowledge: any): CrossStoryPattern[] {
    if (!existingKnowledge.crossStoryPatterns) return [];
    
    return existingKnowledge.crossStoryPatterns.filter((pattern: CrossStoryPattern) => 
      text.toLowerCase().includes(pattern.pattern.toLowerCase()) && pattern.strength > 0.4
    );
  }

  private async workingMemoryWithPatternRecognition(story: string, existingKnowledge: any) {
    const entities = this.extractEntities(story);
    const actions = this.extractActions(story);
    
    entities.forEach((entity, index) => {
      this.memoryState.workingMemory.push(entity);
      
      // Check if this entity has appeared in previous stories
      const entityHistory = existingKnowledge.consolidatedKnowledge?.entities?.[entity];
      
      this.addEvent(
        800 + index * 200,
        'Working Memory',
        'process',
        `Processing entity: ${entity}`,
        entityHistory 
          ? `Active manipulation and analysis. Previously seen ${entityHistory.count} times.`
          : 'Active manipulation and analysis of perceived information',
        <Cpu className="h-4 w-4" />,
        'border-green-500',
        entityHistory ? {
          pattern: entity,
          previousOccurrences: entityHistory.count,
          strength: entityHistory.strength
        } : undefined
      );

      // Add cross-story link if entity has history
      if (entityHistory) {
        this.memoryState.crossStoryLinks.push({
          currentItem: entity,
          linkedPattern: `${entity} (${entityHistory.count} previous occurrences)`,
          connectionType: 'entity_recognition',
          strength: entityHistory.strength
        });
      }
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

  private async semanticProcessingWithKnowledgeIntegration(story: string, existingKnowledge: any) {
    const concepts = this.extractConcepts(story);
    
    concepts.forEach((concept, index) => {
      const category = this.categorizeKnowledge(concept);
      if (!this.memoryState.semantic[category]) {
        this.memoryState.semantic[category] = [];
      }
      this.memoryState.semantic[category].push(concept);
      
      // Check if this concept builds on existing knowledge
      const existingConcepts = existingKnowledge.consolidatedKnowledge?.concepts?.[concept];
      
      this.addEvent(
        2000 + index * 300,
        'Semantic Memory',
        'store',
        `Storing knowledge: ${concept} → ${category}`,
        existingConcepts
          ? `Building on existing knowledge base. Concept reinforced ${existingConcepts.count} times.`
          : 'Integrating factual information into knowledge base',
        <BookOpen className="h-4 w-4" />,
        'border-indigo-500',
        existingConcepts ? {
          pattern: concept,
          previousOccurrences: existingConcepts.count,
          strength: existingConcepts.strength
        } : undefined
      );

      // Create cross-story semantic links
      if (existingConcepts) {
        this.memoryState.crossStoryLinks.push({
          currentItem: concept,
          linkedPattern: `${concept} knowledge network`,
          connectionType: 'semantic_reinforcement',
          strength: existingConcepts.strength
        });
      }
    });
  }

  private async episodicProcessingWithContextualLinking(story: string, existingKnowledge: any) {
    const episodes = this.extractEpisodes(story);
    
    episodes.forEach((episode, index) => {
      this.memoryState.episodic.push({
        event: episode.event,
        context: episode.context,
        timestamp: Date.now()
      });
      
      // Look for similar episodes in memory history
      const similarEpisodes = this.findSimilarEpisodes(episode, existingKnowledge);
      
      this.addEvent(
        4000 + index * 400,
        'Episodic Memory',
        'store',
        `Encoding episode: ${episode.event}`,
        similarEpisodes.length > 0
          ? `Context: ${episode.context}. Similar to ${similarEpisodes.length} previous experiences.`
          : `Context: ${episode.context}`,
        <Archive className="h-4 w-4" />,
        'border-orange-500',
        similarEpisodes.length > 0 ? {
          pattern: `${episode.event} (pattern)`,
          previousOccurrences: similarEpisodes.length,
          strength: 0.7
        } : undefined
      );

      // Link to similar past episodes
      if (similarEpisodes.length > 0) {
        this.memoryState.crossStoryLinks.push({
          currentItem: episode.event,
          linkedPattern: `Similar experiences (${similarEpisodes.length})`,
          connectionType: 'episodic_pattern',
          strength: Math.min(1.0, similarEpisodes.length * 0.2)
        });
      }
    });
  }

  private findSimilarEpisodes(currentEpisode: any, existingKnowledge: any): any[] {
    if (!existingKnowledge.allSessions) return [];
    
    const similar = [];
    existingKnowledge.allSessions.forEach((session: any) => {
      if (session.memoryState?.episodic) {
        session.memoryState.episodic.forEach((pastEpisode: any) => {
          if (this.calculateEpisodeSimilarity(currentEpisode.event, pastEpisode.event) > 0.6) {
            similar.push(pastEpisode);
          }
        });
      }
    });
    
    return similar;
  }

  private calculateEpisodeSimilarity(episode1: string, episode2: string): number {
    const words1 = episode1.toLowerCase().split(' ');
    const words2 = episode2.toLowerCase().split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  }

  private async associativeProcessingWithCrossStoryLinks(existingKnowledge: any) {
    const workingItems = this.memoryState.workingMemory;
    const semanticConcepts = Object.values(this.memoryState.semantic).flat();
    
    // Create associations within current story
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

    // Create cross-story associations
    if (existingKnowledge.crossStoryPatterns) {
      workingItems.forEach((item, index) => {
        const relatedPatterns = existingKnowledge.crossStoryPatterns.filter((pattern: CrossStoryPattern) => 
          item.toLowerCase().includes(pattern.pattern.toLowerCase()) || 
          pattern.pattern.toLowerCase().includes(item.toLowerCase())
        );

        if (relatedPatterns.length > 0) {
          this.addEvent(
            6500 + index * 250,
            'Cross-Story Association',
            'cross_reference',
            `Cross-linking: ${item} with historical patterns`,
            `Found ${relatedPatterns.length} connections to previous stories`,
            <Network className="h-4 w-4" />,
            'border-cyan-500',
            {
              pattern: relatedPatterns[0].pattern,
              previousOccurrences: relatedPatterns[0].occurrences.length,
              strength: relatedPatterns[0].strength
            }
          );
        }
      });
    }
  }

  private async proceduralProcessingWithBehavioralPatterns(story: string, existingKnowledge: any) {
    const procedures = this.extractProcedures(story);
    
    procedures.forEach((procedure, index) => {
      this.memoryState.procedural.push(procedure);
      
      // Check if this procedure has been learned before
      const behaviorHistory = existingKnowledge.consolidatedKnowledge?.behaviors?.[procedure];
      
      this.addEvent(
        8000 + index * 300,
        'Procedural Memory',
        'store',
        `Learning procedure: ${procedure}`,
        behaviorHistory
          ? `Reinforcing behavioral sequence. Previously practiced ${behaviorHistory.count} times.`
          : 'Encoding behavioral sequence for future execution',
        <Layers className="h-4 w-4" />,
        'border-red-500',
        behaviorHistory ? {
          pattern: procedure,
          previousOccurrences: behaviorHistory.count,
          strength: behaviorHistory.strength
        } : undefined
      );
    });
  }

  private async memoryConsolidationWithPersistence(story: string) {
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
        'Transfer from working to long-term storage + cross-story integration',
        <Database className="h-4 w-4" />,
        'border-purple-500'
      );
    });

    // Add consolidation event for cross-story patterns
    this.addEvent(
      11000,
      'Cross-Story Consolidation',
      'consolidate',
      'Integrating with persistent memory store',
      'Creating lasting connections between this story and previous experiences',
      <Database className="h-4 w-4" />,
      'border-cyan-500'
    );

    // Clear short-term memory (natural decay)
    this.addEvent(
      11500,
      'Short-Term Memory',
      'process',
      'Memory decay process',
      'Short-term memories naturally fade, but cross-story patterns persist',
      <Clock className="h-4 w-4" />,
      'border-blue-500'
    );
    this.memoryState.shortTerm = [];
  }

  // Helper methods (keeping existing implementations with minor enhancements)
  private extractEntities(story: string): string[] {
    const commonNames = ['sarah', 'marcus', 'mother', 'chen', 'martinez', 'rodriguez', 'patel', 'kim'];
    const places = ['coffee shop', 'maple street', 'corner table', 'library', 'gym', 'kitchen', 'bookstore', 'subway'];
    const objects = ['laptop', 'latte', 'cortado', 'report', 'flowers', 'backpack', 'recipe', 'metrocard'];
    
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
    const actionWords = ['walked', 'entered', 'remembered', 'noticed', 'sat', 'opened', 'typing', 'work', 'climbed', 'measured', 'calculated', 'tapped'];
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
    const concepts = [];
    const lowerStory = story.toLowerCase();
    
    if (lowerStory.includes('coffee') || lowerStory.includes('latte') || lowerStory.includes('cortado')) concepts.push('coffee culture');
    if (lowerStory.includes('morning') || lowerStory.includes('routine')) concepts.push('morning routine');
    if (lowerStory.includes('work') || lowerStory.includes('report') || lowerStory.includes('laptop')) concepts.push('work habits');
    if (lowerStory.includes('study') || lowerStory.includes('exam') || lowerStory.includes('library')) concepts.push('academic learning');
    if (lowerStory.includes('gym') || lowerStory.includes('exercise') || lowerStory.includes('fitness')) concepts.push('fitness routine');
    if (lowerStory.includes('recipe') || lowerStory.includes('cooking') || lowerStory.includes('kitchen')) concepts.push('culinary skills');
    if (lowerStory.includes('family') || lowerStory.includes('grandmother') || lowerStory.includes('mother')) concepts.push('family relationships');
    
    return concepts;
  }

  private extractEpisodes(story: string): Array<{ event: string; context: string }> {
    const episodes = [];
    const lowerStory = story.toLowerCase();
    
    if (lowerStory.includes('coffee')) {
      episodes.push({
        event: 'Coffee shop experience',
        context: 'Professional routine with personal connections'
      });
    }
    
    if (lowerStory.includes('study') || lowerStory.includes('library')) {
      episodes.push({
        event: 'Academic study session',
        context: 'Learning environment with anxiety management'
      });
    }
    
    if (lowerStory.includes('cooking') || lowerStory.includes('recipe')) {
      episodes.push({
        event: 'Culinary creation',
        context: 'Family tradition and cultural heritage'
      });
    }

    if (lowerStory.includes('gym') || lowerStory.includes('exercise')) {
      episodes.push({
        event: 'Fitness training',
        context: 'Physical development and professional application'
      });
    }

    return episodes;
  }

  private extractProcedures(story: string): string[] {
    const procedures = [];
    const lowerStory = story.toLowerCase();
    
    if (lowerStory.includes('coffee') && lowerStory.includes('routine')) {
      procedures.push('coffee shop routine');
    }
    if (lowerStory.includes('study') && lowerStory.includes('organize')) {
      procedures.push('study organization system');
    }
    if (lowerStory.includes('recipe') && lowerStory.includes('steps')) {
      procedures.push('cooking methodology');
    }
    if (lowerStory.includes('gym') && lowerStory.includes('routine')) {
      procedures.push('exercise sequence');
    }
    if (lowerStory.includes('commute') || lowerStory.includes('subway')) {
      procedures.push('transit navigation');
    }
    
    return procedures;
  }

  private categorizeKnowledge(concept: string): string {
    if (concept.includes('coffee') || concept.includes('routine')) return 'habits';
    if (concept.includes('work') || concept.includes('professional')) return 'professional';
    if (concept.includes('academic') || concept.includes('learning')) return 'education';
    if (concept.includes('fitness') || concept.includes('exercise')) return 'health';
    if (concept.includes('family') || concept.includes('relationships')) return 'personal';
    if (concept.includes('culinary') || concept.includes('cooking')) return 'skills';
    return 'general';
  }

  private calculateAssociationStrength(concept1: string, concept2: string): number {
    const commonWords = concept1.split(' ').filter(word => 
      concept2.split(' ').includes(word)
    );
    
    if (commonWords.length > 0) return 0.8;
    
    const relationships = [
      ['coffee', 'morning routine'],
      ['work', 'professional'],
      ['study', 'academic learning'],
      ['gym', 'fitness routine'],
      ['cooking', 'culinary skills'],
      ['family', 'personal']
    ];
    
    for (const [a, b] of relationships) {
      if ((concept1.includes(a) && concept2.includes(b)) || 
          (concept1.includes(b) && concept2.includes(a))) {
        return 0.6;
      }
    }
    
    return Math.random() * 0.4;
  }
}