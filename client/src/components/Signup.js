import React, { useRef, useState } from 'react'
import Signin from './Signin'
import { Link } from 'react-router-dom'
function Signup() {

    let firstNameInputRef=useRef();
    let lastNameInputRef=useRef();
    let ageInputRef=useRef();
    let emailInputRef=useRef();
    let passwordInputRef=useRef();
    let mobileNoInputRef=useRef();
    let profilePicInputRef=useRef();

    let [profilePic,setprofilePic]=useState("./images/noimg.png");

   let onSignUpFD=async()=>{

       let myHeader=new Headers();

    myHeader.append("content-type","multipart/form-data");

    let dataToSend=new FormData();
    dataToSend.append("firstName",firstNameInputRef.current.value);
    dataToSend.append("lastName",lastNameInputRef.current.value);
    dataToSend.append("age",ageInputRef.current.value);
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
    dataToSend.append("mobileNo",mobileNoInputRef.current.value);

    for(let i=0;i<profilePicInputRef.current.files.length;i++){
        dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
       }
    
    let reqOptions={
        method:"POST",
        body:dataToSend,
        };
    let JSONData=await fetch("/signup",reqOptions);
    let JSOData=await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);
   }
  return (
    <div className="App">
        <form>
            <h2>Signup</h2>
            <div>
                <label>First Name</label>
                <input ref={firstNameInputRef}></input>
            </div>
            <div>
                <label>Last Name</label>
                <input ref={lastNameInputRef}></input>
            </div>
            <div>
                <label>Age</label>
                <input ref={ageInputRef}></input>
            </div>
            <div>
                <label>Email</label>
                <input ref={emailInputRef}></input>
            </div>
            <div>
                <label>Password</label>
                <input ref={passwordInputRef}></input>
            </div>
            <div>
                <label>Mobile No</label>
                <input ref={mobileNoInputRef}></input>
            </div>
            <div>
                <label>Profile Pic</label>
                <input ref={profilePicInputRef} type="file" 
                onChange={(eo)=>{
                  let selectedImagePath=URL.createObjectURL(eo.target.files[0]);
                  setprofilePic(selectedImagePath);
                }}></input>
                <br></br>
                <img src={profilePic} className="picPreview"></img>
            </div>
            <div>
                <button type="button" onClick={()=>{
                    onSignUpFD();
                }}>Signup</button>
            </div>
            <div>
                <Link to="/" element={<Signin></Signin>}>Sign In</Link>
            </div>
        </form>
    </div>
  )
}
export default Signup