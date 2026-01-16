
import React from 'react';
import { GAMES, ICONS } from '../constants';
import { GameID, UserRole } from '../types';
import { ExternalLink, Play, Lock, Info, Terminal, Settings, Users, Home as HomeIcon } from 'lucide-react';

interface DashboardProps {
  role: UserRole;
  setPage: (id: any) => void;
  onBackToHome: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ role, setPage, onBackToHome }) => {
  const isAdmin = role === UserRole.COORDINATOR;

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-[-2rem]">
        <button 
          onClick={onBackToHome}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition font-mono text-xs uppercase tracking-widest glass px-4 py-2 rounded-lg border-white/5"
        >
          <HomeIcon className="w-3 h-3" /> Return to Command Landing
        </button>
      </div>

      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/5 pb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <Terminal className="w-3 h-3 text-purple-400" />
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.2em]">Operational Hub Terminal 1.0</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-syncopate font-black uppercase tracking-tighter">
            CONTROL <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-400">CENTRAL</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-xl text-lg">
            Access encrypted game sectors, monitor live performance data, and innovate the next generation of solutions.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Active Credentials</div>
          <div className="px-6 py-3 glass rounded-xl border-purple-500/30 flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-purple-500 animate-ping' : 'bg-green-500'}`} />
            <span className="text-sm font-bold tracking-widest text-white uppercase">
              {isAdmin ? 'ADMIN AUTHORIZED' : 'GUEST PROTOCOL'}
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isAdmin && (
          <div 
            className="group relative flex flex-col glass rounded-[2.5rem] overflow-hidden border-purple-500/40 border-2 transition-all duration-700 hover:-translate-y-2 p-1"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600 opacity-20 blur-[80px]" />
            <div className="p-10 flex-1 flex flex-col relative z-10">
              <div className="mb-10 flex items-start justify-between">
                <div className="p-5 rounded-3xl bg-purple-600/20">
                  <Settings className="text-purple-400 w-8 h-8" />
                </div>
              </div>
              <h3 className="text-3xl font-syncopate font-bold mb-4 tracking-tight">TEAM_ADMIN</h3>
              <p className="text-gray-400 text-lg mb-12">Manage all participating entities, register team names, and define member lists.</p>
              <button 
                onClick={() => setPage('admin')}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-purple-600 text-white font-syncopate font-black text-xs tracking-widest hover:bg-purple-500 transition-all duration-300"
              >
                OPEN REGISTRY <Users className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {GAMES.map((game) => (
          <div 
            key={game.id}
            className="group relative flex flex-col glass rounded-[2.5rem] overflow-hidden hover:border-purple-500/50 transition-all duration-700 hover:-translate-y-2 p-1"
          >
            <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${game.color} opacity-10 blur-[80px] group-hover:opacity-40 transition-opacity duration-700`} />
            <div className="p-10 flex-1 flex flex-col relative z-10">
              <div className="mb-10 flex items-start justify-between">
                <div className="p-5 rounded-3xl bg-white/5 group-hover:scale-110 group-hover:bg-purple-600/20 transition-all duration-500">
                  <div className="text-white group-hover:text-purple-400 transition-colors">
                    {ICONS[game.icon]}
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-syncopate font-bold mb-4 tracking-tight group-hover:translate-x-1 transition-transform">{game.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-12 font-medium opacity-80">{game.description}</p>
              <div className="mt-auto">
                {game.externalLink ? (
                  <a 
                    href={game.externalLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-black font-syncopate font-black text-xs tracking-widest hover:bg-purple-600 hover:text-white transition-all duration-300"
                  >
                    DEPLOY PORTAL <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <button 
                    onClick={() => setPage(game.id)}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-purple-600/10 border border-purple-500/30 hover:bg-purple-600 hover:text-white transition-all duration-300 text-purple-400 font-syncopate font-black text-xs tracking-widest"
                  >
                    ACCESS SECTOR <Play className="w-4 h-4 fill-current" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
