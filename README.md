# Next.js & NextUI Template

This is a template for creating applications using Next.js 14 (app directory) and NextUI (v2).


## Technologies Used

- [Next.js 15](https://nextjs.org/docs/getting-started)
- [HeroUI](heroui.com)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Quick Start


### Clone Source Code

```bash

git clone ... xxx
cd xxx
# copy-create env file and modify env value 
cp .env.example .env.local
# modify app info
vi package.json
# modify site info
vi config/site.ts
# modify tailwind.config.js

# favicon(https://favicon.io/favicon-generator/), logo(https://favicon.io/logo-generator/)
# public/favicon.ico, logo.png, og.png
```

- `about/page.tsx`
- `privacy/page.tsx`
- `terms/page.tsx`

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `pnpm`:

```bash
pnpm install
```

### Run the development server

```bash
pnpm run dev
```

### Build Production App
```bash
pnpm run build
```