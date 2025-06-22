'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
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

export default function TattooServiceManager() {
  const [services, setServices] = useState<TattooService[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingService, setEditingService] = useState<TattooService | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    duration: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/tattoo-services');
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
        ? '/api/tattoo-services'
        : '/api/tattoo-services';
      
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
      const response = await fetch(`/api/tattoo-services?id=${id}`, {
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
      category: '',
      imageUrl: '',
      duration: '',
    });
    setEditingService(null);
    setIsAddingNew(false);
  };

  const startEdit = (service: TattooService) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      category: service.category,
      imageUrl: service.imageUrl || '',
      duration: service.duration || '',
    });
    setIsAddingNew(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dövme Hizmetleri Yönetimi</h2>
        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
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
              <label className="block mb-2">Kategori</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                placeholder="https://example.com/image.jpg"
              />
              {formData.imageUrl && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Görsel Önizleme:</p>
                  <div className="relative h-48 w-full border rounded overflow-hidden">
                    <Image
                      src={formData.imageUrl}
                      alt="Önizleme"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling!.textContent = 'Görsel yüklenemedi';
                      }}
                    />
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                      Görsel yükleniyor...
                    </div>
                  </div>
                </div>
              )}
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
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              {editingService ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md p-6 mb-4"
          >
            {service.imageUrl && (
              <div className="relative h-48 w-full mb-4 rounded overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
                <div className="mt-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Fiyat:</span> {service.price}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Kategori:</span> {service.category}
                  </p>
                  {service.duration && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Süre:</span> {service.duration}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(service)}
                  className="text-indigo-600 hover:text-indigo-800"
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
          </div>
        ))}
      </div>

      {services.length === 0 && !isAddingNew && (
        <div className="text-center py-12 text-gray-500">
          Henüz hizmet bulunmuyor.
        </div>
      )}
    </div>
  );
} 