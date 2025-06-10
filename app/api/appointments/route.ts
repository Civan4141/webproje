import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching appointments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const appointment = await prisma.appointment.create({
      data: body,
    });
    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating appointment' }, { status: 500 });
  }
} 