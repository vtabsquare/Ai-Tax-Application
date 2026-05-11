import React from 'react';
import { 
  LayoutGrid, 
  Calculator, 
  ArrowLeftRight, 
  Sparkles, 
  FileText, 
  Wallet, 
  Settings,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = ({ activeTab, setActiveTab, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'wizard', label: 'Tax Calculator', icon: Calculator },
    { id: 'comparison', label: 'Regime Comparison', icon: ArrowLeftRight },
    { id: 'recommendations', label: 'AI Recommendations', icon: Sparkles },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'investments', label: 'Investments', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="h-full flex flex-col p-6 glass-sidebar">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles size={18} color="white" fill="white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Tax<span className="text-primary">AI</span></span>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 text-slate-400">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium group",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <Icon size={20} className={cn(isActive ? "text-primary" : "group-hover:text-white")} />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Neural Engine</p>
          <div className="flex items-center gap-2 text-sm">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-slate-300">V2.4 Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
