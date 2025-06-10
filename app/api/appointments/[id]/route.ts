import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const appointment = await prisma.appointment.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating appointment' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.appointment.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting appointment' }, { status: 500 });
  }
} 