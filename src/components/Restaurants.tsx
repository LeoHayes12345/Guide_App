import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils, MapPin, Star, Clock, Phone } from 'lucide-react';

const Restaurants: React.FC = () => {
  const restaurants = [
    {
      name: 'Restaurant Alpet',
      cuisine: 'Albanian Traditional',
      location: 'Bajram Curri Center',
      rating: 4.6,
      priceRange: '€€',
      hours: '12:00 - 22:00',
      contact: '+355 21 234 890',
      description: 'Authentic Albanian dishes prepared with local ingredients and traditional recipes. Family-owned restaurant serving the community for over 20 years.',
      specialties: ['Tavë kosi', 'Qofte të fërguara', 'Byrek me spinaq', 'Fresh mountain trout', 'Flija traditional']
    },
    {
      name: 'Valbona Valley Restaurant',
      cuisine: 'Mountain Cuisine',
      location: 'Valbona Valley',
      rating: 4.7,
      priceRange: '€€',
      hours: '11:00 - 21:00',
      contact: '+355 69 234 567',
      description: 'Mountain restaurant with panoramic valley views. Specializes in locally sourced ingredients and traditional mountain recipes.',
      specialties: ['Grilled lamb', 'Wild game dishes', 'Mountain herbs', 'Local cheese platter', 'Homemade raki']
    },
    {
      name: 'Guesthouse Kol Gjoni',
      cuisine: 'Home-style',
      location: 'Theth Village',
      rating: 4.8,
      priceRange: '€',
      hours: '8:00 - 21:00',
      contact: '+355 68 345 678',
      description: 'Traditional guesthouse dining with authentic family recipes. All meals prepared with organic ingredients from their own garden.',
      specialties: ['Home-cooked meals', 'Fresh bread daily', 'Organic vegetables', 'Farm dairy products', 'Traditional soups']
    },
    {
      name: 'Cafe Bar Tropoja',
      cuisine: 'Cafe & Light Meals',
      location: 'Tropoja Town Center',
      rating: 4.2,
      priceRange: '€',
      hours: '7:00 - 23:00',
      contact: '+355 21 456 789',
      description: 'Popular local cafe serving coffee, pastries, and light meals. Great place to meet locals and get travel advice.',
      specialties: ['Turkish coffee', 'Baklava', 'Burek varieties', 'Fresh fruit juices', 'Local beer']
    },
    {
      name: 'Fierza Lake Restaurant',
      cuisine: 'Fish & Seafood',
      location: 'Fierza Lake',
      rating: 4.5,
      priceRange: '€€',
      hours: '12:00 - 22:00',
      contact: '+355 69 567 890',
      description: 'Lakeside restaurant specializing in fresh fish from Fierza Lake. Beautiful views and peaceful atmosphere.',
      specialties: ['Fresh lake fish', 'Grilled carp', 'Fish soup', 'Lake views', 'Sunset dining']
    },
    {
      name: 'Traditional House Dragobia',
      cuisine: 'Village Traditional',
      location: 'Dragobia Village',
      rating: 4.4,
      priceRange: '€',
      hours: '10:00 - 20:00',
      contact: '+355 68 678 901',
      description: 'Authentic village dining experience in traditional stone house. Meals prepared using centuries-old recipes.',
      specialties: ['Village bread', 'Preserved meats', 'Wild mushrooms', 'Herbal teas', 'Traditional sweets']
    },
    {
      name: 'Pizzeria Drin',
      cuisine: 'Italian & Albanian',
      location: 'Bajram Curri',
      rating: 4.1,
      priceRange: '€€',
      hours: '16:00 - 23:00',
      contact: '+355 21 789 012',
      description: 'Modern pizzeria offering both Italian classics and Albanian fusion pizzas. Popular with younger locals and tourists.',
      specialties: ['Wood-fired pizza', 'Albanian toppings', 'Fresh salads', 'Italian wines', 'Gelato']
    }
  ];

  const getPriceColor = (price: string) => {
    switch (price) {
      case '€': return 'bg-green-100 text-green-800';
      case '€€': return 'bg-yellow-100 text-yellow-800';
      case '€€€': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Places to Eat</h2>
        <p className="text-muted-foreground">Restaurants, Cafes & Traditional Dining in Tropoja</p>
      </div>
      <div className="grid gap-4">
        {restaurants.map((restaurant, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                <div className="flex gap-2 items-center">
                  <Badge className={getPriceColor(restaurant.priceRange)}>{restaurant.priceRange}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{restaurant.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {restaurant.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {restaurant.hours}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="mb-3">{restaurant.cuisine}</Badge>
              <p className="text-muted-foreground mb-3">{restaurant.description}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Phone className="h-4 w-4" />
                {restaurant.contact}
              </div>
              <div className="flex flex-wrap gap-2">
                {restaurant.specialties.map((specialty, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">{specialty}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;