import { NextResponse } from "next/server";
import { getOrders, saveOrders } from "@/lib/redis";

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

    const orders = await getOrders();
    const orderIndex = orders.findIndex((o) => o.id === id);

    if (orderIndex === -1) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const updatedOrder = { ...orders[orderIndex], ...body };
    orders[orderIndex] = updatedOrder;
    await saveOrders(orders);

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
