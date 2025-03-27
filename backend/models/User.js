import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required : true,
        unique:true
    },
    email:{

       type: String,
       required:true,
       unique: true

        
    },
    password:{
        type: String,
        required:true,
        minlength:6
    },
    profileImage: {
        type: String,
        default: ""
    }

});
                          // first letter is uppercase by default it will be anyways converted to user from Users 
const User = mongoose.model("User" , userSchema);

export default User;