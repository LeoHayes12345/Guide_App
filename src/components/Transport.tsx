import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, Bus, MapPin, Phone, Clock, Plane } from 'lucide-react';

const Transport: React.FC = () => {
  const carRental = [
    {
      company: 'Tropoja Car Rental',
      location: 'Bajram Curri Center',
      phone: '+355 69 123 4567',
      email: 'info@tropojacarrental.al',
      vehicles: ['Economy cars', 'SUVs', '4WD vehicles', 'Minivans'],
      price: 'From €25/day',
      features: ['Full insurance', 'GPS navigation', '24/7 support', 'Mountain roads ready']
    },
    {
      company: 'Alpine Auto Rent',
      location: 'Near Hotel Tropoja',
      phone: '+355 68 987 6543',
      email: 'rent@alpineauto.al',
      vehicles: ['Compact cars', 'Mountain bikes', 'Motorcycles', 'ATVs'],
      price: 'From €20/day',
      features: ['Free delivery', 'Mountain gear included', 'Local maps', 'Flexible hours']
    },
    {
      company: 'Valbona 4x4 Rentals',
      location: 'Valbona Valley',
      phone: '+355 69 456 7890',
      email: 'info@valbona4x4.com',
      vehicles: ['4WD only', 'Off-road vehicles', 'Pickup trucks'],
      price: 'From €40/day',
      features: ['Off-road specialist', 'Trail maps', 'Recovery service', 'Local guide contact']
    }
  ];

  const publicTransport = [
    {
      type: 'Bus Service',
      route: 'Tirana - Bajram Curri',
      duration: '4-5 hours',
      frequency: '3 times daily (7:00, 13:00, 16:00)',
      price: '€8-12',
      operator: 'Albanian Bus Lines',
      contact: '+355 4 234 5678'
    },
    {
      type: 'Minibus/Furgon',
      route: 'Bajram Curri - Valbona Valley',
      duration: '45 minutes',
      frequency: 'Every 2 hours (8:00-18:00)',
      price: '€3-5',
      operator: 'Local Transport Cooperative',
      contact: '+355 69 234 5678'
    },
    {
      type: 'Ferry Service',
      route: 'Fierza Lake - Koman Lake',
      duration: '2-3 hours',
      frequency: '2 times daily (9:00, 14:00)',
      price: '€5-8',
      operator: 'Koman Lake Ferry Company',
      contact: '+355 21 345 6789'
    },
    {
      type: 'Shared Taxi',
      route: 'Bajram Curri - Theth',
      duration: '1.5 hours',
      frequency: 'On demand',
      price: '€15-20 per person',
      operator: 'Local Taxi Drivers',
      contact: '+355 68 345 6789'
    },
    {
      type: 'Airport Transfer',
      route: 'Tirana Airport - Bajram Curri',
      duration: '4 hours',
      frequency: 'By appointment',
      price: '€80-120 private',
      operator: 'Airport Transfer Services',
      contact: '+355 69 567 8901'
    }
  ];

  const travelTips = [
    'Mountain roads can be challenging - 4WD recommended for remote areas',
    'Book ferry tickets in advance during summer season',
    'Shared taxis are common and economical for group travel',
    'Winter travel requires snow chains and experienced drivers',
    'Fuel stations are limited in remote areas - fill up in Bajram Curri'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Car Hire & Transport</h2>
        <p className="text-muted-foreground">Vehicle Rental and Transportation Options in Tropoja</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Car Rental Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {carRental.map((rental, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-lg">{rental.company}</h4>
                  <Badge variant="outline" className="bg-green-50">{rental.price}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  {rental.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Phone className="h-4 w-4" />
                  {rental.phone}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  Email: {rental.email}
                </div>
                <div className="mb-3">
                  <div className="text-sm font-medium mb-2">Available Vehicles:</div>
                  <div className="flex flex-wrap gap-2">
                    {rental.vehicles.map((vehicle, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{vehicle}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {rental.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">{feature}</Badge>
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
            <Bus className="h-5 w-5" />
            Public Transport & Transfers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {publicTransport.map((transport, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold">{transport.type}</h4>
                  <Badge variant="outline" className="bg-blue-50">{transport.price}</Badge>
                </div>
                <p className="text-sm font-medium mb-2">{transport.route}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Duration: {transport.duration}
                  </div>
                  <div>Frequency: {transport.frequency}</div>
                  <div>Operator: {transport.operator}</div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {transport.contact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Travel Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {travelTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-blue-500 mt-1">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transport;