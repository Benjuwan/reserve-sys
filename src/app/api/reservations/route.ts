import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { todoItemType } from '@/app/components/schedule/todoItems/ts/todoItemType';

// GET
export async function GET() {
  const reservations = await prisma.reservation.findMany();
  return NextResponse.json(reservations);
}

// POST
export async function POST(request: Request) {
  const data: todoItemType = await request.json();

  const reservation = await prisma.reservation.create({
    data: {
      todoID: data.todoID,
      todoContent: data.todoContent,
      edit: data.edit,
      pw: data.pw,
      rooms: typeof data.rooms !== 'undefined' ? data.rooms : '',
      startTime: typeof data.startTime !== 'undefined' ? data.startTime : '',
      finishTime: typeof data.finishTime !== 'undefined' ? data.finishTime : '',
    },
  });

  return NextResponse.json(reservation);
}