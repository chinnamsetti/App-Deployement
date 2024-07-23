import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'

function TopNavigation() {
  let navigate=useNavigate();

let activeLink=(a)=>{
  if(a.isActive==true){
    return {backgroundColor:"red",color:"white"}
  } 
};

let store=useSelector((store)=>{
   return store;
});

useEffect(()=>{
  if(store&&store.loginDetails&&store.loginDetails.email){
}else{
   navigate("/")
  }
},[])
  return (
    <div>
    <nav className="firstNav">
    <NavLink style={(a)=>{
      return activeLink(a);
    }}to="/home">Dadhboard</NavLink>
    <NavLink style={(a)=>{
      return activeLink(a);
    }} to="/tasks">Tasks Given</NavLink>
    <NavLink style={({isActive})=>{
       if(isActive==true){
        return {backgroundColor:"red",color:"white"}
       } 
    }} to="/editProfile">Edit Profile</NavLink>
    <NavLink style={({isActive})=>{
      console.log(isActive)
    if(isActive==true){
        return {backgroundColor:"red",color:"white"}
      } 
    }} to="/leaves">Leaves</NavLink>
    <NavLink style={(a)=>{
      return activeLink(a);
    }} to="/su">Status Update</NavLink>
    <NavLink style={(a)=>{
      return localStorage.clear();
    }} to="/">Logout</NavLink>
    </nav>
    </div>
  )
}
export default TopNavigation