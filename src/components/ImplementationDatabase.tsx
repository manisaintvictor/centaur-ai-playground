import React, { useState, useEffect } from 'react';
import { 
  Database, Calendar, Code, Download, Upload, BarChart3, 
  GitBranch, Package, Zap, Clock, CheckCircle, Settings,
  TrendingUp, Archive, Layers
} from 'lucide-react';
import { ImplementationTracker, ImplementationEntry, FeatureSummary } from '../services/implementationTracker';

const ImplementationDatabase: React.FC = () => {
  const [tracker] = useState(() => ImplementationTracker.getInstance());
  const [implementations, setImplementations] = useState<ImplementationEntry[]>([]);
  const [features, setFeatures] = useState<FeatureSummary[]>([]);
  const [statistics, setStatistics] = useState<any>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setImplementations(tracker.getImplementationHistory());
    setFeatures(tracker.getFeatureSummary());
    setStatistics(tracker.getStatistics());
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'memory-system': return <Layers className="h-4 w-4" />;
      case 'ui-enhancement': return <Zap className="h-4 w-4" />;
      case 'data-persistence': return <Database className="h-4 w-4" />;
      case 'testing-lab': return <Settings className="h-4 w-4" />;
      case 'attribution': return <Archive className="h-4 w-4" />;
      case 'analytics': return <BarChart3 className="h-4 w-4" />;
      default: return <Code className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'memory-system': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'ui-enhancement': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'data-persistence': return 'bg-green-100 text-green-800 border-green-300';
      case 'testing-lab': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'attribution': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'analytics': return 'bg-pink-100 text-pink-800 border-pink-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'planned': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const filteredImplementations = selectedCategory === 'all' 
    ? implementations 
    : implementations.filter(impl => impl.category === selectedCategory);

  const handleExport = () => {
    const data = tracker.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `centaur-ai-implementation-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (tracker.importData(content)) {
          loadData();
          alert('Implementation data imported successfully!');
        } else {
          alert('Failed to import data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Database className="h-8 w-8 text-indigo-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Implementation Database</h2>
            <p className="text-gray-600">Tracking development progress and feature history</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm text-gray-500">Version</div>
            <div className="font-semibold text-indigo-600">{statistics.latestVersion}</div>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Clock className="h-4 w-4" />
            <span>{showHistory ? 'Hide' : 'Show'} History</span>
          </button>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center space-x-2 mb-2">
            <GitBranch className="h-5 w-5 text-purple-600" />
            <span className="font-semibold text-purple-800">Implementations</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">{statistics.totalImplementations}</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Package className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-800">Features</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">{statistics.totalFeatures}</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-800">Categories</span>
          </div>
          <div className="text-2xl font-bold text-green-900">
            {Object.keys(statistics.implementationsByCategory || {}).length}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <span className="font-semibold text-orange-800">Growth</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">Active</div>
        </div>
      </div>

      {/* Feature Summary for Visitors */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <Zap className="h-6 w-6 text-yellow-600" />
          <span>Feature Overview</span>
        </h3>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
              <div className="font-semibold text-gray-800">{feature.title}</div>
              <div className="text-sm text-green-600 font-medium">{feature.status}</div>
              <div className="text-sm text-gray-600 mb-1">{feature.description}</div>
              <div className="text-xs text-gray-500">
                {feature.category} • Updated {feature.lastUpdated}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation History */}
      {showHistory && (
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center space-x-2">
              <Clock className="h-6 w-6 text-gray-600" />
              <span>Development History</span>
            </h3>
            <div className="flex items-center space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="all">All Categories</option>
                <option value="memory-system">Memory System</option>
                <option value="ui-enhancement">UI Enhancement</option>
                <option value="data-persistence">Data Persistence</option>
                <option value="testing-lab">Testing Lab</option>
                <option value="attribution">Attribution</option>
                <option value="analytics">Analytics</option>
              </select>
              <button
                onClick={handleExport}
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
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            {filteredImplementations.map((impl, index) => (
              <div key={impl.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded border flex items-center space-x-1 ${getCategoryColor(impl.category)}`}>
                      {getCategoryIcon(impl.category)}
                      <span className="text-sm font-medium">{impl.category.replace('-', ' ')}</span>
                    </span>
                    <h4 className="font-semibold text-lg text-gray-800">{impl.title}</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">v{impl.version}</div>
                    <div className="text-xs text-gray-400">{impl.date}</div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{impl.description}</p>
                
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Features Implemented:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {impl.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded p-3 border">
                  <h5 className="font-semibold text-gray-800 mb-1 text-sm">Technical Details:</h5>
                  <p className="text-xs text-gray-600">{impl.technicalDetails}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImplementationDatabase;