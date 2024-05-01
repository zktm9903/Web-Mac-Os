import { css } from '@emotion/react';

export default function Icon() {
  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      })}>
      <div
        css={css({
          height: '25%',
          backgroundColor: 'orange',
          boxShadow:
            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
        })}
      />
      {[0, 1, 2].map((el) => (
        <div
          key={el}
          css={css({
            height: '25%',
            backgroundColor: 'white',
            borderBottom: '1px solid #d0d7de',
          })}
        />
      ))}
    </div>
  );
}
