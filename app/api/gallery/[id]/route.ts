import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// DELETE belirli bir galeri öğesini sil
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.gallery.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Galeri öğesi başarıyla silindi' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json(
      { error: 'Galeri öğesi silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// GET belirli bir galeri öğesini getir
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const item = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Galeri öğesi bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    return NextResponse.json(
      { error: 'Galeri öğesi getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// PUT belirli bir galeri öğesini güncelle
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, imageUrl, category, subCategory } = body;

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