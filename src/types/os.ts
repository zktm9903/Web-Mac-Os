import { LazyExoticComponent } from 'react';

export interface APP {
  name: string;
  icon: JSX.Element;
  content: LazyExoticComponent<() => JSX.Element>;
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
  resizable: boolean;
}

export type ProcessStatus = 'show' | 'hide';
export type ProcessName = string;
export type Process = [ProcessName, ProcessStatus];
