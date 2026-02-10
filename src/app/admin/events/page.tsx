import { Suspense } from 'react';
import EventsList from '@/components/admin/AdminEvents/EventsList';

export default function AdminEventsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventsList />
    </Suspense>
  );
}
