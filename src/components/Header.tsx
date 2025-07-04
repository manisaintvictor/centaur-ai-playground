import React from 'react';
import { Brain, Zap, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Brain className="h-8 w-8 text-purple-400" />
              <Zap className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Bionic Butterfly Lab</h1>
              <p className="text-sm text-purple-300">Centaur AI Memory Testing Platform - Dr. Mani Saint-Victor, MD, CH</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-purple-800 bg-opacity-30 rounded-full">
              <User className="h-3 w-3 text-purple-300" />
              <span className="text-xs text-purple-300">Dr. Mani Saint-Victor</span>
            </div>
            <div className="px-3 py-1 bg-purple-800 bg-opacity-50 rounded-full text-sm">
              v1.0.0
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;