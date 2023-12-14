import mongoose from "mongoose";

export const userSchema =mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

export const User =mongoose.model("user",userSchema);