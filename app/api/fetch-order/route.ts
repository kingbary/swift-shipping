import { NextResponse } from "next/server";
import { getOrders } from "@/lib/redis";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const trackingNumber = searchParams.get("trackingNumber");

    if (!trackingNumber) {
      return NextResponse.json(
        { message: "Tracking number is required" },
        { status: 400 }
      );
    }

    const orders = await getOrders();
    const order = orders.find((o) => o.trackingNumber === trackingNumber);

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order found", data: order });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { message: "Error fetching order" },
      { status: 500 }
    );
  }
}
