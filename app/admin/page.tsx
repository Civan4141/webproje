'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import AppointmentManager from './components/AppointmentManager';
import TattooServiceManager from './components/TattooServiceManager';
import PiercingServiceManager from './components/PiercingServiceManager';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('appointments');

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`${
                  activeTab === 'appointments'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Randevular
              </button>
              <button
                onClick={() => setActiveTab('tattoos')}
                className={`${
                  activeTab === 'tattoos'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Dövme Hizmetleri
              </button>
              <button
                onClick={() => setActiveTab('piercings')}
                className={`${
                  activeTab === 'piercings'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Piercing Hizmetleri
              </button>
            </nav>
          </div>

          <div className="mt-6">
            {activeTab === 'appointments' && <AppointmentManager />}
            {activeTab === 'tattoos' && <TattooServiceManager />}
            {activeTab === 'piercings' && <PiercingServiceManager />}
          </div>
        </div>
      </div>
    </div>
  );
} 