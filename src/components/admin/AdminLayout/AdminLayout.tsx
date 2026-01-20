'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Settings, 
  MapPin, 
  Calendar, 
  Users, 
  Building2, 
  Tag, 
  Star, 
  BarChart3,
  Home,
  List,
  Globe
} from 'lucide-react';
import {
  adminLayoutStyles,
  adminSidebarStyles,
  adminHeaderStyles,
  adminMainStyles,
  adminTitleStyles,
  adminNavStyles,
  adminNavItemStyles,
  adminNavLinkStyles,
  adminNavLinkActiveStyles,
  adminNavIconStyles,
} from './AdminLayout.styles';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: BarChart3, exact: true },
  { href: '/admin/activities', label: 'Activities', icon: Calendar },
  { href: '/admin/locations', label: 'Locations', icon: MapPin },
  { href: '/admin/categories', label: 'Categories', icon: Tag },
  { href: '/admin/age-groups', label: 'Age Groups', icon: Users },
  { href: '/admin/organizations', label: 'Organizations', icon: Building2 },
  { href: '/admin/cities', label: 'Cities', icon: Globe },
  { href: '/admin/activity-lists', label: 'Activity Lists', icon: List },
  { href: '/admin/location-lists', label: 'Location Lists', icon: List },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <div style={adminLayoutStyles}>
      <aside style={adminSidebarStyles}>
        <h1 style={adminTitleStyles}>
          <Settings size={24} style={{ marginRight: 'var(--space-2)', verticalAlign: 'text-bottom' }} />
          Admin Portal
        </h1>
        
        <nav>
          <ul style={adminNavStyles}>
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact 
                ? pathname === item.href
                : pathname.startsWith(item.href) && item.href !== '/admin';
              
              return (
                <li key={item.href} style={adminNavItemStyles}>
                  <Link
                    href={item.href}
                    style={isActive ? adminNavLinkActiveStyles : adminNavLinkStyles}
                  >
                    <Icon size={18} style={adminNavIconStyles} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <header style={adminHeaderStyles}>
        <div>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'var(--color-text)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            <Home size={16} style={{ marginRight: 'var(--space-2)' }} />
            Back to Site
          </Link>
        </div>
        
        <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          Kids Activities Admin
        </div>
      </header>

      <main style={adminMainStyles}>
        {children}
      </main>
    </div>
  );
}