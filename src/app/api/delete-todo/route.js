import DB_client from "@/db/clientdb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req){
    const client = await DB_client;
    const db = await client.db("todoApp");
    const collection = db.collection("todos");

    const {id}=await req.json()
    const find_todo=await collection.findOne({_id:new ObjectId(id)})

    if(!find_todo){
        return NextResponse.json({message:"This todo is not fount !!"})
    }

    await collection.deleteOne({_id:new ObjectId(id)})
    return NextResponse.json({
        "message":"This todo deleted successfully !",
        "id":id
    })
}