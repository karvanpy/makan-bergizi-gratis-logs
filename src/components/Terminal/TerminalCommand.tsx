import React, { useState, useEffect } from 'react';

interface TerminalCommandProps {
  command: string;
}

const TerminalCommand: React.FC<TerminalCommandProps> = ({ command }) => {
  const [visibleText, setVisibleText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const typingSpeed = 50; // ms per character

  useEffect(() => {
    if (currentIndex < command.length) {
      const timer = setTimeout(() => {
        setVisibleText(prev => prev + command[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    }
  }, [command, currentIndex]);

  return (
    <div className="flex items-center text-green-400 font-mono">
      <span className="text-yellow-300 mr-2">$</span>
      <span>{visibleText}</span>
      {currentIndex < command.length && (
        <span className="cursor ml-0"></span>
      )}
    </div>
  );
};

export default TerminalCommand;