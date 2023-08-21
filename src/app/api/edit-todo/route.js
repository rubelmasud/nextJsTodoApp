import DB_client from "@/db/clientdb";
import { ObjectId } from "mongodb";
import {  NextResponse } from "next/server";

export async function POST(req) {
  const client = await DB_client;
  const db = client.db("todoApp");
  const collection = db.collection("todos");

  const { id,title } = await req.json();
  const findTodoEdit = await collection.findOne({ _id: new ObjectId(id) });

  if(!findTodoEdit){
    return NextResponse.json({error:"This todo is not fount for update!!"})
}

await collection.updateOne({_id:new ObjectId(id)},{
    $set:{
        title
    }
})
  return NextResponse.json({
    message: "This todo is edit successfully !",
    id: id,
  });
}
