'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  serviceType: string;
  notes?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function AppointmentManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Randevular yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Güncelleme başarısız');

      toast.success('Randevu durumu güncellendi');
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Randevu güncellenirken bir hata oluştu');
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm('Bu randevuyu silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Silme işlemi başarısız');

      toast.success('Randevu silindi');
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('Randevu silinirken bir hata oluştu');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Beklemede':
        return 'bg-yellow-100 text-yellow-800';
      case 'Onaylandı':
        return 'bg-green-100 text-green-800';
      case 'İptal Edildi':
        return 'bg-red-100 text-red-800';
      case 'Tamamlandı':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Randevu Yönetimi</h2>
      
      <div className="grid grid-cols-1 gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{appointment.name}</h3>
                <p className="text-gray-600">{appointment.email}</p>
                <p className="text-gray-600">{appointment.phone}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                {appointment.status}
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700">
                <span className="font-semibold">Tarih:</span> {appointment.date}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Saat:</span> {appointment.time}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Hizmet:</span> {appointment.serviceType}
              </p>
              {appointment.notes && (
                <p className="text-gray-700">
                  <span className="font-semibold">Notlar:</span> {appointment.notes}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="space-x-2">
                <select
                  value={appointment.status}
                  onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                  className="border rounded px-3 py-1"
                >
                  <option value="Beklemede">Beklemede</option>
                  <option value="Onaylandı">Onaylandı</option>
                  <option value="İptal Edildi">İptal Edildi</option>
                  <option value="Tamamlandı">Tamamlandı</option>
                </select>
              </div>
              <button
                onClick={() => deleteAppointment(appointment.id)}
                className="text-red-600 hover:text-red-800"
              >
                Sil
              </button>
            </div>
          </div>
        ))}

        {appointments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Henüz randevu bulunmuyor.
          </div>
        )}
      </div>
    </div>
  );
} 