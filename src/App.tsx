/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

import { reportarFalla } from './api';
import ApiIntegrationGuide from './components/ApiIntegrationGuide';
import OnboardingView from './components/OnboardingView';
import ReportFoundForm from './components/ReportFoundForm';
import SearchMissingForm from './components/SearchMissingForm';
import MenuView from './components/MenuView';
import ErrorReportModal from './components/layout/ErrorReportModal';
import FlagBar from './components/layout/FlagBar';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import TabSwitcher from './components/layout/TabSwitcher';
import { INITIAL_FOUND_PERSONS } from './data';
import { useErrorReport } from './hooks/useErrorReport';
import { FoundPerson } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'buscar' | 'reportar' | 'api' | 'testimonios'>('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [foundPersons, setFoundPersons] = useState<FoundPerson[]>([]);

  const errorReport = useErrorReport(reportarFalla);

  useEffect(() => {
    const stored = localStorage.getItem('ven_disaster_found_persons');
    if (stored) {
      try {
        setFoundPersons(JSON.parse(stored));
      } catch {
        setFoundPersons(INITIAL_FOUND_PERSONS);
      }
    } else {
      setFoundPersons(INITIAL_FOUND_PERSONS);
      localStorage.setItem('ven_disaster_found_persons', JSON.stringify(INITIAL_FOUND_PERSONS));
    }
  }, []);

  const savePersons = (updatedList: FoundPerson[]) => {
    setFoundPersons(updatedList);
    localStorage.setItem('ven_disaster_found_persons', JSON.stringify(updatedList));
  };

  const handleAddPerson = (newPerson: FoundPerson) => {
    savePersons([newPerson, ...foundPersons]);
  };

  return (
    <div className="flex flex-col font-sans overflow-x-hidden" id="app-root-container">
      <Header 
        activeTab={activeTab} 
        onChangeTab={(tab) => { setActiveTab(tab); setIsMenuOpen(false); }} 
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        onOpenErrorReport={errorReport.openModal} 
      />

      <main className={`w-full flex flex-col ${isMenuOpen || activeTab !== 'inicio' ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5' : ''}`}>
        {isMenuOpen ? (
          <MenuView 
            activeTab={activeTab} 
            onSelect={(tab) => { setActiveTab(tab); setIsMenuOpen(false); }} 
            onOpenErrorReport={() => { errorReport.openModal(); setIsMenuOpen(false); }} 
          />
        ) : (
          <>
            {activeTab === 'inicio' && <OnboardingView onSelect={setActiveTab} />}
            {activeTab === 'buscar' && <SearchMissingForm onBack={() => setActiveTab('inicio')} />}
            {activeTab === 'reportar' && <ReportFoundForm onAddPerson={handleAddPerson} onBack={() => setActiveTab('inicio')} />}
            {activeTab === 'api' && <ApiIntegrationGuide />}
            {activeTab === 'testimonios' && (
              <div className="w-full max-w-4xl mx-auto py-12 text-center animate-[fadeIn_0.2s_ease-out]">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Testimonios</h2>
                <p className="text-slate-500">Próximamente...</p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      <ErrorReportModal
        isOpen={errorReport.isOpen}
        errorText={errorReport.errorText}
        sending={errorReport.sending}
        sent={errorReport.sent}
        sendError={errorReport.sendError}
        onChangeText={errorReport.setErrorText}
        onClose={errorReport.closeModal}
        onSubmit={errorReport.submit}
      />
    </div>
  );
}
