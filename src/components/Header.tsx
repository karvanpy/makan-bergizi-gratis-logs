import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, AlertCircle, Terminal, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { cases } from '../data/cases';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [caseCount, setCaseCount] = useState(0);

  // Animate case counter on load
  useEffect(() => {
    const timer = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setCaseCount(count);
        if (count >= cases.length) {
          clearInterval(interval);
        }
      }, 100);
      
      return () => clearInterval(interval);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="sticky top-0 bg-light-bg dark:bg-dark-bg shadow-md z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center"
            aria-label="Back to homepage"
          >
            <Terminal className="w-8 h-8 mr-2 text-light-accent dark:text-dark-accent" />
            <div>
              <h1 className="text-xl font-bold">MBGLogs</h1>
              <p className="text-xs text-light-text/70 dark:text-dark-text/70">
                Dokumentasi Kasus MBG
              </p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/"
              className="text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent transition-colors"
            >
              Beranda
            </Link>
            <Link 
              to="/about"
              className="text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent transition-colors"
            >
              Tentang
            </Link>
            <div className="bg-light-secondary dark:bg-dark-secondary rounded-full px-3 py-1 flex items-center space-x-1">
              <AlertCircle className="w-4 h-4 text-error-dark" />
              <span className="font-medium">{caseCount} Kasus</span>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
          
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t mt-3 dark:border-dark-secondary border-light-secondary">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/"
                className="text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link 
                to="/about"
                className="text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang
              </Link>
              <div className="bg-light-secondary dark:bg-dark-secondary rounded-full px-3 py-1 flex items-center space-x-1 w-fit">
                <AlertCircle className="w-4 h-4 text-error-dark" />
                <span className="font-medium">{caseCount} Kasus</span>
              </div>
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-light-text dark:text-dark-text"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span>Mode Terang</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span>Mode Gelap</span>
                  </>
                )}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;