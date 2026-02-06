import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

interface DayHours {
  start: string;
  end: string;
  closed: boolean;
}

interface OperatingHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

interface OperatingHoursInputProps {
  value: string; // JSON string
  onChange: (value: string) => void;
  disabled?: boolean;
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

const parseHours = (value: string): Record<string, DayHours> => {
  const result: Record<string, DayHours> = {};
  
  try {
    if (!value.trim()) {
      DAYS.forEach((day) => {
        result[day] = { start: '09:00', end: '17:00', closed: false };
      });
      return result;
    }

    const parsed: OperatingHours = JSON.parse(value);
    
    DAYS.forEach((day) => {
      const hours = parsed[day as keyof OperatingHours];
      if (hours === 'Closed' || hours === 'closed') {
        result[day] = { start: '09:00', end: '17:00', closed: true };
      } else if (hours && typeof hours === 'string' && hours.includes('-')) {
        const [start, end] = hours.split('-');
        result[day] = { start: start.trim(), end: end.trim(), closed: false };
      } else {
        result[day] = { start: '09:00', end: '17:00', closed: false };
      }
    });
  } catch (error) {
    DAYS.forEach((day) => {
      result[day] = { start: '09:00', end: '17:00', closed: false };
    });
  }

  return result;
};

const formatHours = (hours: Record<string, DayHours>): string => {
  const result: OperatingHours = {};
  
  DAYS.forEach((day) => {
    const dayHours = hours[day];
    if (dayHours.closed) {
      result[day as keyof OperatingHours] = 'Closed';
    } else {
      result[day as keyof OperatingHours] = `${dayHours.start}-${dayHours.end}`;
    }
  });

  return JSON.stringify(result, null, 2);
};

export default function OperatingHoursInput({ value, onChange, disabled }: OperatingHoursInputProps) {
  const [hours, setHours] = useState<Record<string, DayHours>>(() => parseHours(value));

  useEffect(() => {
    setHours(parseHours(value));
  }, [value]);

  const handleDayChange = (day: string, field: keyof DayHours, newValue: string | boolean) => {
    const newHours = {
      ...hours,
      [day]: {
        ...hours[day],
        [field]: newValue,
      },
    };
    setHours(newHours);
    onChange(formatHours(newHours));
  };

  const copyToAllDays = (sourceDay: string) => {
    const sourceHours = hours[sourceDay];
    const newHours: Record<string, DayHours> = {};
    
    DAYS.forEach((day) => {
      newHours[day] = { ...sourceHours };
    });
    
    setHours(newHours);
    onChange(formatHours(newHours));
  };

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gap: 'var(--space-3)',
        }}
      >
        {DAYS.map((day) => (
          <div
            key={day}
            style={{
              display: 'grid',
              gridTemplateColumns: '140px 1fr 1fr auto auto',
              gap: 'var(--space-3)',
              alignItems: 'center',
              padding: 'var(--space-3)',
              backgroundColor: 'var(--color-neutral-50)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-neutral-200)',
            }}
          >
            <label
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-neutral-700)',
              }}
            >
              {DAY_LABELS[day]}
            </label>

            <input
              type="time"
              value={hours[day].start}
              onChange={(e) => handleDayChange(day, 'start', e.target.value)}
              disabled={disabled || hours[day].closed}
              style={{
                padding: 'var(--space-2)',
                fontSize: 'var(--font-size-sm)',
                border: '1px solid var(--color-neutral-300)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: hours[day].closed ? 'var(--color-neutral-100)' : 'white',
              }}
            />

            <input
              type="time"
              value={hours[day].end}
              onChange={(e) => handleDayChange(day, 'end', e.target.value)}
              disabled={disabled || hours[day].closed}
              style={{
                padding: 'var(--space-2)',
                fontSize: 'var(--font-size-sm)',
                border: '1px solid var(--color-neutral-300)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: hours[day].closed ? 'var(--color-neutral-100)' : 'white',
              }}
            />

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-neutral-600)',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={hours[day].closed}
                onChange={(e) => handleDayChange(day, 'closed', e.target.checked)}
                disabled={disabled}
                style={{
                  cursor: 'pointer',
                }}
              />
              Closed
            </label>

            <button
              type="button"
              onClick={() => copyToAllDays(day)}
              disabled={disabled}
              title="Copy to all days"
              style={{
                padding: 'var(--space-2)',
                backgroundColor: 'var(--color-neutral-100)',
                border: '1px solid var(--color-neutral-300)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-neutral-600)',
              }}
            >
              <Copy size={14} />
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 'var(--space-2)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-neutral-500)',
        }}
      >
        Click the copy icon to apply hours to all days of the week
      </div>
    </div>
  );
}
