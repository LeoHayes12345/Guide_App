import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Star, MapPin, Phone, Mail, Languages } from 'lucide-react';

const Guide: React.FC = () => {
  const localGuides = [
    {
      name: 'Arben Krasniqi',
      experience: '15 years',
      specialties: ['Mountain hiking', 'Cultural tours', 'Photography'],
      languages: ['Albanian', 'English', 'German'],
      rating: 4.9,
      reviews: 127,
      location: 'Bajram Curri',
      phone: '+355 69 123 4567',
      email: 'arben.guide@tropoja.al',
      description: 'Expert mountain guide with deep knowledge of Albanian Alps and local culture.',
      priceRange: '€40-60/day'
    },
    {
      name: 'Mirela Hoxha',
      experience: '8 years',
      specialties: ['Wildlife tours', 'Botanical walks', 'Family trips'],
      languages: ['Albanian', 'English', 'Italian'],
      rating: 4.8,
      reviews: 89,
      location: 'Valbona',
      phone: '+355 68 987 6543',
      email: 'mirela.nature@tropoja.al',
      description: 'Nature enthusiast specializing in wildlife observation and eco-tourism.',
      priceRange: '€35-50/day'
    },
    {
      name: 'Besnik Gashi',
      experience: '12 years',
      specialties: ['Adventure sports', 'Rock climbing', 'Extreme hiking'],
      languages: ['Albanian', 'English', 'French'],
      rating: 4.9,
      reviews: 156,
      location: 'Theth',
      phone: '+355 67 555 1234',
      email: 'besnik.adventure@tropoja.al',
      description: 'Certified climbing instructor and adventure sports specialist.',
      priceRange: '€50-80/day'
    },
    {
      name: 'Fatmira Berisha',
      experience: '6 years',
      specialties: ['Cultural heritage', 'Traditional crafts', 'Village tours'],
      languages: ['Albanian', 'English', 'Turkish'],
      rating: 4.7,
      reviews: 73,
      location: 'Tropoja',
      phone: '+355 69 777 8888',
      email: 'fatmira.culture@tropoja.al',
      description: 'Cultural guide passionate about preserving and sharing local traditions.',
      priceRange: '€30-45/day'
    }
  ];

  const guideServices = [
    {
      service: 'Day Hiking Tours',
      duration: '6-8 hours',
      groupSize: '1-8 people',
      includes: ['Professional guide', 'Safety equipment', 'Local insights'],
      price: 'From €40/person'
    },
    {
      service: 'Multi-day Trekking',
      duration: '2-7 days',
      groupSize: '2-6 people',
      includes: ['Guide', 'Accommodation booking', 'Meal planning', 'Equipment advice'],
      price: 'From €60/person/day'
    },
    {
      service: 'Cultural Immersion',
      duration: '4-6 hours',
      groupSize: '1-10 people',
      includes: ['Local guide', 'Village visits', 'Traditional meal', 'Craft demonstrations'],
      price: 'From €35/person'
    },
    {
      service: 'Photography Tours',
      duration: 'Full day',
      groupSize: '1-4 people',
      includes: ['Photography guide', 'Best locations', 'Timing advice', 'Local access'],
      price: 'From €55/person'
    }
  ];

  const bookingProcess = [
    {
      step: '1',
      title: 'Choose Your Guide',
      description: 'Browse our certified local guides and select based on your interests and language preferences.'
    },
    {
      step: '2',
      title: 'Contact & Plan',
      description: 'Reach out directly to discuss your itinerary, dates, and specific requirements.'
    },
    {
      step: '3',
      title: 'Confirm Booking',
      description: 'Finalize details, confirm availability, and secure your guided experience.'
    },
    {
      step: '4',
      title: 'Enjoy Your Tour',
      description: 'Meet your guide and embark on an unforgettable journey through Tropoja.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Local Guides - Connect with a Guide Now</h2>
        <p className="text-muted-foreground">Discover Tropoja with certified local experts</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Our Local Guides
          </CardTitle>
          <CardDescription>
            Experienced professionals ready to show you the best of Tropoja
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {localGuides.map((guide, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{guide.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {guide.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{guide.rating}</span>
                      <span className="text-sm text-muted-foreground">({guide.reviews})</span>
                    </div>
                    <Badge variant="outline">{guide.experience}</Badge>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">{guide.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <Languages className="h-4 w-4" />
                      <span className="font-medium">Languages:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {guide.languages.map((lang, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Price Range:</div>
                    <div className="text-sm text-muted-foreground">{guide.priceRange}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="outline">{specialty}</Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guide Services</CardTitle>
          <CardDescription>Available tour packages and services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {guideServices.map((service, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{service.service}</h4>
                  <Badge variant="outline">{service.price}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                  <div><strong>Duration:</strong> {service.duration}</div>
                  <div><strong>Group Size:</strong> {service.groupSize}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.includes.map((item, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">{item}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Book</CardTitle>
          <CardDescription>Simple steps to connect with your perfect guide</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {bookingProcess.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  {step.step}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Guide;