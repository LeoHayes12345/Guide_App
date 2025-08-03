import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import WhatsAppPaymentDialog from './WhatsAppPaymentDialog';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWidgetProps {
  isPremium: boolean;
  hasWhatsAppAccess: boolean;
  onUpgrade: () => void;
  onWhatsAppPaymentSuccess: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ 
  isPremium, 
  hasWhatsAppAccess,
  onUpgrade, 
  onWhatsAppPaymentSuccess 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWhatsAppPayment, setShowWhatsAppPayment] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Tropoja AI guide. Ask me about attractions, restaurants, or activities!',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simple local response instead of fetch
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const getAIResponse = (input: string): string => {
    const lower = input.toLowerCase();
    if (lower.includes('restaurant') || lower.includes('food')) {
      return 'For dining, I recommend Restaurant Alpet for traditional Albanian cuisine, or Kulla e Ngujimit for a historic atmosphere.';
    }
    if (lower.includes('hotel') || lower.includes('accommodation')) {
      return 'Popular accommodations include Hotel Tropoja and Guesthouse Valbona. Both offer great mountain views!';
    }
    if (lower.includes('attraction') || lower.includes('visit')) {
      return 'Must-see attractions include Valbona Valley, Theth National Park, and the historic Bajram Curri Museum.';
    }
    return 'I can help you with information about Tropoja\'s attractions, restaurants, hotels, and activities. What would you like to know?';
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/017327456789?text=Hello, I need help with Tropoja tourism information', '_blank');
  };

  const handleWhatsAppPaymentSuccess = () => {
    onWhatsAppPaymentSuccess();
    setShowWhatsAppPayment(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 bg-white shadow-xl z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">Tropoja AI Guide</span>
              {isPremium && <Badge variant="secondary" className="text-xs">Premium</Badge>}
              {hasWhatsAppAccess && <Badge variant="secondary" className="text-xs bg-green-600">WhatsApp</Badge>}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 text-white hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-2 rounded-lg text-sm text-gray-600">
                  AI is typing...
                </div>
              </div>
            )}
          </div>

          {(isPremium || hasWhatsAppAccess) && (
            <div className="px-4 py-2 border-t bg-green-50">
              <Button
                onClick={openWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm"
                size="sm"
              >
                Chat Live on WhatsApp
              </Button>
            </div>
          )}

          {!isPremium && !hasWhatsAppAccess && (
            <div className="px-4 py-2 border-t bg-yellow-50 space-y-2">
              <Button
                onClick={onUpgrade}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white text-sm"
                size="sm"
              >
                Premium Account - Full Access
              </Button>
              <div className="text-center text-xs text-gray-500">or</div>
              <Button
                onClick={() => setShowWhatsAppPayment(true)}
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-50 text-sm"
                size="sm"
              >
                Pay £5 for WhatsApp Chat Only
              </Button>
            </div>
          )}

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about Tropoja..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 text-sm"
              />
              <Button onClick={sendMessage} size="icon" className="h-9 w-9">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      <WhatsAppPaymentDialog
        isOpen={showWhatsAppPayment}
        onClose={() => setShowWhatsAppPayment(false)}
        onSuccess={handleWhatsAppPaymentSuccess}
      />
    </>
  );
};

export default ChatWidget;