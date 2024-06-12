import { Dispatch, ReactNode, SetStateAction, Suspense, useState } from 'react';
import { APPS } from '../apps/apps';
import useProcesses from '../hooks/useProcesses';
import { useHideApp } from '../hooks/useApp';
import { APP, ProcessStatus } from '../types/os';
import {
  COLOR_OF_APP_BOX,
  COLOR_OF_APP_BOX_BORDER,
  DEFAULT_HEIGHT_OF_APP_BOX_HEADER,
  DEFAULT_MAX_HEIGHT_OF_APP_BOX,
  DEFAULT_MAX_WIDTH_OF_APP_BOX,
  DEFAULT_MIN_HEIGHT_OF_APP_BOX,
  DEFAULT_MIN_WIDTH_OF_APP_BOX,
} from '../constant';
import { css } from '@emotion/react';
import { Rnd } from 'react-rnd';
import useAppZindex from '../hooks/useAppZindex';

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
          <>
            {app && (
              <AppContainer
                key={name}
                app={app!}
                AppContent={app.content}
                appStatus={status}
              />
            )}
          </>
        );
      })}
    </div>
  );
}

const AppContainer = ({
  app,
  AppContent,
  appStatus,
}: {
  app: APP;
  AppContent: APP['content'];
  appStatus: ProcessStatus;
}) => {
  const [x, setX] = useState(200);
  const [y, setY] = useState(200);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);

  const hideApp = useHideApp();

  const redButtonEvent = () => {
    hideApp(app.name);
  };

  const greenButtonEvent = () => {
    const dock = document.getElementById('dock');
    const topbar = document.getElementById('topbar');

    if (!dock?.offsetTop || !topbar?.offsetHeight) return;

    setX(0);
    setY(0);
    setWidth(window.innerWidth);
    setHeight((dock?.offsetTop - topbar?.offsetHeight) as number);
  };

  return (
    <>
      <AppViewer
        appName={app.name}
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
        redButtonEvent={redButtonEvent}
        greenButtonEvent={app.resizable ? greenButtonEvent : undefined}>
        <Suspense fallback={<></>}>
          <AppContent />
        </Suspense>
      </AppViewer>
    </>
  );
};

interface AppViewerProps {
  appName: string;
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
  redButtonEvent?: () => void;
  greenButtonEvent?: () => void;
}

const AppViewer = ({
  appName,
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
  greenButtonEvent,
}: AppViewerProps) => {
  const { appZindex, updateAppZindex } = useAppZindex(appName);

  return (
    <Rnd
      minWidth={minWidth ?? DEFAULT_MIN_WIDTH_OF_APP_BOX}
      minHeight={minHeight ?? DEFAULT_MIN_HEIGHT_OF_APP_BOX}
      maxWidth={maxWidth ?? DEFAULT_MAX_WIDTH_OF_APP_BOX}
      maxHeight={maxHeight ?? DEFAULT_MAX_HEIGHT_OF_APP_BOX}
      size={{ width, height }}
      css={css({
        visibility: visible ? 'visible' : 'hidden',
        backgroundColor: COLOR_OF_APP_BOX,
        border: `1px solid ${COLOR_OF_APP_BOX_BORDER}`,
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        zIndex: appZindex,
      })}
      onMouseDown={() => {
        updateAppZindex();
      }}
      position={{ x, y }}
      onDragStop={(_e, d) => {
        if (d.x < 0) setX(0);
        else setX(d.x);
        if (d.y < 0) setY(0);
        else setY(d.y);
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        setWidth(+ref.style.width);
        setHeight(+ref.style.height);

        if (position.x < 0) setX(0);
        else setX(position.x);
        if (position.y < 0) setY(0);
        else setY(position.y);
      }}>
      <header
        app-box-header={appName}
        css={css({
          display: 'flex',
          height: DEFAULT_HEIGHT_OF_APP_BOX_HEADER,
          alignItems: 'center',
        })}>
        <ThreeButtons
          updateAppZindex={updateAppZindex}
          redButtonEvent={redButtonEvent}
          greenButtonEvent={greenButtonEvent}
        />
      </header>
      <div
        css={css({
          position: 'absolute',
          top: DEFAULT_HEIGHT_OF_APP_BOX_HEADER,
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
  updateAppZindex: () => void;
  redButtonEvent?: () => void;
  greenButtonEvent?: () => void;
}

const threeButtonStyle: { [key: string]: string } = {
  position: 'absolute',
  height: '14px',
  width: '14px',
  borderRadius: '50%',
  border: '0',
};

const ThreeButtons = ({
  updateAppZindex,
  redButtonEvent,
  greenButtonEvent,
}: ThreeButtonsProps) => {
  const colors = ['#FB4646', '#FEB024', '#28C131'];
  const unableColor = '#413835';
  const left = ['18px', '40px', '62px'];
  const unable = [!redButtonEvent, true, !greenButtonEvent];

  return (
    <>
      {[0, 1, 2].map((_, idx) => (
        <button
          disabled={unable[idx]}
          key={idx}
          onMouseDown={(e) => e.stopPropagation()}
          css={css({
            ...threeButtonStyle,
            left: left[idx],
            backgroundColor: unable[idx] ? unableColor : colors[idx],
          })}
          onClick={() => {
            updateAppZindex();
            if (idx === 0) redButtonEvent && redButtonEvent();
            if (idx === 2) greenButtonEvent && greenButtonEvent();
          }}
        />
      ))}
    </>
  );
};
