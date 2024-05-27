import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { APPS } from '../apps/apps';
import { ReactNode } from 'react';
import { useRunApp } from '../hooks/useApp';
import useProcesses from '../hooks/useProcesses';

export default function Dock() {
  const runApp = useRunApp();
  const processes = useProcesses();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      css={css({
        position: 'absolute',
        bottom: '16px',
        padding: '12px',
        display: 'flex',
        border: '1px solid #251D1D',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
        zIndex: '987654321',
      })}>
      {APPS.filter((el) => el.name !== 'profile').map((app) => (
        <div
          onClick={() => {
            runApp(app.name);
          }}>
          <IconBox key={app.name}>{app.icon}</IconBox>
          {!!processes.find((el) => el[0] === app.name) && (
            <div
              css={css({
                position: 'absolute',
                bottom: '-2px',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '5px',
                height: '5px',
                backgroundColor: 'white',
                borderRadius: '50%',
              })}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}

function IconBox({ children }: { children: ReactNode }) {
  return (
    <motion.div
      whileTap={{ y: -100 }}
      transition={{ duration: 0.5 }}
      css={css({
        width: '50px',
        height: '50px',
        borderRadius: '8px',
        overflow: 'hidden',
      })}>
      {children}
    </motion.div>
  );
}
