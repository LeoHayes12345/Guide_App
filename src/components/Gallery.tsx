import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, MapPin, Calendar } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const photos = [
    {
      id: 1,
      title: 'Valbona Valley Sunrise',
      location: 'Valbona National Park',
      category: 'Landscapes',
      season: 'Summer',
      description: 'Golden sunrise over the pristine Valbona Valley with morning mist',
      photographer: 'Local Guide Team'
    },
    {
      id: 2,
      title: 'Traditional Stone House',
      location: 'Theth Village',
      category: 'Architecture',
      season: 'Spring',
      description: 'Authentic Albanian stone architecture in the heart of the mountains',
      photographer: 'Cultural Heritage Project'
    },
    {
      id: 3,
      title: 'Blue Eye Spring',
      location: 'Theth National Park',
      category: 'Nature',
      season: 'Summer',
      description: 'Crystal clear waters of the famous Blue Eye natural spring',
      photographer: 'Nature Photography Club'
    },
    {
      id: 4,
      title: 'Peaks of the Balkans Trail',
      location: 'Albanian Alps',
      category: 'Adventure',
      season: 'Summer',
      description: 'Hikers on the challenging multi-day Peaks of the Balkans trail',
      photographer: 'Adventure Tours Albania'
    },
    {
      id: 5,
      title: 'Koman Lake Ferry',
      location: 'Koman Lake',
      category: 'Landscapes',
      season: 'Autumn',
      description: 'Scenic ferry journey through fjord-like landscapes',
      photographer: 'Travel Albania'
    },
    {
      id: 6,
      title: 'Local Cuisine Spread',
      location: 'Traditional Guesthouse',
      category: 'Culture',
      season: 'All Year',
      description: 'Traditional Albanian mountain cuisine including flija and local specialties',
      photographer: 'Food & Culture Tours'
    },
    {
      id: 7,
      title: 'Mountain Wildflowers',
      location: 'Alpine Meadows',
      category: 'Nature',
      season: 'Spring',
      description: 'Colorful wildflower meadows in the Albanian Alps',
      photographer: 'Botanical Society'
    },
    {
      id: 8,
      title: 'Grunas Waterfall',
      location: 'Theth National Park',
      category: 'Nature',
      season: 'Summer',
      description: 'Spectacular 30-meter waterfall cascading down limestone cliffs',
      photographer: 'Nature Explorers'
    },
    {
      id: 9,
      title: 'Traditional Folk Dance',
      location: 'Cultural Festival',
      category: 'Culture',
      season: 'Summer',
      description: 'Local performers in traditional Albanian mountain costumes',
      photographer: 'Cultural Events Team'
    }
  ];

  const categories = ['All', 'Landscapes', 'Nature', 'Culture', 'Architecture', 'Adventure'];

  const filteredPhotos = selectedCategory === 'All' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Photo Gallery</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Camera className="h-4 w-4" />
          {photos.length} photos
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer hover:bg-blue-100"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPhotos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center relative">
              <Camera className="h-12 w-12 text-gray-400" />
              <Badge className="absolute top-2 right-2" variant="secondary">
                {photo.category}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{photo.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{photo.description}</p>
              
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {photo.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {photo.season}
                </div>
                <div className="flex items-center gap-1">
                  <Camera className="h-3 w-3" />
                  {photo.photographer}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No photos found in the selected category.
        </div>
      )}

      {/* Photo Contest Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Camera className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Share Your Photos!</h3>
          </div>
          <p className="text-blue-700 text-sm">
            Visited Tropoja? Share your amazing photos with us using #TropojaGuide and get featured in our gallery!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Gallery;