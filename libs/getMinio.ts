import * as Minio from "minio";

const minio = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "aWSfDsDm6cMmxOViShEV",
  secretKey: "RmM4dqpbw6jcyNZqVBb5qr2cSYCraY7Je6ZDmvZ4",
});

export function getMinio() {
  return minio;
}
