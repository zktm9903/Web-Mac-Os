import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { css } from '@emotion/react';
import { Rnd } from 'react-rnd';
import { APPS } from '../apps/apps';
import { APP, ProcessStatus } from '../types/os';
import {
  COLOR_OF_APP_BOX,
  COLOR_OF_APP_BOX_BORDER,
  DEFAULT_MAX_HEIGHT_OF_APP_BOX,
  DEFAULT_MAX_WIDTH_OF_APP_BOX,
  DEFAULT_MIN_HEIGHT_OF_APP_BOX,
  DEFAULT_MIN_WIDTH_OF_APP_BOX,
} from '../constant';
import useProcesses from '../hooks/useProcesses';
import { useHideApp } from '../hooks/useApp';
import { useZindexStore } from '../stores/useZindexStore';

export default function PlayGround() {
  const processes = useProcesses();

  return (
    <div
      css={css({
        position: 'relative',
        width: '100%',
        marginTop: '26.5px',
      })}>
      {processes.map((process) => {
        const [name, status] = process;
        const app = APPS.find((app) => app.name === name);
        return (
          <AppContainer
            app={app!}
            appContent={APPS.find((app) => app.name === name)?.content!}
            appStatus={status}
          />
        );
      })}
    </div>
  );
}

const AppContainer = ({
  app,
  appContent,
  appStatus,
}: {
  app: APP;
  appContent: JSX.Element;
  appStatus: ProcessStatus;
}) => {
  const [x, setX] = useState(200);
  const [y, setY] = useState(200);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);

  const hideApp = useHideApp();

  return (
    <>
      <AppViewer
        visible={appStatus === 'show'}
        x={x}
        y={y}
        width={width}
        height={height}
        setX={setX}
        setY={setY}
        setWidth={setWidth}
        setHeight={setHeight}
        minWidth={app.minWidth}
        minHeight={app.minHeight}
        maxWidth={app.maxWidth}
        maxHeight={app.maxHeight}
        redButtonEvent={() => {
          hideApp(app.name);
        }}>
        {appContent}
      </AppViewer>
    </>
  );
};

interface AppViewerProps {
  visible: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  children: ReactNode;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  setX: Dispatch<SetStateAction<number>>;
  setY: Dispatch<SetStateAction<number>>;
  setWidth: Dispatch<SetStateAction<number>>;
  setHeight: Dispatch<SetStateAction<number>>;
  redButtonEvent: () => void;
}

const AppViewer = ({
  visible,
  x,
  y,
  width,
  height,
  children,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  setX,
  setY,
  setWidth,
  setHeight,
  redButtonEvent,
}: AppViewerProps) => {
  const [curZindex, setCurZindex] = useState(0);
  const { zIndex, increaseZindex } = useZindexStore((state) => state);

  return (
    <Rnd
      onMouseDown={() => {
        setCurZindex(zIndex);
        increaseZindex();
      }}
      minWidth={minWidth ?? DEFAULT_MIN_WIDTH_OF_APP_BOX}
      minHeight={minHeight ?? DEFAULT_MIN_HEIGHT_OF_APP_BOX}
      maxWidth={maxWidth ?? DEFAULT_MAX_WIDTH_OF_APP_BOX}
      maxHeight={maxHeight ?? DEFAULT_MAX_HEIGHT_OF_APP_BOX}
      css={css({
        visibility: visible ? 'visible' : 'hidden',
        backgroundColor: COLOR_OF_APP_BOX,
        border: `1px solid ${COLOR_OF_APP_BOX_BORDER}`,
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        zIndex: curZindex,
      })}
      size={{ width, height }}
      position={{ x, y }}
      onDragStop={(_e, d) => {
        setX(d.x);
        setY(d.y);
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        setWidth(+ref.style.width);
        setHeight(+ref.style.height);
        setX(position.x);
        setY(position.y);
      }}>
      <ThreeButtons redButtonEvent={redButtonEvent} />
      <div
        css={css({
          position: 'absolute',
          top: '50px',
          bottom: '0px',
          left: '0px',
          right: '0px',
          cursor: 'default',
          borderRadius: '0px 0px 8px 8px',
          overflow: 'hidden',
        })}>
        {children}
      </div>
    </Rnd>
  );
};

interface ThreeButtonsProps {
  redButtonEvent: () => void;
}

const ThreeButtons = ({ redButtonEvent }: ThreeButtonsProps) => {
  const colors = ['#FB4646', '#FEB024', '#28C131'];
  const left = ['18px', '40px', '62px'];
  return (
    <>
      {[0, 1, 2].map((_, idx) => (
        <button
          onMouseDown={(e) => e.stopPropagation()}
          css={css({
            position: 'absolute',
            top: '18px',
            left: left[idx],
            height: '14px',
            width: '14px',
            backgroundColor: colors[idx],
            borderRadius: '50%',
            border: '0',
          })}
          onClick={() => {
            if (idx === 0) redButtonEvent();
          }}
        />
      ))}
    </>
  );
};
