import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import CaseCard from '../components/CaseCard';
import InfiniteScroll from '../components/InfiniteScroll';
import Terminal from '../components/Terminal';
import { cases, searchCases, filterCasesByCategory } from '../data/cases';
import { Case } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredCases, setFilteredCases] = useState<Case[]>(cases);
  const [cachedSearches, setCachedSearches] = useLocalStorage<Record<string, Case[]>>('cached_searches', {});
  const [showTerminal, setShowTerminal] = useState(true);
  
  // Handle search and filtering
  useEffect(() => {
    let results: Case[] = [];
    
    if (searchQuery && cachedSearches[searchQuery]) {
      // Use cached results if available
      results = cachedSearches[searchQuery];
    } else if (searchQuery) {
      // Search and cache results
      results = searchCases(searchQuery);
      setCachedSearches({ ...cachedSearches, [searchQuery]: results });
    } else {
      // No search query, use all cases
      results = cases;
    }
    
    // Apply category filter if categories are selected
    if (selectedCategories.length > 0) {
      results = results.filter(item => 
        item.category.some(cat => selectedCategories.includes(cat))
      );
    }
    
    setFilteredCases(results);
  }, [searchQuery, selectedCategories, cachedSearches, setCachedSearches]);
  
  // Handle terminal commands
  const handleTerminalCommand = (command: string): string => {
    if (command.startsWith('cari ')) {
      const query = command.substring(5).trim();
      setSearchQuery(query);
      const results = searchCases(query);
      return `Ditemukan ${results.length} kasus dengan kata kunci "${query}"`;
    } else if (command === 'kategori') {
      const categories = Array.from(new Set(cases.flatMap(item => item.category)));
      return `Kategori yang tersedia:\n- ${categories.join('\n- ')}`;
    } else if (command.startsWith('filter ')) {
      const category = command.substring(7).trim();
      if (category) {
        if (selectedCategories.includes(category)) {
          return `Kategori "${category}" sudah diterapkan.`;
        } else {
          setSelectedCategories([...selectedCategories, category]);
          return `Menerapkan filter kategori: ${category}`;
        }
      } else {
        return 'Silakan masukkan kategori yang ingin difilter.';
      }
    } else if (command === 'reset') {
      setSearchQuery('');
      setSelectedCategories([]);
      return 'Mengatur ulang semua filter.';
    } else if (command === 'tutup-terminal' || command === 'close') {
      setShowTerminal(false);
      return 'Menutup terminal...';
    }
    
    return `Perintah '${command}' tidak dikenali. Ketik 'help' untuk bantuan.`;
  };
  
  const loadingMessage = [
    "Mengaduk-aduk sampah makan bergizi gratis...",
    "Mengeluarkan kasus-kasus yang terkubur...",
    "Menggoreng kasus-kasus spicy...",
    "Mengunyah data yang tidak sehat...",
    "Menghidangkan kasus yang mengejutkan...",
  ][Math.floor(Math.random() * 5)];
  
  return (
    <div className="container mx-auto px-4 py-8" id="main-content">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">
        Dokumentasi Kasus <span className="text-light-accent dark:text-dark-accent">MBGLogs</span>
      </h1>
      <p className="text-center mb-8 text-light-text/70 dark:text-dark-text/70">
        Katalog kasus-kasus Makan Bergizi Gratis (MBG) di Indonesia
      </p>
      
      {showTerminal && (
        <div className="mb-8">
          <Terminal 
            initialGreeting="Selamat datang di MBGLogs Terminal v1.0.0 - Ketik 'help' untuk daftar perintah"
            onCommand={handleTerminalCommand}
          />
          <div className="text-center mt-2">
            <button 
              onClick={() => setShowTerminal(false)}
              className="text-sm text-light-text/70 dark:text-dark-text/70 hover:text-light-accent dark:hover:text-dark-accent"
            >
              Sembunyikan Terminal
            </button>
          </div>
        </div>
      )}
      
      {!showTerminal && (
        <div className="text-center mb-6">
          <button 
            onClick={() => setShowTerminal(true)}
            className="px-4 py-2 bg-light-secondary dark:bg-dark-secondary hover:bg-light-accent/20 dark:hover:bg-dark-accent/20 rounded-md"
          >
            Tampilkan Terminal
          </button>
        </div>
      )}
      
      <div className="mb-6">
        <SearchBar onSearch={setSearchQuery} placeholder="Cari kasus MBG..." />
      </div>
      
      <CategoryFilter
        selectedCategories={selectedCategories}
        onCategorySelect={(category) => setSelectedCategories([...selectedCategories, category])}
        onCategoryRemove={(category) => setSelectedCategories(selectedCategories.filter(cat => cat !== category))}
        onClearAll={() => setSelectedCategories([])}
      />
      
      {filteredCases.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-2">Tidak ada kasus yang ditemukan</p>
          <p className="text-light-text/70 dark:text-dark-text/70">
            Coba kata kunci lain atau hapus filter kategori
          </p>
        </div>
      ) : (
        <InfiniteScroll
          items={filteredCases}
          renderItem={(item) => <CaseCard caseData={item} />}
          itemsPerPage={6}
          loadingIndicator={
            <div className="text-center">
              <div className="inline-flex space-x-1 mb-2">
                <div className="w-2 h-2 bg-light-accent dark:bg-dark-accent rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-light-accent dark:bg-dark-accent rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-light-accent dark:bg-dark-accent rounded-full animate-bounce delay-200"></div>
              </div>
              <p className="text-sm text-light-text/70 dark:text-dark-text/70">
                {loadingMessage}
              </p>
            </div>
          }
        />
      )}
    </div>
  );
};

export default Home;