
import React from 'react';
import { UserRole, Team } from '../types';
import { ArrowLeft, Save, Plus, Minus, TrendingUp } from 'lucide-react';

interface MindclansProps {
  role: UserRole;
  teams: Team[];
  updateScore: (id: string, val: number) => void;
  onBack: () => void;
}

const Mindclans: React.FC<MindclansProps> = ({ role, teams, updateScore, onBack }) => {
  const isAdmin = role === UserRole.COORDINATOR;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> BACK TO HUB
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-4xl font-syncopate font-bold uppercase tracking-tight">MINDCLANS</h1>
          <p className="text-purple-400 font-mono text-sm uppercase mt-1">Global Leaderboard</p>
        </div>
        {isAdmin && (
          <div className="px-4 py-2 bg-purple-600/10 border border-purple-500/30 rounded text-xs text-purple-400 font-bold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            LIVE ADMIN CONTROLS ACTIVE
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teams.map((team, idx) => (
          <div key={team.id} className="glass rounded-xl p-6 border-white/5 hover:border-purple-500/20 transition relative overflow-hidden group">
             {/* Rank Indicator */}
             <div className="absolute top-0 right-0 p-4 font-syncopate text-4xl text-white/5 select-none">
              #{idx + 1}
            </div>

            <div className="flex justify-between items-center mb-4 relative z-10">
              <div>
                <h3 className="text-xl font-bold">{team.name}</h3>
                <p className="text-xs font-mono text-gray-500">ID: {team.id}</p>
              </div>
              <div className="text-3xl font-syncopate font-bold text-white">
                {team.mindclansScore}
              </div>
            </div>

            <div className="h-2 w-full bg-white/5 rounded-full mb-6 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-1000 ease-out"
                style={{ width: `${Math.min((team.mindclansScore / 100) * 100, 100)}%` }}
              />
            </div>

            {isAdmin && (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => updateScore(team.id, Math.max(0, team.mindclansScore - 5))}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => updateScore(team.id, team.mindclansScore + 5)}
                  className="flex-1 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded flex items-center justify-center transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {!isAdmin && (
        <div className="p-12 glass rounded-2xl flex flex-col items-center justify-center text-center gap-4 opacity-50">
          <TrendingUp className="w-12 h-12 text-purple-500" />
          <div>
            <h3 className="text-lg font-bold">Watch Live</h3>
            <p className="text-sm text-gray-400">Coordinators are updating scores in real-time. Stay sharp.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mindclans;
