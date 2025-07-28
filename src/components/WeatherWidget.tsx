import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Thermometer, 
  Wind, 
  Eye,
  Droplets
} from 'lucide-react';

const WeatherWidget: React.FC = () => {
  // Mock weather data - in a real app, this would come from an API
  const currentWeather = {
    location: 'Bajram Curri, Tropoja',
    temperature: 18,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    visibility: 8,
    uvIndex: 6
  };

  const forecast = [
    { day: 'Today', high: 22, low: 12, condition: 'Sunny', icon: <Sun className="h-5 w-5" /> },
    { day: 'Tomorrow', high: 19, low: 10, condition: 'Cloudy', icon: <Cloud className="h-5 w-5" /> },
    { day: 'Wed', high: 16, low: 8, condition: 'Rain', icon: <CloudRain className="h-5 w-5" /> },
    { day: 'Thu', high: 20, low: 11, condition: 'Sunny', icon: <Sun className="h-5 w-5" /> },
    { day: 'Fri', high: 18, low: 9, condition: 'Cloudy', icon: <Cloud className="h-5 w-5" /> }
  ];

  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="h-8 w-8 text-yellow-400" />;
      case 'cloudy': case 'partly cloudy': return <Cloud className="h-8 w-8 text-slate-400" />;
      case 'rain': return <CloudRain className="h-8 w-8 text-blue-400" />;
      default: return <Sun className="h-8 w-8 text-yellow-400" />;
    }
  };

  const getHikingCondition = (temp: number, condition: string) => {
    if (temp > 20 && condition === 'Sunny') return { label: 'Excellent', color: 'bg-green-600' };
    if (temp > 15 && !condition.includes('Rain')) return { label: 'Good', color: 'bg-blue-600' };
    if (condition.includes('Rain')) return { label: 'Poor', color: 'bg-red-600' };
    return { label: 'Fair', color: 'bg-yellow-600' };
  };

  const hikingCondition = getHikingCondition(currentWeather.temperature, currentWeather.condition);

  return (
    <Card className="w-full bg-slate-700/50 border-slate-600">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-slate-100">
          <span>Current Weather</span>
          <Badge className={`${hikingCondition.color} text-white`}>
            Hiking: {hikingCondition.label}
          </Badge>
        </CardTitle>
        <p className="text-sm text-slate-300">{currentWeather.location}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getConditionIcon(currentWeather.condition)}
            <div>
              <div className="text-3xl font-bold text-slate-100">{currentWeather.temperature}°C</div>
              <div className="text-sm text-slate-300">{currentWeather.condition}</div>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-200">
            <Droplets className="h-4 w-4 text-blue-400" />
            <span>Humidity: {currentWeather.humidity}%</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <Wind className="h-4 w-4 text-slate-400" />
            <span>Wind: {currentWeather.windSpeed} km/h</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <Eye className="h-4 w-4 text-green-400" />
            <span>Visibility: {currentWeather.visibility} km</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <Sun className="h-4 w-4 text-yellow-400" />
            <span>UV Index: {currentWeather.uvIndex}</span>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="border-t border-slate-600 pt-4">
          <h4 className="font-semibold mb-3 text-slate-100">5-Day Forecast</h4>
          <div className="space-y-2">
            {forecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3 flex-1">
                  {day.icon}
                  <span className="font-medium w-16 text-slate-200">{day.day}</span>
                  <span className="text-sm text-slate-300 flex-1">{day.condition}</span>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="font-medium text-slate-200">{day.high}°</span>
                  <span className="text-slate-400">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hiking Advice */}
        <div className="bg-blue-900/30 p-3 rounded-lg border-l-4 border-blue-500">
          <h5 className="font-semibold text-blue-300 mb-1">Hiking Advice</h5>
          <p className="text-sm text-blue-200">
            {hikingCondition.label === 'Excellent' && "Perfect conditions for hiking! Don't forget sunscreen and plenty of water."}
            {hikingCondition.label === 'Good' && "Good hiking weather. Bring layers as mountain temperatures can change quickly."}
            {hikingCondition.label === 'Fair' && "Cooler conditions. Bring warm layers and check trail conditions."}
            {hikingCondition.label === 'Poor' && "Not ideal for hiking. Consider indoor activities or wait for better weather."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;