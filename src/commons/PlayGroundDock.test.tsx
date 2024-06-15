import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Dock from './Dock';
import { APPS } from '../apps/apps';
import PlayGround from './PlayGround';

describe('플레이그라운드 독', () => {
  it('앱 아이콘을 누르면 원하는 앱이 실행된다.', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PlayGround />
                <Dock />
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    for (const app of APPS) {
      const appName = app.name;
      const button = container.querySelector(
        `[app-icon="${appName}"]`
      ) as Element;
      expect(button).toBeInTheDocument();

      await userEvent.click(button);

      const appBox = container.querySelector(
        `[app-box="${appName}"]`
      ) as Element;
      expect(appBox).toBeInTheDocument();
      expect(appBox).toBeVisible();

      const redButton = appBox.querySelector(
        `[app-three-button-color="red"]`
      ) as Element;
      expect(redButton).toBeInTheDocument();

      await userEvent.click(redButton);

      expect(appBox).toBeInTheDocument();
      expect(appBox).not.toBeVisible();
    }
  });
});
