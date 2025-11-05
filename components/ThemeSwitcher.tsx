
import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, ChevronDown, Palette } from 'lucide-react';
import type { ThemeMode } from '../types';

interface ThemeSwitcherProps {
  themeName: string;
  setThemeName: (name: string) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  flowerNames: { id: string; name:string }[];
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  themeName,
  setThemeName,
  themeMode,
  setThemeMode,
  flowerNames,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleThemeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={toggleThemeMode}
        className="p-2 rounded-full text-[--text-secondary] hover:bg-[--background-primary] hover:text-[--text-primary] transition-colors"
        aria-label="Toggle light/dark mode"
      >
        {themeMode === 'light' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </button>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 p-2 rounded-md text-[--text-secondary] hover:bg-[--background-primary] hover:text-[--text-primary] transition-colors"
        >
          <Palette className="w-5 h-5" />
          <span className="hidden md:inline text-sm font-medium">{flowerNames.find(f => f.id === themeName)?.name}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-[--card-background] border border-[--card-border] rounded-md shadow-lg py-1 z-10">
            {flowerNames.map(({ id, name }) => (
              <button
                key={id}
                onClick={() => {
                  setThemeName(id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  themeName === id ? 'bg-[--primary] text-[--text-on-primary]' : 'text-[--text-primary] hover:bg-[--background-secondary]'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
