import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, Home, Mountain } from 'lucide-react';

const Bjeshket: React.FC = () => {
  const settlements = [
    { name: 'Bajram Curri', type: 'Town', unit: 'Municipal Centre of Tropoja' },
    { name: 'Babinë', type: 'Village', unit: 'Tropojë Fshat' },
    { name: 'Begaj', type: 'Village', unit: 'Tropojë Fshat' },
    { name: 'Berishë', type: 'Village', unit: 'Bytyç' },
    { name: 'Bëtosh', type: 'Village', unit: 'Lekbibaj' },
    { name: 'Bllatë', type: 'Village', unit: 'Bujan' },
    { name: 'Bradoshnicë', type: 'Village', unit: 'Margegaj' },
    { name: 'Breg‑Lumi / Rajë', type: 'Village', unit: 'Fierzë' },
    { name: 'Bricë', type: 'Village', unit: 'Lekbibaj' },
    { name: 'Buçaj', type: 'Village', unit: 'Tropojë Fshat' },
    { name: 'Bujan', type: 'Centre', unit: 'Bujan' },
    { name: 'Bukovë', type: 'Village', unit: 'Llugaj' },
    { name: 'Çerem', type: 'Village', unit: 'Margegaj' },
    { name: 'Çorraj', type: 'Village', unit: 'Bytyç' },
    { name: 'Curraj i Epërm', type: 'Village', unit: 'Lekbibaj' },
    { name: 'Curraj i Poshtem', type: 'Village', unit: 'Lekbibaj' },
    { name: 'Degë', type: 'Village', unit: 'Fierzë' },
    { name: 'Dobërdol', type: 'Village', unit: 'Tropojë Fshat' },
    { name: 'Dojan', type: 'Village', unit: 'Bujan' },
    { name: 'Dragobi', type: 'Village', unit: 'Margegaj' },
    { name: 'Dubravë', type: 'Village', unit: 'Bujan' },
    { name: 'Dushaj', type: 'Village', unit: 'Fierzë' },
    { name: 'Fierzë', type: 'Centre', unit: 'Fierzë' },
    { name: 'Fushë Lumë', type: 'Village', unit: 'Bujan' },
    { name: 'Gegaj', type: 'Village', unit: 'Tropojë Fshat' },
    { name: 'Geghysen - Lëkurtaj', type: 'Village', unit: 'Bujan' },
    { name: 'Geghysen - Selimaj', type: 'Village', unit: 'Bujan' },
    { name: 'Gjonpepaj', type: 'Village', unit: 'Lekbibaj' },
    { name: 'Gri', type: 'Village', unit: 'Bujan' },
    { name: 'Cërrnicë / Jah Salihi', type: 'Village', unit: 'Llugaj' },
    { name: 'Kam Fshat', type: 'Village', unit: 'Bytyç' },
    { name: 'Kasaj', type: 'Village', unit: 'Tropojë Fshat' },
    { name: 'Katund i Paqës', type: 'Village', unit: 'Margegaj' },
    { name: 'Kepenek', type: 'Village', unit: 'Bytyç' },
    { name: 'Kërrnajë', type: 'Village', unit: 'Tropojë Fshat' },
    { name: 'Koçanaj', type: 'Village', unit: 'Margegaj' },
    { name: 'Kojel', type: 'Village', unit: 'Tropojë Fshat' },
    { name: 'Kovaç', type: 'Village', unit: 'Tropojë Fshat' },
    { name: 'Lekbibaj', type: 'Centre', unit: 'Lekbibaj' },
    { name: 'Leniq', type: 'Village', unit: 'Bytyç' },
    { name: 'Llugaj', type: 'Centre', unit: 'Llugaj' },
    { name: 'Luzhë', type: 'Village', unit: 'Llugaj' },
    { name: 'Margegaj', type: 'Centre', unit: 'Margegaj' },
    { name: 'Markaj', type: 'Village', unit: 'Bujan' },
    { name: 'Mashë', type: 'Village', unit: 'Bytyç' },
    { name: 'Myhejan', type: 'Village', unit: 'Tropojë Fshat' },
    { name: 'Pac', type: 'Village', unit: 'Bytyç' },
    { name: 'Palç', type: 'Village', unit: 'Lekbibaj' },
    { name: 'Papaj', type: 'Village', unit: 'Tropojë Fshat' },
    { name: 'Peraj', type: 'Village', unit: 'Lekbibaj' },
    { name: 'Prush', type: 'Village', unit: 'Bytyç' },
    { name: 'Qereç‑Mulaj', type: 'Village', unit: 'Lekbibaj' },
    { name: 'Rragam/Llugaj', type: 'Village', unit: 'Llugaj' },
    { name: 'Rragam/Valbone', type: 'Village', unit: 'Margegaj' },
    { name: 'Salca (Selcë)', type: 'Village', unit: 'Lekbibaj' },
    { name: 'Shëngjergji', type: 'Village', unit: 'Lekbibaj' },
    { name: 'Shkëlzen', type: 'Pilgrimage Centre', unit: 'Tropojë Fshat' },
    { name: 'Shoshan', type: 'Village', unit: 'Margegaj' },
    { name: 'Shumicë‑Ahmataj', type: 'Village', unit: 'Tropojë Fshat' },
    { name: 'Sinanaj', type: 'Village', unit: 'Bytyç' },
    { name: 'Sopot', type: 'Village', unit: 'Tropojë Fshat' },
    { name: 'T\'plan', type: 'Village', unit: 'Fierzë' },
    { name: 'Tetaj', type: 'Village', unit: 'Lekbibaj' },
    { name: 'Tropojë (Tropojë Fshat)', type: 'Centre', unit: 'Tropojë Fshat' },
    { name: 'Valbonë (Valbona)', type: 'Village', unit: 'Margegaj' },
    { name: 'Viçidol', type: 'Village', unit: 'Tropojë Fshat' },
    { name: 'Vlad', type: 'Village', unit: 'Bytyç' },
    { name: 'Zall Kuc', type: 'Village', unit: 'Tropojë Fshat' },
    { name: 'Zherkë', type: 'Village', unit: 'Bytyç' },
    { name: 'Zogaj', type: 'Village', unit: 'Bytyç' }
  ];

  // Sort settlements: Bajram Curri first, then alphabetically
  const sortedSettlements = settlements.sort((a, b) => {
    if (a.name === 'Bajram Curri') return -1;
    if (b.name === 'Bajram Curri') return 1;
    return a.name.localeCompare(b.name);
  });

  const getTypeIcon = (type: string) => {
    if (type === 'Town') return <Building2 className="h-5 w-5 text-blue-600" />;
    if (type === 'Centre' || type === 'Pilgrimage Centre') return <MapPin className="h-5 w-5 text-purple-600" />;
    return <Home className="h-5 w-5 text-green-600" />;
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'Town': 'bg-blue-100 text-blue-800 border-blue-200',
      'Centre': 'bg-purple-100 text-purple-800 border-purple-200',
      'Village': 'bg-green-100 text-green-800 border-green-200',
      'Pilgrimage Centre': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type as keyof typeof colors] || colors.Village;
  };

  const formatDescription = (settlement: any) => {
    if (settlement.name === 'Bajram Curri') {
      return `${settlement.type} - ${settlement.unit}`;
    }
    const typeText = settlement.type === 'Centre' ? 'Administrative Centre' : settlement.type;
    return `${typeText} in Administrative Unit of ${settlement.unit}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Mountain className="h-8 w-8 text-blue-600" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Every Town & Every Village
          </h2>
        </div>
        <p className="text-lg text-muted-foreground">Complete Guide to All Settlements in Tropoja</p>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Building2 className="h-4 w-4 text-blue-600" />
            Towns
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-purple-600" />
            Centres
          </span>
          <span className="flex items-center gap-1">
            <Home className="h-4 w-4 text-green-600" />
            Villages
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedSettlements.map((settlement, index) => (
          <Card 
            key={index}
            className="group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-500"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getTypeIcon(settlement.type)}
                  <div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {settlement.name}
                    </CardTitle>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getTypeBadge(settlement.type)}`}
                >
                  {settlement.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm leading-relaxed">
                {formatDescription(settlement)}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
        <p className="text-lg font-semibold text-gray-800">
          Total: {settlements.length} Settlements
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Covering all administrative units in Tropoja Municipality
        </p>
      </div>
    </div>
  );
};

export default Bjeshket;