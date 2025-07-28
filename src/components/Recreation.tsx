import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Fish, Target, Mountain, MapPin, Clock } from 'lucide-react';

const Recreation: React.FC = () => {
  const sportsActivities = [
    {
      name: 'Mountain Biking',
      category: 'Adventure Sports',
      location: 'Valbona Valley Trails',
      difficulty: 'Moderate to Advanced',
      season: 'May - October',
      description: 'Thrilling mountain bike trails through alpine terrain with breathtaking scenery.',
      equipment: 'Rental available',
      price: '€25/day'
    },
    {
      name: 'Rock Climbing',
      category: 'Adventure Sports',
      location: 'Albanian Alps Cliffs',
      difficulty: 'Beginner to Expert',
      season: 'April - November',
      description: 'World-class climbing routes on limestone cliffs with professional guides available.',
      equipment: 'Guided tours include gear',
      price: '€45/half day'
    },
    {
      name: 'Paragliding',
      category: 'Extreme Sports',
      location: 'Tropoja Launch Site',
      difficulty: 'Tandem flights available',
      season: 'June - September',
      description: 'Soar above the Albanian Alps with certified instructors and stunning aerial views.',
      equipment: 'All equipment provided',
      price: '€80/flight'
    }
  ];

  const fishingSpots = [
    {
      name: 'Valbona River',
      type: 'River Fishing',
      fishSpecies: ['Brown Trout', 'Rainbow Trout', 'Grayling'],
      bestTime: 'Early morning, late evening',
      season: 'April - October',
      license: 'Required - €10/day',
      description: 'Crystal clear mountain river perfect for fly fishing with abundant trout population.'
    },
    {
      name: 'Fierza Lake',
      type: 'Lake Fishing',
      fishSpecies: ['Carp', 'Pike', 'Perch', 'Catfish'],
      bestTime: 'Dawn and dusk',
      season: 'Year round',
      license: 'Required - €15/day',
      description: 'Large artificial lake offering excellent coarse fishing opportunities.'
    },
    {
      name: 'Mountain Streams',
      type: 'Stream Fishing',
      fishSpecies: ['Native Trout', 'Minnows'],
      bestTime: 'Morning hours',
      season: 'May - September',
      license: 'Required - €8/day',
      description: 'Remote mountain streams for peaceful fishing in pristine wilderness.'
    }
  ];

  const huntingAreas = [
    {
      name: 'Tropoja Hunting Reserve',
      gameSpecies: ['Wild Boar', 'Red Deer', 'Roe Deer'],
      season: 'October - February',
      license: 'Hunting permit required',
      guides: 'Professional guides mandatory',
      description: 'Managed hunting area with sustainable wildlife populations and experienced local guides.'
    },
    {
      name: 'Alpine Hunting Grounds',
      gameSpecies: ['Chamois', 'Brown Bear', 'Wolf'],
      season: 'November - January',
      license: 'Special permit required',
      guides: 'Expert guides only',
      description: 'High-altitude hunting for experienced hunters seeking challenging big game.'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Adventure Sports': return 'bg-blue-100 text-blue-800';
      case 'Extreme Sports': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Recreation</h2>
        <p className="text-muted-foreground">Sports, fishing, hunting and outdoor adventures</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Sports & Adventure Activities
            </CardTitle>
            <CardDescription>
              Thrilling outdoor sports in the Albanian Alps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {sportsActivities.map((activity, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">{activity.name}</h3>
                    <Badge className={getCategoryColor(activity.category)}>
                      {activity.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    {activity.location}
                  </div>
                  <p className="text-muted-foreground mb-3">{activity.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div><strong>Difficulty:</strong> {activity.difficulty}</div>
                    <div><strong>Season:</strong> {activity.season}</div>
                    <div><strong>Equipment:</strong> {activity.equipment}</div>
                    <div><strong>Price:</strong> {activity.price}</div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fish className="h-5 w-5" />
              Fishing Spots
            </CardTitle>
            <CardDescription>
              Premium fishing locations in pristine waters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {fishingSpots.map((spot, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold">{spot.name}</h4>
                    <Badge variant="outline">{spot.type}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{spot.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div><strong>Best Time:</strong> {spot.bestTime}</div>
                    <div><strong>Season:</strong> {spot.season}</div>
                    <div><strong>License:</strong> {spot.license}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {spot.fishSpecies.map((species, idx) => (
                      <Badge key={idx} variant="secondary">{species}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Hunting Areas
            </CardTitle>
            <CardDescription>
              Regulated hunting in managed wildlife reserves
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {huntingAreas.map((area, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">{area.name}</h4>
                  <p className="text-muted-foreground mb-3">{area.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div><strong>Season:</strong> {area.season}</div>
                    <div><strong>License:</strong> {area.license}</div>
                    <div><strong>Guides:</strong> {area.guides}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {area.gameSpecies.map((species, idx) => (
                      <Badge key={idx} variant="secondary">{species}</Badge>
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

export default Recreation;