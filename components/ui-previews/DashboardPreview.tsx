import React from 'react';
import { Palette, ColorRole } from '../../types';
import { Icons } from '../Icons';

interface PreviewProps {
  palette: Palette;
}

export const DashboardPreview: React.FC<PreviewProps> = ({ palette }) => {
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
    <div className="w-full h-full flex overflow-hidden rounded-lg shadow-inner font-sans transition-colors duration-500" style={{ backgroundColor: styles.bg }}>
      {/* Sidebar */}
      <div className="w-16 sm:w-64 border-r flex flex-col hidden sm:flex" style={{ backgroundColor: styles.surface, borderColor: `${styles.textMuted}20` }}>
        <div className="h-16 flex items-center px-6 border-b" style={{ borderColor: `${styles.textMuted}20` }}>
          <div className="w-6 h-6 rounded mr-3" style={{ backgroundColor: styles.primary }}></div>
          <span className="font-bold hidden sm:block" style={{ color: styles.textMain }}>Dash.</span>
        </div>
        <div className="p-4 space-y-2">
            {['Overview', 'Analytics', 'Customers', 'Settings'].map((item, idx) => (
                <div 
                    key={item}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer flex items-center gap-3 transition-colors ${idx === 0 ? 'bg-opacity-10' : 'hover:bg-black/5'}`}
                    style={{ 
                        backgroundColor: idx === 0 ? styles.primary : 'transparent',
                        color: idx === 0 ? styles.primary : styles.textMuted 
                    }}
                >
                    <div className="w-4 h-4 rounded-full bg-current opacity-50" />
                    {item}
                </div>
            ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="h-16 border-b flex items-center justify-between px-8" style={{ backgroundColor: styles.surface, borderColor: `${styles.textMuted}20` }}>
            <h2 className="font-semibold" style={{ color: styles.textMain }}>Overview</h2>
            <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full border-2" style={{ borderColor: styles.accent }}></div>
            </div>
        </div>

        {/* Dashboard Grid */}
        <div className="p-8 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { label: 'Total Revenue', val: '$45,231', trend: '+20.1%' },
                    { label: 'Active Users', val: '2,345', trend: '+15.2%' },
                    { label: 'Bounce Rate', val: '12.5%', trend: '-4.3%' }
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-xl shadow-sm border" style={{ backgroundColor: styles.surface, borderColor: `${styles.textMuted}10` }}>
                        <div className="text-sm font-medium mb-1" style={{ color: styles.textMuted }}>{stat.label}</div>
                        <div className="text-2xl font-bold mb-4" style={{ color: styles.textMain }}>{stat.val}</div>
                        <div className="text-xs font-semibold px-2 py-1 rounded-full inline-block" style={{ backgroundColor: `${styles.secondary}20`, color: styles.secondary }}>
                            {stat.trend} from last month
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart Area */}
            <div className="rounded-xl p-6 shadow-sm border h-64 flex flex-col" style={{ backgroundColor: styles.surface, borderColor: `${styles.textMuted}10` }}>
                <h3 className="text-sm font-semibold mb-6" style={{ color: styles.textMain }}>Revenue Overview</h3>
                <div className="flex-1 flex items-end justify-between gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 65].map((h, i) => (
                        <div key={i} className="w-full rounded-t-sm relative group" style={{ height: `${h}%`, backgroundColor: i % 2 === 0 ? styles.primary : styles.secondary }}>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {h}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};