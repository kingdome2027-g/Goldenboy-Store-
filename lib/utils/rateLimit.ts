// Simple in-memory rate limiting using a Map
// In production, consider using Redis or a dedicated rate-limiting service

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function rateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): { success: boolean; remaining: number; retryAfter: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    // New window or entry expired
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, remaining: maxRequests - 1, retryAfter: 0 };
  }

  if (entry.count < maxRequests) {
    entry.count++;
    const remaining = maxRequests - entry.count;
    return { success: true, remaining, retryAfter: 0 };
  }

  // Rate limit exceeded
  const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
  return { success: false, remaining: 0, retryAfter };
}

export function getRateLimitHeaders(
  maxRequests: number,
  remaining: number,
  retryAfter: number
): Record<string, string> {
  return {
    'X-RateLimit-Limit': maxRequests.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    ...(retryAfter > 0 && { 'Retry-After': retryAfter.toString() }),
  };
}
