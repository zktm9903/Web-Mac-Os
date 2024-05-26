import { useSearchParams } from 'react-router-dom';
import { APPS } from '../apps/apps';
import { Process } from '../types/os';

export default function useProcesses() {
  const [searchParams] = useSearchParams();
  const availableApps = APPS.map((el) => el.name);

  return [...searchParams].filter((el) =>
    availableApps.includes(el[0])
  ) as Process[];
}
