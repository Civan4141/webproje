import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'

// Get all gallery items
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where = category ? { category } : {}
    
    const items = await prisma.gallery.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Fetch gallery items error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Add new gallery item (protected route)
export async function POST(request) {
  try {
    const user = await isAuthenticated(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const item = await prisma.gallery.create({
      data: {
        title: data.title,
        imageUrl: data.imageUrl,
        category: data.category,
        subCategory: data.subCategory
      }
    })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Gallery item creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Delete gallery item (protected route)
export async function DELETE(request) {
  try {
    const user = await isAuthenticated(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      )
    }

    await prisma.gallery.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Item deleted successfully' })
  } catch (error) {
    console.error('Gallery item deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 