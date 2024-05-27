export interface APP {
  name: string;
  icon: JSX.Element;
  content: JSX.Element;
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
}

export type ProcessStatus = 'show' | 'hide';
export type ProcessName = string;
export type Process = [ProcessName, ProcessStatus];
