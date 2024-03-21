# webder

Http/s proxy that render pages with js and returns HTML

> [!WARNING]
> This service is not purify html and not blocking XSS attacks. Also it is not block requests to localhost, etc.
> This is not intended to be used as a user-facing browser. Use it ONLY for making api calls from other services, make sure to run it behind a firewall and use a reverse proxy in front of it.

## Features

- Render pages with js (/render?url=...)

## Usage

For env variables look to `.env.example`. Docker also supported.

```bash
npm install
npm run build
npm start
```
