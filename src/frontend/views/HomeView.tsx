import { useState } from 'react';
import { SidebarProvider } from '@/frontend/components/ui/sidebar';
import AppSidebar from '@/frontend/components/app-sidebar';
import FileDropzone from '@/frontend/components/file-dropzone';
import Settings from './SettingsView';
import About from './AboutView';
import History from './HistoryView';

export default function Home() {
  const [activePage, setActivePage] = useState('File');

  const renderActivePage = () => {
    switch (activePage) {
      case 'Settings':
        return <Settings />;
      case 'History':
        return <History />;
      case 'About':
        return <About />;
      case 'File':
      default:
        return <FileDropzone />;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex flex-1 flex-col gap-4 p-4">
        {renderActivePage()}
      </main>
    </SidebarProvider>
  );
}
