import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mountain, Clock, Users, Euro, MapPin, Phone } from 'lucide-react';

const Activities = () => {
  const activities = [
    {
      name: 'Valbona Valley Hiking Tours',
      type: 'Hiking',
      difficulty: 'Moderate',
      duration: '4-8 hours',
      price: '€25-45',
      groupSize: '2-12 people',
      location: 'Valbona Valley',
      contact: '+355 69 123 789',
      description: 'Explore pristine mountain trails with breathtaking views of the Albanian Alps. Professional guides share local knowledge and ensure safety.',
      highlights: ['Mountain Views', 'Wildlife Spotting', 'Photography', 'Local Guide']
    },
    {
      name: 'Theth National Park Cultural Tour',
      type: 'Cultural Tour',
      difficulty: 'Easy',
      duration: 'Full Day',
      price: '€35-55',
      groupSize: '4-15 people',
      location: 'Theth National Park',
      contact: '+355 68 456 123',
      description: 'Visit traditional stone houses, Grunas Waterfall, and learn about Kanun traditions. Includes traditional lunch.',
      highlights: ['Grunas Waterfall', 'Stone Towers', 'Traditional Lunch', 'Cultural Stories']
    },
    {
      name: 'Peaks of the Balkans Trek',
      type: 'Multi-day Trek',
      difficulty: 'Challenging',
      duration: '3-10 days',
      price: '€80-150/day',
      groupSize: '4-8 people',
      location: 'Albanian Alps',
      contact: '+355 69 789 456',
      description: 'Epic multi-day trek through Albania, Montenegro, and Kosovo. Mountain huts accommodation and meals included.',
      highlights: ['3 Countries', 'Mountain Huts', 'Alpine Lakes', 'Professional Guide']
    },
    {
      name: 'Fierza Lake Boat Tours',
      type: 'Boat Tour',
      difficulty: 'Easy',
      duration: '2-4 hours',
      price: '€20-35',
      groupSize: '6-20 people',
      location: 'Fierza Lake',
      contact: '+355 21 567 890',
      description: 'Scenic boat journey through fjord-like landscapes. Swimming stops and traditional lunch available.',
      highlights: ['Fjord Scenery', 'Swimming Stops', 'Photography', 'Refreshments']
    },
    {
      name: 'Rock Climbing Adventures',
      type: 'Adventure Sport',
      difficulty: 'Moderate-Hard',
      duration: '3-6 hours',
      price: '€45-70',
      groupSize: '2-6 people',
      location: 'Valbona Cliffs',
      contact: '+355 68 234 567',
      description: 'Challenge yourself on limestone cliffs with certified guides. All equipment provided, suitable for beginners to advanced.',
      highlights: ['Certified Guide', 'Equipment Included', 'All Levels', 'Safety First']
    },
    {
      name: 'Mountain Biking Trails',
      type: 'Cycling',
      difficulty: 'Moderate',
      duration: '3-5 hours',
      price: '€30-45',
      groupSize: '3-10 people',
      location: 'Tropoja Trails',
      contact: '+355 69 345 678',
      description: 'Cycle through scenic mountain paths and traditional villages. Quality mountain bikes and helmets provided.',
      highlights: ['Quality Bikes', 'Village Visits', 'Scenic Routes', 'Local Stops']
    },
    {
      name: 'Photography Tours',
      type: 'Photography',
      difficulty: 'Easy',
      duration: '4-6 hours',
      price: '€40-60',
      groupSize: '2-8 people',
      location: 'Various Locations',
      contact: '+355 68 678 901',
      description: 'Capture the beauty of Albanian Alps with professional photographer guide. Best locations and lighting tips included.',
      highlights: ['Pro Photographer', 'Best Locations', 'Technique Tips', 'Sunrise/Sunset']
    },
    {
      name: 'Traditional Cooking Classes',
      type: 'Cultural Experience',
      difficulty: 'Easy',
      duration: '3-4 hours',
      price: '€25-40',
      groupSize: '4-12 people',
      location: 'Local Homes',
      contact: '+355 69 789 012',
      description: 'Learn to cook traditional Albanian dishes with local families. Includes market visit and full meal.',
      highlights: ['Local Families', 'Market Visit', 'Traditional Recipes', 'Full Meal']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty.includes('Easy')) return 'bg-green-100 text-green-800';
    if (difficulty.includes('Moderate')) return 'bg-yellow-100 text-yellow-800';
    if (difficulty.includes('Hard') || difficulty.includes('Challenging')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Activities & Adventures</h2>
        <p className="text-muted-foreground">Outdoor Activities and Cultural Experiences in Tropoja</p>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{activity.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{activity.type}</Badge>
                    <Badge className={getDifficultyColor(activity.difficulty)}>
                      {activity.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{activity.price}</div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {activity.location}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">{activity.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {activity.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {activity.groupSize}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Phone className="h-4 w-4" />
                {activity.contact}
              </div>
              <div>
                <h4 className="font-medium mb-2">Highlights:</h4>
                <div className="flex flex-wrap gap-2">
                  {activity.highlights.map((highlight, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{highlight}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Activities;