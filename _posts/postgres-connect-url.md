---
title: Use Postgres Connect URLs for DB Connections
heading: Postgres connect to database with URL
description: Learn how to connect to PostgreSQL using a connection URL string. Simple guide for Node.js, DataGrip, or any client supporting URL-based database connections.
createDate: 2023-02-09T12:43:36.700Z
updateDate: 2023-02-09T12:43:36.700Z
keywords: [ DataGrip connect, database connection ulr, postgres connect url, how to connect to database ]
categories: [ JS, Tutorial, Project-Setup ]
featured: false
---

Very often, cloud database services such as [neon.tech](https://neon.com/) allow you to connect via URL.
That is, without credentials such as `user`, `password`, etc.

## Connection details

### Connection URL

It's [official PostgreSQL format for connection URLs](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)

<Image src="postgresql-connection-string.png" priority={true} alt="PostgreSQL connection URL string format showing protocol, user, password, host, port, and database" />

### Base URL and path

Here's an example of a base URL and path structure using uppercase placeholder values:

```text
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

<Image src="db-table.png" priority={true} alt="PostgreSQL base URL and path structure with placeholder values for user, password, host, port, and database" />

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

<Image src="db-datagrip.png" priority={true} alt="DataGrip connection dialog configured with PostgreSQL credentials" />

## Related

- [Installing PostgreSQL on macOS](/snippets/postgres-install-macos) - step-by-step setup guide
- [SQL Countries Table](/snippets/countries-sql) - ready-to-use seed data for your database
