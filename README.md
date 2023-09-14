# Application Deployment tutorial

This **"Todo App"** project is developed using `Next.js`:

- `./components` : front-end components
- `./app` : RESTful API routes
- `./libs` : utilities libraries
- `./prisma` : Database schemas
- `./docker` : Docker related files

---

### Install required packages

We start by installing all packages required by the project. This packages are listed in the `package.json` file.

```bash
npm install
```

---

### Start a Postgres Database server container

We can create a database container using the following command. We will use this database server to store all users todo lists.

Before running this command, we need to create the `D:\postgres-data` directory to use as `bind-mount` volume to persistently store database files.

```bash
docker run -d --name postgresCont -p 5432:5432 -e POSTGRES_DB=mytodo -e POSTGRES_PASSWORD=12345678 -e PGDATA=/var/lib/postgresql/data/pgdata -v D:\postgres-data:/var/lib/postgresql/data postgres
```

---

### Start a MinIO object storage container

Now we can create an object storage container as well. The `Todo app` uses this object storage to store user uploaded files.

Before running this command, we need to create the `D:\minio-data` directory to use as `bind-mount` volume to persistently store minio data.

```bash
docker run -d -p 9000:9000 -p 9090:9090 --name minio -v D:\minio-data:/data -e "MINIO_ROOT_USER=root" -e "MINIO_ROOT_PASSWORD=12345678" quay.io/minio/minio server /data --console-address ":9090"
```

### Using Docker-compose to start all services

Instead of running docker commands one-by-one to start each service separately, we can use docker-compose to manage everything.

To start all service containers at once.

```bash
docker compose -f docker/docker-compose.yml up -d
```

To stop and remove all containers.

```bash
docker compose -f docker/docker-compose.yml down
```

---

### Generate Prisma client from schema (execute once per project)

Firstly, we need to use prisma to intialize database and tables in the database server.

```bash
npx prisma generate
```

We should get an output as similar as:

```
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma

✔ Generated Prisma Client (v5.2.0) to .\node_modules\@prisma\client in 121ms
Start using Prisma Client in Node.js (See: https://pris.ly/d/client)

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

or start using Prisma Client at the edge (See: https://pris.ly/d/accelerate)

import { PrismaClient } from '@prisma/client/edge'
const prisma = new PrismaClient()

See other ways of importing Prisma Client: http://pris.ly/d/importing-client

┌─────────────────────────────────────────────────────────┐
│  Update available 5.2.0 -> 5.3.0                        │
│  Run the following to update                            │
│    npm i --save-dev prisma@latest                       │
│    npm i @prisma/client@latest                          │
└─────────────────────────────────────────────────────────┘
```

### Initialize database schema (execute once per database)

Now we can initialize the database and tables using the following command.

```bash
npx prisma db push
```

We should get an output as similar as:

```
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "mytodo" at "localhost:5432"

Your database is now in sync with your Prisma schema. Done in 390ms

✔ Generated Prisma Client (v5.2.0) to .\node_modules\@prisma\client in 110ms
```

After initialize the database, use a Postgres database client to log in as `postgres` user with the password `12345678`. We shoud see the `mytodo` database. Add a few users in the `User` table. We will use these users to test the "Todo App".

---

### Basic Minio object storage configuration

Secondly, after starting the Minio container, use a web browser to open "http://localhost:9000"

- Log in to the management console using the username `root` and password `12345678`.
- Create a storage bucket with the name as specified in the `.env` file (`OBJ_BUCKET` variable).

---

### Run the development server:

After setup and configure all back-end services (Postgres database server and Minio object storage service), we can now start the development server.

```bash
npm run dev
```
