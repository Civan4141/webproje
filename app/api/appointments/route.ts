import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    let appointments;
    if (query) {
      appointments = await prisma.appointment.findMany({
        where: {
          OR: [
            { email: { contains: query } },
            { phone: { contains: query } },
          ],
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      appointments = await prisma.appointment.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching appointments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Aynı gün ve saat için randevu var mı kontrol et
    const existing = await prisma.appointment.findFirst({
      where: {
        date: body.date,
        time: body.time,
      },
    });
    if (existing) {
      return NextResponse.json({ error: 'Bu gün ve saatte zaten bir randevu var.' }, { status: 400 });
    }
    const appointment = await prisma.appointment.create({
      data: body,
    });
    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating appointment' }, { status: 500 });
  }
} 