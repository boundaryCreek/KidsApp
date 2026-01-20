'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  adminInputStyles,
  adminLabelStyles,
  adminInputGroupStyles,
  adminSelectStyles,
  adminCheckboxStyles,
} from './AdminLayout.styles';

interface Option {
  id: string;
  name: string;
  [key: string]: any;
}

interface MultiSelectProps {
  label: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select options...',
  disabled = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOptions = options.filter(option => value.includes(option.id));
  const availableOptions = options.filter(option => !value.includes(option.id));

  const toggleOption = (optionId: string) => {
    if (value.includes(optionId)) {
      onChange(value.filter(id => id !== optionId));
    } else {
      onChange([...value, optionId]);
    }
  };

  const removeOption = (optionId: string) => {
    onChange(value.filter(id => id !== optionId));
  };

  return (
    <div style={adminInputGroupStyles}>
      <label style={adminLabelStyles}>{label}</label>
      <div style={{ position: 'relative' }}>
        {/* Selected items display */}
        <div style={{
          ...adminInputStyles,
          minHeight: '42px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-1)',
          alignItems: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
        }} onClick={() => !disabled && setIsOpen(!isOpen)}>
          {selectedOptions.length === 0 ? (
            <span style={{ color: 'var(--color-text-secondary)' }}>
              {placeholder}
            </span>
          ) : (
            selectedOptions.map(option => (
              <span
                key={option.id}
                style={{
                  backgroundColor: 'var(--color-primary-100)',
                  color: 'var(--color-primary-700)',
                  padding: 'var(--space-1) var(--space-2)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--font-size-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)',
                }}
              >
                {option.name}
                {!disabled && (
                  <X
                    size={12}
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(option.id);
                    }}
                  />
                )}
              </span>
            ))
          )}
        </div>

        {/* Dropdown */}
        {isOpen && !disabled && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'var(--color-background)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto',
          }}>
            {availableOptions.length === 0 ? (
              <div style={{
                padding: 'var(--space-3)',
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-sm)',
              }}>
                No more options available
              </div>
            ) : (
              availableOptions.map(option => (
                <div
                  key={option.id}
                  style={{
                    padding: 'var(--space-2) var(--space-3)',
                    cursor: 'pointer',
                    fontSize: 'var(--font-size-sm)',
                    transition: 'var(--transition-colors)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-neutral-50)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onClick={() => {
                    toggleOption(option.id);
                    setIsOpen(false);
                  }}
                >
                  {option.name}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface SelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  required = false,
  disabled = false,
}: SelectProps) {
  return (
    <div style={adminInputGroupStyles}>
      <label style={adminLabelStyles}>
        {label}
        {required && <span style={{ color: 'var(--color-error-600)' }}>*</span>}
      </label>
      <select
        style={adminSelectStyles}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
}: CheckboxProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        style={adminCheckboxStyles}
      />
      <label style={{
        ...adminLabelStyles,
        margin: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}>
        {label}
      </label>
    </div>
  );
}