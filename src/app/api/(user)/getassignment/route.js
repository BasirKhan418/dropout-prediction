import ConnectDb from "../../../../../middleware/db"
import { NextResponse } from "next/server"
import Assignments from "../../../../../models/Assignments"
import { headers } from "next/headers"
import AuthorizeMd from "../../../../../middleware/AuthorizeMd"

export const GET = async (req, res) => {
    await ConnectDb()
    let headerlist = headers()
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
try{
let a = AuthorizeMd(headerlist.get("token"));
if(!a){
    return NextResponse.json({message:"Unauthorized route cant handle request",status: "401",success:false });
}
let assignment = await Assignments.find({_id:id});
return NextResponse.json({message:"Successfully assignment fetched",status: "200",data:assignment ,success:true});
}
catch(err){
    return NextResponse.json({message:"Some thing went wrong please try again after some time",status: "401",success:false });
}
}
export const POST = async (req, res) => {
    await ConnectDb()
    let headerlist = headers();
try{
let a = AuthorizeMd(headerlist.get("token"));
if(!a){
    return NextResponse.json({message:"Unauthorized route cant handle request",status: "401",success:false });
}
let assignment = await Assignments.find({_id:id});
return NextResponse.json({message:"Successfully assignment fetched",status: "200",data:assignment ,success:true});
}
catch(err){
    return NextResponse.json({message:"Some thing went wrong please try again after some time",status: "401",success:false });
}
}