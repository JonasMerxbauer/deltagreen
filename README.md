Full stack web application for managing tasks that is made for step in the interview process

Running instance: https://deltagreen.vercel.app/

### 1. Install packages

```bash
pnpm install
```

### 2. Set up env file

Copy `.env.example` to `.env` and fill in the PostgreSQL database credentials

### 3. Set up database

Run this command to push the schema to the database

```bash
pnpm db:push
```

### 4. Run the app

```bash
pnpm run dev
```
