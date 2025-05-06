export interface Case {
  id: string;
  title: string;
  location: {
    city: string;
    province: string;
  };
  date: string;
  category: string[];
  sources: string[];
  description: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export type ThemeMode = 'light' | 'dark';

export interface CommandHistoryItem {
  command: string;
  timestamp: number;
  output?: string;
}