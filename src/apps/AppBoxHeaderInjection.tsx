import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export default function AppBoxHeaderInjection({
  appName,
  children,
}: {
  appName: string;
  children: ReactNode;
}) {
  return (
    <>
      {createPortal(
        <>{children}</>,
        document.querySelector(`[app-box-header='${appName}']`) as Element
      )}
    </>
  );
}
