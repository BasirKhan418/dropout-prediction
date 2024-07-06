
import { NextResponse } from "next/server"
import ConnectDb from "../../../../../middleware/db"
import InternDetails from "../../../../../models/InternDetails"
import AuthorizeMd from "../../../../../middleware/AuthorizeMd"
import { headers } from "next/headers"
export const GET = async(req)=>{
    const header = headers()
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    console.log(id)

try{
    let res =  AuthorizeMd(header.get("token"));

    await ConnectDb();
    if(!res){
        return NextResponse.json({message:"You are not authorized to access this route",success:false})
    }
    const intern = await InternDetails.findById({_id:id})
    return NextResponse.json({data:intern,success:true,message:"Course Loaded successfully"})
}
catch(err){
    return NextResponse.json({message:"Something went wrong! try again later"+err,success:false})

}
}
export const POST = async (req, res) => {
    const header = headers();
    const reqdata = await req.json();
    console.log(reqdata);
    try {
        await ConnectDb();
        let res = AuthorizeMd(header.get("token"));
        if (!res) {
            return NextResponse.json({ message: "You are not authorized to access this route", success: false });
        } else {
            let data = await InternDetails.findByIdAndUpdate(
                reqdata.id,
                { $set: { content: reqdata.content } },
                { new: true }
            );
            return NextResponse.json({ message: "Course updated successfully", success: true, data: data });
        }
    } catch (err) {
        return NextResponse.json({ message: "Something went wrong! try again later: " + err, success: false });
    }
};
