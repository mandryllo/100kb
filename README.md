# 100kb

Codebase for [100kb.space](https://100kb.space/).

1. 100kb.space is an opinionated blog aggregator
2. Inspired by [100kb.danhill.is](https://100kb.danhill.is/)
and [indieblog.page](https://indieblog.page/)
3. Learn more how we use and store your activity on the [activity](pages/activity.vue) page
4. You can find list of blogs [here](shared/blogs.ts)
5. To add/remove blog (or anything else) please open an issue on [GitHub](https://github.com/mandryllo/100kb/issues)

## Future improvements

1. Improve the blog list
2. Add other sources like youtube channels, podcasts, newsletters, reddit, HN, etc.
3. Introduce categories, persist data


## Local Development

1. Install dependecies
```bash
pnpm install
```
2. Copy `.env` file and set environment variables (if you want to use upstash as storage)
```bash
cp .env.example .env
```
3. Start the development server on `http://localhost:3000`
```bash
pnpm run dev
```
4. Generate feed
```bash
pnpm run task:feed
```

## Production

Deployed to [vercel](https://vercel.com/) and uses [upstash](https://upstash.com/) as storage.
