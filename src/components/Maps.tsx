import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, TrendingUp, Mountain, Navigation, Download } from 'lucide-react';

const Maps: React.FC = () => {
  const hikingTrails = [
    {
      name: 'Valbona Valley Trail',
      difficulty: 'Moderate',
      duration: '4-6 hours',
      distance: '12 km',
      elevation: '+450m',
      description: 'Scenic trail through the heart of Valbona Valley with stunning mountain views and river crossings.',
      highlights: ['River crossings', 'Alpine meadows', 'Traditional villages', 'Wildlife viewing']
    },
    {
      name: 'Theth to Valbona Pass',
      difficulty: 'Challenging',
      duration: '6-8 hours',
      distance: '16 km',
      elevation: '+800m',
      description: 'Classic Albanian Alps crossing connecting Theth and Valbona valleys via mountain pass.',
      highlights: ['Mountain pass views', 'Dramatic landscapes', 'Cross-valley trek', 'Photo opportunities']
    },
    {
      name: 'Fierza Lake Circuit',
      difficulty: 'Easy',
      duration: '3-4 hours',
      distance: '8 km',
      elevation: '+200m',
      description: 'Gentle lakeside trail with spectacular fjord-like scenery and swimming opportunities.',
      highlights: ['Lake views', 'Swimming spots', 'Boat connections', 'Photography']
    },
    {
      name: 'Peaks of the Balkans Trail',
      difficulty: 'Expert',
      duration: '8-10 days',
      distance: '192 km',
      elevation: '+3000m',
      description: 'Epic multi-day trek through Albania, Montenegro, and Kosovo crossing international borders.',
      highlights: ['3 countries', 'Mountain huts', 'Remote villages', 'Alpine lakes']
    },
    {
      name: 'Geghysen Nature Park Trail',
      difficulty: 'Moderate',
      duration: '5-7 hours',
      distance: '14 km',
      elevation: '+600m',
      description: 'Protected wilderness trail through diverse ecosystems and traditional mountain communities.',
      highlights: ['Protected nature', 'Diverse wildlife', 'Traditional villages', 'Eco-tourism']
    },
    {
      name: 'Dragobia Village Walk',
      difficulty: 'Easy',
      duration: '2-3 hours',
      distance: '5 km',
      elevation: '+150m',
      description: 'Cultural trail through authentic mountain village with traditional stone architecture.',
      highlights: ['Stone houses', 'Local culture', 'Valley views', 'Village life']
    }
  ];

  const mapResources = [
    {
      name: 'Official Tropoja Trail Maps',
      type: 'Digital Download',
      description: 'Detailed topographic maps with GPS coordinates, trail markers, and difficulty ratings.',
      contact: 'Available at Tourist Info Center'
    },
    {
      name: 'Maps.me Offline App',
      type: 'Mobile App',
      description: 'Works without internet connection, includes all major trails and points of interest.',
      contact: 'Free download from app stores'
    },
    {
      name: 'Tourist Information Center',
      type: 'Physical Location',
      description: 'Get printed maps, local advice, and current trail conditions from experienced guides.',
      contact: 'Bajram Curri Center, +355 21 234 567'
    },
    {
      name: 'Local Guide Services',
      type: 'Professional Service',
      description: 'Experienced local guides with detailed knowledge of trails, weather, and safety.',
      contact: 'Book through accommodations or call +355 69 123 456'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Challenging': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Maps & Hiking Trails</h2>
        <p className="text-muted-foreground">Discover the Best Trails and Routes in Tropoja Region</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mountain className="h-5 w-5" />
              Popular Hiking Trails
            </CardTitle>
            <CardDescription>
              Explore the stunning landscapes of the Albanian Alps and surrounding areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {hikingTrails.map((trail, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">{trail.name}</h3>
                    <Badge className={getDifficultyColor(trail.difficulty)}>
                      {trail.difficulty}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{trail.description}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {trail.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation className="h-4 w-4" />
                      {trail.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      {trail.elevation}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trail.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{highlight}</Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Map Resources & Navigation
            </CardTitle>
            <CardDescription>
              Essential mapping tools and services for safe hiking adventures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {mapResources.map((resource, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <Download className="h-5 w-5 mt-1 text-primary" />
                  <div className="flex-1">
                    <h4 className="font-medium text-lg mb-1">{resource.name}</h4>
                    <Badge variant="outline" className="mb-2">{resource.type}</Badge>
                    <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                    <p className="text-xs text-blue-600">{resource.contact}</p>
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

export default Maps;