import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import {
  DEFAULT_MAX_WIDTH_OF_LEFT_BOX,
  DEFAULT_MIN_WIDTH_OF_LEFT_BOX,
} from '../constant';
import { css } from '@emotion/react';

export default function DragBetween({
  width,
  setWidth,
  dragRef,
}: {
  width: number;
  setWidth: Dispatch<SetStateAction<number>>;
  dragRef: MutableRefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      {...registMouseDownDrag((deltaX) => {
        const afterWidth = width + deltaX;
        if (
          afterWidth < DEFAULT_MIN_WIDTH_OF_LEFT_BOX ||
          afterWidth > DEFAULT_MAX_WIDTH_OF_LEFT_BOX ||
          dragRef.current?.offsetWidth! - afterWidth < 50
        )
          return;
        setWidth(afterWidth);
      })}
      css={css({
        position: 'absolute',
        width: '10px',
        top: '0',
        left: width - 5,
        bottom: '0',
        cursor: 'ew-resize',
        zIndex: 1,
      })}
    />
  );
}

function registMouseDownDrag(onDragChange: (deltaX: number) => void) {
  return {
    onMouseDown: (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
      const mouseMoveHandler = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.screenX - clickEvent.screenX;
        onDragChange(deltaX);
      };

      const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler, { once: true });
    },
  };
}
