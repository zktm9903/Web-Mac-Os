import { css } from '@emotion/react';
import { Fragment } from 'react';

export default function Content() {
  return (
    <Profile
      imgSrc={'/me3.webp'}
      name={'SangCheol Lee'}
      sub={'05, 1998'}
      spec={[
        ['Chip', 'Brain'],
        ['Memory', '5 KB'],
        ['Serial Number', 'LEE7SANG'],
        ['Dream', 'Rich cat'],
      ]}
      moreInfoSrc={
        'https://www.linkedin.com/in/%EC%83%81%EC%B2%A0-%EC%9D%B4-3b339130a/'
      }
    />
  );
}

export interface ProfileProps {
  imgSrc: string;
  name: string;
  sub: string;
  spec: [string, string][];
  moreInfoSrc: string;
}

export const Profile = ({
  imgSrc,
  name,
  sub,
  spec,
  moreInfoSrc,
}: ProfileProps) => {
  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        padding: '44px 0px 32px 0px',
      })}>
      <img
        src={imgSrc}
        css={css({
          borderRadius: '10px',
          width: '50%',
          maxWidth: '200px',
        })}
      />
      <h2 css={css({ marginBottom: '0px' })}>{name}</h2>
      <p css={css({ marginTop: '4px', marginBottom: '20px', opacity: '0.5' })}>
        {sub}
      </p>
      <div
        css={css({
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: '8px',
          marginBottom: '16px',
        })}>
        {spec.map((pair) => {
          const [key, value] = pair;
          return (
            <Fragment key={key}>
              <p
                css={css({
                  textAlign: 'right',
                  margin: '0 0 4px 0',
                  fontSize: '0.95rem',
                })}>
                {key}
              </p>
              <p
                css={css({
                  margin: '0 0 4px 0',
                  fontSize: '0.95rem',
                  opacity: 0.5,
                })}>
                {value}
              </p>
            </Fragment>
          );
        })}
      </div>
      <button
        css={css({
          backgroundColor: '#958686',
          border: 'none',
          borderRadius: '2px',
          cursor: 'pointer',
          color: 'white',
          padding: '2px 8px 2px 8px',
        })}
        onClick={() => {
          window.open(moreInfoSrc, '_blank');
        }}>
        More Info...
      </button>
      <p css={css({ textAlign: 'center', fontSize: '0.85rem', opacity: 0.5 })}>
        1998 ~ Leesang Inc.
        <br />
        All Rights Reserved
      </p>
    </div>
  );
};
