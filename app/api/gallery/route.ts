import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET tüm galeri öğelerini getir
export async function GET() {
  try {
    const items = await prisma.gallery.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json(
      { error: 'Galeri öğeleri getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// POST yeni galeri öğesi ekle
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, imageUrl, category, subCategory } = body;

    const item = await prisma.gallery.create({
      data: {
        title,
        imageUrl,
        category,
        subCategory,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      { error: 'Galeri öğesi oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// PUT galeri öğesini güncelle
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, imageUrl, category, subCategory } = body;

    const item = await prisma.gallery.update({
      where: { id },
      data: {
        title,
        imageUrl,
        category,
        subCategory,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json(
      { error: 'Galeri öğesi güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 