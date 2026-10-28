import React from 'react';
import { Calendar, Home, Users, MapPin, MessageCircle } from 'lucide-react';

interface QuickNavProps {
  activeSection?: string;
  onNavigate: (sectionId: string) => void;
}

export const QuickNav: React.FC<QuickNavProps> = ({ onNavigate }) => {
  const navItems = [
    { id: 'hero-section', label: 'आरम्भ', icon: Home },
    { id: 'events-section', label: 'कार्यक्रम', icon: Calendar },
    { id: 'family-section', label: 'परिवार', icon: Users },
    { id: 'venue-section', label: 'स्थल', icon: MapPin },
    { id: 'rsvp-section', label: 'RSVP', icon: MessageCircle },
  ];

  return (
    <nav
      aria-label="मुख्य नेविगेशन"
      className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-charcoal-dark/95 border-t border-antique-gold/30 backdrop-blur-lg shadow-2xl transition-all duration-300"
    >
      <div className="max-w-md mx-auto px-3 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group flex flex-col items-center justify-center min-w-[54px] py-1 text-sandstone/75 hover:text-antique-gold active:scale-95 transition-all"
            >
              <Icon className="w-4 h-4 mb-0.5 group-hover:scale-110 group-hover:text-antique-gold transition-transform" />
              <span className="text-[11px] font-hindi font-medium tracking-tight group-hover:text-antique-gold">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

