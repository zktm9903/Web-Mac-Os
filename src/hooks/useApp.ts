import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ProcessStatus } from '../types/os';

export const useRunApp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  return (appName: string) => {
    searchParams.set(appName, 'show' as ProcessStatus);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
};

export const useHideApp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  return (appName: string) => {
    searchParams.set(appName, 'hide' as ProcessStatus);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
};
