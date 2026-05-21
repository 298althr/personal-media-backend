import Fastify from 'fastify';
import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import cors from '@fastify/cors';

dotenv.config();

const fastify = Fastify({ logger: true });
const JWT_SECRET = process.env['JWT_SECRET'] || 'default-secret';
const S3_BUCKET = process.env['S3_BUCKET_NAME'] || '';
const s3Client = new S3Client({ 
  region: process.env['AWS_REGION'] || 'us-east-1',
  credentials: {
    accessKeyId: process.env['AWS_ACCESS_KEY_ID'] || '',
    secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'] || ''
  }
});

// Register CORS plugin
const CORS_ORIGIN = process.env['CORS_ORIGIN'] || '*';
await fastify.register(cors, {
  origin: CORS_ORIGIN,
  credentials: true
});

// Auth middleware - skip login and health routes
fastify.addHook("preHandler", async (request, reply) => {
  if (request.url === "/api/auth/login" || request.url === "/health") return;
  try {
    const token = request.headers.authorization?.replace("Bearer ", "");
    jwt.verify(token!, JWT_SECRET);
  } catch {
    reply.status(401).send({ error: "Unauthorized" });
  }
});

// Login route
fastify.post("/api/auth/login", async (request, reply) => {
  const { password } = request.body as { password: string };
  const isValid = await bcrypt.compare(password, process.env['HASHED_PASSWORD'] || '');
  if (!isValid) return reply.status(401).send({ error: "Invalid password" });
  const token = jwt.sign({ family: true }, JWT_SECRET, { expiresIn: "24h" });
  return { token };
});

// Get pre-signed URL for a media file
fastify.get("/api/stream/*", async (request) => {
  const key = (request.params as any)["*"];
  const command = new GetObjectCommand({ Bucket: S3_BUCKET, Key: key });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return { url };
});

// List media files in S3 bucket
fastify.get("/api/media/list", async () => {
  const command = new ListObjectsV2Command({ Bucket: S3_BUCKET });
  const result = await s3Client.send(command);
  const files = (result.Contents || []).map(f => ({
    key: f.Key,
    size: f.Size,
    lastModified: f.LastModified
  }));
  return { files };
});

// Health check
fastify.get("/health", async () => {
  return { status: "ok" };
});

const start = async () => {
  try {
    const port = parseInt(process.env['PORT'] || '3000');
    await fastify.listen({ port, host: "0.0.0.0" });
    fastify.log.info(`Server listening on ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
