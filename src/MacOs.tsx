import { css } from '@emotion/react';
import './App.css';

const MacOs = () => {
  return (
    <div
      css={css`
        padding: 32px;
        background-color: hotpink;
        font-size: 24px;
        border-radius: 4px;
        &:hover {
          color: ${'yellow'};
        }
      `}>
      test
    </div>
  );
};

export default MacOs;
