import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, MapPin, Star, Wifi, Car, Coffee, Phone, Globe } from 'lucide-react';

const Accommodation: React.FC = () => {
  const accommodations = [
    {
      name: 'Hotel Tropoja',
      type: 'Hotel',
      location: 'Bajram Curri Center',
      rating: 4.2,
      price: '€45-65/night',
      description: 'Modern hotel in the heart of Bajram Curri with comfortable rooms and mountain views. Central location with easy access to local attractions.',
      amenities: ['Free WiFi', 'Restaurant', 'Parking', 'Mountain views', '24h Reception'],
      contact: '+355 21 234 567',
      rooms: '25 rooms available'
    },
    {
      name: 'Valbona Guesthouse',
      type: 'Guesthouse',
      location: 'Valbona Valley',
      rating: 4.7,
      price: '€25-40/night',
      description: 'Traditional mountain guesthouse offering authentic Albanian hospitality and home-cooked meals. Perfect base for hiking adventures.',
      amenities: ['Traditional meals', 'Garden', 'Hiking guides', 'Family-run', 'Organic food'],
      contact: '+355 69 123 456',
      rooms: '12 rooms available'
    },
    {
      name: 'Alpine Lodge Theth',
      type: 'Lodge',
      location: 'Theth National Park',
      rating: 4.6,
      price: '€40-60/night',
      description: 'Eco-friendly lodge in pristine nature with stunning mountain views. Ideal for nature lovers and photographers.',
      amenities: ['Eco-friendly', 'Mountain views', 'Hiking trails', 'Local guides', 'Photography tours'],
      contact: '+355 68 987 654',
      rooms: '18 rooms available'
    },
    {
      name: 'Fierza Lake Resort',
      type: 'Resort',
      location: 'Fierza Lake',
      rating: 4.4,
      price: '€55-80/night',
      description: 'Lakeside resort with water activities and boat tours. Beautiful views of Fierza Lake and surrounding mountains.',
      amenities: ['Lake access', 'Boat tours', 'Water sports', 'Restaurant', 'Spa services'],
      contact: '+355 21 345 678',
      rooms: '30 rooms available'
    },
    {
      name: 'Mountain View Apartments',
      type: 'Apartment',
      location: 'Tropoja Town',
      rating: 4.1,
      price: '€35-55/night',
      description: 'Self-catering apartments perfect for families and longer stays with kitchen facilities and mountain views.',
      amenities: ['Kitchen', 'WiFi', 'Balcony', 'Weekly rates', 'Family-friendly'],
      contact: '+355 69 876 543',
      rooms: '8 apartments available'
    },
    {
      name: 'Traditional Stone House',
      type: 'Guesthouse',
      location: 'Dragobia Village',
      rating: 4.5,
      price: '€30-45/night',
      description: 'Authentic stone house accommodation in traditional mountain village. Experience local culture and customs.',
      amenities: ['Traditional architecture', 'Cultural tours', 'Local cuisine', 'Village walks'],
      contact: '+355 68 234 567',
      rooms: '6 rooms available'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Hotel': return 'bg-blue-100 text-blue-800';
      case 'Guesthouse': return 'bg-green-100 text-green-800';
      case 'Apartment': return 'bg-purple-100 text-purple-800';
      case 'Lodge': return 'bg-orange-100 text-orange-800';
      case 'Resort': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Places to Stay</h2>
        <p className="text-muted-foreground">Hotels, Lodges, Guesthouses & Apartments in Tropoja</p>
      </div>
      <div className="grid gap-4">
        {accommodations.map((place, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{place.name}</CardTitle>
                <div className="flex gap-2 items-center">
                  <Badge className={getTypeColor(place.type)}>{place.type}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{place.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {place.location}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">{place.description}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-lg text-primary">{place.price}</span>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Bed className="h-4 w-4" />
                  {place.rooms}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Phone className="h-4 w-4" />
                {place.contact}
              </div>
              <div className="flex flex-wrap gap-2">
                {place.amenities.map((amenity, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">{amenity}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Accommodation;