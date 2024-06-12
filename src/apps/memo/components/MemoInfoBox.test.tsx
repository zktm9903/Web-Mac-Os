import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MemoInfoBox from './MemoInfoBox';

describe('메모 정보 박스', () => {
  it('원하는 정보가 표시된다.', async () => {
    const title = '오늘은 클라이밍 가는날!';
    const content = '오늘은 보라색 최소 100개는 깨고말겠다..';
    const _createdDate = ['2024', '05', '11'];
    const _updatedDate = ['2024', '05', '15'];
    const dummy = {
      id: '1',
      writing: [title, content].join('\n\n'),
      createdDate: new Date(_createdDate.join('-')),
      updatedDate: new Date(_updatedDate.join('-')),
    };

    const clickEvent = vi.fn();
    render(<MemoInfoBox memo={dummy} onClick={clickEvent} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByText(_updatedDate.join('/'))).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));
    expect(clickEvent).toHaveBeenCalledTimes(1);
  });
});
