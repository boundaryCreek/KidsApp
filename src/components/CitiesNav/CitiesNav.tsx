'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MapPin } from 'lucide-react';

interface City {
  id: string;
  name: string;
  slug: string;
}

export default function CitiesNav() {
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on outside click (clicks on the backdrop)
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Fetch cities once
  useEffect(() => {
    if (cities.length) return;
    fetch('/api/cities')
      .then((r) => r.json())
      .then((data) => setCities(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
        .cities-drawer {
          animation: slideInLeft 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* Hamburger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close cities menu' : 'Browse cities'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: 'var(--color-primary-500)',
          border: 'none',
          borderRadius: 'var(--radius-base)',
          color: 'var(--color-neutral-50)',
          cursor: 'pointer',
          padding: 'var(--space-5) var(--space-2)',
          fontSize: 'var(--font-size-base)',
          fontFamily: 'var(--font-sans)',
          transition: 'var(--transition-colors)',
        }}
      >
        <Menu size={20} />
      </button>

      {/* Backdrop + Drawer */}
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          {/* Drawer panel — slides in from the right */}
          <div
            ref={drawerRef}
            className="cities-drawer"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '280px',
              height: '100%',
              backgroundColor: 'var(--color-surface)',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* Drawer header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-4) var(--space-5)',
                borderBottom: '1px solid var(--color-neutral-200)',
                backgroundColor: 'var(--color-primary-600)',
                color: 'var(--color-neutral-50)',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Browse by City
              </span>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-neutral-50)',
                  cursor: 'pointer',
                  display: 'flex',
                  padding: 'var(--space-1)',
                }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* City list */}
            <div style={{ flex: 1 }}>
              {cities.length === 0 ? (
                <div
                  style={{
                    padding: 'var(--space-6)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-neutral-400)',
                  }}
                >
                  Loading…
                </div>
              ) : (
                cities.map((city) => (
                  <Link
                    key={city.id}
                    href={`/${city.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-4) var(--space-5)',
                      fontSize: 'var(--font-size-base)',
                      color: 'var(--color-neutral-800)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--color-neutral-100)',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = 'var(--color-primary-50)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = 'transparent')
                    }
                  >
                    <MapPin size={14} color="var(--color-primary-500)" />
                    {city.name}
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
