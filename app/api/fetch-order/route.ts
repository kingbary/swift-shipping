import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

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

    const filePath = path.resolve(process.cwd(), "data", "order.json");
    const data: Order[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const order = data.find((order) => order.trackingNumber === trackingNumber);

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Order found",
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { message: "Error fetching order" },
      { status: 500 }
    );
  }
}
