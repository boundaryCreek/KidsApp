import { Suspense } from 'react';
import CalendarServer from './CalendarServer';
import { LoadingState } from './CalendarStates';

export default function Calendar() {
  return (
    <Suspense fallback={<LoadingState message="Loading calendar..." />}>
      <CalendarServer />
    </Suspense>
  );
}