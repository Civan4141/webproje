'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PiercingService {
  id: string;
  name: string;
  description: string;
  price: string;
  location: string;
  imageUrl?: string;
  duration?: string;
}

export default function PiercingsPage() {
  const [piercingServices, setPiercingServices] = useState<PiercingService[]>([]);

  useEffect(() => {
    const fetchPiercingServices = async () => {
      try {
        const response = await fetch('/api/piercing-services');
        const data = await response.json();
        setPiercingServices(data);
      } catch (error) {
        console.error('Error fetching piercing services:', error);
      }
    };

    fetchPiercingServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Piercing Hizmetlerimiz</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {piercingServices.map((service) => (
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
                  <span className="inline-block bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full">
                    {service.location}
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