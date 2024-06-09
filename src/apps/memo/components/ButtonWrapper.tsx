import { css } from '@emotion/react';
import { ReactNode } from 'react';

export default function ButtonWrapper({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      css={css({
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        padding: '6px',
        borderRadius: '4px',
        ':hover': {
          backgroundColor: 'rgba(255,255,255,0.1)',
        },
      })}
      onClick={onClick}>
      {children}
    </button>
  );
}
