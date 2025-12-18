import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    // تغییر از '/REPO_NAME/' به './' برای حل مشکل لود نشدن فایل‌ها در نتلیفای
    base: './', 
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    plugins: [
      react(),
    ],
  }
})