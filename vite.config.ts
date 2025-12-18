import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    // توجه: به جای REPO_NAME باید نام دقیق ریپازیتوری جدیدی که در گیت‌هاب می‌سازید را بنویسید
    // مثلا اگر نام ریپازیتوری my-astrology است، این خط باید بشود: base: '/my-astrology/',
    base: '/REPO_NAME/', 
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    plugins: [
      react(),
    ],
  }
})