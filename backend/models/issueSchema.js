import mongoose from "mongoose";
const { Schema } = mongoose;

const issueSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["open", "in progress", "closed"],
        default: "open"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    Repository:{
        type:Schema.Types.ObjectId,
        ref:"Repository",
        required:true
    }
});

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
