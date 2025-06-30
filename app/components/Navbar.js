'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path) => pathname === path

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-2xl font-bold text-gray-900 hover:text-red-600 transition-colors"
            >
              CROCUS ART STUDIO
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/tattoos"
              className={`nav-link ${isActive('/tattoos') ? 'nav-link-active' : ''}`}
            >
              Dövmeler
            </Link>
            <Link 
              href="/piercings"
              className={`nav-link ${isActive('/piercings') ? 'nav-link-active' : ''}`}
            >
              Piercingler
            </Link>
            <Link 
              href="/book"
              className={`nav-link ${isActive('/book') ? 'nav-link-active' : ''}`}
            >
              Randevu Al
            </Link>
            <Link 
              href="/appointments/status"
              className={`nav-link text-yellow-600 font-bold border-2 border-yellow-400 rounded px-3 py-1 ${isActive('/appointments/status') ? 'nav-link-active' : ''}`}
            >
              Randevu Takip
            </Link>
            <Link 
              href="/admin"
              className={`nav-link ${isActive('/admin') ? 'nav-link-active' : ''}`}
            >
              Yönetici
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 