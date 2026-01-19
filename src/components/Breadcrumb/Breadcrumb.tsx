'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbProps } from '../../types';
import { 
  breadcrumbStyles, 
  breadcrumbItemStyles, 
  breadcrumbLinkStyles, 
  currentPageStyles 
} from './Breadcrumb.styles';

export default function Breadcrumb({ items, currentPage }: BreadcrumbProps) {
  return (
    <nav style={breadcrumbStyles}>
      {items.map((item, index) => (
        <div key={index} style={breadcrumbItemStyles}>
          <Link href={item.href} style={breadcrumbLinkStyles}>
            {item.label}
          </Link>
          <ChevronRight size={16} />
        </div>
      ))}
      <span style={currentPageStyles}>{currentPage}</span>
    </nav>
  );
}