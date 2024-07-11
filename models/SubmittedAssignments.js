import mongoose from "mongoose";
const SubmittedSchema = new mongoose.Schema({
  asid:{type:String},
  crid:{
    type:String,
  },
  userid:{
    type:String,
  },
  response:{
    type:String,
  },
  status:{
    type:String,
    default:"pending"
  },
  marks:{
    type:String,
    default:"0"
  },

},{timestamps:true}); // collection
export default mongoose.models.SubmittedAssignments || mongoose.model("SubmittedAssignments",SubmittedSchema);