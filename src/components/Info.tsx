import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  Thermometer, 
  Car, 
  Plane, 
  Home, 
  Utensils, 
  AlertTriangle,
  Phone,
  CreditCard
} from 'lucide-react';

const Info: React.FC = () => {
  const infoSections = [
    {
      title: 'Getting There',
      icon: <Car className="h-5 w-5" />,
      items: [
        'Fly to Tirana International Airport (TIA)',
        'Drive 3.5 hours north to Bajram Curri',
        'Bus services available from Tirana (4-5 hours)',
        'Car rental recommended for flexibility'
      ]
    },
    {
      title: 'Best Time to Visit',
      icon: <Thermometer className="h-5 w-5" />,
      items: [
        'May-September: Ideal hiking weather (15-25°C)',
        'June-August: Peak season, warm days',
        'April & October: Fewer crowds, mild weather',
        'November-March: Snow season, limited access'
      ]
    },
    {
      title: 'Accommodation',
      icon: <Home className="h-5 w-5" />,
      items: [
        'Traditional guesthouses in Valbona & Theth',
        'Mountain huts along hiking trails',
        'Hotels in Bajram Curri town center',
        'Camping allowed in designated areas'
      ]
    },
    {
      title: 'Local Cuisine',
      icon: <Utensils className="h-5 w-5" />,
      items: [
        'Flija - traditional layered pancake',
        'Qofte - Albanian meatballs',
        'Fresh trout from mountain streams',
        'Homemade raki (traditional brandy)',
        'Organic mountain vegetables and dairy'
      ]
    },
    {
      title: 'What to Pack',
      icon: <AlertTriangle className="h-5 w-5" />,
      items: [
        'Sturdy hiking boots and warm layers',
        'Rain gear and sun protection',
        'First aid kit and medications',
        'Power bank and offline maps',
        'Cash (limited ATM availability)'
      ]
    },
    {
      title: 'Useful Information',
      icon: <Phone className="h-5 w-5" />,
      items: [
        'Currency: Albanian Lek (ALL)',
        'Language: Albanian (English spoken in tourism)',
        'Emergency: 112 (universal)',
        'Mobile coverage: Good in main areas',
        'Tipping: 10% in restaurants'
      ]
    }
  ];

  const quickFacts = [
    { label: 'Region', value: 'Tropoja, Northern Albania' },
    { label: 'Elevation', value: '300-2,694m above sea level' },
    { label: 'Population', value: '~20,000 residents' },
    { label: 'Main Town', value: 'Bajram Curri' },
    { label: 'National Parks', value: 'Valbona Valley, Theth' },
    { label: 'Best Activity', value: 'Hiking & Nature Photography' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Travel Information</h2>
      
      {/* Quick Facts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Quick Facts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickFacts.map((fact, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium text-gray-700">{fact.label}:</span>
                <span className="text-gray-900">{fact.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Information Sections */}
      <div className="grid gap-4">
        {infoSections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {section.icon}
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Contacts */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Emergency Services:</span>
              <span>112</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Mountain Rescue:</span>
              <span>+355 69 XXX XXXX</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tourist Police:</span>
              <span>+355 4 XXX XXXX</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Info;