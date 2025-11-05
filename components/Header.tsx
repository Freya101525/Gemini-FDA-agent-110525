
import React from 'react';
import type { ThemeMode } from '../types';
import ThemeSwitcher from './ThemeSwitcher';
import { BotMessageSquare } from 'lucide-react';

interface HeaderProps {
  themeName: string;
  setThemeName: (name: string) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  flowerNames: { id: string; name: string }[];
}

const Header: React.FC<HeaderProps> = ({
  themeName,
  setThemeName,
  themeMode,
  setThemeMode,
  flowerNames,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[--background-secondary]/80 backdrop-blur-md border-b border-[--card-border] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
             <div className="p-2 bg-[--primary] rounded-lg">
               <BotMessageSquare className="h-6 w-6 text-[--text-on-primary]" />
             </div>
            <span className="text-xl font-bold text-[--text-title] tracking-tight">
              AI Analysis Studio
            </span>
          </div>
          <ThemeSwitcher
            themeName={themeName}
            setThemeName={setThemeName}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
            flowerNames={flowerNames}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
