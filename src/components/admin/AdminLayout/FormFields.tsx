'use client';

import React from 'react';
import { CSSProperties } from 'react';
import { adminInputGroupStyles, adminLabelStyles, adminInputStyles, adminTextareaStyles } from './AdminLayout.styles';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  min?: string | number;
  step?: string | number;
  maxLength?: number;
}

export function TextField({
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  placeholder,
  type = 'text',
  min,
  step,
  maxLength,
}: TextFieldProps) {
  return (
    <div style={adminInputGroupStyles}>
      <label style={adminLabelStyles}>
        {label} {required && '*'}
      </label>
      <input
        type={type}
        style={adminInputStyles}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        {...(type === 'number' && { min, step })}
        {...(maxLength && { maxLength })}
      />
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
}

export function TextAreaField({
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  placeholder,
  rows = 4,
}: TextAreaFieldProps) {
  return (
    <div style={adminInputGroupStyles}>
      <label style={adminLabelStyles}>
        {label} {required && '*'}
      </label>
      <textarea
        style={{
          ...adminTextareaStyles,
          minHeight: `calc(${rows} * 1.5em + 1em)`,
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  options: Array<{ id: string; name: string; [key: string]: any }>;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function SelectField({
  label,
  options,
  value,
  onChange,
  required = false,
  disabled = false,
  placeholder = 'Select an option',
}: SelectFieldProps) {
  return (
    <div style={adminInputGroupStyles}>
      <label style={adminLabelStyles}>
        {label} {required && '*'}
      </label>
      <select
        style={adminInputStyles}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

interface MultiSelectFieldProps {
  label: string;
  options: Array<{ id: string; name: string; [key: string]: any }>;
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  size?: number;
}

export function MultiSelectField({
  label,
  options,
  value,
  onChange,
  disabled = false,
  placeholder = 'Select options',
  size,
}: MultiSelectFieldProps) {
  return (
    <div style={adminInputGroupStyles}>
      <label style={adminLabelStyles}>{label}</label>
      <select
        multiple
        style={{
          ...adminInputStyles,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        size={size}
        value={value}
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions, (option) => option.value);
          onChange(selected);
        }}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

interface MultiSelectListProps {
  label: string;
  options: Array<{ id: string; name: string; [key: string]: any }>;
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  helperText?: string;
}

export function MultiSelectList({
  label,
  options,
  value,
  onChange,
  disabled = false,
  helperText,
}: MultiSelectListProps) {
  return (
    <div style={adminInputGroupStyles}>
      <label style={adminLabelStyles}>{label}</label>
      {helperText && (
        <div style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-neutral-600)',
          marginBottom: 'var(--space-2)',
        }}>
          {helperText}
        </div>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 'var(--space-2)',
      }}>
        {options.map((option) => {
          const isSelected = value.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                if (disabled) return;
                if (isSelected) {
                  onChange(value.filter((id) => id !== option.id));
                } else {
                  onChange([...value, option.id]);
                }
              }}
              disabled={disabled}
              style={{
                textAlign: 'left',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-base)',
                border: `1px solid ${isSelected ? 'var(--color-primary-300)' : 'var(--color-neutral-300)'}`,
                backgroundColor: isSelected ? 'var(--color-primary-50)' : 'var(--color-neutral-50)',
                color: 'var(--color-neutral-900)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'var(--transition-colors)',
              }}
              aria-pressed={isSelected}
            >
              {option.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function CheckboxField({
  label,
  checked,
  onChange,
  disabled = false,
}: CheckboxFieldProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: 'var(--space-2) 0',
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          width: '18px',
          height: '18px',
        }}
      />
      <label style={{
        ...adminLabelStyles,
        cursor: disabled ? 'not-allowed' : 'pointer',
        margin: 0,
      }}>
        {label}
      </label>
    </div>
  );
}

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <fieldset
      style={{
        border: '1px solid var(--color-neutral-200)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        marginBottom: 'var(--space-6)',
      }}
    >
      <legend style={{
        fontSize: 'var(--font-size-lg)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-neutral-900)',
        padding: '0 var(--space-2)',
      }}>
        {title}
      </legend>
      <div style={{ marginTop: 'var(--space-4)' }}>
        {children}
      </div>
    </fieldset>
  );
}

interface GridFieldsProps {
  columns?: number;
  gap?: string;
  children: React.ReactNode;
}

export function GridFields({
  columns = 2,
  gap = 'var(--space-4)',
  children,
}: GridFieldsProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {children}
    </div>
  );
}
