import React from 'react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header style={{ marginBottom: '20px' }}>
      <h1>{title}</h1>
    </header>
  );
};