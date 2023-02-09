---
title: Postgres connect URL
description: How to connect postgres database with URL
createDate: 2023-02-09T12:43:36.700Z
---

Very often, cloud database services such as [neon.tech](https://neon.tech/) allow you to connect via URL.
That is, without credentials such as `user`, `password`, etc.

## Connection details

### Connection URL

It's [official PostgreSQL format for connection URLs](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)

<Image alt src="postgresql-connection-string.png" priority={true} alt="S.Shramko personal site screenshot"/>

### Base URL and path

Here's an example of a base URL and path structure using uppercase placeholder values:

```text
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

<Image alt src="db-table.png" priority={true} alt="S.Shramko personal site screenshot"/>

## How this site connects to the database

### Store your credentials in .env

Store your credentials in your `.env` file.

```shell
PGHOST='<endpoint_hostname>:<port>'
PGDATABASE='<dbname>'
PGUSER='<username>'
PGPASSWORD='<password>'
ENDPOINT_ID='<endpoint_id>'
```

where:

- `endpoint_hostname` the hostname of the branch endpoint. The endpoint hostname has an ep- prefix and appears similar
  to
  this: **ep-tight-salad-272396.us-east-2.aws.neon.tech**
- `dbname` is the name of the database. The default Neon database is neondb
- `user` is the database user
- `password` is the database user's password, which is provided to you when you create a project
- `endpoint_id` is the ID of the branch endpoint that you are connecting to. The endpoint_id has an ep- prefix and
  appears
  similar to this: **ep-tight-salad-272396**

### Use prisma.io to connect Postgres

```js
// You can create DATABASE_URL in your code
const DATABASE_URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;
```

```shell
# Or better to use .env file
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  referentialIntegrity = "prisma"
}
```

### Use Datagrip to connect Postgres

You can use same credentials like `HOST`, `PORT`, `USER`, `PASSWORD`, `DATABSE` for connection to Database with
DataGrip.

<Image alt src="db-datagrip.png" priority={true} alt="S.Shramko personal site screenshot"/>


