import React, { useState } from 'react';
import { MapPin, Calendar, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { Case } from '../types';
import SourceModal from './SourceModal';

interface CaseCardProps {
  caseData: Case;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'low':
        return 'bg-success-DEFAULT';
      case 'medium':
        return 'bg-warning-DEFAULT';
      case 'high':
        return 'bg-error-light';
      case 'critical':
        return 'bg-error-dark';
      default:
        return 'bg-gray-400';
    }
  };

  const getSeverityLabel = (severity?: string) => {
    switch (severity) {
      case 'low':
        return 'Ringan';
      case 'medium':
        return 'Sedang';
      case 'high':
        return 'Berat';
      case 'critical':
        return 'Kritis';
      default:
        return 'Tidak diketahui';
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-dark-secondary shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text">{caseData.title}</h3>
            {caseData.severity && (
              <span className={`${getSeverityColor(caseData.severity)} text-white text-xs px-2 py-1 rounded-full`}>
                {getSeverityLabel(caseData.severity)}
              </span>
            )}
          </div>
          
          <div className="text-sm mb-4 text-light-text/80 dark:text-dark-text/80">
            <div className="flex items-center mb-2">
              <MapPin className="w-4 h-4 mr-2 text-light-accent dark:text-dark-accent" />
              {caseData.location.city}, {caseData.location.province}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-light-accent dark:text-dark-accent" />
              {new Date(caseData.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          
          <p className="text-sm mb-4 text-light-text dark:text-dark-text line-clamp-3">
            {caseData.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {caseData.category.map((cat, index) => (
              <span 
                key={index}
                className="bg-light-secondary dark:bg-dark-bg px-2 py-1 rounded-md text-xs"
              >
                {cat}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-light-accent dark:text-dark-accent hover:underline flex items-center"
              aria-label="View sources"
            >
              <LinkIcon className="w-4 h-4 mr-1" />
              {caseData.sources.length} Sumber
            </button>
            
            {caseData.severity === 'critical' && (
              <div className="flex items-center text-error-dark text-sm">
                <AlertTriangle className="w-4 h-4 mr-1" />
                <span>Sangat Berbahaya!</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <SourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={caseData.title}
        sources={caseData.sources}
      />
    </>
  );
};

export default CaseCard;