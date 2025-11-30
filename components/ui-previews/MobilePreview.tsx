import React from 'react';
import { Palette, ColorRole } from '../../types';

interface PreviewProps {
  palette: Palette;
}

export const MobilePreview: React.FC<PreviewProps> = ({ palette }) => {
  const get = (role: ColorRole) => palette.colors.find(c => c.role === role)?.hex || '#000';

  const styles = {
    bg: get(ColorRole.BACKGROUND),
    surface: get(ColorRole.SURFACE),
    primary: get(ColorRole.PRIMARY),
    secondary: get(ColorRole.SECONDARY),
    accent: get(ColorRole.ACCENT),
    textMain: get(ColorRole.TEXT_MAIN),
    textMuted: get(ColorRole.TEXT_MUTED),
  };

  return (
    <div className="flex justify-center items-center h-full py-4">
      <div 
        className="w-[300px] h-[580px] rounded-[3rem] border-[8px] overflow-hidden relative shadow-2xl flex flex-col font-sans"
        style={{ borderColor: '#1e293b', backgroundColor: styles.bg }}
      >
        {/* Dynamic Island / Notch area */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-transparent z-20 flex justify-center">
             <div className="w-24 h-5 bg-black rounded-b-xl"></div>
        </div>

        {/* Header */}
        <div className="pt-10 pb-4 px-6 flex justify-between items-center">
             <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5" style={{ color: styles.textMain }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
             </div>
             <div className="w-8 h-8 rounded-full overflow-hidden border" style={{ borderColor: styles.accent }}>
                <img src="https://picsum.photos/100/100" alt="Avatar" className="w-full h-full object-cover"/>
             </div>
        </div>

        <div className="px-6 mb-6">
            <h2 className="text-2xl font-bold leading-tight" style={{ color: styles.textMain }}>
                Find your <br/>
                <span style={{ color: styles.primary }}>Inspiration</span>
            </h2>
        </div>

        {/* Search */}
        <div className="px-6 mb-8">
            <div className="h-12 rounded-xl flex items-center px-4" style={{ backgroundColor: styles.surface }}>
                 <svg className="w-5 h-5 mr-3 opacity-50" style={{ color: styles.textMain }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                 <span className="text-sm opacity-50" style={{ color: styles.textMuted }}>Search for items...</span>
            </div>
        </div>

        {/* Cards */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4 no-scrollbar">
            {/* Featured Card */}
            <div className="h-48 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden shadow-lg" style={{ backgroundColor: styles.primary }}>
                 {/* Decorative circles */}
                 <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-20 bg-white" />
                 <div className="absolute left-10 bottom-10 w-16 h-16 rounded-full opacity-10 bg-black" />
                 
                 <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded">Trending</span>
                 </div>
                 <div className="relative z-10">
                    <h3 className="text-white text-xl font-bold mb-1">Abstract 3D Art</h3>
                    <p className="text-white/80 text-xs">Discover the latest collection</p>
                 </div>
            </div>

            {/* List Items */}
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 rounded-xl p-3 flex items-center gap-4 shadow-sm" style={{ backgroundColor: styles.surface }}>
                    <div className="w-14 h-14 rounded-lg flex-shrink-0" style={{ backgroundColor: i % 2 ? styles.secondary : styles.accent }}></div>
                    <div className="flex-1">
                        <div className="h-3 w-2/3 rounded mb-2" style={{ backgroundColor: `${styles.textMain}20` }}></div>
                        <div className="h-2 w-1/3 rounded" style={{ backgroundColor: `${styles.textMuted}40` }}></div>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${styles.bg}80` }}>
                        <svg className="w-4 h-4" style={{ color: styles.textMain }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};