# 04-react-query

Застосунок пошуку фільмів із пагінацією, створений за допомогою React,
TypeScript, TanStack Query, Axios і React Paginate.

## Локальний запуск

1. Встановіть залежності:

   ```bash
   npm install
   ```

2. Створіть файл `.env` на основі `.env.example` і додайте TMDB Read Access
   Token:

   ```env
   VITE_TMDB_TOKEN=your_tmdb_read_access_token
   ```

3. Запустіть застосунок:

   ```bash
   npm run dev
   ```

Для Vercel змінну `VITE_TMDB_TOKEN` потрібно додати в налаштуваннях Environment
Variables проєкту.
