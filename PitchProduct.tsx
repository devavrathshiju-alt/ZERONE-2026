
import React, { useState } from 'react';
import { UserRole, Team } from '../types';
import { ArrowLeft, Sparkles, Mic2, Star, RefreshCw, Loader2 } from 'lucide-react';
import { generatePitchProduct } from '../geminiService';

interface PitchProductProps {
  role: UserRole;
  teams: Team[];
  updateMarks: (id: string, val: number) => void;
  onBack: () => void;
}

const PitchProduct: React.FC<PitchProductProps> = ({ role, teams, updateMarks, onBack }) => {
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isJudge = role === UserRole.JUDGE || role === UserRole.COORDINATOR;

  const handleGenerate = async () => {
    setIsLoading(true);
    const product = await generatePitchProduct();
    if (product) setCurrentProduct(product);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> BACK TO HUB
      </button>

      <header className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-4xl font-syncopate font-bold uppercase">Pitch The Product</h1>
          <p className="text-pink-400 font-mono text-sm uppercase">Creative Innovation Center</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={isLoading}
          className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center gap-2 transition disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-pink-400" />}
          GENERATE RANDOM PRODUCT
        </button>
      </header>

      {currentProduct && (
        <div className="glass rounded-3xl p-8 md:p-12 border-pink-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[100px]" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6">
                <Mic2 className="text-pink-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-syncopate font-bold mb-4">{currentProduct.name}</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {currentProduct.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-[10px] font-mono uppercase text-pink-400 mb-1">Target Audience</p>
                  <p className="text-sm font-bold">{currentProduct.targetAudience}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-[10px] font-mono uppercase text-pink-400 mb-1">Primary Tech</p>
                  <p className="text-sm font-bold">{currentProduct.techUsed}</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square glass rounded-3xl border-white/10 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
               <div className="text-center p-8 z-10">
                 <p className="text-sm font-mono text-gray-400 mb-2 uppercase">Core AI Identity Code</p>
                 <p className="text-xs font-mono text-pink-500 break-all">{Math.random().toString(36).substring(2, 15)}</p>
               </div>
               <div className="absolute inset-0 border-[20px] border-white/5 pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {!currentProduct && !isLoading && (
        <div className="h-64 glass border-dashed rounded-3xl flex items-center justify-center text-gray-500 italic">
          Click &quot;Generate Random Product&quot; to begin the session.
        </div>
      )}

      <div className="glass rounded-2xl p-6 border-white/5">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          JUDGE&apos;S SCORECARD
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teams.map(team => (
            <div key={team.id} className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-sm font-bold mb-3">{team.name}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-syncopate">{team.pitchProductMarks}</span>
                {isJudge && (
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(v => (
                      <button 
                        key={v}
                        onClick={() => updateMarks(team.id, v * 20)}
                        className={`w-6 h-6 rounded text-[10px] border ${team.pitchProductMarks >= v * 20 ? 'bg-pink-500/40 border-pink-500' : 'border-white/10'}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PitchProduct;
