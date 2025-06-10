'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface PiercingService {
  id: string;
  name: string;
  description: string;
  price: string;
  location: string;
  imageUrl?: string;
  duration?: string;
}

export default function PiercingServiceManager() {
  const [services, setServices] = useState<PiercingService[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingService, setEditingService] = useState<PiercingService | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    imageUrl: '',
    duration: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/piercing-services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Hizmetler yüklenirken bir hata oluştu');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingService
        ? '/api/piercing-services'
        : '/api/piercing-services';
      
      const method = editingService ? 'PUT' : 'POST';
      const body = editingService
        ? { ...formData, id: editingService.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('İşlem başarısız');

      toast.success(editingService ? 'Hizmet güncellendi' : 'Yeni hizmet eklendi');
      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Hizmet kaydedilirken bir hata oluştu');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/piercing-services?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Silme işlemi başarısız');

      toast.success('Hizmet silindi');
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Hizmet silinirken bir hata oluştu');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      location: '',
      imageUrl: '',
      duration: '',
    });
    setEditingService(null);
    setIsAddingNew(false);
  };

  const startEdit = (service: PiercingService) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      location: service.location,
      imageUrl: service.imageUrl || '',
      duration: service.duration || '',
    });
    setIsAddingNew(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Piercing Hizmetleri Yönetimi</h2>
        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
        >
          {isAddingNew ? 'İptal' : 'Yeni Hizmet Ekle'}
        </button>
      </div>

      {isAddingNew && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Hizmet Adı</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Fiyat</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Bölge</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Süre</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2">Görsel URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2">Açıklama</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border rounded"
                rows={3}
                required
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              İptal
            </button>
            <button
              type="submit"
              className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
            >
              {editingService ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-pink-600">{service.price} TL</span>
              <span className="text-sm bg-pink-100 text-pink-800 px-3 py-1 rounded-full">
                {service.location}
              </span>
            </div>
            {service.duration && (
              <p className="text-sm text-gray-500 mb-4">Süre: {service.duration}</p>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => startEdit(service)}
                className="text-blue-600 hover:text-blue-800"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="text-red-600 hover:text-red-800"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 