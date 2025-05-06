import React, { useEffect, useRef } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface SourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  sources: string[];
}

const SourceModal: React.FC<SourceModalProps> = ({
  isOpen,
  onClose,
  title,
  sources
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  // Trap focus inside modal when open
  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements?.[0] as HTMLElement;
      const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;
      
      const handleTabKey = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      };
      
      window.addEventListener('keydown', handleTabKey);
      
      // Focus first element when modal opens
      setTimeout(() => {
        firstElement?.focus();
      }, 100);
      
      return () => {
        window.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      <div 
        ref={modalRef}
        className="bg-white dark:bg-dark-bg rounded-lg shadow-xl w-full max-w-md z-10 transition-all duration-300 scale-in slide-up"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <div className="flex justify-between items-center p-4 border-b dark:border-dark-secondary">
          <h3 id="modal-title" className="font-bold text-lg">Sumber Informasi</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <h4 className="font-medium mb-3">{title}</h4>
          
          <ul className="space-y-2">
            {sources.map((source, index) => (
              <li key={index} className="flex items-start">
                <ExternalLink className="w-4 h-4 mt-0.5 mr-2 text-light-accent dark:text-dark-accent" />
                <a 
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-accent dark:text-dark-accent hover:underline break-all"
                >
                  {source}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>Sebaiknya verifikasi informasi dari beberapa sumber sebelum membagikannya.</p>
          </div>
        </div>
        
        <div className="p-4 border-t dark:border-dark-secondary flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-light-secondary dark:bg-dark-secondary hover:bg-light-secondary/80 dark:hover:bg-dark-secondary/80 rounded-md"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default SourceModal;