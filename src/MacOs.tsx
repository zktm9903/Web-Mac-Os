import './index.css';
import { css } from '@emotion/react';
import Dock from './commons/Dock';
import TopBar from './commons/TopBar';
import PlayGround from './commons/PlayGround';

export default function MacOs() {
  return (
    <div
      css={css({
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundImage: 'url("/backgroundImage.webp")',
      })}>
      <TopBar />
      <PlayGround />
      <Dock />
    </div>
  );
}
