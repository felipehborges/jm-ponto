import { NextResponse } from 'next/server';
import { authUser } from '@/lib/auth';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const result = await authUser(email, password);
    console.log(result)
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}