import { SidebarProvider } from '@/frontend/components/ui/sidebar';
import AppSidebar from '@/frontend/components/app-sidebar';
import FileDropzone from '@/frontend/components/file-dropzone';

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col gap-4 p-4">
        <FileDropzone />
      </main>
    </SidebarProvider>
  );
}
