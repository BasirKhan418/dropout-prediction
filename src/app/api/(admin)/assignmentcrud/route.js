import { NextResponse } from "next/server";
import ConnectDb from "../../../../../middleware/db";
import AuthorizeMd from "../../../../../middleware/AuthorizeMd";
import { headers } from "next/headers";
import SubmittedAssignments from "../../../../../models/SubmittedAssignments";
import InternUser from "../../../../../models/InternUser";
import Assignments from "../../../../../models/Assignments";

export const GET = async (req, res) => {
  await ConnectDb();
  const headerList = headers();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
   

    let assdata = await SubmittedAssignments.find({ crid: id });
    if (!assdata) {
      return NextResponse.json({ success: false, message: "No data found", status: 404 });
    }

    let aspop = await Assignments.populate(assdata, { path: "asid" });
    let realdata = await InternUser.populate(aspop, { path: "userid" });

    return NextResponse.json({ success: true, message: "Data loaded successfully", status: 200, data: realdata });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Something went wrong! Try again later. " + err.message, status: 500 });
  }
};

export const POST = async (req, res) => {
    await ConnectDb();
    const headerList = headers();
    let reqData = await req.json();
    try {
      
      let upadate = await SubmittedAssignments.findByIdAndUpdate({_id:reqData.id},{marks:reqData.marks,status:"evaluated"},{new:true});
        return NextResponse.json({ success: true, message: "Data Updated SuccessFully", status: 200, data: upadate });
    } catch (err) {
      return NextResponse.json({ success: false, message: "Something went wrong! Try again later. " + err.message, status: 500 });
    }
};
