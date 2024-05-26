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
        backgroundImage:
          'url("https://images.pexels.com/photos/1428277/pexels-photo-1428277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
      })}>
      <TopBar />
      <PlayGround />
      <Dock />
    </div>
  );
}
