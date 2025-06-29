// src/components/layout/Layout.js
import { useState } from 'react';
import Sidebar from '../ui/Sidebar';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}