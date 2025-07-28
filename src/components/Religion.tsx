import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Church, MapPin, Clock, Star, Phone } from 'lucide-react';

const Religion: React.FC = () => {
  const religiousSites = [
    {
      name: 'Bajram Curri Central Mosque',
      type: 'Mosque',
      location: 'Bajram Curri Center',
      description: 'Beautiful central mosque serving the local Muslim community with traditional Albanian Islamic architecture and active community programs.',
      visitingHours: '5:00 AM - 9:00 PM',
      significance: 'Main community mosque',
      contact: '+355 21 234 890',
      features: ['Prayer hall', 'Minaret', 'Community center', 'Islamic library']
    },
    {
      name: 'St. Nicholas Orthodox Church',
      type: 'Orthodox Church',
      location: 'Valbona Valley',
      description: 'Historic Orthodox church nestled in the mountains, offering spiritual solace with stunning valley views and preserved Byzantine frescoes.',
      visitingHours: '8:00 AM - 6:00 PM',
      significance: 'Historical monument',
      contact: '+355 69 345 678',
      features: ['Byzantine frescoes', 'Mountain views', 'Peaceful garden', 'Ancient iconostasis']
    },
    {
      name: 'Sacred Heart Catholic Church',
      type: 'Catholic Church',
      location: 'Tropoja Town',
      description: 'Modern Catholic church serving the local Catholic community with regular masses, ceremonies, and community outreach programs.',
      visitingHours: '7:00 AM - 7:00 PM',
      significance: 'Active parish center',
      contact: '+355 68 456 789',
      features: ['Modern architecture', 'Stained glass windows', 'Bell tower', 'Youth programs']
    },
    {
      name: 'Margegaj Bektashi Tekke',
      type: 'Bektashi Lodge',
      location: 'Margegaj Village',
      description: 'Traditional Bektashi lodge where dervishes practiced spiritual rituals and meditation. Important center of Albanian Sufi heritage.',
      visitingHours: '9:00 AM - 5:00 PM',
      significance: 'Sufi spiritual heritage',
      contact: '+355 69 567 890',
      features: ['Meditation hall', 'Traditional architecture', 'Sacred artifacts', 'Spiritual library']
    },
    {
      name: 'Fierza Village Mosque',
      type: 'Mosque',
      location: 'Fierza Village',
      description: 'Small village mosque serving the lakeside community with beautiful lake views and traditional mountain architecture.',
      visitingHours: '5:00 AM - 8:00 PM',
      significance: 'Village community center',
      contact: '+355 68 678 901',
      features: ['Lake views', 'Traditional design', 'Community gatherings', 'Local heritage']
    },
    {
      name: 'Theth Village Chapel',
      type: 'Catholic Chapel',
      location: 'Theth National Park',
      description: 'Small mountain chapel in the heart of Theth village, serving visitors and locals with peaceful mountain setting.',
      visitingHours: '8:00 AM - 6:00 PM',
      significance: 'Mountain pilgrimage site',
      contact: '+355 69 789 012',
      features: ['Mountain setting', 'Stone architecture', 'Pilgrimage destination', 'Peaceful atmosphere']
    }
  ];

  const pilgrimageRoutes = [
    {
      name: 'Albanian Alps Spiritual Trail',
      distance: '25 km',
      duration: '2-3 days',
      description: 'Multi-faith spiritual journey connecting various religious sites across the Albanian Alps region.',
      stops: ['St. Nicholas Church', 'Sacred springs', 'Mountain chapels', 'Meditation sites']
    },
    {
      name: 'Valley of Tolerance Route',
      distance: '12 km',
      duration: '1 day',
      description: 'Peaceful walk through villages showcasing religious harmony and interfaith coexistence in Tropoja.',
      stops: ['Village mosque', 'Catholic chapel', 'Orthodox church', 'Bektashi tekke']
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Mosque': return 'bg-green-100 text-green-800';
      case 'Orthodox Church': return 'bg-blue-100 text-blue-800';
      case 'Catholic Church': return 'bg-purple-100 text-purple-800';
      case 'Catholic Chapel': return 'bg-purple-50 text-purple-700';
      case 'Bektashi Lodge': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Religious Sites & Pilgrimage</h2>
        <p className="text-muted-foreground">Sacred Places and Spiritual Heritage of Tropoja</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Church className="h-5 w-5" />
              Religious Sites
            </CardTitle>
            <CardDescription>
              Discover the diverse spiritual heritage and religious harmony of the region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {religiousSites.map((site, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">{site.name}</h3>
                    <Badge className={getTypeColor(site.type)}>
                      {site.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    {site.location}
                  </div>
                  <p className="text-muted-foreground mb-3">{site.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" />
                    Visiting hours: {site.visitingHours}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Phone className="h-4 w-4" />
                    {site.contact}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{site.significance}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {site.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{feature}</Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spiritual Pilgrimage Routes</CardTitle>
            <CardDescription>
              Interfaith journeys through sacred landscapes and religious heritage sites
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {pilgrimageRoutes.map((route, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-lg mb-2">{route.name}</h4>
                  <p className="text-muted-foreground mb-3">{route.description}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                    <span className="font-medium">Distance: {route.distance}</span>
                    <span className="font-medium">Duration: {route.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {route.stops.map((stop, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{stop}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Religion;