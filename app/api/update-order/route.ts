import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.resolve("data", "order.json");

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Order ID is required" },
        { status: 400 }
      );
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const orderIndex = data.findIndex((order: any) => order.id === id);

    if (orderIndex === -1) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const updatedOrder = {
      ...data[orderIndex],
      ...body,
    };

    data[orderIndex] = updatedOrder;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      message: "Order updated successfully!",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { message: "Error updating order" },
      { status: 500 }
    );
  }
}
