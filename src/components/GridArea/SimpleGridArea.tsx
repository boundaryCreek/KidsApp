'use client';

import React, { CSSProperties, ReactNode } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface GridAreaConfig {
  areas: string;
  columns?: string;
  rows?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
}

export interface GridAreaProps {
  config: Partial<Record<Breakpoint, GridAreaConfig>>;
  children: (areas: Record<string, React.ComponentType<{ children: ReactNode }>>) => ReactNode;
}

/**
 * Extract unique area names from grid template areas string
 * e.g., "image content\nimage action" -> ["image", "content", "action"]
 */
function parseAreaNames(areasString: string): string[] {
  const areas = areasString
    .trim()
    .split('\n')
    .flatMap(line => line.trim().split(/\s+/))
    .filter(Boolean);
  return [...new Set(areas)];
}

/**
 * Build grid-template-areas CSS value
 * e.g., "image content\nimage action" -> '"image content" "image action"'
 */
function buildAreasCSS(areasString: string): string {
  return areasString
    .trim()
    .split('\n')
    .map(line => `"${line.trim()}"`)
    .join(' ');
}

/**
 * Generate CSS string for responsive grid
 */
function generateGridCSS(id: string, config: Partial<Record<Breakpoint, GridAreaConfig>>): string {
  const breakpoints: Record<Breakpoint, string> = {
    xs: '',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  };

  let css = '';

  // Base styles (xs breakpoint)
  const xsConfig = config.xs;
  if (xsConfig) {
    css += `#${id} {\n`;
    css += `  display: grid;\n`;
    css += `  grid-template-areas: ${buildAreasCSS(xsConfig.areas)};\n`;
    if (xsConfig.columns) css += `  grid-template-columns: ${xsConfig.columns};\n`;
    if (xsConfig.rows) css += `  grid-template-rows: ${xsConfig.rows};\n`;
    const gap = xsConfig.gap || xsConfig.columnGap || '0';
    css += `  column-gap: ${gap};\n`;
    const rowGap = xsConfig.gap || xsConfig.rowGap || '0';
    css += `  row-gap: ${rowGap};\n`;
    css += `}\n\n`;
  }

  // Media queries
  (['sm', 'md', 'lg', 'xl'] as Breakpoint[]).forEach((bp) => {
    const bpConfig = config[bp];
    if (!bpConfig) return;

    css += `@media (min-width: ${breakpoints[bp]}) {\n`;
    css += `  #${id} {\n`;
    if (bpConfig.areas) css += `    grid-template-areas: ${buildAreasCSS(bpConfig.areas)};\n`;
    if (bpConfig.columns) css += `    grid-template-columns: ${bpConfig.columns};\n`;
    if (bpConfig.rows) css += `    grid-template-rows: ${bpConfig.rows};\n`;
    if (bpConfig.columnGap || bpConfig.gap) {
      const gap = bpConfig.gap || bpConfig.columnGap || '0';
      css += `    column-gap: ${gap};\n`;
    }
    if (bpConfig.rowGap || bpConfig.gap) {
      const gap = bpConfig.gap || bpConfig.rowGap || '0';
      css += `    row-gap: ${gap};\n`;
    }
    css += `  }\n`;
    css += `}\n\n`;
  });

  return css;
}

export function GridArea({ config, children }: GridAreaProps) {
  const id = `grid-area-${Math.random().toString(36).slice(2)}`;

  // Get area names from xs config
  const xsConfig = config.xs;
  if (!xsConfig) {
    throw new Error('GridArea requires xs config with areas defined');
  }

  const areaNames = parseAreaNames(xsConfig.areas);

  // Create area components
  const areas: Record<string, React.ComponentType<{ children: ReactNode }>> = {};
  areaNames.forEach((areaName) => {
    const componentName = areaName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    areas[componentName] = ({ children }: { children: ReactNode }) => (
      <div style={{ gridArea: areaName, minWidth: 0 }}>
        {children}
      </div>
    );
  });

  const css = generateGridCSS(id, config);

  return (
    <>
      <style>{css}</style>
      <div id={id} style={{ width: '100%' }}>
        {children(areas)}
      </div>
    </>
  );
}

export default GridArea;
