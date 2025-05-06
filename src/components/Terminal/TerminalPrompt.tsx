import React from 'react';

interface TerminalPromptProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const TerminalPrompt: React.FC<TerminalPromptProps> = ({ 
  value, 
  onChange, 
  onKeyDown 
}) => {
  return (
    <div className="flex items-center text-green-400 font-mono">
      <span className="text-yellow-300 mr-2">$</span>
      <div className="relative flex-grow">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="bg-transparent border-none outline-none text-green-400 w-full"
          autoFocus
          aria-label="Terminal input"
        />
        {value === '' && (
          <span className="cursor absolute top-0 left-0"></span>
        )}
      </div>
    </div>
  );
};

export default TerminalPrompt;