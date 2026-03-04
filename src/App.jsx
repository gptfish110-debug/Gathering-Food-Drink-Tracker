import React, { useState } from 'react';
import { GatheringProvider } from './context/GatheringContext';
import { GatheringList } from './components/GatheringList';
import { GatheringDetail } from './components/GatheringDetail';
import './App.css';

function AppContent() {
  const [currentView, setCurrentView] = useState({ name: 'home', id: null });

  const navigateTo = (view, id = null) => {
    setCurrentView({ name: view, id });
  };

  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <h1
          className="text-gradient title"
          style={{ margin: 0, cursor: 'pointer', fontSize: '2rem' }}
          onClick={() => navigateTo('home')}
        >
          GatherFlow
        </h1>
        <p className="subtitle" style={{ fontSize: '0.9rem', marginBottom: 0 }}>
          Organize food & drinks for your next meetup
        </p>
      </header>

      <main className="app-main">
        {currentView.name === 'home' && (
          <GatheringList onNavigate={navigateTo} />
        )}
        {currentView.name === 'detail' && (
          <GatheringDetail gatheringId={currentView.id} onBack={() => navigateTo('home')} />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <GatheringProvider>
      <AppContent />
    </GatheringProvider>
  );
}

export default App;
