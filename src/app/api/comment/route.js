import { NextResponse } from "next/server";
import ConnectDb from "../../../../middleware/db";
import AuthorizeMd from "../../../../middleware/AuthorizeMd";
import { headers } from "next/headers";
import Comment from "../../../../models/Comment";
export const GET = async (req) => {
await ConnectDb();
const headerlist = headers();
const { searchParams } = new URL(req.url);
const id = searchParams.get('id');
try{
let a  = AuthorizeMd(headerlist.get("token"));
if(!a){
return NextResponse.json({message:"You are not authorized to access this route",status:401,success:false})
}
let data = await Comment.findOne({name:id});
return NextResponse.json({data:data,message:"Comment loaded successfully",success:true})
}
catch(err){
return NextResponse.json({message:"Something went wrong! try again later",success:false})
}
}
export const POST = async (req) => {
await ConnectDb();
const headerlist = headers();
const reqdata = await req.json();
try{
let a  = AuthorizeMd(headerlist.get("token"));
if(!a){
return NextResponse.json({message:"You are not authorized to access this route",status:401,success:false})

}
let data = await Comment.findOne({name:reqdata.name});
if(data!=null){
let newdata = await Comment.findOneAndUpdate({name:reqdata.name},{$push:{comment:reqdata.comment}},{new:true});
return NextResponse.json({message:"Comment added successfully",success:true,data:newdata})
}
else{
let newdata = new Comment({name:reqdata.name,comment:[reqdata.comment]});
await newdata.save();
return NextResponse.json({message:"Comment added successfully",success:true})
}
}
catch(err){
    console.log(err)
return NextResponse.json({message:"Something went wrong! try again later",success:false})
}
}