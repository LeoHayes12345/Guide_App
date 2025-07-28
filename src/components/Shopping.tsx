import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Clock, MapPin, Star } from 'lucide-react';

const Shopping = () => {
  const shops = [
    {
      name: 'Traditional Crafts Market',
      type: 'Handicrafts',
      location: 'Main Square',
      hours: '09:00 - 18:00',
      specialties: ['Handwoven Textiles', 'Wood Carvings', 'Traditional Jewelry'],
      description: 'Authentic Albanian handicrafts made by local artisans.',
      priceRange: '€5-50'
    },
    {
      name: 'Mountain Gear Shop',
      type: 'Outdoor Equipment',
      location: 'Tourist Center',
      hours: '08:00 - 20:00',
      specialties: ['Hiking Boots', 'Backpacks', 'Camping Gear'],
      description: 'Essential equipment for mountain adventures and hiking.',
      priceRange: '€15-200'
    },
    {
      name: 'Local Products Store',
      type: 'Food & Souvenirs',
      location: 'City Center',
      hours: '07:00 - 22:00',
      specialties: ['Honey', 'Cheese', 'Raki', 'Local Spices'],
      description: 'Taste and take home authentic Albanian flavors.',
      priceRange: '€3-25'
    }
  ];

  const souvenirs = [
    { item: 'Albanian Flag Merchandise', price: '€5-15', popularity: 'High' },
    { item: 'Traditional Qeleshe Hat', price: '€20-35', popularity: 'Medium' },
    { item: 'Handmade Carpets', price: '€50-200', popularity: 'High' },
    { item: 'Local Honey Jars', price: '€8-12', popularity: 'High' },
    { item: 'Wood Carved Eagles', price: '€15-40', popularity: 'Medium' },
    { item: 'Traditional Jewelry', price: '€10-80', popularity: 'Medium' }
  ];

  const markets = [
    {
      name: 'Weekly Farmers Market',
      day: 'Saturday',
      time: '06:00 - 14:00',
      location: 'Town Square',
      products: ['Fresh Produce', 'Dairy', 'Homemade Bread']
    },
    {
      name: 'Craft Fair',
      day: 'Sunday',
      time: '10:00 - 16:00',
      location: 'Cultural Center',
      products: ['Handmade Crafts', 'Art', 'Local Music']
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Shopping & Souvenirs</h2>
      
      <div className="space-y-4">
        {shops.map((shop, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{shop.name}</CardTitle>
                  <Badge variant="outline" className="mt-1">{shop.type}</Badge>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{shop.priceRange}</div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {shop.location}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">{shop.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <Clock className="h-4 w-4" />
                {shop.hours}
              </div>
              <div>
                <h4 className="font-medium mb-2">Specialties:</h4>
                <div className="flex flex-wrap gap-2">
                  {shop.specialties.map((specialty, i) => (
                    <Badge key={i} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popular Souvenirs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {souvenirs.map((souvenir, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">{souvenir.item}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{souvenir.popularity} demand</span>
                  </div>
                </div>
                <div className="font-semibold text-green-600">{souvenir.price}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Markets & Fairs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {markets.map((market, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{market.name}</h4>
                    <div className="text-sm text-gray-600">{market.day} • {market.time}</div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    {market.location}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {market.products.map((product, i) => (
                    <Badge key={i} variant="secondary">{product}</Badge>
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

export default Shopping;