import {React,useEffect,useRef }from 'react'
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from "react-router-dom"

function Signin() {

  let emailInputRef=useRef();
    let passwordInputRef=useRef();
    let navigate=useNavigate();
    let dispatch=useDispatch();


    useEffect(()=>{

     if(localStorage.getItem("token"))
        {
        validateToken();
      }
    },[])

    let validateToken=async()=>{
      let fd= new FormData();
         fd.append("token",localStorage.getItem("token"))
       let reqOptions={
        method:"POST",
        body:fd,
       }
       let JSONData=await fetch("http://localhost:1405/validateToken",reqOptions);
       let JSOData=await JSONData.json();
       console.log(JSOData);

       if(JSOData.status=="success"){
        dispatch({type:"login",data:JSOData.data});
        navigate("/home");
  
      }else{
        alert(JSOData.msg);
      }
 }
    

   let validateLogin=async()=>{

      let dataToSend=new FormData();

      dataToSend.append("email",emailInputRef.current.value);
      dataToSend.append("password",passwordInputRef.current.value);
     let reqOptions={
          method:"POST",
          body:dataToSend,
      };
    let JSONData=await fetch("http://localhost:1405/login",reqOptions);
    let JSOData=await JSONData.json();

    if(JSOData.status=="success"){
      dispatch({type:"login",data:JSOData.data});
      localStorage.setItem("token",JSOData.data.token)
      navigate("/home");

    }else{
      alert(JSOData.msg);
    }
    console.log(JSOData);
  }

    
    

   return (
    <div className="signinFirstDiv">
        <div className="siginSecondDiv">
        <form >
               <h2>Login</h2>
            <div>
                <label>Email</label>
                <input ref={emailInputRef}></input>
            </div>
            <div>
                <label>Password</label>
                <input ref={passwordInputRef}></input>
            </div>
            <button type="button" onClick={()=>{
                validateLogin();
                }}>Sign In</button>
            <div>
            <Link to="/signup">Sign up</Link>
        </div>
        </form>
        </div>
    </div>
  )
}

export default Signin