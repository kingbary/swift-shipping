import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

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
    const filePath = path.resolve("data", "order.json");

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const newOrder = {
      id: data.length + 1,
      trackingNumber: generateTrackingNumber(),
      ...body,
    };

    data.push(newOrder);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

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
