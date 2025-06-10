import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Çıkış başarılı' });
  
  // Auth token'ı temizle
  response.cookies.delete('auth-token');
  
  return response;
} 