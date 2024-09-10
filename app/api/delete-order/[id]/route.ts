import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data', 'order.json');

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const orderIndex = data.findIndex((order: any) => order.id === parseInt(id));

    if (orderIndex === -1) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    const deletedOrder = data.splice(orderIndex, 1);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      message: 'Order deleted successfully!',
      data: deletedOrder,
    });
  } catch (error) {
    console.error('Error deleting order:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Error deleting order', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Unexpected error occurred while deleting the order' },
      { status: 500 }
    );
  }
}
