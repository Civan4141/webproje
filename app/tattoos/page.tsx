'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface TattooService {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl?: string;
  duration?: string;
}

export default function TattoosPage() {
  const [tattooServices, setTattooServices] = useState<TattooService[]>([]);

  useEffect(() => {
    const fetchTattooServices = async () => {
      try {
        const response = await fetch('/api/tattoo-services');
        const data = await response.json();
        setTattooServices(data);
      } catch (error) {
        console.error('Error fetching tattoo services:', error);
      }
    };

    fetchTattooServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Dövme Hizmetlerimiz</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tattooServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 w-full">
                {service.imageUrl ? (
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Görsel Mevcut Değil</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600">{service.price} TL</span>
                  {service.duration && (
                    <span className="text-sm text-gray-500">Süre: {service.duration}</span>
                  )}
                </div>
                <div className="mt-4">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 