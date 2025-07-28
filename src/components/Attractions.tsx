import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star, Camera, Mountain, TreePine, Waves, Church, Castle, Building } from 'lucide-react';

const Attractions: React.FC = () => {
  const attractions = [
    {
      id: 1,
      name: 'Valbona Valley National Park',
      description: 'Breathtaking alpine scenery with pristine hiking trails through the Albanian Alps. Home to diverse wildlife and stunning mountain vistas.',
      category: 'Nature Park',
      rating: 4.9,
      icon: <TreePine className="h-5 w-5" />,
      location: 'Valbonë, Margegaj',
      duration: 'Full Day'
    },
    {
      id: 2,
      name: 'Fierza Lake and Dam',
      description: 'Spectacular artificial lake created by the Fierza Dam on the Drin River. Perfect for boating, fishing, and enjoying scenic mountain reflections.',
      category: 'Lake/Dam',
      rating: 4.7,
      icon: <Waves className="h-5 w-5" />,
      location: 'Fierza',
      duration: 'Half Day'
    },
    {
      id: 3,
      name: 'Shala River Tours',
      description: 'Pristine river tours through dramatic canyons and crystal-clear waters. Known as the "Thailand of Albania" for its turquoise beauty.',
      category: 'River Tours',
      rating: 4.8,
      icon: <Waves className="h-5 w-5" />,
      location: 'Shala River',
      duration: 'Full Day'
    },
    {
      id: 4,
      name: 'Cerem Village',
      description: 'Traditional mountain village showcasing authentic Albanian highland culture and architecture with stunning valley views.',
      category: 'Cultural Village',
      rating: 4.5,
      icon: <Castle className="h-5 w-5" />,
      location: 'Cerem',
      duration: 'Half Day'
    },
    {
      id: 5,
      name: 'Bjeshkët e Namuna National Park',
      description: 'Protected national park featuring pristine wilderness, diverse flora and fauna, and spectacular mountain landscapes.',
      category: 'National Park',
      rating: 4.9,
      icon: <TreePine className="h-5 w-5" />,
      location: 'Bjeshkët e Namuna',
      duration: 'Full Day'
    },
    {
      id: 6,
      name: 'Lugbat & Maja e Hekurave',
      description: 'Remote mountain peaks offering challenging hikes and panoramic views of the Albanian Alps and surrounding valleys.',
      category: 'Mountain Peaks',
      rating: 4.6,
      icon: <Mountain className="h-5 w-5" />,
      location: 'Lugbat Region',
      duration: '2-3 Days'
    },
    {
      id: 7,
      name: 'Geghysen & The Chestnut Massif',
      description: 'A unique protected area featuring ancient chestnut forests and diverse ecosystems. Perfect for nature lovers and researchers.',
      category: 'Protected Area',
      rating: 4.7,
      icon: <TreePine className="h-5 w-5" />,
      location: 'Geghysen',
      duration: 'Full Day'
    },
    {
      id: 8,
      name: 'Shoshani Canyon',
      description: 'Dramatic canyon with steep limestone walls and rushing waters. Popular for adventure tourism and photography.',
      category: 'Canyon',
      rating: 4.6,
      icon: <Mountain className="h-5 w-5" />,
      location: 'Shoshani',
      duration: 'Half Day'
    },
    {
      id: 9,
      name: 'The Cave of Dragobi',
      description: 'Mysterious limestone cave system with impressive stalactites and stalagmites. Rich in geological and archaeological significance.',
      category: 'Cave System',
      rating: 4.4,
      icon: <Mountain className="h-5 w-5" />,
      location: 'Dragobi',
      duration: '2-3 Hours'
    },
    {
      id: 10,
      name: 'Tropoja River and Valley of Sylbice',
      description: 'Scenic river valley with pristine waters flowing through dramatic mountain landscapes. Ideal for fishing and nature walks.',
      category: 'River Valley',
      rating: 4.5,
      icon: <Waves className="h-5 w-5" />,
      location: 'Sylbice Valley',
      duration: 'Half Day'
    },
    {
      id: 11,
      name: 'Padesh & Ujezë',
      description: 'Traditional highland villages preserving ancient customs and architecture. Experience authentic mountain hospitality.',
      category: 'Historic Villages',
      rating: 4.3,
      icon: <Castle className="h-5 w-5" />,
      location: 'Padesh & Ujezë',
      duration: 'Half Day'
    },
    {
      id: 12,
      name: 'Bujan - Mic Sokoli Tower House Museum',
      description: 'Historic tower house museum dedicated to the legendary Albanian hero Mic Sokoli. Features traditional architecture and historical artifacts.',
      category: 'Museum/Historic',
      rating: 4.4,
      icon: <Building className="h-5 w-5" />,
      location: 'Bujan',
      duration: '2-3 Hours'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Nature Park': return 'bg-green-100 text-green-800';
      case 'National Park': return 'bg-emerald-100 text-emerald-800';
      case 'Lake/Dam': return 'bg-blue-100 text-blue-800';
      case 'River Tours': return 'bg-cyan-100 text-cyan-800';
      case 'Cultural Village': return 'bg-orange-100 text-orange-800';
      case 'Mountain Peaks': return 'bg-slate-100 text-slate-800';
      case 'Protected Area': return 'bg-green-100 text-green-800';
      case 'Canyon': return 'bg-red-100 text-red-800';
      case 'Cave System': return 'bg-gray-100 text-gray-800';
      case 'River Valley': return 'bg-teal-100 text-teal-800';
      case 'Historic Villages': return 'bg-amber-100 text-amber-800';
      case 'Museum/Historic': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Places to Visit
        </h2>
        <p className="text-lg text-muted-foreground">Popular Attractions in Tropoja</p>
        <div className="mt-4 flex justify-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 h-1 w-24 rounded-full"></div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {attractions.map((attraction) => (
          <Card key={attraction.id} className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    {attraction.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">{attraction.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {attraction.location}
                      <Clock className="h-4 w-4 ml-2" />
                      {attraction.duration}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{attraction.rating}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 leading-relaxed">{attraction.description}</p>
              <Badge className={`${getCategoryColor(attraction.category)} border-0`}>
                {attraction.category}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Planning Your Visit</h3>
          <p className="text-gray-600 mt-2">Essential information for exploring Tropoja's attractions</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-2">Best Time to Visit</h4>
            <p className="text-gray-600">May to October for hiking, December to March for winter sports</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-2">Getting Around</h4>
            <p className="text-gray-600">4WD recommended for mountain areas, guided tours available</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-purple-700 mb-2">What to Bring</h4>
            <p className="text-gray-600">Hiking boots, warm clothes, camera, and plenty of water</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attractions;