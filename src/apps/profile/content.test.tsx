import { render, screen } from '@testing-library/react';
import { Profile, ProfileProps } from './Content';
import userEvent from '@testing-library/user-event';

describe('메모앱', () => {
  it('원하는 정보들이 표시된다.', async () => {
    const dummy = {
      imgSrc: '/me3.jpg',
      name: '길동 홍',
      sub: '테스트를 좋아한다.',
      spec: [
        ['나이', '24'],
        ['출생지', '대구'],
      ],
      moreInfoSrc: 'https://naver.com',
    } as ProfileProps;

    render(<Profile {...dummy} />);

    const openSpy = vi.spyOn(window, 'open');
    await userEvent.click(screen.getByText(/more info/i));

    expect(screen.getByText(dummy.name)).toBeInTheDocument();
    expect(screen.getByText(dummy.sub)).toBeInTheDocument();
    expect(screen.getByText(dummy.spec[0][0])).toBeInTheDocument();
    expect(screen.getByText(dummy.spec[0][1])).toBeInTheDocument();
    expect(screen.getByText(dummy.spec[1][0])).toBeInTheDocument();
    expect(screen.getByText(dummy.spec[1][1])).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', dummy.imgSrc);
    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith(dummy.moreInfoSrc, '_blank');
  });
});
