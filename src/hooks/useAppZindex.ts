import { useMemo } from 'react';
import { APPS } from '../apps/apps';
import useAppZindexStore from '../stores/useAppZindexStore';

const useAppZindex = (appName: string) => {
  const { appZindex, updateAppZindex } = useAppZindexStore();
  const appIdx = useMemo(
    () => APPS.findIndex((app) => app.name === appName),
    [appName]
  );

  return {
    appZindex: appZindex[appIdx],
    updateAppZindex: () => updateAppZindex(appName),
  };
};

export default useAppZindex;
