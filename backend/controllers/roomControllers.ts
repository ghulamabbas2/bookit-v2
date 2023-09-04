import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";

// Get all rooms  =>  /api/rooms
export const allRooms = async (req: NextRequest) => {
  const resPerPage: number = 8;

  const rooms = await Room.find();

  return NextResponse.json({
    success: true,
    resPerPage,
    rooms,
  });
};

// Create new room  =>  /api/admin/rooms
export const newRoom = async (req: NextRequest) => {
  const body = await req.json();

  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
};

// Get room details  =>  /api/rooms/:id
export const getRoomDetails = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const room = await Room.findById(params.id);

  if (!room) {
    return NextResponse.json(
      {
        message: "Room not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    room,
  });
};

// Update room details  =>  /api/admin/rooms/:id
export const updateRoom = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  let room = await Room.findById(params.id);
  const body = await req.json();

  if (!room) {
    return NextResponse.json(
      {
        message: "Room not found",
      },
      { status: 404 }
    );
  }

  room = await Room.findByIdAndUpdate(params.id, body, {
    new: true,
  });

  return NextResponse.json({
    success: true,
    room,
  });
};

// Delete room details  =>  /api/admin/rooms/:id
export const deleteRoom = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const room = await Room.findById(params.id);

  if (!room) {
    return NextResponse.json(
      {
        message: "Room not found",
      },
      { status: 404 }
    );
  }

  // TODO - Delete images associated with the room

  await room.deleteOne();

  return NextResponse.json({
    success: true,
  });
};
