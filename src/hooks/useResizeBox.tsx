import { Dispatch, MouseEvent, useRef } from 'react';

export default function useResizeBox(
  setWidth: Dispatch<React.SetStateAction<number>>
) {
  const resizeRef = useRef<HTMLElement | null>(null);

  function injectResizeBar() {
    const div = document.createElement('resize-bar-right');

    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.bottom = '0';
    div.style.right = '0';
    div.style.width = '10px';
    div.style.backgroundColor = 'white';
    div.style.cursor = 'col-resize';

    resizeRef.current!.appendChild(div);

    div.addEventListener('mousedown', (a) => {
      a.stopPropagation();
      let lastX: number;
      let lastY: number;

      const mouseMoveHandler = (moveEvent: globalThis.MouseEvent) => {
        moveEvent.stopPropagation();
        const deltaX = moveEvent.screenX - a.screenX;
        const deltaY = moveEvent.screenY - a.screenY;
        console.log(deltaX);
        lastX = deltaX;
      };

      const mouseUpHandler = () => {
        // setWidth((e) => e + lastX);
        document.removeEventListener('mousemove', mouseMoveHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler, { once: true });
    });
  }

  return { resizeRef, injectResizeBar };
}
