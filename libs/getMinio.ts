import * as Minio from "minio";

const minio = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "8opYEKBrvoGPiZ5U2oO0",
  secretKey: "cMUqraZNo8KP3Q22NpPVXC5ks9h2djRKam9j8pJc",
});

export function getMinio() {
  return minio;
}
