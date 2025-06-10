import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[450px] max-w-[90%] mx-auto my-4 rounded-xl overflow-hidden flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/hero-background.jpg"
            alt="Dövme Stüdyosu Arka Plan"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">CROCUS ART STUDIO</h1>
          <p className="text-lg mb-6">
            Profesyonel dövme ve piercing hizmetleriyle sanatsal vizyonunuzu gerçeğe dönüştürüyoruz
          </p>
          <div className="space-x-4">
            <Link
              href="/book"
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors inline-block"
            >
              Randevu Al
            </Link>
            <Link
              href="#gallery"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors inline-block"
            >
              Çalışmalarımız
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/tattoo-main.jpg"
                  alt="Dövme Sanatı"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Dövme</h3>
              <p className="text-gray-600 mb-4">
                Kişiye özel tasarımlar, profesyonel uygulama ve steril ekipmanlarla
                hayalinizdeki dövmeyi gerçeğe dönüştürüyoruz.
              </p>
              <Link
                href="/book"
                className="text-red-600 font-semibold hover:text-red-700 transition-colors"
              >
                Dövme Randevusu Al →
              </Link>
            </div>
            <div className="text-center">
              <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/piercing-main.jpg"
                  alt="Piercing Sanatı"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Piercing</h3>
              <p className="text-gray-600 mb-4">
                Güvenli ve steril ortamda, deneyimli uzmanlarımızla piercing hizmeti
                sunuyoruz.
              </p>
              <Link
                href="/book"
                className="text-red-600 font-semibold hover:text-red-700 transition-colors"
              >
                Piercing Randevusu Al →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Galeri</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Fotoğraf 1
              </div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Fotoğraf 2
              </div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Fotoğraf 3
              </div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Fotoğraf 4
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Neden CROCUS ART STUDIO?</h2>
          <p className="text-gray-700 mb-12">
            Yılların deneyimi ve sanatsal ifade tutkusuyla, profesyonel sanatçı ekibimiz
            hayalinizdeki tasarımları gerçeğe dönüştürüyor. En yüksek hijyen ve güvenlik
            standartlarını uygulayarak mükemmel sonuçlar sunuyoruz.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-red-600 text-4xl mb-4">10+</div>
              <h3 className="text-xl font-semibold mb-2">Deneyim</h3>
              <p className="text-gray-600">Yıllık profesyonel deneyim</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-red-600 text-4xl mb-4">100%</div>
              <h3 className="text-xl font-semibold mb-2">Güvenlik</h3>
              <p className="text-gray-600">Sterilizasyon ve hijyen</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-red-600 text-4xl mb-4">∞</div>
              <h3 className="text-xl font-semibold mb-2">Özel Tasarımlar</h3>
              <p className="text-gray-600">Sınırsız yaratıcılık</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">İletişime Geçin</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Adres</h3>
              <p className="text-gray-300">Mustafa Kemal Atatürk Blv. 48 55270 Atakum Samsun</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">İletişim</h3>
              <p className="text-gray-300">
                Tel: 0531 734 6055<br />
                E-posta: crocusart@gmail.com
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Çalışma Saatleri</h3>
              <p className="text-gray-300">
                Pazartesi - Cumartesi<br />
                10:00 - 20:00
              </p>
            </div>
          </div>
          <div className="mt-12">
            <Link
              href="/book"
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors inline-block"
            >
              Hemen Randevu Al
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 