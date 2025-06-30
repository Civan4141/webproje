'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Sayfa yüklendiğinde kullanıcı durumunu kontrol et
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Giriş yapılamadı');
      }

      setUser(data.user);
      setIsLoginModalOpen(false);
      setLoginData({ email: '', password: '' });
      toast.success('Başarıyla giriş yapıldı!');

      if (data.user.role === 'admin') {
        router.push('/admin');
      }
    } catch (error) {
      setError('Email veya şifre hatalı');
      toast.error('Giriş başarısız!');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      setUser(null);
      toast.success('Çıkış yapıldı');
      router.push('/');
    } catch (error) {
      toast.error('Çıkış yapılırken hata oluştu');
    }
  };

  return (
    <nav className="bg-black !bg-black border-b border-gray-800 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[200px] items-center bg-black">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-6xl font-bold text-white !text-white hover:text-gray-300 transition-colors py-8">
                Tattoo Studio
              </Link>
            </div>
            <div className="hidden md:ml-16 md:flex md:space-x-10">
              <Link
                href="/tattoos"
                className="text-white !text-white hover:text-gray-300 px-6 py-8 rounded-md text-2xl font-medium transition-colors"
              >
                Dövmeler
              </Link>
              <Link
                href="/piercings"
                className="text-white !text-white hover:text-gray-300 px-6 py-8 rounded-md text-2xl font-medium transition-colors"
              >
                Piercing
              </Link>
              <Link
                href="/gallery"
                className="text-white !text-white hover:text-gray-300 px-6 py-8 rounded-md text-2xl font-medium transition-colors"
              >
                Galeri
              </Link>
              <Link
                href="/appointments/status"
                className="text-white !text-white hover:text-yellow-400 px-6 py-8 rounded-md text-2xl font-bold border-2 border-yellow-400 ml-2 transition-colors"
              >
                Randevu Takip
              </Link>
              <Link
                href="/contact"
                className="text-white !text-white hover:text-gray-300 px-6 py-8 rounded-md text-2xl font-medium transition-colors"
              >
                İletişim
              </Link>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="inline-flex items-center px-6 py-4 border-2 border-white text-lg font-medium rounded-md text-white !text-white hover:bg-white hover:text-black transition-colors duration-200"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-6 py-4 border-2 border-red-500 text-lg font-medium rounded-md text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white !text-white text-lg font-medium rounded-md hover:bg-white hover:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Giriş Yap
              </button>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white !text-white hover:text-gray-300 hover:bg-gray-900 transition-colors"
            >
              <span className="sr-only">Menüyü aç</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil menü */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[200px] inset-x-0 bg-black !bg-black border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/tattoos"
              className="block px-3 py-2 text-base font-medium text-white !text-white hover:text-gray-300 hover:bg-gray-900 rounded-md transition-colors"
            >
              Dövmeler
            </Link>
            <Link
              href="/piercings"
              className="block px-3 py-2 text-base font-medium text-white !text-white hover:text-gray-300 hover:bg-gray-900 rounded-md transition-colors"
            >
              Piercing
            </Link>
            <Link
              href="/gallery"
              className="block px-3 py-2 text-base font-medium text-white !text-white hover:text-gray-300 hover:bg-gray-900 rounded-md transition-colors"
            >
              Galeri
            </Link>
            <Link
              href="/appointments/status"
              className="block px-3 py-2 text-base font-bold text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-900 hover:text-yellow-200 rounded-md transition-colors"
            >
              Randevu Takip
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-base font-medium text-white !text-white hover:text-gray-300 hover:bg-gray-900 rounded-md transition-colors"
            >
              İletişim
            </Link>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="block px-3 py-2 text-base font-medium text-white !text-white hover:text-gray-300 hover:bg-gray-900 rounded-md transition-colors"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-500 hover:text-red-400 hover:bg-gray-900 rounded-md transition-colors"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-white !text-white hover:text-gray-300 hover:bg-gray-900 rounded-md transition-colors"
              >
                Giriş Yap
              </button>
            )}
          </div>
        </div>
      )}

      {/* Giriş Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Giriş Yap</h2>
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Şifre
                </label>
                <input
                  type="password"
                  id="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
              >
                Giriş Yap
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
} 