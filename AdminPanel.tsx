
import React, { useState } from 'react';
import { Team } from '../types';
import { Plus, Trash2, Users, ArrowLeft, ShieldCheck } from 'lucide-react';

interface AdminPanelProps {
  teams: Team[];
  addTeam: (name: string, members: string[]) => void;
  removeTeam: (id: string) => void;
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ teams, addTeam, removeTeam, onBack }) => {
  const [newName, setNewName] = useState('');
  const [newMembers, setNewMembers] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const membersArray = newMembers.split(',').map(m => m.trim()).filter(m => m !== '');
    addTeam(newName, membersArray);
    setNewName('');
    setNewMembers('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> BACK TO HUB
      </button>

      <header className="flex items-center gap-4">
        <div className="p-3 bg-purple-600/20 rounded-xl border border-purple-500/50">
          <ShieldCheck className="text-purple-400" />
        </div>
        <div>
          <h1 className="text-4xl font-syncopate font-black uppercase">Team Registry</h1>
          <p className="text-purple-400 font-mono text-sm uppercase">Secure Management Terminal</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form onSubmit={handleAdd} className="glass p-8 rounded-3xl border-purple-500/20 sticky top-24">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-400" /> NEW RECORD
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Team Name</label>
                <input 
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Cyber Phantoms"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Members (comma separated)</label>
                <textarea 
                  value={newMembers}
                  onChange={(e) => setNewMembers(e.target.value)}
                  placeholder="Alice, Bob, Charlie"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500 transition h-24 resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-purple-600 rounded-xl font-bold tracking-widest hover:bg-purple-500 transition shadow-lg shadow-purple-600/20"
              >
                COMMIT TO BLOCKCHAIN
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 px-2">
            <Users className="w-5 h-5 text-purple-400" /> ACTIVE ENTITIES ({teams.length})
          </h2>
          {teams.length === 0 ? (
            <div className="glass p-20 rounded-3xl border-dashed border-2 border-white/5 flex flex-col items-center justify-center text-gray-600">
              <p className="font-mono text-sm">NO TEAMS REGISTERED IN SYSTEM</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {teams.map(team => (
                <div key={team.id} className="glass p-6 rounded-2xl flex items-center justify-between border-white/5 group hover:border-purple-500/30 transition-all">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-purple-400 transition">{team.name}</h3>
                    <div className="flex gap-2 mt-1">
                      {team.members.map((m, i) => (
                        <span key={i} className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">{m}</span>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => removeTeam(team.id)}
                    className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
