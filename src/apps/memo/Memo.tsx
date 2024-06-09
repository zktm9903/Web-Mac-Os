import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';
import DragBetween from './components/DragBetween';
import MemoInfoBox from './components/MemoInfoBox';
import ButtonWrapper from './components/ButtonWrapper';
import AppBoxHeaderInjection from '../AppBoxHeaderInjection';
import { DEFAULT_MIN_WIDTH_OF_LEFT_BOX } from './constant';
import { Memo } from './types';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencilSquare } from 'react-icons/bs';
import { css } from '@emotion/react';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { AnimatePresence } from 'framer-motion';

export default function Content() {
  // =================== 사이즈 조절 ===================
  const [width, setWidth] = useState(DEFAULT_MIN_WIDTH_OF_LEFT_BOX);
  const ref = useRef<HTMLDivElement | null>(null);

  // =================== 헤더 생성 ===================
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  // =================== 메모 ===================
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  // =================== 메모 ===================
  const [memos, setMemos] = useState<Memo[]>([]);
  const [selectedId, setSelectedId] = useState<Memo['id'] | null>(null);

  const createNewMemo = () => {
    const newId = uuidv4();
    setMemos((e) => [
      ...e,
      {
        id: newId,
        title: '',
        writing: '',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
    ]);
    setSelectedId(newId);

    setTimeout(() => {
      textAreaRef.current?.focus();
    }, 200);
  };

  const deleteMemo = () => {
    if (!selectedId) return;
    setMemos((memo) => memo.filter((e) => e.id !== selectedId));
    setSelectedId('');
  };

  const textAreaOnchange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMemos(
      produce(memos, (draftState) => {
        const idx = memos.findIndex((memo) => memo.id === selectedId);
        draftState[idx].writing = e.target.value;
        draftState[idx].updatedDate = new Date();
      })
    );
  };

  return (
    <>
      {mount && (
        <AppBoxHeaderInjection appName="memo">
          <div
            css={css({
              position: 'relative',
              height: '100%',
              marginLeft: width - 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderLeft: 'solid 1px black',
              paddingLeft: '8px',
            })}>
            <ButtonWrapper onClick={createNewMemo}>
              <BsPencilSquare color="#827B78" size={20} />
            </ButtonWrapper>
            <div
              css={css({
                position: 'absolute',
                left: '-40px',
              })}>
              <ButtonWrapper onClick={deleteMemo}>
                <RiDeleteBin6Line color="#827B78" size={20} />
              </ButtonWrapper>
            </div>
          </div>
        </AppBoxHeaderInjection>
      )}

      <div
        ref={ref}
        onMouseDown={(e) => e.stopPropagation()}
        css={css({
          position: 'relative',
          display: 'flex',
          height: '100%',
        })}>
        <DragBetween dragRef={ref} width={width} setWidth={setWidth} />
        <div
          css={css({
            position: 'relative',
            height: '100%',
            borderRight: 'solid 1px black',
            width: width,
            display: 'flex',
            flexDirection: 'column',
            padding: '8px 12px 8px 12px',
            boxSizing: 'border-box',
            overflowY: 'auto',
            scrollbarWidth: 'none',
          })}>
          <AnimatePresence>
            {[...memos]
              .sort((a, b) => b.updatedDate.getTime() - a.updatedDate.getTime())
              .map((m, i) => (
                <Fragment key={m.id}>
                  <MemoInfoBox
                    memo={m}
                    selected={m.id === selectedId}
                    onClick={() => setSelectedId(m.id)}
                  />
                  {i !== memos.length - 1 && (
                    <div
                      css={css({
                        display: 'flex',
                        justifyContent: 'end',
                      })}>
                      <div
                        css={css({
                          height: '1px',
                          backgroundColor: '#322926',
                          flexShrink: 0,
                          width: 'calc(100% - 25px)',
                        })}
                      />
                    </div>
                  )}
                </Fragment>
              ))}
          </AnimatePresence>
        </div>

        <div
          css={css({
            flexGrow: 1,
            height: '100%',
            borderTop: 'solid 1px black',
            backgroundColor: '#171717',
          })}>
          <div
            css={css({
              display: selectedId ? 'flex' : 'none',

              flexDirection: 'column',
              height: '100%',
            })}>
            <p
              css={css({
                textAlign: 'center',
                margin: '8px 0px 8px 0px',
                color: 'white',
                fontSize: '0.8rem',
                opacity: '0.5',
              })}>
              {dayjs(
                memos.find((memo) => memo.id === selectedId)?.updatedDate
              ).format('MMMM D h:mm A')}
            </p>
            <textarea
              css={css({
                width: '100%',
                flexGrow: 1,
                padding: '12px',
                boxSizing: 'border-box',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'white',
                resize: 'none',
              })}
              ref={textAreaRef}
              value={memos.find((memo) => memo.id === selectedId)?.writing}
              onChange={textAreaOnchange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
