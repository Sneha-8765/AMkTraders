const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
    const customerSchema = new mongoose.Schema({
        customername:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true,
            unique: true,
            lowercase: true
        },
        phone:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        
        isAdmin:{
            type:Boolean,
            default:false
        }
    });
   //compare password 
   customerSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password,this.password);
    
   };









    //calling jwt json web token.................
    customerSchema.methods.generateToken= function(){
        try{
            return jwt.sign({
                customerId:this._id.toString(),
                email:this.email,
                isAdmin:this.isAdmin,
            },
            process.env.JWT_SECRETE_KEY,{
                expiresIn:"30d",
            }
        );

        }catch(error){
            console.log(error);
        }
    };
     
    
    const Customer =  new mongoose.model("Customer", customerSchema);

module.exports = Customer;