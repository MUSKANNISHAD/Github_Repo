import mongoose from "mongoose";
import {Schema} from "mongoose";
import { boolean } from "yargs";
import { string } from "yargs";


const repoSchema=new Schema({
    name:{
        type:string,
        unique:true,
        required:trusted,
        
    },
    description:{
        type:string,
        unique:true,
    },
    content:[
        {
            type:string,
        }
    ],
    visibility:{
        type:boolean,
    },
    owner:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    issues:[
        {
            type:Schema.Types.ObjectId,
            ref:"issue"
        }
    ]
});

const Repository=mongoose.model("Repository",repoSchema);
export default Repository;