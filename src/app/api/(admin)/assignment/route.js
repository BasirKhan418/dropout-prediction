import { NextResponse } from "next/server"
import Assignments from "../../../../../models/Assignments"
import { headers } from "next/headers"
import AuthorizeMd from "../../../../../middleware/AuthorizeMd"
import ConnectDb from "../../../../../middleware/db"
export const GET = async (req, res) => {
    await ConnectDb()
    let headerlist = headers()
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
try{
let a  = AuthorizeMd(headerlist.get("token"));
console.log(a)
if(!a){
    return NextResponse.json({message:"Unauthorized route cant handle request",status: "401" });
}
let assignment = await Assignments.find({crid:id});
return NextResponse.json({message:"Success fetched",status: "200",data:assignment ,success:true});
}
catch(err){
return NextResponse.json({message:"Some thing went wrong please try again after some time",status: "401" });
}
}
export const POST = async (req, res) => {
    await ConnectDb()
    const headerlist = headers()
    const reqdata = await req.json();
    try{
        let a  = AuthorizeMd(headerlist.get("token"));
        console.log(a)
        if(!a){
            return NextResponse.json({message:"Unauthorized route cant handle request",status: "401" ,success:false});
        }
        let addData = new Assignments(reqdata);
        await addData.save();
        return NextResponse.json({message:"Assignment added successfully",status: "200",success:true});
        }
        catch(err){
            console.log(err);
        return NextResponse.json({message:"Some thing went wrong please try again after some time",status: "401" ,success:false});
        }
}
export const PUT = async (req, res) => {
    await ConnectDb()
    const headerlist = headers()
    const reqdata = await req.json();
    try{
        let a  = AuthorizeMd(headerlist.get("token"));
        console.log(a)
        if(!a){
            return NextResponse.json({message:"Unauthorized route cant handle request",status: "401" });
        }
        let assignment = await Assignments.findByIdAndUpdate({_id:reqdata.id},reqdata,{new:true});
        return NextResponse.json({message:"Assignment updated successfully",status: "200",success:true});
        }
        catch(err){
        return NextResponse.json({message:"Some thing went wrong please try again after some time",status: "401" ,success:false});
        }
}
export const DELETE = async (req, res) => {
    await ConnectDb()
    const headerlist = headers()
    const reqdata = await req.json();
    try{
        let a  = AuthorizeMd(headerlist.get("token"));
        console.log(a)
        if(!a){
            return NextResponse.json({message:"Unauthorized route cant handle request",status: "401" });
        }
        let assignment = await Assignments.findByIdAndDelete({_id:reqdata.id});
        return NextResponse.json({message:"Assignment deleted successfully",status: "200",success:true});
        }
        catch(err){
        return NextResponse.json({message:"Some thing went wrong please try again after some time",status: "401" ,success:false});
        }
}