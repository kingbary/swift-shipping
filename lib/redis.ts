import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const ORDERS_KEY = "orders";

export async function getOrders(): Promise<Order[]> {
  const orders = await redis.get<Order[]>(ORDERS_KEY);
  return orders ?? [];
}

export async function saveOrders(orders: Order[]): Promise<void> {
  await redis.set(ORDERS_KEY, orders);
}
