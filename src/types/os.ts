export interface APP {
  name: string;
  icon: JSX.Element;
  content: JSX.Element;
}

export type ProcessStatus = 'show' | 'hide';
export type ProcessName = string;
export type Process = [ProcessName, ProcessStatus];
