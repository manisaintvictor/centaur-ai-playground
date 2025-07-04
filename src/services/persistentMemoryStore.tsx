export interface StoredMemorySession {
  id: string;
  timestamp: number;
  storyTitle: string;
  storyText: string;
  memoryState: any;
  patterns: CrossStoryPattern[];
}

export interface CrossStoryPattern {
  type: 'recurring_entity' | 'behavioral_sequence' | 'semantic_cluster' | 'temporal_pattern' | 'emotional_theme';
  pattern: string;
  occurrences: Array<{
    sessionId: string;
    context: string;
    strength: number;
  }>;
  strength: number;
  firstSeen: number;
  lastSeen: number;
}

export interface PersistentMemoryState {
  allSessions: StoredMemorySession[];
  crossStoryPatterns: CrossStoryPattern[];
  consolidatedKnowledge: {
    entities: { [key: string]: { count: number; contexts: string[]; strength: number } };
    behaviors: { [key: string]: { count: number; variations: string[]; strength: number } };
    locations: { [key: string]: { count: number; descriptions: string[]; strength: number } };
    concepts: { [key: string]: { count: number; associations: string[]; strength: number } };
  };
  userProfile: {
    preferredScenarios: string[];
    learningPatterns: string[];
    memoryStyle: string;
  };
}

export class PersistentMemoryStore {
  private static instance: PersistentMemoryStore;
  private storageKey = 'centaur-ai-memory-store';
  private memoryState: PersistentMemoryState;

  private constructor() {
    this.memoryState = this.loadFromStorage();
  }

  static getInstance(): PersistentMemoryStore {
    if (!PersistentMemoryStore.instance) {
      PersistentMemoryStore.instance = new PersistentMemoryStore();
    }
    return PersistentMemoryStore.instance;
  }

