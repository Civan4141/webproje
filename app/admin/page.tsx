'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import AppointmentManager from './components/AppointmentManager';
import TattooServiceManager from './components/TattooServiceManager';
import PiercingServiceManager from './components/PiercingServiceManager';
import GalleryManager from './components/GalleryManager';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('appointments');
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Paneli</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Çıkış Yap
            </button>
          </div>

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
              <button
                onClick={() => setActiveTab('gallery')}
                className={`${
                  activeTab === 'gallery'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Galeri
              </button>
            </nav>
          </div>

          <div className="mt-6">
            {activeTab === 'appointments' && <AppointmentManager />}
            {activeTab === 'tattoos' && <TattooServiceManager />}
            {activeTab === 'piercings' && <PiercingServiceManager />}
            {activeTab === 'gallery' && <GalleryManager />}
          </div>
        </div>
      </div>
    </div>
  );
} 