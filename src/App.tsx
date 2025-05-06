import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

// Loading component for suspense fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="inline-flex space-x-2 mb-4">
        <div className="w-3 h-3 bg-light-accent dark:bg-dark-accent rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-light-accent dark:bg-dark-accent rounded-full animate-bounce delay-100"></div>
        <div className="w-3 h-3 bg-light-accent dark:bg-dark-accent rounded-full animate-bounce delay-200"></div>
      </div>
      <p className="text-light-text dark:text-dark-text">Memuat konten...</p>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold mb-4">404</h1>
                      <p className="mb-4">Halaman tidak ditemukan</p>
                      <a href="/" className="text-light-accent dark:text-dark-accent hover:underline">
                        Kembali ke Beranda
                      </a>
                    </div>
                  </div>
                } />
              </Routes>
            </Suspense>
          </main>
          <footer className="py-4 text-center text-light-text/60 dark:text-dark-text/60">
            <p className="text-sm">
              MBGLogs &copy; 2025 - Dokumentasi Kasus Makan Bergizi Gratis
            </p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;