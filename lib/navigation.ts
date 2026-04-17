import { Home, Search, Heart, User, Building2, Phone, Info } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavRoute {
  href:        string;
  label:       string;
  shortLabel?: string;   // Used on bottom nav if different from label
  Icon?:       LucideIcon; // Only bottom-nav entries need an icon
  bottomNav?:  boolean;  // Include in mobile bottom nav
  topNav?:     boolean;  // Include in desktop top nav
}

export const NAV_ROUTES: NavRoute[] = [
  {
    href: '/',
    label: 'Home',
    Icon: Home,
    bottomNav: true,
    topNav: true,
  },
  {
    href: '/properties',
    label: 'Properties',
    shortLabel: 'Explore',
    Icon: Search,
    bottomNav: true,
    topNav: true,
  },
  {
    href: '/builders',
    label: 'Builders',
    Icon: Building2,
    bottomNav: true,
    topNav: true,
  },
  {
    href: '/saved',
    label: 'Favourites',
    shortLabel: 'Saved',
    Icon: Heart,
    bottomNav: true,
    topNav: true,
  },
  {
    href: '/about',
    label: 'About Us',
    Icon: Info,
    bottomNav: false,
    topNav: true,
  },
  {
    href: '/contact',
    label: 'Contact',
    Icon: Phone,
    bottomNav: false,
    topNav: true,
  },
  {
    href: '/profile',
    label: 'Profile',
    Icon: User,
    bottomNav: false,
    topNav: false,
  },
];

export const TOP_NAV_ROUTES  = NAV_ROUTES.filter(r => r.topNav);
export const BOTTOM_NAV_TABS = NAV_ROUTES.filter(r => r.bottomNav);
