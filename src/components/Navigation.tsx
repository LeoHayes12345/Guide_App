import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Map, Bed, Utensils, Church, Trophy, Car, Mountain, Users, Calendar, MessageCircle } from 'lucide-react';

interface NavigationProps {
  onNavigate: (section: string) => void;
  onWhatsAppClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, onWhatsAppClick }) => {
  const sections = [
    { id: 'bjeshket', label: 'Every Town & Every Village', subtitle: 'Complete Guide', icon: Mountain },
    { id: 'attractions', label: 'Places to Visit', subtitle: 'Popular Attractions', icon: MapPin },
    { id: 'maps', label: 'Maps & Hiking', subtitle: 'Trails & Routes', icon: Map },
    { id: 'accommodation', label: 'Places to Stay', subtitle: 'Hotels & Guesthouses', icon: Bed },
    { id: 'restaurants', label: 'Places to Eat', subtitle: 'Restaurants', icon: Utensils },
    { id: 'religion', label: 'Religion & Pilgrimage', subtitle: 'Sacred Places', icon: Church },
    { id: 'recreation', label: 'Recreation', subtitle: 'Sports & Activities', icon: Trophy },
    { id: 'transport', label: 'Car Hire & Transport', subtitle: 'Travel Info', icon: Car },
    { id: 'guide', label: 'Local Guides', subtitle: 'Connect with a Guide Now', icon: Users },
    { id: 'events', label: 'Events', subtitle: 'What\'s On', icon: Calendar },
  ];

  return (
    <div className="space-y-4">
      {/* Main Navigation */}
      <Card className="p-4 bg-slate-700/50 border-slate-600">
        <div className="grid grid-cols-2 gap-3">
          {sections.map(({ id, label, subtitle, icon: Icon }) => (
            <Button
              key={id}
              variant="outline"
              className="h-20 flex flex-col gap-1 p-3 bg-slate-600/30 border-slate-500 hover:bg-slate-500/50 text-slate-100 hover:text-white"
              onClick={() => onNavigate(id)}
            >
              <Icon className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-slate-300">{subtitle}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* WhatsApp Live Chat Option - Moved to Bottom */}
      <Card className="p-4 bg-green-600/20 border-green-500">
        <Button
          onClick={onWhatsAppClick}
          className="w-full h-16 bg-green-600 hover:bg-green-700 text-white flex flex-col gap-1"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-lg font-semibold">Chat Live on WhatsApp</span>
          <span className="text-sm opacity-90">Get instant help from local experts</span>
        </Button>
      </Card>
    </div>
  );
};

export default Navigation;