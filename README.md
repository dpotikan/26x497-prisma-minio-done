## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Postgres Docker Command

//todo add volume mounting of postgres

```
docker run -d --name postgresCont -p 5432:5432 -e POSTGRES_PASSWORD=12345678 postgres
```

MinIO Docker Command

```
docker run -d -p 9000:9000 -p 9090:9090 --name minio -v D:\minio-files:/data -e "MINIO_ROOT_USER=root" -e "MINIO_ROOT_PASSWORD=12345678" quay.io/minio/minio server /data --console-address ":9090"
```
