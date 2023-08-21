import DB_client from "@/db/clientdb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const client = await DB_client;
  const db = await client.db("todoApp");
  const collection = db.collection("todos");
  const { title } = await req.json();
  let result = await collection.insertOne({ title: title });

  let findTodo =await collection.findOne({
    _id: result.insertedId,
  });
  return NextResponse.json({
    findTodo,
  });
}
