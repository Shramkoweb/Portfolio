<h1 align="center">shramko.dev</h1>
<p align="center">Портфоліо · блог · цифровий сад</p>
<p align="center"><a href="https://shramko.dev"><strong>Дивитись сайт →</strong></a></p>

<p align="center">
  <a href="https://github.com/Shramkoweb/Portfolio/actions/workflows/ci.yml"><img src="https://github.com/Shramkoweb/Portfolio/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://github.com/Shramkoweb/Portfolio/actions/workflows/lighthouse.yml"><img src="https://github.com/Shramkoweb/Portfolio/actions/workflows/lighthouse.yml/badge.svg" alt="Lighthouse"></a>
  <a href="https://codeclimate.com/github/Shramkoweb/Portfolio/maintainability"><img src="https://api.codeclimate.com/v1/badges/856e98b049fbf4dca86d/maintainability" alt="Maintainability"></a>
  <a href="https://codeclimate.com/github/Shramkoweb/Portfolio/test_coverage"><img src="https://api.codeclimate.com/v1/badges/856e98b049fbf4dca86d/test_coverage" alt="Test Coverage"></a>
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT">
</p>

<p align="center"><a href="README.md">English</a></p>

## Зміст

- [Технології](#технології)
- [Швидкий старт](#швидкий-старт)
- [Команди](#команди)
- [Тестування](#тестування)
- [Деплой](#деплой)
- [Моніторинг](#моніторинг)
- [Внесок у проєкт](#внесок-у-проєкт)
- [Ліцензія](#ліцензія)

## Технології

| Шар           | Інструменти                                                    |
| ------------- | -------------------------------------------------------------- |
| Фреймворк     | Next.js 16, React 19                                           |
| Мова          | TypeScript                                                     |
| Стилі         | Tailwind CSS v4                                                |
| Контент       | MDX, `next-mdx-remote`, Shiki                                  |
| Дані          | Prisma 7, Postgres                                             |
| Стан / Запити | SWR                                                            |
| Моніторинг    | Sentry, Checkly, UptimeRobot, Vercel Analytics, Speed Insights |
| Тести         | Jest, Testing Library                                          |
| Інструменти   | oxlint, oxfmt, commitlint, pnpm                                |
| Хостинг       | Vercel                                                         |

## Швидкий старт

### Передумови

- Node 24.x
- pnpm 10.x
- База даних Postgres (локальна або хмарна, наприклад [Neon](https://neon.tech))

### Установка

```bash
git clone https://github.com/Shramkoweb/Portfolio.git
cd Portfolio
pnpm install
cp .env.example .env
# заповніть DATABASE_URL, SENTRY_*, GITHUB_TOKEN
pnpm dev
```

Застосунок запускається на http://localhost:3000.

## Команди

| Команда                             | Опис                            |
| ----------------------------------- | ------------------------------- |
| `pnpm dev`                          | запуск dev-сервера              |
| `pnpm build`                        | продакшн-збірка + sitemap       |
| `pnpm start`                        | запуск продакшн-сервера         |
| `pnpm lint` / `pnpm lint:fix`       | oxlint                          |
| `pnpm format` / `pnpm format:check` | oxfmt                           |
| `pnpm test` / `pnpm test:coverage`  | Jest                            |
| `pnpm article`                      | створення шаблону нового допису |

## Тестування

Тести працюють на Jest з Testing Library. Запустіть `pnpm test` для повного набору або `pnpm test:coverage` для звіту покриття. Тести розташовані в `__tests__/`. CI завантажує покриття у Code Climate.

## Деплой

Автоматичний деплой на [Vercel](https://vercel.com) при пуші до `main`. Скрипт `postbuild` регенерує sitemap через `next-sitemap`. Pull request-и проходять перевірку Lighthouse budget, описану в `.github/workflows/lighthouse.yml`.

## Моніторинг

- [UptimeRobot status page](https://stats.uptimerobot.com/8lYYzuXNM9/792406216) — публічний моніторинг доступності сайту.

  ![UptimeRobot status page](docs/uptime-robot.png)

- [Checkly dashboard](https://portfolio-shramko.checkly-dashboards.com/?duration=30d) — E2E тести та статус збірки.

  ![Checkly monitor](docs/checkly.png)

## Внесок у проєкт

- Коміти йдуть у форматі [Conventional Commits](https://www.conventionalcommits.org) (Angular convention). Перевіряється через `commitlint.config.ts`.
- Pre-commit хук автоматично форматує JS/TS через `oxfmt` (встановлюється `pnpm install` через скрипт `prepare`).
- Запустіть `pnpm pre-push` перед пушем — він запускає lint і перевірку форматування.

## Ліцензія

MIT — дивіться [LICENSE](LICENSE).
