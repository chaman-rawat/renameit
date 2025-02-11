import { useTheme } from '@/frontend/lib/ThemeContext';
import { Check, SunMoon, ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/frontend/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/frontend/components/ui/sidebar';

export default function ThemeToggle() {
  const Themes: Array<'light' | 'dark' | 'system'> = [
    'light',
    'dark',
    'system',
  ];
  const { theme, applyTheme } = useTheme();

  function toSentenceCase(str: string): string {
    if (!str) return str; // If the string is empty, return it as it is
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex items-center justify-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                <SunMoon className="size-6" />
              </div>
              <span className="group-data-[collapsible=icon]:hidden font-semibold">
                {toSentenceCase(theme)}
              </span>
              <ChevronsUpDown className="group-data-[collapsible=icon]:hidden ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {Themes.map((themeName) => (
              <DropdownMenuItem
                key={themeName}
                onSelect={() => applyTheme(themeName)}
              >
                {toSentenceCase(themeName)}
                {themeName === theme && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
