# Coffee Water Composition

A Next.js calculator for preparing mineral concentrates for specialty coffee water.

## Development

```bash
npm run dev
npm run lint
npm run build
```

## Structure

- `app/page.tsx` is the server-rendered route entry point.
- `app/_components/` contains UI components and client interaction state.
- `app/_lib/coffee-water.ts` owns typed recipe data and pure calculation utilities.

Keep business logic in `_lib` and presentation-specific state in components so future persistence, API, and test work can evolve independently.
