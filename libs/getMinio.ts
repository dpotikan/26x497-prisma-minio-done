import * as Minio from "minio";

const minio = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: process.env.OBJ_ACCESS_KEY as string,
  secretKey: process.env.OBJ_SECRET_KEY as string,
});

export function getMinio() {
  return minio;
}
