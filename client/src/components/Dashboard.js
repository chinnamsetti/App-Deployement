import React from 'react'
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    let navigate=useNavigate();
    let storeObj=useSelector((store)=>{
          return store;
    });
    let deleteProfile=async()=>{

        let fd=new FormData();
        fd.append("email",storeObj.loginDetails.email);
    
        let reqOptions={
            method:"DELETE",
            body:fd,
        }
        let JSONData=await fetch("http://localhost:1405/deleteProfile",reqOptions);
        let JSOData=await JSONData.json();

        alert(JSOData.msg)
       if(JSOData.status=="success"){
          navigate("/")
       }

        alert(JSOData.msg)
       }
    return (
    <div className="App">
        <TopNavigation ></TopNavigation>
        <br></br>
        <img className="profilePic" src={`http://localhost:1405/${storeObj.loginDetails.profilePic}`}></img>
        <h3>  {storeObj.loginDetails.firstName} {""}
            {storeObj.loginDetails.lastName}
        </h3>
        <h3>{storeObj.loginDetails.email}</h3>
        <h3>{storeObj.loginDetails.mobileNo}</h3>
        <div>
            <button type="button"onClick={()=>{
                deleteProfile();
            }}>Delete Account</button>
        </div>
    </div>
  )
}

export default Dashboard