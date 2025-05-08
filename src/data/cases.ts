import { Case } from '../types';

export const cases: Case[] = [
	{
  	"id": "mbg-001",
  	"title": "Puluhan Pelajar di Bogor Keracunan Diduga Usai Konsumsi MBG",
  	"location": {
    	"city": "Bogor",
    	"province": "Jawa Barat"
  	},
  	"date": "2025-05-07",
  	"category": ["keracunan", "sekolah", "program pemerintah"],
  	"sources": [
    	"https://news.detik.com/berita/d-7904664/puluhan-pelajar-di-bogor-alami-keracunan-diduga-usai-komsumsi-mbg",
      "https://www.liputan6.com/news/read/6016388/puluhan-siswa-dan-guru-bina-insani-kota-bogor-keracunan-menu-mbg"
  	],
  	"description": "Dinas Kesehatan Kota Bogor melaporkan adanya dugaan keracunan makanan setelah konsumsi makanan dari program Makan Bergizi Gratis (MBG) di lingkungan sekolah. Sebanyak 36 pelajar mengalami keluhan seperti diare, mual, muntah, dan demam. 12 orang sempat dirawat di rumah sakit, dan 5 di antaranya masih menjalani perawatan.",
  	"severity": "medium"
	},
  {
    "id": "mbg-002",
    "title": "Puluhan Siswa dari Lima Sekolah di PALI Sumsel Diduga Keracunan MBG",
    "location": {
      "city": "Talang Ubi",
      "province": "Sumatera Selatan"
    },
    "date": "2025-05-05",
    "category": ["keracunan", "sekolah", "program pemerintah"],
    "sources": [
      "https://www.kompas.id/artikel/puluhan-siswa-dari-lima-sekolah-di-pali-sumsel-diduga-keracunan-mbg"
    ],
    "description": "Sebanyak 64 siswa dari lima sekolah di Kecamatan Talang Ubi, Kabupaten Penukal Abab Lematang Ilir (PALI), Sumatera Selatan, diduga mengalami keracunan makanan setelah mengonsumsi menu Makan Bergizi Gratis (MBG). Para siswa dirawat di IGD RSUD Talang Ubi dengan gejala sakit perut, pusing, dan mual. Sampel menu MBG berupa ikan tongkol suwir telah diambil untuk diuji laboratorium oleh Dinas Kesehatan dan Kepolisian Resor PALI.",
    "severity": "high"
  }
];

export const getCategories = (): string[] => {
  const categoriesSet = new Set<string>();
  
  cases.forEach(item => {
    item.category.forEach(cat => categoriesSet.add(cat));
  });
  
  return Array.from(categoriesSet);
};

export const getCaseById = (id: string): Case | undefined => {
  return cases.find(item => item.id === id);
};

export const searchCases = (query: string): Case[] => {
  const lowerQuery = query.toLowerCase();
  
  return cases.filter(item => 
    item.title.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.location.city.toLowerCase().includes(lowerQuery) ||
    item.location.province.toLowerCase().includes(lowerQuery) ||
    item.category.some(cat => cat.toLowerCase().includes(lowerQuery))
  );
};

export const filterCasesByCategory = (categories: string[]): Case[] => {
  if (categories.length === 0) return cases;
  
  return cases.filter(item => 
    item.category.some(cat => categories.includes(cat))
  );
};
