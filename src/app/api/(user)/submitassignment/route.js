import { NextResponse } from "next/server"
import ConnectDb from "../../../../../middleware/db"
import AuthorizeMd from "../../../../../middleware/AuthorizeMd"
import { headers } from "next/headers"
import SubmittedAssignments from "../../../../../models/SubmittedAssignments"
import InternUser from "../../../../../models/InternUser"
import Assignments from "../../../../../models/Assignments"
export const GET = async (req, res) => {
await ConnectDb();
const headerList = headers();
const { searchParams } = new URL(req.url);
const crid = searchParams.get('crid')
const userid = searchParams.get('userid')

try{

let asdata = await SubmittedAssignments.find({crid:crid,userid:userid});
let aspop = await Assignments.populate(asdata, { path: "asid" });
let realdata = await InternUser.populate(aspop, { path: "userid" });

return NextResponse.json({success:true,message:"Data loaded successfully",status:200,data:realdata});
}
catch(err){
    return NextResponse.json({success:false,error:err.message,message:"An error occured while fetching data.Try again later."})
}
}
export const POST = async (req, res) => {
    await ConnectDb();
    const headerList = headers();
    const reqdata = await req.json();
    try{
    
    
    const {asid,crid,userid,response} = reqdata;
    let findd = await SubmittedAssignments.find({asid:asid,crid:crid,userid:userid});
    if(findd.length>0){
        return NextResponse.json({success:false,message:"You have already submitted this assignment",status:400});
    }
    const newAssignment = new SubmittedAssignments({
        asid,crid,userid,response
    });
    await newAssignment.save();
    return NextResponse.json({success:true,message:"Assignment submitted successfully",status:200});
    }
    catch(err){
        return NextResponse.json({success:false,error:err.message,message:"An error occured while fetching data.Try again later."})
    }
}
