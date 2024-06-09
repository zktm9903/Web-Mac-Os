import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// export default defineConfig({
// 	plugins: [
// 		react({
// 			jsxImportSource: "@emotion/react",
// 		}),
// 		test: {
// 			environment: 'jsdom',
// 		  }
// 	],
// });

export default defineConfig(() => {
  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
      }),
    ],
    test: {
      //https://victorbruce82.medium.com/vitest-with-react-testing-library-in-react-created-with-vite-3552f0a9a19a
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/tests/setup.js',
    },
  };
});
