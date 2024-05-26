import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function TopBar() {
  return (
    <div
      css={css({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        color: 'white',
        padding: '4px 16px 4px 16px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
      })}>
      <OsName />
      <DateTime />
    </div>
  );
}

function OsName() {
  return <div>lee-sang</div>;
}

function DateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateTime(new Date()), 1000);
  }, []);

  return <div>{dayjs(dateTime).format('ddd MMMM D h:mm A')}</div>;
}
