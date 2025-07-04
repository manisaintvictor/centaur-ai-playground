import React from 'react';
import { ExternalLink, Github, BookOpen, Users, Code, Database, Award, Zap } from 'lucide-react';

const AttributionSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 rounded-xl p-8 text-white">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4 flex items-center space-x-3">
          <Award className="h-7 w-7 text-yellow-400" />
          <span>Academic Attribution & Open Source Foundation</span>
        </h3>
        <p className="text-purple-200 text-lg leading-relaxed">
          This implementation builds upon and extends the groundbreaking research in human-AI collaborative 
          intelligence. We acknowledge and credit the original researchers and open source contributions that 
          made this work possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Original Research Attribution */}
        <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm border border-purple-300 border-opacity-30">
          <h4 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-purple-300">
            <BookOpen className="h-6 w-6" />
            <span>Original Research</span>
          </h4>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-white">"Centaur: A Foundation Model of Human Cognition"</p>
              <p className="text-sm text-purple-200">Dr. Marcel Binz & Research Team - Cognitive modeling and human-AI collaboration research</p>
              <div className="mt-2 space-y-1">
                <div>
                  <a 
                    href="https://github.com/marcelbinz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-white underline text-sm"
                  >
                    Marcel Binz GitHub →
                  </a>
                </div>
                <div>
                  <a 
                    href="https://marcelbinz.github.io/imgs/Centaur__preprint_.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-white underline text-sm"
                  >
                    Original Research Paper →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research Resources */}
        <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm border border-cyan-300 border-opacity-30">
          <h4 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-cyan-300">
            <Zap className="h-6 w-6" />
            <span>Research Resources</span>
          </h4>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-white">Centaur AI NotebookLM</p>
              <p className="text-sm text-cyan-200">Interactive research exploration and analysis</p>
            </div>
            <div>
              <p className="font-medium text-white">Perplexity AI Research Page</p>
              <p className="text-sm text-cyan-200">Community discussions and research insights</p>
              <div className="mt-2 space-y-1">
                <div>
                  <a 
                    href="https://notebooklm.google.com/notebook/c6ce4186-fcbc-4fbe-8aea-44b456b65195" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-white underline text-sm"
                  >
                    Centaur AI NotebookLM →
                  </a>
                </div>
                <div>
                  <a 
                    href="https://www.perplexity.ai/search/centaur-a-foundation-model-of-gyys_FiXTCiVglOsh_N4PA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-white underline text-sm"
                  >
                    Perplexity AI Research Page →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Research Links */}
      <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm border border-blue-300 border-opacity-30 mb-6">
        <h4 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-blue-300">
          <Code className="h-6 w-6" />
          <span>Open Source & Community</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="font-medium text-white mb-1">Research Repository</p>
            <p className="text-sm text-blue-200">Foundational research and implementations</p>
          </div>
          <div>
            <p className="font-medium text-white mb-1">Community Discussions</p>
            <p className="text-sm text-blue-200">Academic and practical applications</p>
          </div>
          <div>
            <p className="font-medium text-white mb-1">Open Science</p>
            <p className="text-sm text-blue-200">Collaborative research and development</p>
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <div>
            <a 
              href="https://github.com/topics/cognitive-modeling" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white underline text-sm"
            >
              Cognitive Modeling Research →
            </a>
          </div>
          <div>
            <a 
              href="https://github.com/topics/human-ai-collaboration" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white underline text-sm"
            >
              Human-AI Collaboration →
            </a>
          </div>
          <div>
            <a 
              href="https://github.com/topics/memory-models" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white underline text-sm"
            >
              Memory Models →
            </a>
          </div>
        </div>
      </div>
      {/* Technical Implementation Notes */}
      <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm border border-green-300 border-opacity-30 mb-6">
        <h4 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-green-300">
          <Database className="h-6 w-6" />
          <span>Knowledge Graph & Data Architecture</span>
        </h4>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-white mb-2">Current Implementation:</p>
            <p className="text-sm text-green-200 leading-relaxed">
              The system uses a <strong>hierarchical data structure</strong> with cross-referencing rather than a formal knowledge graph. 
              Memory is stored in structured JSON with pattern matching and association algorithms. While not a true RDF/Neo4j-style 
              knowledge graph, it implements similar concepts of entity relationships, semantic clustering, and temporal connections.
            </p>
          </div>
          <div>
            <p className="font-medium text-white mb-2">Future Enhancements:</p>
            <p className="text-sm text-green-200 leading-relaxed">
              Plans include migration to a proper graph database (Neo4j/ArangoDB) for more sophisticated relationship modeling, 
              vector embeddings for semantic similarity, and integration with large language models for enhanced understanding.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-900 bg-opacity-50 rounded-lg p-4 border border-yellow-500 border-opacity-50">
        <p className="text-yellow-100 text-sm">
          <strong>Academic Transparency:</strong> This implementation extends and builds upon existing research in cognitive modeling 
          and human-AI collaboration. All original research is credited to its respective authors. This project serves as an 
          educational demonstration and research tool, not a commercial product. If you use this code, please maintain proper attribution.
        </p>
      </div>
    </div>
  );
};

export default AttributionSection;