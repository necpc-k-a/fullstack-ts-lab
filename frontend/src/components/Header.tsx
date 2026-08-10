import React from 'react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-slate-800 text-white shadow-md py-4 px-6 mb-8">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">
          {title}
        </h1>
        <span className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full">
          Fullstacl Lab
        </span>
      </div>
    </header>
  );
};