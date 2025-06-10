import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const piercingService = await prisma.piercingService.create({
      data: body,
    });
    return NextResponse.json(piercingService);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating piercing service' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const piercingServices = await prisma.piercingService.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(piercingServices);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching piercing services' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    
    const updatedService = await prisma.piercingService.update({
      where: { id },
      data,
    });
    
    return NextResponse.json(updatedService);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating piercing service' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    await prisma.piercingService.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Piercing service deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting piercing service' }, { status: 500 });
  }
} 