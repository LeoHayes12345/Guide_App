import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const Events = () => {
  const upcomingEvents = [
    {
      name: 'Tropoja Mountain Festival',
      date: 'July 15-17, 2024',
      time: '10:00 - 22:00',
      location: 'City Center',
      type: 'Cultural Festival',
      description: 'Celebrate Albanian mountain culture with traditional music, dance, and food.',
      activities: ['Folk Dancing', 'Traditional Music', 'Local Cuisine', 'Craft Exhibitions']
    },
    {
      name: 'Hiking Championship',
      date: 'August 5, 2024',
      time: '06:00 - 18:00',
      location: 'Valbona Valley',
      type: 'Sports Event',
      description: 'Annual hiking competition through the beautiful Albanian Alps.',
      activities: ['Competitive Hiking', 'Nature Photography', 'Awards Ceremony']
    },
    {
      name: 'Harvest Festival',
      date: 'September 10-12, 2024',
      time: '09:00 - 20:00',
      location: 'Various Villages',
      type: 'Traditional Festival',
      description: 'Celebrate the autumn harvest with local farmers and traditional customs.',
      activities: ['Grape Picking', 'Traditional Cooking', 'Folk Stories', 'Local Markets']
    }
  ];

  const seasonalEvents = [
    {
      season: 'Spring (March-May)',
      events: [
        { name: 'Wildflower Walks', frequency: 'Weekly', description: 'Guided tours of spring blooms' },
        { name: 'Bird Watching Tours', frequency: 'Bi-weekly', description: 'Spot migratory birds' }
      ]
    },
    {
      season: 'Summer (June-August)',
      events: [
        { name: 'Outdoor Cinema', frequency: 'Weekly', description: 'Movies under the stars' },
        { name: 'Traditional Weddings', frequency: 'Weekends', description: 'Experience local wedding customs' }
      ]
    },
    {
      season: 'Autumn (September-November)',
      events: [
        { name: 'Mushroom Foraging', frequency: 'Weekly', description: 'Learn about local fungi' },
        { name: 'Wine Tasting', frequency: 'Monthly', description: 'Sample local wines' }
      ]
    },
    {
      season: 'Winter (December-February)',
      events: [
        { name: 'Winter Sports', frequency: 'Daily', description: 'Skiing and snowshoeing' },
        { name: 'New Year Celebrations', frequency: 'Annual', description: 'Traditional festivities' }
      ]
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Cultural Festival': return 'bg-purple-100 text-purple-800';
      case 'Sports Event': return 'bg-blue-100 text-blue-800';
      case 'Traditional Festival': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Events & Festivals</h2>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Upcoming Events</h3>
        {upcomingEvents.map((event, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{event.name}</CardTitle>
                  <Badge className={getEventTypeColor(event.type)} variant="secondary">
                    {event.type}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {event.time}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                {event.location}
              </div>
              <p className="text-gray-600 mb-3">{event.description}</p>
              <div>
                <h4 className="font-medium mb-2">Activities:</h4>
                <div className="flex flex-wrap gap-2">
                  {event.activities.map((activity, i) => (
                    <Badge key={i} variant="outline">{activity}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seasonal Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seasonalEvents.map((season, index) => (
              <div key={index} className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold mb-2">{season.season}</h4>
                <div className="space-y-2">
                  {season.events.map((event, i) => (
                    <div key={i} className="flex justify-between items-start p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium">{event.name}</div>
                        <div className="text-sm text-gray-600">{event.description}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">{event.frequency}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Events;