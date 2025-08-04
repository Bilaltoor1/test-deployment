import dbConnect from '../../../../../lib/db';
import Todo from '../../../../../models/Todo';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await dbConnect();
  try {
    const todo = await Todo.findById(params.id);
    if (!todo) {
      return NextResponse.json({ success: false, error: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: todo });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const body = await request.json();
    const todo = await Todo.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return NextResponse.json({ success: false, error: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: todo });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const deletedTodo = await Todo.deleteOne({ _id: params.id });
    if (!deletedTodo) {
      return NextResponse.json({ success: false, error: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
