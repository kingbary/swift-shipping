import { NextResponse } from "next/server";
import { getOrders, saveOrders } from "@/lib/redis";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const orders = await getOrders();
    const orderIndex = orders.findIndex((o) => o.id === id);

    if (orderIndex === -1) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const deletedOrder = orders.splice(orderIndex, 1);
    await saveOrders(orders);

    return NextResponse.json({
      message: "Order deleted successfully!",
      data: deletedOrder,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { message: "Error deleting order" },
      { status: 500 }
    );
  }
}
