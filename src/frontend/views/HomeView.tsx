import {
  SidebarProvider,
  SidebarTrigger,
} from '@/frontend/components/ui/sidebar';
import AppSidebar from '@/frontend/components/app-sidebar';

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
}
