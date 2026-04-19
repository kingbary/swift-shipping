import { NextResponse } from "next/server";
import { getOrders } from "@/lib/redis";

export async function GET() {
  try {
    const data = await getOrders();

    return NextResponse.json({
      message: "Orders fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Error fetching orders" },
      { status: 500 }
    );
  }
}
