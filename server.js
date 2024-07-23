const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const multer=require("multer");
const jwt=require("jsonwebtoken");
const path=require("path");

const storage = multer.diskStorage({
    destination:(req, file, cb)=> {
      cb(null,"profilepics")
    },
    filename:(req, file, cb)=> {
        console.log(file);
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  })
  const upload = multer({ storage: storage })
app=express();
app.use(cors());
app.use(express.json());
app.use("/profilepics", express.static("profilepics"));
app.use(express.static(path.join(__dirname,"./client/build")));
app.get("*",(req,res)=>{
    res.sendFile("./client/build/index.html");
})

let userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    mobileNo:String,
    profilePic:String
});

let User=new mongoose.model("users",userSchema);

  app.post("/signup",upload.single("profilePic"),async(req,res)=>{
    console.log(req.body);
    console.log(req.file)
    try{
       let  signedUpDetails=new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            age:req.body.age,
            email:req.body.email,
            password:req.body.password,
            mobileNo:req.body.mobileNo,
            profilePic:req.file.path,
        });
      await User.insertMany([signedUpDetails]);
         res.json({status:"success",msg:"Your account created Successfully"})
    }catch(err){
         res.json({status:"failure",msg:"Unable to create account",error:err})
    }
})

app.patch("/updateProfile",upload.single("profilePic"),async(req,res)=>{
    console.log(req.body);
    // res.json({ status:"success",msg:"dummy response"})

    try{
        if(req.body.firstName.length>0){
            await User.updateMany({email:req.body.email},{firstName:req.body.firstName})
        }
        if(req.body.lastName.length>0){
            await User.updateMany({email:req.body.email},{lastName:req.body.lastName})
        }
        if(req.body.age.length>0){
           await User.updateMany({email:req.body.email},{age:req.body.age})
        }
        if(req.body.password.length>0){
            await User.updateMany({email:req.body.email},{password:req.body.password})
        }
        if(req.body.mobileNo.length>0){
            await User.updateMany({email:req.body.email},{mobileNo:req.body.mobileNo})
        }
        if(req.file){
            await User.updateMany({email:req.body.email},{profilePic:req.file.path})
        } 
        res.json({status:"success",msg:"Profile Updated successfully"}) 
    }catch(err){
        res.json({status:"failure",msg:"Profile Updation failed"})  
    }
});
    

app.post("/login",upload.none(),async(req,res)=>{
    console.log(req.body);
    
    let userDetails=await User.find().and({email:req.body.email});

    console.log(userDetails);

    if(userDetails.length>0){
        if(userDetails[0].password==req.body.password){
            let token=jwt.sign({email:req.body.email,password:req.body.password},"arman")
           let details={
                firstName:userDetails[0].firstName,
                lastName:userDetails[0].lastName,
                age:userDetails[0].age,
                email:userDetails[0].email,
                mobileNo:userDetails[0].mobileNo,
                profilePic:userDetails[0].profilePic,
                token:token,
                
            }
            res.json({status:"success",
            data:details,})
        }else{
            res.json({status:"failure",msg:"Invalid Password"});
        }
        }else{
        res.json({status:"failure",msg:"User does not exist"});
       }
});

app.post("/validateToken",upload.none(),async(req,res)=>{
   console.log(req.body.token);
    try{
        let decryptedToken=jwt.verify(req.body.token,"arman");
        console.log(decryptedToken);
        let userDetails=await User.find().and({email:decryptedToken.email});
    
        console.log(userDetails);
    
        if(userDetails.length>0){
            if(userDetails[0].password==decryptedToken.password){
               let details={
                    firstName:userDetails[0].firstName,
                    lastName:userDetails[0].lastName,
                    age:userDetails[0].age,
                    email:userDetails[0].email,
                    mobileNo:userDetails[0].mobileNo,
                    profilePic:userDetails[0].profilePic,  
                }
                res.json({status:"success",
                data:details,})
            }else{
                res.json({status:"failure",msg:"Invalid Password"});
            }
            }else{
            res.json({status:"failure",msg:"User does not exist"});
           }
    }catch(err){
        res.json({status:"failure",msg:"Invalid Token",error:err});
}
});

app.delete("/deleteProfile",upload.none(),async(req,res)=>{
  try{
         await User.deleteMany({email:req.body.email});
         res.json({status:"success",msg:"User Account deleted successfully"});
  }catch(err){
        res.json({status:"failure",msg:"Unable to delete account"})
  }
});

app.listen(1405,()=>{
    console.log(`listening to port 1405`)
});
let connectTOMDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://akhilchinnamsetti:akhilch1405@batch2403.derqdcc.mongodb.net/Db?retryWrites=true&w=majority&appName=batch2403");
        console.log(`Successfully Connected to MDB`);
    }catch(err){
        console.log(`Unable to connect to MDB`);
        console.log(err);
    }
}
connectTOMDB();