import { NextRequest, NextResponse } from "next/server";
import { getOrders, saveOrders } from "@/lib/redis";

function generateTrackingNumber() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let trackingNumber = "";
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    trackingNumber += chars[randomIndex];
  }
  return trackingNumber;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orders = await getOrders();

    const newOrder = {
      id: orders.length + 1,
      trackingNumber: generateTrackingNumber(),
      ...body,
    };

    orders.push(newOrder);
    await saveOrders(orders);

    return NextResponse.json({
      message: "Order created successfully!",
      data: newOrder,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving order" },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { message: "Only POST requests are allowed" },
    { status: 405 }
  );
}
