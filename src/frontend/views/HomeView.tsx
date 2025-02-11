import { useState } from 'react';
import { SidebarProvider } from '@/frontend/components/ui/sidebar';
import AppSidebar from '@/frontend/components/app-sidebar';
import FileDropzone from '@/frontend/components/file-dropzone';
import Settings from './SettingsView';
import About from './AboutView';
import History from './HistoryView';

export default function Home() {
  const [activePage, setActivePage] = useState('File');
  return (
    <SidebarProvider>
      <AppSidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex flex-col flex-1 gap-4 p-4">
        <section className={activePage === 'File' ? 'block' : 'hidden'}>
          <FileDropzone />
        </section>
        <section className={activePage === 'History' ? 'block' : 'hidden'}>
          <History />
        </section>
        <section className={activePage === 'Settings' ? 'block' : 'hidden'}>
          <Settings />
        </section>
        <section className={activePage === 'About' ? 'block' : 'hidden'}>
          <About />
        </section>
      </main>
    </SidebarProvider>
  );
}
