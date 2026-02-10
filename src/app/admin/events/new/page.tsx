import { Suspense } from 'react';
import EventForm from '@/components/admin/AdminEvents/EventForm';

export default function NewEventPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventForm />
    </Suspense>
  );
}
