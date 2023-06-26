import mongoose from "mongoose";

const Schema = mongoose.Schema;

const grievanceSchema = new Schema({
    regNo: {
        type: String,
        uppercase: true
    },
    subject: String,
    complaint: String,
    relatedDepts: { 
        type : Array, 
        "default" : [] 
    },
    status: String,
});

const GrievanceModel = mongoose.model("Grievance", grievanceSchema);

export default GrievanceModel;