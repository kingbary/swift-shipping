import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const filePath = path.resolve(process.cwd(), "data", "order.json");

    const data: Order[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    return NextResponse.json({
      message: "Orders fetched successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Error fetching orders" },
      { status: 500 }
    );
  }
}
