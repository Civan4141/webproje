'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  subCategory?: string;
  createdAt: string;
  location?: string;
}

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    category: 'tattoo',
    subCategory: '',
    location: '',
  });

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast.error('Galeri öğeleri yüklenirken bir hata oluştu');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingItem
        ? `/api/gallery/${editingItem.id}`
        : '/api/gallery';
      
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem
        ? { ...formData, id: editingItem.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('İşlem başarısız');

      toast.success(editingItem ? 'Galeri öğesi güncellendi' : 'Yeni galeri öğesi eklendi');
      fetchGalleryItems();
      resetForm();
    } catch (error) {
      console.error('Error saving gallery item:', error);
      toast.error('Galeri öğesi kaydedilirken bir hata oluştu');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu galeri öğesini silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Silme işlemi başarısız');

      toast.success('Galeri öğesi silindi');
      fetchGalleryItems();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast.error('Galeri öğesi silinirken bir hata oluştu');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      imageUrl: '',
      category: 'tattoo',
      subCategory: '',
      location: '',
    });
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const startEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      imageUrl: item.imageUrl,
      category: item.category,
      subCategory: item.subCategory || '',
      location: item.location || '',
    });
    setIsAddingNew(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Galeri Yönetimi</h2>
        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          {isAddingNew ? 'İptal' : 'Yeni Görsel Ekle'}
        </button>
      </div>

      {isAddingNew && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2">Başlık</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Görsel URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full p-2 border rounded"
                required
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
              {editingItem ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-gray-700">
                  <span className="font-semibold">Kategori:</span>{' '}
                  {item.category === 'tattoo' ? 'Dövme' : 'Piercing'}
                </p>
                {item.subCategory && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Alt Kategori:</span> {item.subCategory}
                  </p>
                )}
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => startEdit(item)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && !isAddingNew && (
        <div className="text-center py-12 text-gray-500">
          Henüz galeri öğesi bulunmuyor.
        </div>
      )}
    </div>
  );
} 