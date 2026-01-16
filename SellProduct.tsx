
import React from 'react';
import { UserRole, Team } from '../types';
import { ArrowLeft, DollarSign, Target, Package } from 'lucide-react';

interface SellProductProps {
  role: UserRole;
  teams: Team[];
  updateEarnings: (id: string, val: number) => void;
  onBack: () => void;
}

const SellProduct: React.FC<SellProductProps> = ({ role, teams, updateEarnings, onBack }) => {
  const isMember = role === UserRole.TEAM_MEMBER || role === UserRole.COORDINATOR;

  return (
    <div className="space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> BACK TO HUB
      </button>

      <header>
        <h1 className="text-4xl font-syncopate font-bold uppercase">Sell The Product</h1>
        <p className="text-emerald-400 font-mono text-sm uppercase">Commercial Sector Alpha</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-8 border-emerald-500/20">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold uppercase">Active Sales Log</h2>
            </div>
            
            <div className="space-y-4">
              {teams.map(team => (
                <div key={team.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <span className="font-bold">{team.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-mono text-emerald-400">${team.sellProductEarnings.toLocaleString()}</span>
                    {isMember && (
                      <input 
                        type="number" 
                        placeholder="Add Earnings..."
                        className="w-32 bg-black border border-emerald-500/30 rounded px-2 py-1 text-sm outline-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = parseFloat((e.target as HTMLInputElement).value);
                            if (!isNaN(val)) {
                              updateEarnings(team.id, team.sellProductEarnings + val);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 border-white/10">
            <h3 className="text-sm font-mono uppercase text-gray-500 mb-4">Market Intel</h3>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                <Target className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-sm font-bold">Today&apos;s High-Value Client</h4>
                <p className="text-xs text-gray-400 mt-1">Tech conglomerates are looking for energy-efficient IoT modules. Double your pitch points in this sector.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                <DollarSign className="w-5 h-5 text-gray-400 mb-2" />
                <h4 className="text-sm font-bold">Standard ROI: 14%</h4>
                <p className="text-xs text-gray-400 mt-1">Average market return remains stable. Watch out for inflation hits from Team Binary Beasts.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellProduct;
