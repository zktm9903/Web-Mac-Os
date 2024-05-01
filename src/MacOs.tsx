import { css } from '@emotion/react';
import './App.css';

export default function MacOs() {
  return (
    <div
      css={css({
        height: '100vh',
        backgroundSize: 'cover',
        backgroundImage:
          'url("https://images.pexels.com/photos/1460222/pexels-photo-1460222.jpeg")',
      })}></div>
  );
}
