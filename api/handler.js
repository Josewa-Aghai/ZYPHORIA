import { server } from '../dist/server/server.js';

/**
 * Vercel serverless function handler
 * Routes all requests to TanStack Start server
 */
export default async function handler(request) {
  return await server.fetch(request);
}
