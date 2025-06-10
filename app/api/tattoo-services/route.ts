import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tattooService = await prisma.tattooService.create({
      data: body,
    });
    return NextResponse.json(tattooService);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating tattoo service' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tattooServices = await prisma.tattooService.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(tattooServices);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching tattoo services' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    
    const updatedService = await prisma.tattooService.update({
      where: { id },
      data,
    });
    
    return NextResponse.json(updatedService);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating tattoo service' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    await prisma.tattooService.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Tattoo service deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting tattoo service' }, { status: 500 });
  }
} 