  private loadFromStorage(): PersistentMemoryState {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate structure and migrate if needed
        return this.validateAndMigrate(parsed);
      }
    } catch (error) {
      console.warn('Failed to load persistent memory:', error);
    }
    
    return this.createEmptyState();
  }

  private createEmptyState(): PersistentMemoryState {
    return {
      allSessions: [],
      crossStoryPatterns: [],
      consolidatedKnowledge: {
        entities: {},
        behaviors: {},
        locations: {},
        concepts: {}
      },
      userProfile: {
        preferredScenarios: [],
        learningPatterns: [],
        memoryStyle: 'comprehensive'
      }
    };
  }

  private validateAndMigrate(data: any): PersistentMemoryState {
    // Ensure all required fields exist
    const defaultState = this.createEmptyState();
    return {
      allSessions: data.allSessions || [],
      crossStoryPatterns: data.crossStoryPatterns || [],
      consolidatedKnowledge: {
        entities: data.consolidatedKnowledge?.entities || {},
        behaviors: data.consolidatedKnowledge?.behaviors || {},
        locations: data.consolidatedKnowledge?.locations || {},
        concepts: data.consolidatedKnowledge?.concepts || {}
      },
      userProfile: {
        preferredScenarios: data.userProfile?.preferredScenarios || [],
        learningPatterns: data.userProfile?.learningPatterns || [],
        memoryStyle: data.userProfile?.memoryStyle || 'comprehensive'
      }
    };
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.memoryState));
    } catch (error) {
      console.error('Failed to save persistent memory:', error);
    }
  }

  addMemorySession(storyText: string, memoryState: any): string {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const storyTitle = this.generateStoryTitle(storyText);
    
    const session: StoredMemorySession = {
      id: sessionId,
      timestamp: Date.now(),
      storyTitle,
      storyText,
      memoryState: JSON.parse(JSON.stringify(memoryState)), // Deep clone
      patterns: []
    };

    this.memoryState.allSessions.push(session);
    
    // Analyze cross-story patterns
    this.analyzeAndUpdatePatterns(session);
    
    // Update consolidated knowledge
    this.updateConsolidatedKnowledge(session);
    
    // Maintain maximum session history (keep last 50 sessions)
    if (this.memoryState.allSessions.length > 50) {
      this.memoryState.allSessions = this.memoryState.allSessions.slice(-50);
    }

    this.saveToStorage();
    return sessionId;
  }

  private generateStoryTitle(storyText: string): string {
    const firstSentence = storyText.split(/[.!?]/)[0];
    const words = firstSentence.split(' ').slice(0, 6);
    
    // Extract key elements for title
    const namePattern = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/;
    const locationPattern = /\b(coffee shop|library|gym|kitchen|bookstore|train|subway)\b/i;
    
    const nameMatch = firstSentence.match(namePattern);
    const locationMatch = firstSentence.match(locationPattern);
    
    if (nameMatch && locationMatch) {
      return `${nameMatch[0]} at ${locationMatch[0]}`;
    } else if (nameMatch) {
      return `${nameMatch[0]}'s Experience`;
    } else if (locationMatch) {
      return `${locationMatch[0]} Visit`;
    } else {
      return words.join(' ') + '...';
    }
  }

  private analyzeAndUpdatePatterns(session: StoredMemorySession): void {
    const patterns = this.extractPatterns(session);
    
    patterns.forEach(newPattern => {
      const existingPattern = this.memoryState.crossStoryPatterns.find(
        p => p.type === newPattern.type && p.pattern === newPattern.pattern
      );

      if (existingPattern) {
        // Update existing pattern
        existingPattern.occurrences.push({
          sessionId: session.id,
          context: newPattern.occurrences[0].context,
          strength: newPattern.occurrences[0].strength
        });
        existingPattern.strength = Math.min(1.0, existingPattern.strength + 0.1);
        existingPattern.lastSeen = Date.now();
      } else {
        // Create new pattern
        this.memoryState.crossStoryPatterns.push({
          ...newPattern,
          firstSeen: Date.now(),
          lastSeen: Date.now()
        });
      }
    });
  }

  private extractPatterns(session: StoredMemorySession): CrossStoryPattern[] {
    const patterns: CrossStoryPattern[] = [];
    const storyLower = session.storyText.toLowerCase();
    
    // Extract recurring entities
    const entities = ['coffee', 'sarah', 'maria', 'alex', 'emma', 'julia', 'david'];
    entities.forEach(entity => {
      if (storyLower.includes(entity)) {
        patterns.push({
          type: 'recurring_entity',
          pattern: entity,
          occurrences: [{
            sessionId: session.id,
            context: this.extractContext(session.storyText, entity),
            strength: 0.8
          }],
          strength: 0.8,
          firstSeen: Date.now(),
          lastSeen: Date.now()
        });
      }
    });

    // Extract behavioral sequences
    const behaviors = ['morning routine', 'work session', 'study routine', 'exercise routine', 'cooking process'];
    behaviors.forEach(behavior => {
      if (this.detectBehavior(storyLower, behavior)) {
        patterns.push({
          type: 'behavioral_sequence',
          pattern: behavior,
          occurrences: [{
            sessionId: session.id,
            context: `Behavioral pattern: ${behavior}`,
            strength: 0.7
          }],
          strength: 0.7,
          firstSeen: Date.now(),
          lastSeen: Date.now()
        });
      }
    });

    // Extract semantic clusters
    const semanticClusters = this.identifySemanticClusters(session.memoryState);
    semanticClusters.forEach(cluster => {
      patterns.push({
        type: 'semantic_cluster',
        pattern: cluster,
        occurrences: [{
          sessionId: session.id,
          context: `Semantic domain: ${cluster}`,
          strength: 0.6
        }],
        strength: 0.6,
        firstSeen: Date.now(),
        lastSeen: Date.now()
      });
    });

    return patterns;
  }

  private extractContext(text: string, entity: string): string {
    const sentences = text.split(/[.!?]+/);
    const contextSentence = sentences.find(s => 
      s.toLowerCase().includes(entity.toLowerCase())
    );
    return contextSentence?.trim().substring(0, 100) + '...' || '';
  }

  private detectBehavior(text: string, behavior: string): boolean {
    const behaviorKeywords = {
      'morning routine': ['morning', 'routine', 'coffee', 'arrived', 'usual'],
      'work session': ['laptop', 'work', 'report', 'typing', 'computer'],
      'study routine': ['study', 'notes', 'exam', 'library', 'review'],
      'exercise routine': ['gym', 'workout', 'exercise', 'training', 'fitness'],
      'cooking process': ['recipe', 'cook', 'ingredients', 'kitchen', 'prepare']
    };

    const keywords = behaviorKeywords[behavior] || [];
    return keywords.filter(keyword => text.includes(keyword)).length >= 2;
  }

  private identifySemanticClusters(memoryState: any): string[] {
    const clusters = [];
    
    if (memoryState.semantic) {
      Object.keys(memoryState.semantic).forEach(category => {
        if (memoryState.semantic[category].length > 0) {
          clusters.push(category);
        }
      });
    }

    return clusters;
  }

  private updateConsolidatedKnowledge(session: StoredMemorySession): void {
    // Update entity knowledge
    const entities = this.extractEntitiesFromSession(session);
    entities.forEach(entity => {
      if (!this.memoryState.consolidatedKnowledge.entities[entity.name]) {
        this.memoryState.consolidatedKnowledge.entities[entity.name] = {
          count: 0,
          contexts: [],
          strength: 0
        };
      }
      const entityData = this.memoryState.consolidatedKnowledge.entities[entity.name];
      entityData.count++;
      entityData.contexts.push(entity.context);
      entityData.strength = Math.min(1.0, entityData.strength + 0.1);
    });

    // Similar updates for behaviors, locations, concepts...
  }

  private extractEntitiesFromSession(session: StoredMemorySession): Array<{name: string, context: string}> {
    const entities = [];
    const text = session.storyText.toLowerCase();
    
    // Common entities to track
    const entityPatterns = [
      { name: 'coffee', contexts: ['morning', 'cafe', 'routine', 'drink'] },
      { name: 'work', contexts: ['laptop', 'report', 'office', 'professional'] },
      { name: 'study', contexts: ['library', 'exam', 'notes', 'learning'] },
      { name: 'exercise', contexts: ['gym', 'training', 'fitness', 'workout'] }
    ];

    entityPatterns.forEach(pattern => {
      if (text.includes(pattern.name)) {
        const context = pattern.contexts.find(ctx => text.includes(ctx)) || 'general';
        entities.push({ name: pattern.name, context });
      }
    });

    return entities;
  }

  getExistingKnowledge(): PersistentMemoryState {
    return JSON.parse(JSON.stringify(this.memoryState)); // Return deep copy
  }

  getCrossStoryConnections(currentSession?: string): Array<{
    pattern: string;
    type: string;
    strength: number;
    connections: number;
    recentActivity: boolean;
  }> {
    return this.memoryState.crossStoryPatterns
      .filter(pattern => pattern.strength > 0.3)
      .map(pattern => ({
        pattern: pattern.pattern,
        type: pattern.type,
        strength: pattern.strength,
        connections: pattern.occurrences.length,
        recentActivity: (Date.now() - pattern.lastSeen) < 24 * 60 * 60 * 1000 // Last 24 hours
      }))
      .sort((a, b) => b.strength - a.strength);
  }

  getSessionHistory(): StoredMemorySession[] {
    return this.memoryState.allSessions.slice().reverse(); // Most recent first
  }

  clearAllMemory(): void {
    this.memoryState = this.createEmptyState();
    this.saveToStorage();
  }

  exportMemoryData(): string {
    return JSON.stringify(this.memoryState, null, 2);
  }

  importMemoryData(jsonData: string): boolean {
    try {
      const imported = JSON.parse(jsonData);
      this.memoryState = this.validateAndMigrate(imported);
      this.saveToStorage();
      return true;
    } catch (error) {
      console.error('Failed to import memory data:', error);
      return false;
    }
  }

  getMemoryStatistics(): {
    totalSessions: number;
    totalPatterns: number;
    strongestConnections: Array<{pattern: string, strength: number}>;
    memoryGrowth: Array<{date: string, sessions: number}>;
  } {
    const strongestConnections = this.memoryState.crossStoryPatterns
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 5)
      .map(p => ({ pattern: p.pattern, strength: p.strength }));

    // Calculate memory growth over time
    const memoryGrowth = this.calculateMemoryGrowth();

    return {
      totalSessions: this.memoryState.allSessions.length,
      totalPatterns: this.memoryState.crossStoryPatterns.length,
      strongestConnections,
      memoryGrowth
    };
  }

  private calculateMemoryGrowth(): Array<{date: string, sessions: number}> {
    const growthData = new Map<string, number>();
    
    this.memoryState.allSessions.forEach(session => {
      const date = new Date(session.timestamp).toISOString().split('T')[0];
      growthData.set(date, (growthData.get(date) || 0) + 1);
    });

    return Array.from(growthData.entries())
      .map(([date, sessions]) => ({ date, sessions }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }
}