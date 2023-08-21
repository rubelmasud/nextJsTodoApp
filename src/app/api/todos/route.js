import { NextResponse } from "next/server";
import DB_client from "@/db/clientdb";

export async function GET(req) {
  const client = await DB_client;
  const db = await client.db("todoApp");
  const collection = db.collection("todos");

  const GetAllTodo=await collection.find().toArray()
 
  return NextResponse.json({
    GetAllTodo
  });
}
