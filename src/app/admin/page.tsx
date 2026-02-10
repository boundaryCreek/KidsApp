import { prisma } from '../../lib/prisma';
import AdminLayout from '../../components/admin/AdminLayout/AdminLayout';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Tag,
  Users,
  Building2,
  Globe,
  Star,
  List,
  Plus,
  Eye,
  Clock
} from 'lucide-react';
import {
  adminPageHeaderStyles,
  adminPageTitleStyles,
  adminPageDescriptionStyles
} from '../../components/admin/AdminLayout/AdminLayout.styles';
import {
  dashboardGridStyles,
  dashboardCardStyles,
  dashboardIconStyles,
  dashboardContentStyles,
  dashboardNumberStyles,
  dashboardLabelStyles,
  dashboardSectionStyles,
  dashboardSectionTitleStyles,
  quickActionsGridStyles,
  quickActionCardStyles,
  quickActionHeaderStyles,
  quickActionIconStyles,
  quickActionTitleStyles,
  quickActionDescriptionStyles
} from './page.styles';

interface DashboardStats {
  activities: number;
  locations: number;
  categories: number;
  ageGroups: number;
  organizations: number;
  cities: number;
  reviews: number;
  activityLists: number;
}

export default async function AdminDashboard() {
  // Fetch dashboard statistics
  const stats: DashboardStats = {
    activities: await prisma.activity.count(),
    locations: await prisma.location.count(),
    categories: await prisma.category.count(),
    ageGroups: await prisma.ageGroup.count(),
    organizations: await prisma.organization.count(),
    cities: await prisma.city.count(),
    reviews: await prisma.review.count(),
    activityLists: await prisma.activityList.count(),
  };

  const statCards = [
    {
      label: 'Activities',
      value: stats.activities,
      icon: Calendar,
      color: 'var(--color-primary-600)',
      bgColor: 'var(--color-primary-100)',
    },
    {
      label: 'Locations',
      value: stats.locations,
      icon: MapPin,
      color: 'var(--color-secondary-600)',
      bgColor: 'var(--color-secondary-100)',
    },
    {
      label: 'Categories',
      value: stats.categories,
      icon: Tag,
      color: 'var(--color-accent-600)',
      bgColor: 'var(--color-accent-100)',
    },
    {
      label: 'Age Groups',
      value: stats.ageGroups,
      icon: Users,
      color: 'var(--color-info-600)',
      bgColor: 'var(--color-info-100)',
    },
    {
      label: 'Organizations',
      value: stats.organizations,
      icon: Building2,
      color: 'var(--color-warning-600)',
      bgColor: 'var(--color-warning-100)',
    },
    {
      label: 'Cities',
      value: stats.cities,
      icon: Globe,
      color: 'var(--color-success-600)',
      bgColor: 'var(--color-success-100)',
    },
  ];

  const quickActions = [
    {
      title: 'Add New Activity',
      description: 'Create a new activity for kids',
      href: '/admin/activities/new',
      icon: Calendar,
    },
    {
      title: 'Add New Location',
      description: 'Register a new venue or facility',
      href: '/admin/locations/new',
      icon: MapPin,
    },
    {
      title: 'Manage Categories',
      description: 'Organize activities by category',
      href: '/admin/categories',
      icon: Tag,
    },
    {
      title: 'Manage Tags',
      description: 'Create and organize location tags',
      href: '/admin/tags',
      icon: Tag,
    },
    {
      title: 'Manage Events',
      description: 'Create and schedule activity events',
      href: '/admin/events',
      icon: Clock,
    },
    {
      title: 'Review Activities',
      description: 'View and manage all activities',
      href: '/admin/activities',
      icon: Eye,
    },
    {
      title: 'Add Organization',
      description: 'Register a new organization',
      href: '/admin/organizations/new',
      icon: Building2,
    },
    {
      title: 'Manage Reviews',
      description: 'Moderate user reviews',
      href: '/admin/reviews',
      icon: Star,
    },
  ];

  return (
    <AdminLayout>
      <div style={adminPageHeaderStyles}>
        <h1 style={adminPageTitleStyles}>Admin Dashboard</h1>
        <p style={adminPageDescriptionStyles}>
          Manage your kids activities platform
        </p>
      </div>

      <div style={dashboardGridStyles}>
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} style={dashboardCardStyles}>
              <div
                style={{
                  ...dashboardIconStyles,
                  backgroundColor: card.bgColor,
                  color: card.color,
                }}
              >
                <Icon size={24} />
              </div>
              <div style={dashboardContentStyles}>
                <h3 style={dashboardNumberStyles}>{card.value}</h3>
                <p style={dashboardLabelStyles}>{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={dashboardSectionStyles}>
        <h2 style={dashboardSectionTitleStyles}>Quick Actions</h2>
        <div style={quickActionsGridStyles}>
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                style={quickActionCardStyles}
              >
                <div style={quickActionHeaderStyles}>
                  <div style={quickActionIconStyles}>
                    <Icon size={18} />
                  </div>
                  <h3 style={quickActionTitleStyles}>{action.title}</h3>
                </div>
                <p style={quickActionDescriptionStyles}>{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}