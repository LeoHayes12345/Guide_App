import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, User, Calendar } from 'lucide-react';

const Reviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      country: 'United Kingdom',
      rating: 5,
      date: 'March 2024',
      title: 'Absolutely breathtaking!',
      content: 'Tropoja exceeded all my expectations. The Valbona Valley hike was incredible, and the local hospitality was amazing. The traditional guesthouses provided authentic experiences.',
      highlights: ['Valbona Valley', 'Local hospitality', 'Traditional food']
    },
    {
      id: 2,
      name: 'Marco Rossi',
      country: 'Italy',
      rating: 5,
      date: 'February 2024',
      title: 'Hidden gem of the Balkans',
      content: 'Discovered this amazing region through the Peaks of the Balkans trail. The scenery rivals the Swiss Alps but with much fewer crowds. Highly recommend!',
      highlights: ['Peaks of Balkans', 'Scenic beauty', 'Less crowded']
    },
    {
      id: 3,
      name: 'Emma Schmidt',
      country: 'Germany',
      rating: 4,
      date: 'January 2024',
      title: 'Great for adventure seekers',
      content: 'Perfect destination for hiking and nature lovers. The Koman Lake ferry was spectacular. Some infrastructure could be better, but that adds to the authentic experience.',
      highlights: ['Koman Lake', 'Hiking trails', 'Authentic experience']
    },
    {
      id: 4,
      name: 'David Chen',
      country: 'Australia',
      rating: 5,
      date: 'December 2023',
      title: 'Unforgettable cultural experience',
      content: 'Stayed in Theth for a week. The traditional stone houses, local cuisine, and warm people made it unforgettable. The Blue Eye spring is magical!',
      highlights: ['Theth village', 'Blue Eye spring', 'Local culture']
    },
    {
      id: 5,
      name: 'Anna Kowalski',
      country: 'Poland',
      rating: 4,
      date: 'November 2023',
      title: 'Nature photographer\'s paradise',
      content: 'As a photographer, I was blown away by the landscapes. Every turn offers a new stunning view. The golden hour in the valleys is simply magical.',
      highlights: ['Photography', 'Landscapes', 'Golden hour views']
    },
    {
      id: 6,
      name: 'James Wilson',
      country: 'Canada',
      rating: 5,
      date: 'October 2023',
      title: 'Best hiking destination in Europe',
      content: 'Completed the full Peaks of the Balkans trail. Challenging but incredibly rewarding. The mountain huts were comfortable and the food was excellent.',
      highlights: ['Multi-day hiking', 'Mountain huts', 'Trail food']
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Visitor Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= averageRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
          <span className="text-gray-500">({reviews.length} reviews)</span>
        </div>
      </div>

      {reviews.map((review) => (
        <Card key={review.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{review.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{review.name}</span>
                    <span>•</span>
                    <span>{review.country}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {review.date}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-3">{review.content}</p>
            <div className="flex flex-wrap gap-2">
              {review.highlights.map((highlight, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {highlight}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Reviews;