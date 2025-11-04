import mongoose from "mongoose"
import {Schema} from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:string,
        required:true
    },
    repositories:{
        default:[],
        type:Schema.Types.ObjectId,
        ref:"Repository"
    },
    follwedusers:{
        default:[],
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    starRepositeries:{
        default:[],
        type:Schema.Types.ObjectId,
        ref:"Repository"
    }
})

const User=mongoose.model("User",userSchema);
export default User;