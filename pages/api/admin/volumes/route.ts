import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { number, year, journalId } = await request.json();

    const volume = await prisma.volume.create({
      data: {
        number: parseInt(number),
        year: parseInt(year),
        journalId
      }
    });

    return NextResponse.json(volume);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create volume' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, number, year } = await request.json();

    const volume = await prisma.volume.update({
      where: { id },
      data: {
        number: parseInt(number),
        year: parseInt(year)
      }
    });

    return NextResponse.json(volume);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update volume' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Volume ID required' }, { status: 400 });
    }

    await prisma.volume.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete volume' }, { status: 500 });
  }
}