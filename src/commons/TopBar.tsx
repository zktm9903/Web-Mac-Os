import {
  ChangeEvent,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  HEIGHT_OF_TOPBAR,
  MAX_BRIGHTNESS_OF_DISPLAY,
  MIN_BRIGHTNESS_OF_DISPLAY,
} from '../constant';
import { LuSettings2 } from 'react-icons/lu';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';
import dayjs from 'dayjs';

export default function TopBar() {
  return (
    <div
      id="topbar"
      css={css({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: HEIGHT_OF_TOPBAR,
        display: 'flex',
        justifyContent: 'space-between',
        color: 'white',
        padding: '0px 8px 0px 8px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 987654321,
      })}>
      <OsName />
      <div
        css={css({
          display: 'flex',
          alignItems: 'center',
        })}>
        <Cat />
        <Settings />
        <DateTime />
      </div>
    </div>
  );
}

function OsName() {
  return (
    <Button>
      <p css={css({ color: 'white' })}>lee-sang</p>
    </Button>
  );
}

function DateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateTime(new Date()), 1000);
  }, []);

  return (
    <Button>
      <p>{dayjs(dateTime).format('ddd MMMM D h:mm A')}</p>
    </Button>
  );
}

function Cat() {
  return (
    <Button>
      <img
        src="/catPop.gif"
        alt="cat"
        css={css({
          height: '16px',
        })}
      />
    </Button>
  );
}

function Settings() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const sliderRef = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [brightness, setBrightness] = useState(
    (MAX_BRIGHTNESS_OF_DISPLAY - MIN_BRIGHTNESS_OF_DISPLAY) / 2
  );

  const onChangeBrightness = (e: ChangeEvent<HTMLInputElement>) => {
    setBrightness(parseInt(e.target.value));
    if (!sliderRef.current) return;
    sliderRef.current.style.background = generateBackgroundStyle();
    document.body.style.filter = `brightness(${(brightness > 30 ? brightness : 30) / 100})`;
  };

  const generateBackgroundStyle = () => {
    const percent =
      ((brightness - MIN_BRIGHTNESS_OF_DISPLAY) /
        (MAX_BRIGHTNESS_OF_DISPLAY - MIN_BRIGHTNESS_OF_DISPLAY)) *
      100;
    const correction = (0.75 / 50) * (percent - 50);
    return `linear-gradient(to right, white 0%, white calc(${percent}% - ${correction}rem), #433E3D calc(${percent}% - ${correction}rem), #433E3D 100%)`;
  };

  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
        <LuSettings2 />
        {isOpen && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              buttonRef.current?.blur();
            }}
            css={css({
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            })}>
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              css={css({
                position: 'fixed',
                right: 0,
                top: HEIGHT_OF_TOPBAR,
                width: '300px',
                padding: '8px',
                borderRadius: '16px',
                zIndex: 9878764,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow:
                  '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
              })}>
              <section
                css={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '12px',
                  padding: '12px',
                }}>
                <h1
                  css={css({
                    margin: 0,
                    fontSize: '0.8rem',
                    textAlign: 'left',
                  })}>
                  Display
                </h1>
                <input
                  ref={sliderRef}
                  min={MIN_BRIGHTNESS_OF_DISPLAY + ''}
                  max={MAX_BRIGHTNESS_OF_DISPLAY + ''}
                  value={brightness}
                  onChange={onChangeBrightness}
                  type="range"
                  css={css({
                    marginTop: '8px',
                    background: generateBackgroundStyle(),
                    borderRadius: '1rem',
                    height: '1.3rem',
                    width: '100%',
                    outline: 'none',
                    '-webkit-appearance': 'none',
                    '::-webkit-slider-thumb': {
                      '-webkit-appearance': 'none',
                      appearance: 'none',
                      backgroundColor: 'white',
                      border: 'solid 1px #332D29',
                      borderRadius: '1rem',
                      height: '1.3rem',
                      width: '1.3rem',
                    },
                  })}
                />
              </section>
            </motion.div>
          </div>
        )}
      </Button>
    </>
  );
}

interface ButtonProps {
  onClick?: () => void;
  onFocus?: () => void;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, ...rests } = props;
  return (
    <button
      {...rests}
      ref={ref}
      css={[
        css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0px 8px',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          outline: 'none',
          border: 'none',
          height: '100%',
          color: 'white',
          borderRadius: 4,
          ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
          ':focus': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
        }),
      ]}>
      {children}
    </button>
  );
});
