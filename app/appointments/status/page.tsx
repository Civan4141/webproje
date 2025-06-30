"use client";
import { useState } from "react";

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
}

export default function AppointmentStatusPage() {
  const [input, setInput] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAppointments([]);
    setSearched(false);
    try {
      const res = await fetch(`/api/appointments?query=${encodeURIComponent(input)}`);
      if (!res.ok) throw new Error("Randevular alınamadı");
      const data = await res.json();
      setAppointments(data);
      setSearched(true);
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Randevu Durumu Sorgula</h2>
        <form onSubmit={handleSearch} className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="E-posta veya Telefon Numarası"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Sorgulanıyor..." : "Sorgula"}
          </button>
        </form>
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        {searched && appointments.length === 0 && !error && (
          <div className="text-center text-gray-500">Randevu bulunamadı.</div>
        )}
        {appointments.length > 0 && (
          <div className="space-y-4">
            {appointments.map(app => (
              <div key={app.id} className="border rounded p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="font-semibold">{app.name}</div>
                    <div className="text-xs text-gray-500">{app.email} / {app.phone}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    app.status === "Beklemede" ? "bg-yellow-100 text-yellow-800" :
                    app.status === "Onaylandı" ? "bg-green-100 text-green-800" :
                    app.status === "İptal Edildi" ? "bg-red-100 text-red-800" :
                    app.status === "Tamamlandı" ? "bg-blue-100 text-blue-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {app.status}
                  </span>
                </div>
                <div className="text-sm text-gray-700">
                  <div><b>Tarih:</b> {app.date}</div>
                  <div><b>Saat:</b> {app.time}</div>
                  <div><b>Hizmet:</b> {app.serviceType}</div>
                  {app.notes && <div><b>Not:</b> {app.notes}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 