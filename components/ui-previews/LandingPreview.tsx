import React from 'react';
import { Palette, ColorRole } from '../../types';

interface PreviewProps {
  palette: Palette;
}

export const LandingPreview: React.FC<PreviewProps> = ({ palette }) => {
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
    <div className="w-full h-full overflow-hidden rounded-lg shadow-inner flex flex-col font-sans transition-colors duration-500" style={{ backgroundColor: styles.bg }}>
      {/* Navbar */}
      <div className="px-6 py-4 flex justify-between items-center border-b" style={{ borderColor: `${styles.textMuted}20` }}>
        <div className="font-bold text-xl tracking-tight" style={{ color: styles.primary }}>Brand.</div>
        <div className="hidden sm:flex gap-6 text-sm font-medium" style={{ color: styles.textMain }}>
          <span>Product</span>
          <span>Features</span>
          <span>Company</span>
        </div>
        <button 
          className="px-4 py-2 rounded-full text-sm font-bold shadow-sm transition-transform active:scale-95"
          style={{ backgroundColor: styles.primary, color: styles.bg }}
        >
          Get Started
        </button>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 sm:p-12">
        <div 
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide border"
            style={{ 
                borderColor: `${styles.secondary}40`, 
                backgroundColor: `${styles.secondary}10`,
                color: styles.secondary
            }}
        >
            New Release v2.0
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight max-w-2xl" style={{ color: styles.textMain }}>
            Build faster with <span style={{ color: styles.secondary }}>Intelligent</span> colors.
        </h1>
        <p className="text-lg max-w-lg mb-8 leading-relaxed" style={{ color: styles.textMuted }}>
            Our platform provides the best tools for creators to generate assets on the fly. Start your journey today.
        </p>
        <div className="flex gap-4">
             <button 
                className="px-6 py-3 rounded-lg font-semibold shadow-md transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: styles.primary, color: styles.bg }}
            >
                Start Free Trial
            </button>
            <button 
                className="px-6 py-3 rounded-lg font-semibold border transition-all hover:bg-black/5"
                style={{ borderColor: styles.textMuted, color: styles.textMain }}
            >
                View Demo
            </button>
        </div>
      </div>

      {/* Features Cards Preview */}
      <div className="px-8 pb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
            <div 
                key={i} 
                className="p-6 rounded-xl shadow-sm border"
                style={{ backgroundColor: styles.surface, borderColor: `${styles.textMuted}10` }}
            >
                <div 
                    className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${styles.accent}20`, color: styles.accent }}
                >
                    <div className="w-5 h-5 bg-current rounded-full opacity-50" />
                </div>
                <div className="h-4 w-24 rounded mb-2 opacity-80" style={{ backgroundColor: styles.textMain }}></div>
                <div className="h-3 w-full rounded opacity-40" style={{ backgroundColor: styles.textMuted }}></div>
                <div className="h-3 w-2/3 rounded mt-2 opacity-40" style={{ backgroundColor: styles.textMuted }}></div>
            </div>
        ))}
      </div>
    </div>
  );
};