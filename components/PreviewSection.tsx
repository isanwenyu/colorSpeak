import React, { useState } from 'react';
import { Palette, PreviewType } from '../types';
import { LandingPreview } from './ui-previews/LandingPreview';
import { DashboardPreview } from './ui-previews/DashboardPreview';
import { MobilePreview } from './ui-previews/MobilePreview';
import { Icons } from './Icons';

interface PreviewSectionProps {
  palette: Palette;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({ palette }) => {
  const [activeTab, setActiveTab] = useState<PreviewType>('dashboard');

  const renderPreview = () => {
    switch (activeTab) {
      case 'landing': return <LandingPreview palette={palette} />;
      case 'mobile': return <MobilePreview palette={palette} />;
      case 'dashboard': return <DashboardPreview palette={palette} />;
      default: return null;
    }
  };

  const tabs: { id: PreviewType; label: string; icon: React.FC<any> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.LayoutDashboard },
    { id: 'landing', label: 'Landing Page', icon: Icons.LayoutTemplate },
    { id: 'mobile', label: 'Mobile App', icon: Icons.Smartphone },
  ];

  return (
    <div className="w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-[600px] sm:h-[700px]">
      <div className="bg-slate-950/50 backdrop-blur border-b border-slate-800 p-4 flex flex-wrap gap-2 items-center justify-between">
        <h3 className="text-slate-400 font-medium px-2 flex items-center gap-2">
          <Icons.Sparkles className="w-4 h-4 text-amber-400" />
          Real-time Preview
        </h3>
        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 bg-slate-950 p-4 sm:p-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="relative w-full h-full">
            {renderPreview()}
          </div>
      </div>
    </div>
  );
};