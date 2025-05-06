import React from 'react';
import { AlertTriangle, Cpu, BookOpen, Github } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8" id="main-content">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
          <BookOpen className="mr-2 text-light-accent dark:text-dark-accent" />
          Tentang MBGLogs
        </h1>
        
        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Apa itu MBGLogs?</h2>
          <p className="mb-4">
            MBGLogs (Makan Bergizi Gratis Logs) adalah platform dokumentasi yang bertujuan mengkatalogkan dan 
            mengarsipkan berbagai kasus keamanan pangan di Indonesia. Kami mencatat insiden-insiden terkait 
            makanan dan minuman yang tidak aman, praktik pengolahan yang tidak higienis, 
            dan kasus pemalsuan/penggunaan bahan berbahaya dalam produk pangan.
          </p>
          <p>
            Tujuan utama MBGLogs adalah meningkatkan kesadaran masyarakat Indonesia tentang keamanan pangan 
            dan mendorong praktik konsumsi yang lebih waspada dan bertanggung jawab.
          </p>
        </div>
        
        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-warning-DEFAULT" />
            Disclaimer
          </h2>
          <p className="mb-4">
            Semua kasus yang didokumentasikan dalam MBGLogs dikumpulkan dari berbagai sumber berita dan 
            laporan yang tersedia untuk publik. Kami berusaha memverifikasi setiap informasi yang 
            ditampilkan, namun tidak menjamin keakuratan 100% dari setiap detail.
          </p>
          <p className="mb-4">
            Informasi yang disajikan dalam platform ini bertujuan edukatif dan bukan merupakan nasihat 
            medis atau hukum. Pembaca diharapkan selalu bersikap kritis terhadap informasi yang diterima 
            dan melakukan verifikasi mandiri jika diperlukan.
          </p>
          <p>
            MBGLogs tidak bertanggung jawab atas penggunaan atau penyalahgunaan informasi yang tersedia 
            dalam platform ini.
          </p>
        </div>
        
        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Cpu className="mr-2 text-light-accent dark:text-dark-accent" />
            Teknologi
          </h2>
          <p className="mb-4">
            Platform MBGLogs dibangun menggunakan teknologi web modern termasuk:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>React dengan TypeScript untuk antarmuka pengguna</li>
            <li>TailwindCSS untuk styling</li>
            <li>React Router untuk navigasi</li>
            <li>LocalStorage API untuk caching data pencarian</li>
            <li>Intersection Observer API untuk infinite scrolling</li>
          </ul>
          <p>
            Semua kode sumber tersedia sebagai open source dan dapat diakses di repositori GitHub kami.
          </p>
          
          <div className="mt-6 flex justify-center">
            <a 
              href="https://github.com/mbglogs/mbglogs-website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              <Github className="w-5 h-5 mr-2" />
              Lihat di GitHub
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-light-text/60 dark:text-dark-text/60">
          <p>&copy; 2025 MBGLogs. Hak Cipta Dilindungi.</p>
          <p className="mt-2">
            Dibuat dengan <span className="text-error-DEFAULT">❤</span> untuk keamanan pangan Indonesia
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;