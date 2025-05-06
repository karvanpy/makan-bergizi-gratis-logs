import React, { useState, useRef, useEffect } from 'react';
import { CommandHistoryItem } from '../../types';
import { Sparkles } from 'lucide-react';
import TerminalCommand from './TerminalCommand';
import TerminalPrompt from './TerminalPrompt';

interface TerminalProps {
  initialGreeting?: string;
  onCommand?: (command: string) => string | Promise<string>;
}

const Terminal: React.FC<TerminalProps> = ({ 
  initialGreeting = "Selamat datang di MBGLogs Terminal v1.0.0", 
  onCommand 
}) => {
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Add initial greeting
  useEffect(() => {
    if (initialGreeting) {
      setCommandHistory([
        {
          command: '',
          output: initialGreeting,
          timestamp: Date.now()
        },
        {
          command: '',
          output: "Ketik 'help' untuk menampilkan daftar perintah yang tersedia.",
          timestamp: Date.now() + 1
        }
      ]);
    }
  }, [initialGreeting]);

  // Auto scroll to bottom when command history changes
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && currentCommand.trim()) {
      event.preventDefault();
      
      // Process command
      const trimmedCommand = currentCommand.trim();
      
      // Add command to history
      const newHistoryItem: CommandHistoryItem = {
        command: trimmedCommand,
        timestamp: Date.now()
      };
      
      let output: string | undefined;
      
      // Handle commands
      if (trimmedCommand === 'clear') {
        setCommandHistory([]);
      } else if (trimmedCommand === 'help') {
        output = `
Perintah yang tersedia:
- help: menampilkan bantuan ini
- clear: membersihkan terminal
- cari <kata kunci>: mencari kasus berdasarkan kata kunci
- kategori: menampilkan semua kategori kasus
- versi: menampilkan versi aplikasi
- tema: mengubah tema aplikasi
        `;
      } else if (trimmedCommand === 'versi') {
        output = 'MBGLogs v1.0.0 - Dokumentasi Kasus Makan Bergizi Gratis';
      } else if (trimmedCommand === 'tema') {
        output = 'Gunakan Ctrl+T untuk mengganti tema aplikasi.';
      } else if (trimmedCommand.startsWith('cari ')) {
        const query = trimmedCommand.substring(5).trim();
        if (query) {
          output = `Mencari kasus dengan kata kunci "${query}"...`;
        } else {
          output = 'Silakan masukkan kata kunci pencarian.';
        }
      } else if (onCommand) {
        try {
          output = await onCommand(trimmedCommand);
        } catch (error) {
          output = `Error: ${error instanceof Error ? error.message : 'Terjadi kesalahan'}`;
        }
      } else {
        output = `Perintah '${trimmedCommand}' tidak dikenali. Ketik 'help' untuk bantuan.`;
      }
      
      if (output) {
        newHistoryItem.output = output;
      }
      
      setCommandHistory([...commandHistory, newHistoryItem]);
      setCurrentCommand('');
      setHistoryIndex(-1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      
      // Navigate command history (backwards)
      const filteredHistory = commandHistory
        .filter(item => item.command)
        .map(item => item.command);
      
      if (filteredHistory.length > 0) {
        const newIndex = historyIndex < filteredHistory.length - 1 
          ? historyIndex + 1 
          : historyIndex;
        
        if (newIndex >= 0 && newIndex < filteredHistory.length) {
          setCurrentCommand(filteredHistory[filteredHistory.length - 1 - newIndex]);
          setHistoryIndex(newIndex);
        }
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      
      // Navigate command history (forwards)
      const filteredHistory = commandHistory
        .filter(item => item.command)
        .map(item => item.command);
      
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setCurrentCommand(filteredHistory[filteredHistory.length - 1 - newIndex]);
        setHistoryIndex(newIndex);
      } else if (historyIndex === 0) {
        setCurrentCommand('');
        setHistoryIndex(-1);
      }
    }
  };

  return (
    <div className="terminal w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto">
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500"></div>
        <div className="terminal-dot bg-yellow-500"></div>
        <div className="terminal-dot bg-green-500"></div>
        <div className="flex-1 text-center text-white text-sm font-medium">
          <Sparkles size={16} className="inline-block mr-2" />
          MBGLogs Terminal
        </div>
      </div>
      <div 
        className="terminal-body h-64 md:h-80" 
        ref={terminalBodyRef}
      >
        {commandHistory.map((item, index) => (
          <div key={index} className="mb-2">
            {item.command && (
              <TerminalCommand command={item.command} />
            )}
            {item.output && (
              <div className="text-gray-200 whitespace-pre-wrap">{item.output}</div>
            )}
          </div>
        ))}
        
        <TerminalPrompt 
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default Terminal;