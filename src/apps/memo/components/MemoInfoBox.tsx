import { css } from '@emotion/react';
import { Memo } from '../types';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import {
  DEFAULT_PLACEHOLDER_MEMO_TITLE,
  DEFAULT_PLACEHOLDER_MEMO_WRITING,
} from '../constant';

const animations = {
  initial: {
    maxHeight: 0,
    opacity: 0,
  },
  animate: {
    maxHeight: 100,
    opacity: 1,
    transition: {
      maxHeight: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.25,
        delay: 0.15,
      },
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      scale: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.25,
      },
    },
  },
  transition: { duration: 0.3 },
};

export default function MemoInfoBox({
  selected,
  memo,
  onClick,
}: {
  selected?: boolean;
  memo: Memo;
  onClick: () => void;
}) {
  const title = memo.writing.split('\n')[0] || DEFAULT_PLACEHOLDER_MEMO_TITLE;
  const writing =
    memo.writing.replace(title, '') || DEFAULT_PLACEHOLDER_MEMO_WRITING;

  return (
    <motion.button
      {...animations}
      css={css({
        backgroundColor: selected ? '#363636' : 'transparent',
        overflow: 'hidden',
        border: 'none',
        flexShrink: 0,
        color: 'white',
        padding: '12px 16px 12px 28px',
        borderRadius: '4px',
        ':focus': {
          backgroundColor: '#916F18',
        },
      })}
      onClick={onClick}>
      <h6
        css={css({
          margin: '0',
          textAlign: 'left',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          marginBottom: '4px',
          overflow: 'hidden',
          textWrap: 'nowrap',
          textOverflow: 'ellipsis',
        })}>
        {title}
      </h6>
      <div
        css={css({
          display: 'flex',
        })}>
        <p css={css({ margin: '0', marginRight: '8px' })}>
          {dayjs(memo.updatedDate).format('YYYY/MM/DD')}
        </p>
        <p
          css={css({
            margin: '0',
            overflow: 'hidden',
            textWrap: 'nowrap',
            textOverflow: 'ellipsis',
            opacity: '0.5',
          })}>
          {writing}
        </p>
      </div>
    </motion.button>
  );
}
