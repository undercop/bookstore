import mongoose from "mongoose";
import bcrypt from "bcryptjs"

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




userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.gensalt(10);
 this.password = await bcrypt.hash(this.password,salt);
 next();


});

// compare password

userSchema.methods.comaprePassword = async function(userPassword){
    return await bcrypt.compare(userPassword , this.password);
}


                          // first letter is uppercase by default it will be anyways converted to user from Users 
const User = mongoose.model("User" , userSchema);

export default User;