import React from 'react';
import { X } from 'lucide-react';
import { getCategories } from '../data/cases';

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategorySelect: (category: string) => void;
  onCategoryRemove: (category: string) => void;
  onClearAll: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onCategorySelect,
  onCategoryRemove,
  onClearAll,
}) => {
  const allCategories = getCategories();

  return (
    <div className="w-full mb-6">
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedCategories.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-3 py-1.5 bg-error-light/90 hover:bg-error-light text-white rounded-full text-sm font-medium flex items-center transition-colors"
            aria-label="Clear all filters"
          >
            <X className="w-4 h-4 mr-1" />
            Reset
          </button>
        )}
        
        {selectedCategories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryRemove(category)}
            className="px-3 py-1.5 bg-light-accent/90 dark:bg-dark-accent/90 hover:bg-light-accent dark:hover:bg-dark-accent text-white rounded-full text-sm font-medium flex items-center transition-colors"
            aria-label={`Remove filter: ${category}`}
          >
            {category}
            <X className="w-4 h-4 ml-1" />
          </button>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {allCategories
          .filter((category) => !selectedCategories.includes(category))
          .map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className="px-3 py-1.5 bg-light-secondary/80 dark:bg-dark-secondary/80 hover:bg-light-accent/20 dark:hover:bg-dark-accent/20 text-light-text dark:text-dark-text rounded-full text-sm font-medium transition-colors"
              aria-label={`Filter by: ${category}`}
            >
              {category}
            </button>
          ))}
      </div>
    </div>
  );
};

export default CategoryFilter;