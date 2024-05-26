import { css } from '@emotion/react';
import { useState } from 'react';

export default function Content() {
  const [text, setText] = useState('hihi');
  return (
    <div
      css={css({
        height: '100%',
        backgroundColor: 'white',
      })}>
      <button onClick={() => setText('hello')}></button>
      {text}
    </div>
  );
}
