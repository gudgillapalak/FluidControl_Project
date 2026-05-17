import {
  BarChart3,
  LayoutDashboard,
  FolderKanban,
  Users,
  UserCog,
  Upload,
  Activity,
  LogOut,
  PlusCircle,
  CalendarDays,
} from 'lucide-react';

import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';

const navItems = [

  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'manager', 'employee'],
  },

  {
    title: 'Projects',
    url: '/projects',
    icon: FolderKanban,
    roles: ['admin', 'manager', 'employee'],
  },

  {
    title: 'Add Project',
    url: '/add-project',
    icon: PlusCircle,
    roles: ['admin'],
  },

  /* ✅ NEW ANALYTICS PAGE */
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart3,
    roles: ['admin', 'manager'],
  },

  {
    title: 'Managers',
    url: '/managers',
    icon: UserCog,
    roles: ['admin'],
  },

  {
    title: 'Employees',
    url: '/employees',
    icon: Users,
    roles: ['admin', 'manager'],
  },

  {
    title: 'Upload Data',
    url: '/upload',
    icon: Upload,
    roles: ['admin'],
  },

  {
    title: 'Activity Log',
    url: '/activity',
    icon: Activity,
    roles: ['admin'],
  },

  {
    title: 'Completed Projects',
    url: '/completed-projects',
    icon: FolderKanban,
    roles: ['admin', 'manager'],
  },

  {
    title: 'Deleted Projects',
    url: '/deleted-projects',
    icon: FolderKanban,
    roles: ['admin'],
  },

  {
    title: 'Calendar',
    url: '/calendar',
    icon: CalendarDays,
    roles: ['admin', 'manager', 'employee'],
  },

  {
    title: 'Reports',
    url: '/reports',
    icon: BarChart3,
    roles: ['admin', 'manager'],
  },

  {
  title: 'User Management',
  url: '/user-management',
  icon: UserCog,
  roles: ['superadmin'],
},
];

export function AppSidebar() {

  const { state } = useSidebar();

  const collapsed = state === 'collapsed';

  const location = useLocation();

  const { role, user, signOut } = useAuth();

  const filteredItems = navItems.filter(
    (item) => role && item.roles.includes(role)
  );

  return (

    <Sidebar collapsible="icon" className="sidebar-gradient border-r-0">

      <SidebarContent>

        {/* Logo */}
        <SidebarGroup>

          <div className="flex items-center gap-3 px-3 py-4">

            <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
              <BarChart3 className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>

            {!collapsed && (
              <span className="font-heading font-bold text-sidebar-foreground text-lg">
                ProjectHub
              </span>
            )}

          </div>

        </SidebarGroup>

        {/* Navigation */}
        <SidebarGroup>

          <SidebarGroupLabel className="text-sidebar-foreground/50 uppercase text-xs tracking-wider">

            {!collapsed && 'Navigation'}

          </SidebarGroupLabel>

          <SidebarGroupContent>

            <SidebarMenu>

              {filteredItems.map((item) => (

                <SidebarMenuItem key={item.title}>

                  <SidebarMenuButton asChild>

                    <NavLink
                      to={item.url}
                      end
                      className="
                        text-sidebar-foreground/70
                        hover:bg-sidebar-accent
                        hover:text-sidebar-accent-foreground
                        transition-colors
                      "
                      activeClassName="
                        bg-sidebar-accent
                        text-sidebar-primary
                        font-medium
                      "
                    >

                      <item.icon className="mr-2 h-4 w-4" />

                      {!collapsed && (
                        <span>{item.title}</span>
                      )}

                    </NavLink>

                  </SidebarMenuButton>

                </SidebarMenuItem>

              ))}

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border p-3">

        {!collapsed && (

          <div className="mb-2 px-1">

            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.email || 'User'}
            </p>

            <p className="text-xs text-sidebar-foreground/50 capitalize">
              {role || 'loading...'}
            </p>

          </div>

        )}

        <Button
          variant="ghost"
          size={collapsed ? 'icon' : 'sm'}
          onClick={signOut}
          className="
            w-full
            text-sidebar-foreground/70
            hover:text-sidebar-foreground
            hover:bg-sidebar-accent
          "
        >

          <LogOut className="h-4 w-4" />

          {!collapsed && (
            <span className="ml-2">
              Sign Out
            </span>
          )}

        </Button>

      </SidebarFooter>

    </Sidebar>
  );
}